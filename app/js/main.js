function toggleNav() {
 document.querySelector('.nav').classList.toggle('active');
 document.querySelector('body').classList.toggle('overlay');
}

document.addEventListener('click', () => {
 let targ = event.target;
 if (
  targ.classList.contains('nav__toggler') ||
  targ.classList.contains('overlay')
 ) {
  toggleNav();
 }
});

$('.main__sales').slick({
 arrows: false,
 dots: true,
});

$('.advantage_section__slider').slick({
 arrows: true,
 dots: true,
 centerMode: true,
 speed: 1000,
 //  lazyLoad: 'ondemand',
 responsive: [
  {
   breakpoint: 799,
   settings: {
    arrows: false,
   },
  },
 ],
});

function animate(selector) {
 let animationPoint = window.innerHeight * 0.75;
 let blocks = document.querySelectorAll(selector);

 blocks.forEach((item) => {
  if (item.getBoundingClientRect().top < animationPoint) {
   item.classList.add('animated');
  } else {
   item.classList.remove('animated');
  }
 });
}

function checkAnimations() {
 animate('.section__title_small');
 animate('.section__title_main');
 animate('.section__desc');
 animate('.distance__list');
 animate('.only_img');
 animate('.wide_img');
 animate('.architecture__content img');
}
checkAnimations();
document.addEventListener('scroll', checkAnimations);
