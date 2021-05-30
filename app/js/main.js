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
