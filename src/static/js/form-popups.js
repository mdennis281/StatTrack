function loginPopup()  {
  var apply = alertify.genericDialog || alertify.dialog('genericDialog',function(){
    return {
      main:function(content){
        this.setContent(content);
      },
      setup:function(){
        return {
          focus:{
            element:function(){
              return this.elements.body.querySelector(this.get('selector'));
            },
            select:true
          },
          options:{
            basic:true,
            maximizable:false,
            resizable:false,
            padding:false
          }
        };
      },
      settings:{
        selector:undefined
      }
    };
  });
      //force focusing password box
      alertify.genericDialog ($('#loginForm')[0])
};



function signupPopup()  {
  var apply = alertify.genericDialog || alertify.dialog('genericDialog',function(){
    return {
      main:function(content){
        this.setContent(content);
      },
      setup:function(){
        return {
          focus:{
            element:function(){
              return this.elements.body.querySelector(this.get('selector'));
            },
            select:true
          },
          options:{
            basic:true,
            maximizable:false,
            resizable:false,
            padding:false
          }
        };
      },
      settings:{
        selector:undefined
      }
    };
  });
      //force focusing password box
      alertify.genericDialog ($('#signupForm')[0])
};

$(function() {
  if ( document.location.href.indexOf('/#login') > -1 ) {

    $(function()  {
      var apply = alertify.genericDialog || alertify.dialog('genericDialog',function(){
        return {
          main:function(content){
            this.setContent(content);
          },
          setup:function(){
            return {
              focus:{
                element:function(){
                  return this.elements.body.querySelector(this.get('selector'));
                },
                select:true
              },
              options:{
                basic:true,
                maximizable:false,
                resizable:false,
                padding:false
              }
            };
          },
          settings:{
            selector:undefined
          }
        };

      });
          //force focusing password box
          alertify.genericDialog ($('#loginForm')[0])



    });
    {% if error %}
      alert('{{ error }}');
    {% endif %}
  };
});


$(function() {
  if ( document.location.href.indexOf('/#signup') > -1 ) {

    $(function()  {
      var apply = alertify.genericDialog || alertify.dialog('genericDialog',function(){
        return {
          main:function(content){
            this.setContent(content);
          },
          setup:function(){
            return {
              focus:{
                element:function(){
                  return this.elements.body.querySelector(this.get('selector'));
                },
                select:true
              },
              options:{
                basic:true,
                maximizable:false,
                resizable:false,
                padding:false
              }
            };
          },
          settings:{
            selector:undefined
          }
        };

      });
          //force focusing password box
          alertify.genericDialog ($('#signupForm')[0])



    });
    {% if error %}
      alert('{{ error }}');
    {% endif %}
  };
});
