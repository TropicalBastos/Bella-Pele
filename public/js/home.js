$(document).ready(function(){

//check if cookie is set if so dont display phone pop up
  if(Cookies.get('fc')==="y"){
    $(".phone-pop").css({display:'none'});
  }

//following is the slider animation
  var currentIndex = 0;
  var items = $("#slides div");
  var item = items.eq(currentIndex);
  item.css('display','inline-block');
  var indexCircles = $(".index-circle");
  indexCir = indexCircles.eq(currentIndex);
  interval = setInterval(cycleItemsForward,5000);

  function cycleItemsForward(){
    item.css('display','none');
    prepareIndexCircle();
    currentIndex++;
    if(currentIndex>items.length-1){
      currentIndex=0;
    }
    item = items.eq(currentIndex);
    item.css('display','inline-block');
    applyIndexCircle();
  }

  function cycleItemsBackward(){
    prepareIndexCircle();
    if(currentIndex<=0){
      currentIndex=4;
    }
    item.css('display','none');
    currentIndex--;
    item = items.eq(currentIndex);
    item.css('display','inline-block');
    applyIndexCircle();
  }

function prepareIndexCircle(){
  indexCir = indexCircles.eq(currentIndex);
  indexCir.removeClass("active");
}
function applyIndexCircle(){
  indexCir = indexCircles.eq(currentIndex);
  indexCir.addClass("active");
}

$(".arrow-right").click(function(){
  clearInterval(interval);
  cycleItemsForward();});
$(".arrow-left").click(function(){
  clearInterval(interval);
  cycleItemsBackward();});


//window scroll
var closed = false;
$(window).on('scroll',function(){
  var wScroll = $(window).scrollTop();
  if(wScroll>=400){
    //remove nav menu when scrolled far enough down
    if($(".navmenu").hasClass("active")){
      $(".navmenu").toggleClass("active");
      $(".navbar").toggleClass("no-glow");
    }
  if(!closed){
    $(".phone-pop").addClass('popped');
    }
  }else{
    $(".phone-pop").removeClass('popped');
    }

  //change the fixed bacground size on scroll
var bacSize = $(window).scrollTop();
$(".content").css("background-size",500+((bacSize)/2)+"px");

});
//hide the phone pop up
$('#hidePhone').click(function(){
  $(".phone-pop").removeClass('popped');
  setTimeout(function(){
    $(".phone-pop").css('display','none');
  },1000);
  closed = true;
  //set the cookie for the session so phone doesnt keep displaying
  Cookies.set('fc','y');
})

//nav menu slide in when clicking icon
$(".grid-icon").on('click',function(){
  $(window).scrollTop(0);
  $(".navmenu").toggleClass("active");
  $(".navbar").toggleClass("no-glow");
});
//remove navmenu when anywhere else is clicked
$(".content").on('click',function(e){
  if($(".navmenu").hasClass("active")){
    $(".navmenu").toggleClass("active");
    $(".navbar").toggleClass("no-glow");
  }
});

//facebook link open new tab
$(document).on('click','.facebook-link',function(){
  window.open("https://pt-br.facebook.com/clinicabellapele");
});

//back to top clik listener
$(document).on('click','.back-to-top',function(){
  $(window).scrollTop(0);
});

//mini nav button listeners
$(".equipe-nav").click(function(){
  scrollTo($(".team"));
});

$(".dicas-nav").click(function(){
  scrollTo($(".advice-wrapper"));
});

$(".esp-nav").click(function(){
  scrollTo($(".esp"));
});

function scrollTo(element){
  var offset = (element.offset().top-150)+"px";
  $("html, body").animate({"scrollTop":offset},"fast");
}

//nav-menu2 listener
$('#nav-icon2').click(function(){
		$(this).toggleClass('open');
    if($(this).hasClass('open')){
      $(".nav-icon-menu").addClass('show');
    }else{
      $(".nav-icon-menu").removeClass('show');
    }
	});
//remove the class of the nav menu show when the size of the width is too large
  $(window).on('resize',function(){
    if($("body").width()>1035){
      $(".nav-icon-menu").removeClass('show');
      $('#nav-icon2').removeClass('open');
    }
  });

});
