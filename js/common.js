// 카테고리 gnb
const gnb = {
  openDelay: null, // gnb open 딜레이(접근성 고려)
  gnbOpen: (() => {
    document.querySelectorAll('header .menu-list > li > a').forEach((el) => {
      el.addEventListener('mouseover', (e) => {
        // e.preventDefault();
        // console.log(e.target, e.target.closest('li'), 'gnb mouseover')
        console.log(e.target.closest('.menu-list').querySelector('li.on'), 'gnb mouseover')

        if(e.target.closest('li').classList.contains('on') === false){
          
          clearTimeout(gnb.openDelay);
          gnb.openDelay = setTimeout(() => {
            if(e.target.closest('.menu-list').querySelector('li.on')){
              e.target.closest('.menu-list').querySelector('li.on').classList.remove('on')
            }
            e.target.closest('li').classList.add('on')
            window.requestAnimationFrame(aniFrame.slideDown);
          }, 200);
        }
      });
      el.addEventListener('focus', (e) => {
        if(e.target.closest('li').classList.contains('on') === false){
          if(e.target.closest('.menu-list').querySelector('li.on')){
            e.target.closest('.menu-list').querySelector('li.on').classList.remove('on')
          }
          e.target.closest('li').classList.add('on')
        }
      });

      el.addEventListener('mouseout', (e) => {
        clearTimeout(gnb.openDelay);
      });
      el.addEventListener('blur', (e) => {
        clearTimeout(gnb.openDelay);
      });
    });
    gnb.gnbClose()
  }),
  gnbClose: (() => {
    document.querySelectorAll('header .menu-list > li').forEach((el) => {
      document.querySelector('header').addEventListener('mouseleave', (e) => {
        // console.log(el, 'gnb mouseleave')
        el.classList.remove('on');
      });
    });
  })
}

// 공통 - 애니메이션 슬라이드 구현
const aniFrame = {
  speed: 50, // 애니메이션 속도
  time: 300, // 애니메이션 시간 설정
  aniVal: 0, // value
  viewSet: false, // 열기, 닫기 기본 설정값
  done: false, // 애니메이션 완료
  start: undefined,
  previousTimeStamp: false,
  slideUp: (() => { // 슬라이드 닫기
    
  }),
  slideDown: ((timestamp) => { // 슬라이드 열기
    const element = document.querySelector(".sub-area");

    // 맨 처음 시간 설정
    if(aniFrame.start === undefined){
      aniFrame.start = timestamp;
    }
    const elapsed = timestamp - aniFrame.start;
    console.log('aaaaaaaa', timestamp, aniFrame.start, elapsed)

    // 시간(time) 동안 애니메이션 진행
    if(elapsed < aniFrame.time){
      aniFrame.previousTimeStamp = timestamp;
      if (!aniFrame.done) {
        aniFrame.aniVal += aniFrame.speed
        element.style.height = '474px';
        window.requestAnimationFrame(aniFrame.slideDown);
      }
    }else{
      aniFrame.done = true;
      window.cancelAnimationFrame(aniFrame.slideDown);
    }


    // function step(timestamp) {
    //   if (start === undefined) {
    //     start = timestamp;
    //   }
    //   const elapsed = timestamp - start;
    //   console.log('aaaaaaaa', timestamp, start, elapsed)

    //   if (previousTimeStamp !== timestamp) {
    //     // Math.min()은 여기서 요소가 정확히 200px에 멈추는지 확인하기 위해 사용됩니다
    //     const count = Math.min(0.1 * elapsed, 200);
    //     element.style.transform = `translateX(${count}px)`;
    //     if (count === 200) done = true;
    //   }

    //   if (elapsed < 2000) {
    //     // 2초 이후에 애니메이션 종료
    //     previousTimeStamp = timestamp;
    //     if (!done) {
    //       window.requestAnimationFrame(step);
    //     }
    //   }
    // }
  })
}

