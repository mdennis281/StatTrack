/**
 * Forces a reload of all stylesheets by appending a unique query string
 * to each stylesheet URL.
 */
function reloadStylesheets() {
  $('.no-select').animateCss("fadeOutRightBig", function() {
    $('.no-select').addClass("div-hide");

    var queryString = '?reload=' + new Date().getTime();
    $('link[rel="stylesheet"]').each(function () {
      this.href = this.href.replace(/\?.*|$/, queryString);
    });

    $('.no-select').removeClass("div-hide");
    $('.no-select').animateCss("fadeInLeftBig");
  });
}
function reloadJavascript() {
  $('.no-select').animateCss("fadeOutLeftBig", function() {
    $('.no-select').addClass("div-hide");

    $('script').each(function() {
        if ($(this).attr('class') !== 'omit') {
            var old_src = $(this).attr('src');
            $(this).attr('src', '');
            setTimeout(function(){ $(this).attr('src', old_src + '?'+new Date()); }, 250);
        }
    });

    $('.no-select').removeClass("div-hide");
    $('.no-select').animateCss("fadeInRightBig");
  });
}
