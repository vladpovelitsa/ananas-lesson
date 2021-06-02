const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
const appState = {
 currentSlide: 0,
 currentSettings: {},
};
const animationsSettings = {
 maxWidth: 500,
 slidesStep: 35,
 breakpoints: [
  {
   width: 1600,
   settings: {
    maxWidth: 320,
    slidesStep: 25,
   },
  },
  {
   width: 1199,
   settings: {
    maxWidth: 210,
    slidesStep: 20,
   },
  },
  {
   width: 799,
   settings: {
    maxWidth: 75,
    slidesStep: 10,
   },
  },
 ],
};

function checkBreackpoint(obj) {
 obj.breakpoints.forEach((item) => {
  if (item.width > window.innerWidth) {
   appState.currentSettings = item.settings;
   return appState.currentSettings;
  }
 });
 if (appState.currentSettings.maxWidth == undefined) {
  appState.currentSettings.maxWidth = obj.maxWidth;
  appState.currentSettings.slidesStep = obj.slidesStep;
  return;
 }
}

checkBreackpoint(animationsSettings);

function startAnimation(offsetL, offsetR) {
 tl
  .to('#about', {
   maxWidth: `calc(100% - ${offsetL * 2}px - ${offsetR}px)`,
   duration: 0.5,
   stagger: 0.5,
  })
  .to('#about', {
   left: `${offsetL * 2}px`,
   duration: 0.5,
   delay: 0.5,
  });
 tl.call(
  function () {
   $('#about').addClass('active');
  },
  null,
  null,
  2
 );
 return appState.currentSlide++;
}

function toNext(current, target, offsetL, offsetR, width) {
 tl.call(
  function () {
   $(current).removeClass('active');
  },
  null,
  null,
  2
 );
 tl
  .to(current, {
   maxWidth: `${width}px`,
   duration: 0.25,
   stagger: 0.25,
  })

  .to(current, {
   right: 'unset',
   duration: 0,
  });

 tl
  .to(target, {
   zIndex: appState.currentSlide + 1,
  })

  .to(target, {
   maxWidth: `calc(100% - ${offsetL}px - ${offsetR}px)`,
   duration: 0.25,
   stagger: 0.15,
  })
  .to(target, {
   left: `${offsetL}px`,
   duration: 0,
   delay: 0.25,
  });

 tl.call(
  function () {
   $(target).addClass('active');
  },
  null,
  null,
  2
 );
}

function toPrev(current, target, offsetL, offsetR, width) {
 tl.call(function () {
  $(current).removeClass('active');
 });
 tl
  .to(current, {
   left: `unset`,
   duration: 0,
  })
  .to(current, {
   maxWidth: `${width}px`,
   duration: 0.25,
   stagger: 0.25,
  })

  .to(current, {
   right: `${offsetR - appState.currentSettings.slidesStep}px `,
   duration: 0,
   //  delay: 0.5
  })
  .to(current, {
   zIndex: 'unset',
   duration: 0,
  });

 tl
  .to(target, {
   zIndex: appState.currentSlide - 1,
  })
  .to(target, {
   maxWidth: `calc(100% - ${offsetL}px - ${offsetR}px)`,
   duration: 0.25,
   stagger: 0.15,
  })
  .to(target, {
   left: `${offsetL}px`,
   duration: 0,
   delay: 0.25,
  })
  .to(target, {
   right: `${offsetR}px`,
   duration: 0,
   delay: 0,
  });

 tl.call(function () {
  $(target).addClass('active');
 });
}

function toNextHandler() {
 console.log('to next');
 checkBreackpoint(animationsSettings);

 appState.currentSlide == 1
  ? toNext(
     '#about',
     '#environment',
     appState.currentSettings.slidesStep * 2,
     appState.currentSettings.slidesStep,
     appState.currentSettings.maxWidth
    )
  : appState.currentSlide == 2
  ? toNext(
     '#environment',
     '#location',
     appState.currentSettings.slidesStep * 2,
     0,
     appState.currentSettings.maxWidth
    )
  : '';

 return appState.currentSlide++;
}

