(function() {
  document.querySelectorAll('.blockAmiba[data-color]').forEach(function(element) {
    var color = element.getAttribute('data-color');

    var bgSVG = "<svg width='333' height='298' viewBox='0 0 333 298' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M299.187 217.566C255.004 294.093 157.15 320.313 80.6227 276.13C-4.56432 226.947 -17.3649 169.173 22.0587 57.5657C57.9352 -43.9997 156 19 237 24.0005C361.102 31.662 343.37 141.039 299.187 217.566Z' fill='"+ color +"'/></svg>";
    var bgBase64 = window.btoa(bgSVG);

    element.style.backgroundImage = "url('data:image/svg+xml;base64,"+ bgBase64 +"')";
    element.querySelector('.blockAmiba-time').style.color = color;
  });
})();
