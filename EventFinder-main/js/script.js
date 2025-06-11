const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
};

const themeToggler = document.querySelector('.theme-toggler');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.onclick = () => {
  themeToggler.classList.toggle('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  themeToggler.classList.remove('active');
};

document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn => {
  btn.onclick = () => {
    const color = btn.style.background;
    document.documentElement.style.setProperty('--main-color', color);
  };
});

const homeSlider = new Swiper('.home-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3500,               // slightly slower for smoothness
    disableOnInteraction: false,
    pauseOnMouseEnter: true,   // pause autoplay when user hovers
  },
});

const reviewSlider = new Swiper('.review-slider', {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  spaceBetween: 10,
  breakpoints: {
    0: { slidesPerView: 1 },
    700: { slidesPerView: 2 },
    1050: { slidesPerView: 3 },
  },
  autoplay: {
    delay: 5500,               // slight increase for readability
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});
