(function() {
  // AOS
  AOS.init({
    duration: 600,
    offset: 60
  });

  // fixed-bg
  document.addEventListener('scroll', function(e) {
    document.querySelectorAll('.fixed-bg').forEach(function(el) {
      var a = (window.scrollY < el.offsetTop && el.scrollTop != 0),
          b = (window.scrollY > el.offsetTop && el.scrollTop != (el.scrollHeight - el.clientHeight));
      if (a || b) {
        window.scroll(0, el.offsetTop);
        el.style = "";
      }
      if (window.scrollY != el.offsetTop) {
        el.style = "overflow: hidden";
      }
    });
  });

  // bgAnimation
  var count = 0;
  function bgAnimationStart() {
    //count++;
    $('.bgAnimation').addClass('start')
    //if (count >= 3) return;
    setTimeout(function() {
      $('.bgAnimation').removeClass('start')
      $('.bgAnimation').toggleClass('bg-slogan2');
      setTimeout(bgAnimationStart, 1);
    }, 8100);
  }
  setTimeout(bgAnimationStart, 1);

  // carouselBox
  document.querySelectorAll('[data-carousel-box]').forEach(function(el) {
    let targetBox = document.getElementById(el.getAttribute('data-carousel-box'));
    if (!targetBox) return;

    el.addEventListener('click', function(e) {
      let targetNumber = $(e.target).data('carousel-target');
      console.log(targetNumber);
      if (!targetNumber) return;
      if (targetNumber > targetBox.children.length) return;

      $(e.currentTarget.children).removeClass('active');
      $(e.target).addClass('active');
      targetBox.className = "carouselBox";
      $(targetBox).addClass('show-nth-' + targetNumber)
    });
  });
})();