function toPrevHandler() {
 console.log('to prev');

 checkBreackpoint(animationsSettings);
 appState.currentSlide == 2
  ? toPrev(
     '#environment',
     '#about',
     appState.currentSettings.slidesStep * 2,
     appState.currentSettings.slidesStep * 2,
     appState.currentSettings.maxWidth
    )
  : appState.currentSlide == 3
  ? toPrev(
     '#location',
     '#environment',
     appState.currentSettings.slidesStep * 2,
     appState.currentSettings.slidesStep,
     appState.currentSettings.maxWidth
    )
  : '';
 return appState.currentSlide--;
}

startAnimation(
 appState.currentSettings.slidesStep,
 appState.currentSettings.slidesStep * 2
);

document.addEventListener('click', () => {
 if (
  event.target.classList.contains('main__hidden_btn--next') &&
  document.querySelectorAll('.main__item').length > appState.currentSlide
 ) {
  toNextHandler();
 }
 if (
  event.target.classList.contains('main__hidden_btn--prev') &&
  0 < appState.currentSlide
 ) {
  toPrevHandler();
 }
});

function parallax(event) {
 var border = document.querySelector('.test');

 var centerX = window.innerWidth / 2;

 var x = event.clientX - centerX;

 var translateX = (x * 50) / window.innerWidth;

 border.style.transform = 'translate(' + -translateX + 'px, 0';
}

document.addEventListener('DOMContentLoaded', function (event) {
 document.querySelector('.main__item').addEventListener('mousemove', parallax);
});

function swipeHandler() {
 // настраиваем переключение слайда по свайпу
 if (
  navigator.platform == 'Win32' ||
  navigator.platform == 'Win64' ||
  navigator.platform == 'MacIntel' ||
  navigator.platform == 'Mac68K' ||
  navigator.platform == 'MacPPC'
 ) {
  // выбопляем свайп на компьютерах
  function getStart() {
   if (event.target.closest('.main__sales_wrap') == null) {
    mouseStart = window.event.clientX;
    return mouseStart;
   }
  }
  function getEnd() {
   mouseEnd = window.event.clientX;
   if (parseInt(mouseStart) - parseInt(mouseEnd) <= -100 && mouseStart) {
    toPrevHandler();
   } else if (parseInt(mouseStart) - parseInt(mouseEnd) >= 100 && mouseStart) {
    toNextHandler();
   } else {
    return;
   }
  }
  document.addEventListener('mousedown', getStart);
  document.addEventListener('mouseup', getEnd);
 } else {
  // выпоняем свайп на мобильных
  document.addEventListener('touchstart', function (e) {
   if (event.target.closest('.main__sales_wrap') == null) {
    mouseStart = window.event.changedTouches[0].screenX;
    return mouseStart;
   }
  });

  document.addEventListener('touchend', function (e) {
   var mouseEnd = window.event.changedTouches[0].screenX;
   if (parseInt(mouseStart) - parseInt(mouseEnd) <= -50 && mouseStart) {
    toPrevHandler();
   } else if (parseInt(mouseStart) - parseInt(mouseEnd) >= 100 && mouseStart) {
    toNextHandler();
   } else {
    return;
   }
  });
 }
}
swipeHandler();

document
 .querySelector('.main__hidden_btn--prev')
 .addEventListener('mousemove', function () {
  document.querySelector('.main__hidden_btn--prev span').style.top =
   event.clientY + 'px';
  document.querySelector('.main__hidden_btn--prev span').style.left =
   event.clientX + 'px';
 });
document
 .querySelector('.main__hidden_btn--next')
 .addEventListener('mousemove', function () {
  document.querySelector('.main__hidden_btn--next span').style.top =
   event.clientY + 'px';
  document.querySelector('.main__hidden_btn--next span').style.left =
   event.clientX + 'px';
 });

document.querySelector('#about .main__next').addEventListener('click', () => {
 toNext(
  '#about',
  '#environment',
  appState.currentSettings.slidesStep * 2,
  appState.currentSettings.slidesStep,
  appState.currentSettings.maxWidth
 );
 return appState.currentSlide++;
});
document
 .querySelector('#environment .main__next')
 .addEventListener('click', () => {
  toNext(
   '#environment',
   '#location',
   appState.currentSettings.slidesStep * 2,
   0,
   appState.currentSettings.maxWidth
  );
  return appState.currentSlide++;
 });
