//window load
const intro_ani = document.querySelectorAll('.intro_ani');
window.onload = function () {
  // 로딩 애니메이션 투명하게 설정
  document.querySelector('#load').style.opacity = '0';
  // 애니메이션 효과 추가
  for (let i of intro_ani) {
    i.classList.add('ani_on');
  }
  if (window.innerWidth > 500) {
    document.body.style.overflow = 'hidden';
  }
};

//fullpage
$('#fullpage').fullpage({
  anchors: [
    'firstPage',
    'secondPage',
    'skillPage',
    'archivingPage',
    'thirdPage',
    'fourthPage',
    'fifthPage',
    'sixthPage',
    'seventhPage',
    'eighthPage',
  ],
  menu: '#myMenu',
  autoScrolling: true,
  scrollBar: true, // 스크롤바 표시 설정
  scrollingSpeed: 1200, // 스크롤 속도 설정
  navigation: true,
  paddingTop: '80px',
  paddingBottom: '80px',
  // normalScrollElements: '.img_popup_container,.img_popup_bg',
  onLeave: function (index, nextIndex, direction) {
    // 페이지 이동 시 효과
    if (index == 1) {
      $.fn.fullpage.setScrollingSpeed(1500);
    } else {
      $.fn.fullpage.setScrollingSpeed(600);
    }
    // 웹 페이지 크기 조정
    if (window.innerWidth > 1200) {
      $('.web_section').css({ '--afterWidth': '80%' });
    } else {
      $('.web_section').css({ '--afterWidth': '90%' });
    }
    $('.web_section').css({
      '--afterHeight': '100%',
      '--afterBg': '#ffffff44',
    });
    // 마지막 페이지에 도달 시 커서 변경
    if (nextIndex >= $('.section').length - 1) {
      $('#cursor').addClass('active');
    } else {
      $('#cursor').removeClass('active');
    }
    if (
      $('.section')
        .eq(index - 1)
        .is('.web_section')
    ) {
      this.find('.bg_circle').removeClass('active');
    }
    // 서브페이지 활성화 처리
    if (
      $('.section')
        .eq(nextIndex - 1)
        .is('.web_section')
    ) {
      $('#myMenu > li:nth-child(5)').addClass('subpage_on');
    } else {
      $('#myMenu > li:nth-child(5)').removeClass('subpage_on');
    }
  },
  afterLoad: function (origin, destination, direction, trigger) {
    // 페이지 로드 후 효과 설정
    if (window.innerWidth > 800) {
      $('.web_section').css({
        '--afterWidth': '100%',
        '--afterHeight': '360px',
        '--afterBg': '#ffffff99',
      });
    } else {
      $('.web_section').css({
        '--afterWidth': '100%',
        '--afterHeight': '680px',
        '--afterBg': '#ffffffcc',
      });
    }
    if (
      $('.section')
        .eq(destination - 1)
        .is('.web_section')
    ) {
      this.find('.bg_circle').addClass('active'); // 활성화 효과
      this.find('.mockup_all').addClass('scrollOn');
      this.find('.info').addClass('scrollOn');
    }
  },
  // 반응형 설정
  responsiveWidth: 500,
  afterResponsive: function (isResponsive) {
    if (isResponsive) {
      $.fn.fullpage.setAutoScrolling(false);
    }
  },
});

//mouse cursor
let mouseX;
let mouseY;
const cursor = document.querySelector('#cursor');

document.addEventListener('mousemove', function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});


//nav
let main = document.querySelector('#myMenu > li:nth-child(5)');
let sub = document.querySelector('#myMenu .sub');

main.addEventListener('mouseover', function () {
  sub.style.transition = '.4s';
  sub.style.height = '152px';
});
main.addEventListener('mouseout', function () {
  sub.style.transition = 'none';
  sub.style.height = '0';
});

//scroll event
const layer = document.querySelectorAll('.layer');
const layer_btm_gradient = document.querySelector('.layer_btm_gradient');
let scroll_y;
let w_height;

window.addEventListener('scroll', function () {
  scroll_y = window.scrollY;
  w_height = window.innerHeight;
  if (window.innerWidth > 500) {
    if (scroll_y <= window.innerHeight * 2) {
      layer_btm_gradient.style.opacity = (scroll_y / w_height) * 3;
      //intro parallax scroll
      layer[0].style.top = scroll_y * 0.8 + 'px';
      layer[1].style.top = scroll_y * 0.5 + 'px';
      layer[2].style.top = scroll_y * 0.3 + 'px';
    }
  } else {
    // 모바일 환경 설정
    if (scroll_y > 5) {
      layer_btm_gradient.style.transition = '.3s';
      layer_btm_gradient.style.opacity = 1;
    } else {
      layer_btm_gradient.style.opacity = 0;
    }
  }
});

//bird animation
let num = 0;
const bird = document.querySelector('.bird');
setInterval(function () {
  num++;
  if (num > 10) {
    num = 0;
  }
  bird.style.backgroundPosition = num * 48 + 'px'; //1frame width == 48px
}, 150);

//modal popup
const modal_btn = document.querySelectorAll('.modal_btn');
const modal_popup_bg = document.querySelectorAll('.modal_popup_bg');
const modal_close = document.querySelectorAll('.modal_popup_bg .close_btn');

modal_btn.forEach(function (target, index) {
  target.addEventListener('click', function () {
    modal_popup_bg[index].style.display = 'block';
    $.fn.fullpage.setAllowScrolling(false); // 팝업 시 스크롤 막기
    cursor.classList.add('active');
  });
});

modal_close.forEach(function (target, index) {
  target.addEventListener('click', function () {
    modal_popup_bg[index].style.display = 'none';
    $.fn.fullpage.setAllowScrolling(true); // 팝업 닫기 시 스크롤 허용
    cursor.classList.remove('active');
  });
});

modal_popup_bg.forEach(function (target, index) {
  target.addEventListener('click', function (e) {
    if (this == e.target)
      // 배경 클릭 시 팝업 닫기
      target.style.display = 'none';
    $.fn.fullpage.setAllowScrolling(true);
    cursor.classList.remove('active');
  });
});
