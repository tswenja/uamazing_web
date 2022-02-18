(function() {
  // ========================== Plugin Initiation ==========================
  // AOS
  AOS.init({
    duration: 600,
    offset: 60
  });

  // Bootstrap tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  })

  // simplelightbox
  $(function () {
    $('.gallery').each(function(index, el) {
      $(el).find('a').simpleLightbox({
        className: 'simple-lightbox-dark',
        opacityTarget: 1
      });
    });
  })


  // ========================== App Script ==========================
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
    $('.bgAnimation').addClass('start');
    //if (count >= 3) return;
    setTimeout(function() {
      $('.bgAnimation').removeClass('start');
      $('.bgAnimation').toggleClass('bg-kv2');
      setTimeout(bgAnimationStart, 1);
    }, 8100);
  }
  //setTimeout(bgAnimationStart, 1);

  // kvAnimation
  var count = 0;
  function kvAnimationStart() {
    //count++;
    $('.kvAnimation > .current').addClass('action');
    //if (count >= 3) return;
    setTimeout(function() {
      var next = $('.kvAnimation > .current').next();
      if (next.length == 0) next = $('.kvAnimation').children().first();

      $('.kvAnimation > .current').removeClass('action current');
      next.addClass('current');
      setTimeout(kvAnimationStart, 40);
    }, 6000);
  }
  setTimeout(kvAnimationStart, 1);

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

  // headbar class switch
  function toggleNavbarStyle() {
    if (!document.querySelector('.activityNavbar-dark')) return;
    if (document.documentElement.scrollTop > 100) {
      document.querySelector('.activityNavbar-dark').classList.remove('activityNavbar-md-dark');
    } else {
      document.querySelector('.activityNavbar-dark').classList.add('activityNavbar-md-dark');
    }
  }
  window.addEventListener('scroll', toggleNavbarStyle);
  window.addEventListener('load', toggleNavbarStyle);

  // sparkles
  document.querySelectorAll('.sky-star').forEach(function(el) {
    sparklize(el);
  });
  function sparklize(el) {
    el.classList.add('lighting');
    setTimeout(function() { el.classList.remove('lighting') }, 600);

    var wait = Math.floor(Math.random() * 3000);
    setTimeout(function() { sparklize(el) }, 3000 + wait);
  }
})();
