isD = false;
function l(mess) {
  return chrome.i18n.getMessage(mess);
}
$(function() {
  $("#ok").click(function(event) {
    event.preventDefault();
    window.top.close();
    ls.set("slink", 1);
    ls.set("on", true);
    chrome.extension.getBackgroundPage().window.location.reload();
  });
});