// 함수 호츌
gnb.gnbOpen() // 카테고리 gnb
// aniFrame.slideDown() // 애니메이션 슬라이드



const body = document.querySelector('body');

// 헤더 검색버튼 접기 펼침 기능
const serchBtn = document.querySelector('header .gnb-wrap .btn-search');
const searchCloseBtn = document.querySelector('header .gnb-wrap .btn-search-close');

serchBtn.addEventListener('click', ()=>{
  if(body.classList.contains('src-open') === false){
    body.classList.add('src-open');
  }else{
    body.classList.remove('src-open');
  }
})

searchCloseBtn.addEventListener('click', ()=>{
  if(body.classList.contains('src-open') === false){
    body.classList.add('src-open');
  }else{
    body.classList.remove('src-open');
  }
})

// 검색어 입력
const searchInput = document.querySelector('#search-ipt');
const clearBtn = document.querySelector('#search-btn-del');

searchInput.addEventListener('input', (e) => {
    if (e.target.value !== '') {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
});

// 헤더 전체메뉴 접기 펼침 기능
const allMenuBtn = document.querySelector('header .gnb-wrap .btn-all-menu');
const allColseBtn = document.querySelector('.sitemap-body .btn-all-close');

allMenuBtn.addEventListener("click", () => {
  if(body.classList.contains('all-menu') === false){
   body.classList.add('all-menu');   
  }else{
      body.classList.remove('all-menu');
  }
});

allColseBtn.addEventListener("click", () => {
  if(body.classList.contains('all-menu') === false){
   body.classList.add('all-menu')   
  }else{
      body.classList.remove('all-menu')
  }
});

// ========= 스크롤 네비 =========
const scrollNaviList = document.querySelector('.scroll-navi .menu-list')
const scrollNavis = scrollNaviList.querySelectorAll('li')
const section = document.querySelectorAll('main > .section')


for(let scrollNavi of scrollNavis){
  scrollNavi.addEventListener('click', (e) => {
    e.preventDefault();
     // 클릭이벤트 앵커이동
     let targetId = scrollNavi.querySelector('a').getAttribute('href');
     // console.log(targetId);
     let targetSection = document.querySelector(targetId);
     let targetOST = targetSection.offsetTop;
     // console.log(targetOST);
     window.scrollTo({left:0, top:targetOST, behavior:'smooth'});

    //  on클래스 / blind클래스 추가 제거
    // console.log(scrollNavi.classList.contains('on'));
    if(!scrollNavi.classList.contains('on')){
      // console.log(scrollNavi.closest('.menu-list').querySelectorAll('li.on').length > 0);
      if(scrollNaviList.querySelectorAll('li.on').length > 0){
        scrollNaviList.querySelectorAll('li.on')[0].classList.remove('on');
        scrollNavi.querySelector('span').classList.add('blind');
      }
      scrollNavi.classList.add('on');
      scrollNavis.forEach((item) =>{
         item.querySelector('a > span').classList.add('blind')
      }) // 선택한 영역 외 blind 추가
      if(scrollNavi.querySelector('.blind') != null){
        scrollNavi.querySelector('.blind').classList.remove('blind');
      }
    }
  });
}

// window.addEventListener('scroll',()=>{
//   section.forEach((item,idx)=>{
//     if(item.offsetTop <= window.scrollY){
//       for(let navis of scrollNavis){
//         navis.classList.remove('on');
//       }
//       navis[idx].classList.add('on');
//     }
//   })
// });

// 푸터 패밀리 사이트
const siteGroup = document.querySelector('.site-group');
siteGroup.addEventListener('click',() => {
  if(!siteGroup.classList.contains('on')){
    siteGroup.classList.add('on');
  }else{
    siteGroup.classList.remove('on');
  }
})

// 퀵버튼 위치조정
window.addEventListener('scroll', () => {
  let footerOffset = document.querySelector('footer').offsetTop;
  let quick = document.querySelector('.quick');
  if (window.scrollY + window.innerHeight > footerOffset) {
      quick.style.position = 'absolute';
      quick.style.bottom = '364px';
  } else {
      quick.style.position = '';
      quick.style.bottom = ''; // 원래 위치로 복원
  }
});

// ====== 퀵버튼 ======
// 플러스 버튼
const quick = document.querySelector('.quick')
const btnPlus = document.querySelector('.btn-plus');
const plusList = document.querySelector('.plus-list');
const changeTxt = document.querySelector('.quick .change-txt');

btnPlus.addEventListener('click', (e) => {
  console.log(document.querySelector('.plus-list').scrollHeight);
  if(quick.classList.contains('pl-active')){
    plusList.style.height = '';
    plusList.closest('.quick').classList.remove('pl-active');
    changeTxt.innerHTML = '펼치기';
  }else{
    plusList.style.height = `${plusList.scrollHeight}px`;
    plusList.closest('.quick').classList.add('pl-active');
    changeTxt.innerHTML = '접기';
  }
});

// 탑버튼
const btnTop = document.querySelector('.quick .btn-top');
window.addEventListener('scroll', ()=>{
  let scrollAmt = window.scrollY;
  console.log(scrollY);

  if(scrollAmt>400){
    btnTop.classList.add('active');
  }else{
    btnTop.classList.remove('active');
  }
});

function backToTop() {
  const position = document.documentElement.scrollTop || document.body.scrollTop;
  if (position) {
    window.requestAnimationFrame(() => {
      window.scrollTo(0, position - position / 10);
      backToTop();
    });
  }
}

btnTop.addEventListener('click', () => {
  backToTop();
})

// btnTop.addEventListener('click', (e)=>{
//   window.scrollTo({left:0, top:0, behavior:'smooth'});
// });

// 메인배너슬라이드
const slideWrapper = document.querySelector('.slide-wrapper.main-bnr');
const title = slideWrapper.querySelector('.card-info');
const slideContainer = slideWrapper.querySelector('.slide-list');
const slides = slideContainer.querySelectorAll('li');
const cardInfo = document.querySelectorAll('.main-con .info');
let currentIdx = 0;
const slideCount = slides.length;
const slideWidth = 310;
const slideMargin = 30;
const slideToShow = 3;
const prevBtn = slideWrapper.querySelector('.prev-btn');
const nextBtn = slideWrapper.querySelector('.next-btn');

//슬라이드 배치, slideContainer의 너비를 지정
slideContainer.style.width = slideWidth*slideCount + slideMargin*(slideCount-1)+'px';

//이동함수
/*
moveSlide함수는 매개변수 idx가 들어오면 할일
  idx숫자를 활용해서 slideContainer의 translateX값을 변경한다.
  .slideContainer {
    width: 100px;
    transform:translate(-230px);
  }
  slideContainer.style.width = 100px;
*/
function moveSlide(idx){
  slideContainer.style.transform = `translateX(${-idx*(slideWidth + slideMargin)}px)`;
  currentIdx = idx;
  console.log(currentIdx);
  for(let slide of slides){
    slide.classList.remove('active');
  }
  slides[idx+1].classList.add('active');
  let content = cardInfo[idx+1].innerHTML;
  title.innerHTML= content;
}
//다음 버튼으로 이동하기
nextBtn.addEventListener('click',()=>{
  console.log('확인', currentIdx, slideCount, slideToShow)
  if(currentIdx == (slideCount - slideToShow)){ 
    moveSlide(0);
  }else{
    moveSlide(currentIdx+1);
  }
});
//이전 버튼으로 이동하기
prevBtn.addEventListener('click',()=>{
  if(currentIdx == 0){ 
    moveSlide(slideCount - slideToShow);
  }else{
    moveSlide(currentIdx-1);
  }
});