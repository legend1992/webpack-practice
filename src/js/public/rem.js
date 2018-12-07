(function (referWidth, multiple) {
  //  动态设置根元素fontSize的值
  function setRootFontSize() {
    var root = document.documentElement;
    var clientWidth = root.clientWidth > 1600 ? /*1889*/ 1920 : root.clientWidth < 1280 ? 1280 : root.clientWidth;
    var i = clientWidth / referWidth;
    // i = i > 2 ? 2 : i;
    root.style.fontSize = '100px';
    // root.style.fontSize = i * 100 / multiple + 'px';
  }
  setRootFontSize();
  window.onresize = setRootFontSize;
})(1920, 1);