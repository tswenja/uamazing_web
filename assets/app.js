(function() {
  AOS.init();

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
})();
