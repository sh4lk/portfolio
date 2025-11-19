window.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  var scrolled = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrolled + '%';
});

// experience-slider.js

document.addEventListener("DOMContentLoaded", function() {
  const leftBtn = document.querySelector('.exp-arrow.left');
  const rightBtn = document.querySelector('.exp-arrow.right');
  const slider = document.querySelector('.exp-slider');

  leftBtn.addEventListener('click', function() {
    slider.scrollBy({ left: -320, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', function() {
    slider.scrollBy({ left: 320, behavior: 'smooth' });
  });
});