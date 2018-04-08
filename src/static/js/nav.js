
//helps ensure animations finish
/*
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};*/

$(window).resize(function() {
  $('#sidebar-wrapper').css('height', window.innerHeight-60);
});

var activePage = '';
var pgHistory = [{ title:'Markets', url:'/markets' }]

$(window).on('popstate', function (e) {
        pgHistory.pop(); //just trust me dude....
        var state = pgHistory.pop();
        if (state !== null) {
          if (document.title !== null) { document.title = state.title; }
          else { document.title = 'CryptoTrack'; }
          load_page(state.url);
        } else {
            document.title = 'CryptoTrack';
            menu_load('/markets','#fadeMarkets');
        }
});

function load_page(url) {
  $("#load-icon").removeClass("hide");
  $("#page-content").animateCss('fadeOut',function() {
  $("#page-content").empty();
  $(".page-navs").removeClass("text-info bg-selected");
    $("#page-content").load(url, function() {
        pgHistory.push({url: url,title: 'CryptoTrack'});
        //history.pushState( { url: url,title: 'CryptoTrack' }, 'CryptoTrack', url );
        $(document).ready(function() {
          activePage = url;
          $("#page-content").animateCss('fadeIn');
          $("#load-icon").addClass("hide");
        });
      });
    });
};




function menu_load(url,linkID) {
  $("#load-icon").removeClass("hide");
  $("#page-content").animateCss('fadeOut',function() {
    $("#page-content").empty();
    $(".page-navs").removeClass("text-info bg-selected");
    setTimeout(function(){
      $("#page-content").load(url, function() {
        pgHistory.push({ url: url, title: $(linkID).attr("name") });
        history.pushState( { url: '/',title: $(linkID).attr("name") }, $(linkID).attr("name"), '/' );
        $(document).ready(function() {
          activePage = url;
          $("#page-content").animateCss('fadeIn');
          $(linkID).toggleClass("text-info bg-selected");
          $("#load-icon").addClass("hide");
          if ($(window).width() < 768 ) {
    				$("#wrapper").removeClass("toggled");
    			};
        });
      });
    }, 200);
  });
};
