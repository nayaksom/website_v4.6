// Smooth Scroll
(function($) {
  "use strict";
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });
  
  // Scroll shrinks the mainNav
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });
})(jQuery);

// Nav layer show and hide
function btnToggle(){
  $("#navWrap li").toggleClass("active");
  $(".hamburger").toggleClass("is-active");
  if($("#navWrap li").hasClass("active")) {
    $("#navWrap").css('z-index', 9);
  }
  else {
    $("#navWrap").css('z-index', -1);
  }
}

$(".name").click(function(){
	$("#navWrap li").removeClass("active");
  $(".hamburger").removeClass("is-active");
	$("#navWrap").css('z-index', -1);
});

$(".hamburger").click(btnToggle);
$("#navWrap ul li a").click(btnToggle);

// Gallery
$(document).on("click", '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Contact form auto resize input
function resizeInput() {
  $(this).attr("size", $(this).val().length);
}
$('input[type="text"], input[type="email"]')
  .keyup(resizeInput)
  .each(resizeInput);
console.clear();
(function() {
  var textareas = document.querySelectorAll(".expanding"),
    resize = function(t) {
      t.style.height = "auto";
      t.style.overflow = "hidden";
      t.style.height = t.scrollHeight + t.offset + "px";
      t.style.overflow = "";
    },
    attachResize = function(t) {
      if (t) {
        console.log("t.className", t.className);
        t.offset = !window.opera
          ? t.offsetHeight - t.clientHeight
          : t.offsetHeight +
              parseInt(
                window
                  .getComputedStyle(t, null)
                  .getPropertyValue("border-top-width")
              );
        resize(t);
        if (t.addEventListener) {
          t.addEventListener("input", function() {
            resize(t);
          });
          t.addEventListener("mouseup", function() {
            resize(t);
          });
        }
        t["attachEvent"] &&
          t.attachEvent("onkeyup", function() {
            resize(t);
          });
      }
    };

  // IE7 support
  if (!document.querySelectorAll) {
    function getElementsByClass(searchClass, node, tag) {
      var classElements = new Array();
      node = node || document;
      tag = tag || "*";
      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
      for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
          classElements[j] = els[i];
          j++;
        }
      }
      return classElements;
    }
    textareas = getElementsByClass("expanding");
  }
  for (var i = 0; i < textareas.length; i++) {
    attachResize(textareas[i]);
  }
})();

// Sending email from the form
$(document).ready(function() {
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    var name = $('#senderName').val();
    var email = $('#senderEmail').val();
    var comments = $('#message').val();
    $.ajax({
      url:'https://formspree.io/soumyajit@soumyajitnayak.com',
      method:'POST',
      data:{
        name:name,
        _replyto:email,
        email:email,
        comments:comments,
        _subject:'My Form Submission',
      },
      dataType:"json",
      success:function() {
        $(".alert").show("medium");
        setTimeout(function() {
          $(".alert").hide("medium");
        }, 5000);
        return false;
      }   
    });
  });
}); 

// Images Lazyloading
[].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
	img.setAttribute('src', img.getAttribute('data-src'));
	img.onload = function() {
		img.removeAttribute('data-src');
	};
});