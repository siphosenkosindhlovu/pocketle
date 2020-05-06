$(document).ready(function () {
  $(".swiper-wrapper").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    dots: true,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
  $("svg.radial-progress").each(function (index, value) {
    $(this)
      .find($("circle.complete"))
      .removeAttr("style");
  });
  $(window)
    .scroll(function () {
      $("svg.radial-progress").each(function (index, value) {
        // If svg.radial-progress is approximately 25% vertically into the window when scrolling from the top or the bottom
        if (
          $(window).scrollTop() >
          $(this).offset().top - $(window).height() * 0.75 &&
          $(window).scrollTop() <
          $(this).offset().top + $(this).height() - $(window).height() * 0.25
        ) {
          // Get percentage of progress
          percent = $(value).data("percentage");
          // Get radius of the svg's circle.complete
          radius = $(this)
            .find($("circle.complete"))
            .attr("r");
          // Get circumference (2πr)
          circumference = 2 * Math.PI * radius;
          // Get stroke-dashoffset value based on the percentage of the circumference
          strokeDashOffset = circumference - (percent * circumference) / 100;
          // Transition progress for 1.25 seconds
          $(this)
            .find($("circle.complete"))
            .animate({ "stroke-dashoffset": strokeDashOffset }, 1250);
        }
      });
    })
    .trigger("scroll");

  // should start at 0
  /*
  var position = $(window).scrollTop();
  window.onscroll = function() {};
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll > position) {
    console.log("scrollDown");
    stickNavbar();
    hideNav();
  } else {
    console.log("scrollUp");
    stickNavbar();
    showNav();
  }
  position = scroll;
});
// Get the navbar
var navbar = $(".sub-menu");
//console.log(navbar);
var sticky = navbar.offset().top;
//console.log(sticky);
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.addClass("sticky");
  } else {
    navbar.removeClass("sticky");
  }
}

function showNav() {
  var stick = $(".nav-header").offset().top + 90;
  console.log(window.pageYOffset);
  console.log(stick);
  if (window.pageYOffset >= sticky) {
    $("main").css({
      "padding-top": "90px"
    });
    $(".nav-header").css({
      position: "fixed",
      top: 0,
      width: "100%"
    });
    $(".sub-menu").css({
      top: $(".nav-header").css("height")
    });
  } else {
    hideNav();
  }
}
function hideNav() {
  var stick = $(".nav-header").offset().top;
  console.log(window.pageYOffset);
  console.log("stick", stick);
  if (window.pageYOffset >= stick || window.pageYOffset == 0) {
    $("main").css({
      "padding-top": "0px"
    });
    $(".nav-header").css({
      position: "static"
    });
    $(".sub-menu").css({
      top: "0px"
    });
  } else {
    //navbar.removeClass("sticky");
  }
}*/
});
