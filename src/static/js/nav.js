
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



function load_page_div(div,url) {
  $("#load-icon").removeClass("hide");
  $(div).load(url, function() {
    $("#load-icon").addClass("hide");
  });
};

function request_page(url) {
  $.get( url, function( data ) {
    if (data !== null) {
      if (data.status == 0) {
        n_error('Error Processing Request',data.msg);
      }
      if (data.status == 1) {
        n_success('Success!',data.msg);
      }
    }
  });
};

function post_form(form,url){
    $.post(url, $(form).serialize(), function(data) {
        alert(data);
        $("#save-notify").removeClass("hide");
        setTimeout(function(){
          $("#save-notify").addClass("hide");
        }, 3000);

    });
};

function save_success_notify() {
  $("#save-notify").removeClass("hide");
  setTimeout(function(){
    $("#save-notify").addClass("hide");
  }, 3000);
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

$("#menu-toggle").click(function(e) {
       e.preventDefault();
       $("#wrapper").toggleClass("toggled");
});

var progressBarContainer = $('#progress-bar');
var progressBar = {
    chain: [],
    progress: progressBarContainer.children('progress'),
    progressBar: progressBarContainer.find('.progress-bar'),
    progressInfo: progressBarContainer.children('.progress-info'),
    set: async function(value, info, noPush) {
        if(!noPush) {
            this.chain.push(value);
        }
        if(this.chain[0] == value) {
            this.go(value, info);
        }
        else {
            var self = this;
            await setTimeout(function() {
                self.set(value, info, true)
            }, 500);
        }
    },
    go: function(value, info) {
        this.progressInfo.text(info);
        var self = this;
        var interval = setInterval(function() {
            var curr = self.progress.attr('value');
            if(curr >= value) {
                clearInterval(interval);
                self.progress.attr('value', value);
                self.progressBar.css('width', value + '%');
                self.chain.shift()
            }
            else {
                self.progress.attr('value', ++curr);
                self.progressBar.css('width', curr + '%');
            }
        }, 10)
    }
};



async function startup(user,newLogin) {
  $(".load-card").removeClass("div-hide");
  $("#page-content").load('/markets');
  $("#page-content").addClass("div-hide");
  $(".load-card").animateCss('bounceInUp', async function() {
    $('#fadeMarkets').toggleClass("text-info bg-selected");
    await progressBar.set(5, 'Loading Assets');
    await progressBar.set(12, 'Confirming Login Session');
    await progressBar.set(22, 'Verifying Browser Compatability');
    await progressBar.set(52, 'Optimizing Site for Screen Size');
    await progressBar.set(82, 'Loading User Settings');
    await progressBar.set(96, 'Having a Glass of Wine');
    await progressBar.set(100, 'Done! Welcome, '+user);
    setTimeout(function(){

      $(".load-card").animateCss('bounceOutUp', function() {
        $(".loading-page").addClass("div-hide");
        $(".loading-page").empty();
        $("#wrapper").removeClass("div-hide");
        $("#footer").removeClass("div-hide");
        $("#footer").animateCss('fadeInUp');
        $("#header").removeClass("div-hide");
        $("#header").animateCss('fadeInDown', function() {
          if ($(window).width() > 1000 ) {
            $("#wrapper").addClass("toggled");
          }
          setTimeout(function(){
              $("#page-content").removeClass("div-hide");
              $("#load-icon").addClass("hide");
              $("#page-content").animateCss('fadeIn', function(){
                if (newLogin == 1) { Welcome(); }
              });
            }, 800);
        });
      });
    }, 4000);
  });
};



$('#BTC-stack').click(function(e){
    e.preventDefault();
    console.log('clicked stack');
    $(this).find('.fa-circle').toggleClass('far fas');
});

var tapcount = 0;
var gagcount = 0;

function tap_logo(id){
  if (tapcount < 3) {
    tapcount += 1;
    $(id).animateCss('bounce', function(){ if (tapcount == 3) { gag_trick(id); } });
  }
}


function gag_trick(id) {
  for (i = 0; i < 23; i++) {
    setTimeout( function(){ $('.beta-tag').toggleClass("badge-info") },((69*i)%13)*100)
    for (z = 0; z < 250; z++) {
      setTimeout( function(){ $('.beta-tag').toggleClass("badge-info"); $('.logo-light').toggleClass("text-white"); },(((69*z)%16)+1)*100)
    }
    if ( i == 8 ) {

      setTimeout( function() {
        $('.beta-tag').removeClass('badge-info');
        for (z = 0; z < 1501; z++) {
          setTimeout( function(){ $('.beta-tag').toggleClass("badge-info"); $('.logo-light').toggleClass("text-white"); },(((69*z)%35)+1)*100)
        }
        $(id).animateCss('hinge', function(){
          $(id).css("opacity", "0");
          setTimeout(function(){
            tapcount = 0;
            $(id).css("opacity", "1");
            $(id).animateCss("fadeInDown",function(){$('.beta-tag').addClass('badge-info'); $('.logo-light').removeClass("text-white"); });
          }, 10000);
        });
      }, 750);
    }
  }
}
