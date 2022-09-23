document.addEventListener("mousemove", parallaxFloat);
function parallaxFloat(event) {
  this.querySelectorAll("[data-float]").forEach((shift) => {
    const position = shift.getAttribute("value") || 30;
    var positionX = -1 * position;
    var positionY = -1 * position;

    const rect = shift.getBoundingClientRect();
    const shiftCenter = { x: rect.left + rect.width / 2 + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY };
    const distance = getDistance({ x: event.pageX, y: event.pageY }, shiftCenter);

    const effectiveWidth = rect.width * 2;
    const effectiveHeight = rect.height * 2;
    var distanceX = shiftCenter.x - event.pageX;
    if (distanceX < 0) {
      distanceX *= -1;
      positionX *= -1;
    }
    var distanceY = shiftCenter.y - event.pageY;
    if (distanceY < 0)  {
      distanceY *= -1;
      positionY *= -1;
    }

    const minDistanceX = rect.width;
    const minDistanceY = rect.height;
    var offsetX = effectiveWidth - Math.max(minDistanceX, Math.min(effectiveWidth, distanceX));
    var offsetY = effectiveHeight - Math.max(minDistanceY, Math.min(effectiveHeight, distanceY));
    if (distanceX < minDistanceX) {
      offsetX *= distanceX / minDistanceX;
    }
    if (distanceY < minDistanceY) {
      offsetY *= distanceY / minDistanceY;
    }
    offsetX *= 1 - Math.min(1, distance / effectiveWidth);
    offsetY *= 1 - Math.min(1, distance / effectiveHeight);
    const x = (effectiveWidth - offsetX * positionX) / 90;
    const y = (effectiveHeight - offsetY * positionY) / 90;

    //console.log(x,y, offsetX, effectiveWidth, distanceX);
    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}
function xparallaxFloat(event) {
  this.querySelectorAll(".-float1[data-float]").forEach((shift) => {
    const maxPosition = 30;

    const rect = shift.getBoundingClientRect();
    const shiftCenter = { x: rect.left + rect.width / 2 + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY };

    const innerRange = getDistance({ x: rect.left, y: rect.top }, { x: rect.right, y: rect.bottom }) / 2;
    const effectiveRange = innerRange * 3;
    const distance = getDistance({ x: event.pageX, y: event.pageY }, shiftCenter);
    var position = maxPosition * (1 - Math.max(0, Math.min(1, (distance - innerRange) / (effectiveRange - innerRange))));
    if (distance <= innerRange) {
      position = position * (distance / innerRange);
    }
    console.log(position);
    const x = (window.innerWidth + event.pageX  * position) / 90;
    const y = (window.innerHeight + event.pageY  * position) / 90;

    shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

function getDistance(point1, point2) {
  return Math.pow((Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2)), 0.5);
}
