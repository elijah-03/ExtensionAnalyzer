"use strict";

let tab = null;

function getPref(key, callback)
{
  browser.runtime.sendMessage({type: "prefs.get", key}, callback);
}

function setPref(key, value, callback)
{
  browser.runtime.sendMessage({type: "prefs.set", key, value}, callback);
}

function togglePref(key, callback)
{
  browser.runtime.sendMessage({type: "prefs.toggle", key}, callback);
}

function isPageWhitelisted(callback)
{
  browser.runtime.sendMessage({type: "filters.isWhitelisted", tab}, callback);
}

function subscriptionsGet(callback)
{
  browser.runtime.sendMessage({type: "subscriptions.get", ignoreDisabled: false, downloadable: true, special: true}, callback);
}

function subscriptionsToggle(msg)
{
  msg.type = "subscriptions.toggle";
  msg.keepInstalled = true;
  browser.runtime.sendMessage(msg);
}

function whenPageReady()
{
  return new Promise(resolve =>
  {
    function onMessage(message, sender, sendResponse)
    {
      if (message.type == "composer.ready" && sender.page &&
          sender.page.id == tab.id)
      {
        browser.runtime.onMessage.removeListener(onMessage);
        resolve();
      }
    }

    browser.runtime.onMessage.addListener(onMessage);

    browser.runtime.sendMessage({
      type: "composer.isPageReady",
      pageId: tab.id
    },
    ready =>
    {
      if (ready)
      {
        browser.runtime.onMessage.removeListener(onMessage);
        resolve();
      }
    });
  });
}

function refreshRequested() {
	document.body.classList.toggle('status-changed')
  browser.tabs.reload(tab.id);
}

function toggleEnabled()
{
  let disabled = document.body.classList.toggle("disabled");
  document.body.classList.toggle('status-changed')
  setTimeout(function() {
    browser.runtime.sendMessage({
      type: disabled ? "filters.whitelist" : "filters.unwhitelist",
      tab
    });
  }, 500)
}

function insertMessage(element, text, links)
{
  let match = /^(.*?)<(a|strong)>(.*?)<\/\2>(.*)$/.exec(text);
  if (!match)
  {
    element.appendChild(document.createTextNode(text));
    return;
  }

  let before = match[1];
  let tagName = match[2];
  let value = match[3];
  let after = match[4];

  insertMessage(element, before, links);

  let newElement = document.createElement(tagName);
  if (tagName == "a" && links && links.length)
    newElement.href = links.shift();
  insertMessage(newElement, value, links);
  element.appendChild(newElement);

  insertMessage(element, after, links);
}

function updateStats()
{
  let statsPage = document.getElementById("stats-page");
  browser.runtime.sendMessage({
    type: "stats.getBlockedPerPage",
    tab
  },
  blockedPage =>
  {
    statsPage.innerHTML = blockedPage.toLocaleString();
  });

  let statsTotal = document.getElementById("stats-total");
  getPref("blocked_total", blockedTotal =>
  {
    statsTotal.innerHTML = blockedTotal.toLocaleString();
  });
}

function enableForThisSite() {
  if(!$(".checkbox").hasClass("afterSpecial")) {
    $(".checkbox").addClass("afterSpecial");
  }
  $(".checkbox").removeClass("beforeSpecial");
}

function disableForThisSite() {
  $(".checkbox").removeClass("afterSpecial");
  if(!$(".checkbox").hasClass("beforeSpecial")) {
    $(".checkbox").addClass("beforeSpecial");
  }
}

document.addEventListener("DOMContentLoaded", () =>
{
  browser.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
  {
    if (tabs.length > 0)
      tab = {id: tabs[0].id, url: tabs[0].url};

    let urlProtocol = tab && tab.url && new URL(tab.url).protocol;

    if (urlProtocol != "http:" && urlProtocol != "https:")
    {
      document.body.classList.add("local");
      document.body.classList.remove("nohtml");
    }
    else
    {
      whenPageReady().then(() =>
      {
        document.body.classList.remove("nohtml");
      });
    }
    if (tab)
    {
      isPageWhitelisted(whitelisted =>
      {
        if (whitelisted) {
          document.body.classList.add("disabled");
          $(".adblock-status").prop("checked", false);
          disableForThisSite();
          $(".current-page").addClass("page-disabled");
        }
      });
    }

    updateStats();
  });

  document.getElementById("adblock-switch").addEventListener(
    "change", toggleEnabled
  );
  document.getElementById("refresh").addEventListener(
    "click", refreshRequested
  );

  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    $("#sitename").text(new URL(url).hostname);
  });

  chrome.storage.local.get(['extDisabled'], function(result) {
    if (result.extDisabled === true) {
      $("#ext-status").prop("checked", false);
      $(".all-pages").addClass("page-disabled");
    }
  });
});



$(".adblock-status").change(function(event) {
  if (event.target.checked === true) {
    enableForThisSite();
    $(".current-page").removeClass("page-disabled");
  } else {
    disableForThisSite();
    $(".current-page").addClass("page-disabled");
  }
})

$("#ext-status").click(function(e) {
  subscriptionsGet(function(subs) {
    if (e.target.checked === true) {
      chrome.storage.local.set({"extDisabled": false});
      $(".all-pages").removeClass("page-disabled");
      if ($(".adblock-status").prop('checked') === true) {
        enableForThisSite();
      } else {
        disableForThisSite();
      }
      subs.forEach(function(item) {
        if (item['disabled'] === true) {
          subscriptionsToggle(item);
        }
      });
    } else {
      chrome.storage.local.set({"extDisabled": true});
      $(".all-pages").addClass("page-disabled");
      subs.forEach(function(item) {
        if (item['disabled'] === false) {
          subscriptionsToggle(item);
        }
      });
    }
  });
})