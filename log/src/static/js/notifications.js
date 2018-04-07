$.notifyDefaults({
  animate: {
		enter: 'animated fadeInRight',
		exit: 'animated fadeOutRight'
	},
  offset: {
		x: 10,
		y: 70
	},
  delay: 5000,
  allow_dismiss: true,
  showProgressbar: true,
  newest_on_top: true,
  mouse_over: 'pause',
  icon_type: 'class',
  template:'<div data-notify="container" class="alert alert-{0} notification-general" role="alert">' +
              '<div class="progress progress-bar-notification" data-notify="progressbar">'+
                '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>'+
              '</div>'+
              '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
                '<div class="content d-inline-flex no-wrap">'+
               		  '<div class="notify-icon align-self-center text-{0}"><i data-notify="icon"></i></div>' +
                           '<div class="right">'+
                             '<span data-notify="title" class="text-{0}">{1}</span>' +
                             '<div class="container wrap bg-{0}-trans">'+
                 		          '<span data-notify="message" class="text-dark">{2}</span>' +
                 	          '</div>'+
                           '</div>'+
                          '</div>'+
                        '</div>'
});

function n_error(title,message) {
  $.notify({
    icon: 'fas fa-times-circle',
    title,
    message,

  },{

    type: 'danger'
  });
};

function n_success(title,message) {
  $.notify({
    icon: 'fas fa-check-circle',
    title,
    message,

  },{

    type: 'success'
  });
};

function Welcome() {
  $.notify({
    icon: 'https://cryptotrack.live/static/img/logo/logo-64.png',
    title: 'Thanks for using Crypto<span>Track</span>! ',
    message: 'Remember that this is an unfinished project! '+
             'If you notice any issues, please report them '+
             'using the Bug Reporter in the side menu.'
  },{
	delay: 10000,
  type: 'welcome',
  icon_type: 'image',
  template: '<div data-notify="container" class="alert alert-{0}" role="alert">' +
              '<div class="progress progress-bar-notification" data-notify="progressbar">'+
                '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>'+
              '</div>'+
              '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
              '<div class="content d-inline-flex no-wrap">'+
    		        '<img data-notify="icon" class="img-circle align-self-center">' +
                '<div class="right">'+
                  '<span data-notify="title">{1}</span>' +
                  '<div class="container wrap">'+
      		          '<span data-notify="message">{2}</span>' +
      	          '</div>'+
                '</div>'+
               '</div>'+
             '</div>'
});
};
