chrome.storage.local.get(function(values)
{
  let zoomValue = 1;
  if (values['isGlobal'] && values['isGlobal'] === true) {
    zoomValue = values['globalZoom'];
  } else if (values[window.location.hostname]) {
    zoomValue = values[window.location.hostname];
  }
  $("html").css("zoom", zoomValue);
  $("html").css("transform", zoomValue);
  $("html").css("transform-origin", "top left");
  $("html").css("-moz-transform", "scale("+ zoomValue +")");
});
