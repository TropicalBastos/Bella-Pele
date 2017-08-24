$(document).ready(function(){

  //validation methods
  $("#name").blur(checkName);
  $("#email").blur(checkEmail);
  $("#message").blur(checkMessage);

  function checkName(){
    var n = $("#name").val();
    if(!n.match(/[\s\S]{1,30}/)){
      $(".validation-name").css('display','block');
      return false;
    }else{
      $(".validation-name").css('display','none');
      return true;
    }
  }

  function checkEmail(){
    var e = $("#email").val();
    if(!e.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      $(".validation-email").css('display','block');
      return false;
    }else{
      $(".validation-email").css('display','none');
      return true;
    }
  }

  function checkMessage(){
    var m = $("#message").val();
    if(m.length===0){
      $(".validation-message").css('display','block');
      return false;
    }else{
      $(".validation-message").css('display','none');
      return true;
    }
  }

  $("#send-button").click(function(){
    checkName();
    checkEmail();
    checkMessage();
    $(".loading-icon").css('display','block');
    $(".contact-wrapper").addClass("loading");

    var nValue = $("#name").val();
    var eValue = $("#email").val();
    var mValue = $("#message").val();
    var dataToSend = JSON.parse('{"name":"'+nValue+'","email":"'+eValue+'","message":"'+mValue+'"}');

    $.ajax({
      method:'POST',
      url:"/send",
      data: dataToSend,
      success:function(data){
          $(".loading-icon").css('display','none');
          $(".contact-wrapper").removeClass("loading");
        if(data.success==="true"){
          $(".send").find("h1").html("Sucesso");
          $(".send").find("p").html("A mensagem foi enviada com sucesso!");
          $(".send").addClass("show");
        }else{
          $(".send").find("h1").html("Erro");
          $(".send").find("p").html("A mensagem não pôde ser enviada, Talvez você digitou algo errado ou o servidor está offline");
          $(".send").addClass("show");
        }
      },
      error: function(err){
        $(".loading-icon").css('display','none');
        $(".contact-wrapper").removeClass("loading");
        $(".send").find("h1").html("Erro");
        $(".send").find("p").html("A mensagem não pôde ser enviada, Talvez você digitou algo errado ou o servidor está offline");
        $(".send").addClass("show");
      }
    });
  });

  $(document).on('click','.error-ok',function(){
    $(".send").removeClass("show");
  });
});
