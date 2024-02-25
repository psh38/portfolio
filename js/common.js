// 카테고리 gnb
const gnb = {
  openDelay: null, // gnb open 딜레이(접근성 고려)
  gnbOpen: () => {
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
            aniFrame.slideUpDown(true, e.target.closest('li').querySelector('.sub-area'));
          }, 200);
        }
      });
      el.addEventListener('focus', (e) => {
        if(e.target.closest('li').classList.contains('on') === false){
          if(e.target.closest('.menu-list').querySelector('li.on')){
            e.target.closest('.menu-list').querySelector('li.on').classList.remove('on')
          }
          e.target.closest('li').classList.add('on')
          aniFrame.slideUpDown(true, e.target.closest('li').querySelector('.sub-area'));
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
  },
  gnbClose: () => {
    document.querySelectorAll('header .menu-list > li').forEach((el) => {
      document.querySelector('header').addEventListener('mouseleave', (e) => {
        // console.log(el, 'gnb mouseleave')
        if(el.classList.contains('on')){
          aniFrame.slideUpDown(false, el.querySelector('.sub-area'));
        }
        setTimeout(() => {
          el.classList.remove('on');
        }, 600);
      });
    });
  },
  sticky: () => {
    if(document.querySelectorAll('html')[0].scrollTop > 100){ 
      document.querySelector("header").classList.add("sticky");
    }else{
      document.querySelector("header").classList.remove("sticky");
    };
  }
}

// 공통 - 애니메이션 슬라이드 구현
const aniFrame = {
  slideShow: false, // 열기(true), 닫기(false)
  slideId: null, // 애니메이션 함수 선언
  slideHei: 0, // 높이값
  slideMath: false, // 양수(true), 음수(false)
  slideSpeed: 30, //  속도
  slideMaxHei: 500, // 최대 높이값
  element: null, // 선택자
  slideUpDown: (event, target, speed, maxHei) => { // 슬라이드 열기, 닫기 (params: boolean(초기만 해당 두번째 실행부터는 time으로 리턴), target, speed, max-height)    
    // console.log('slideUpDown', event, target)
    // 초기 slideShow, slideMath 설정
    if(typeof event === "boolean"){
      aniFrame.element = target;


      aniFrame.slideShow = event
      aniFrame.slideMath = event

      aniFrame.slideSpeed = maxHei != undefined ? speed : aniFrame.slideSpeed // 속도 재설정
      aniFrame.slideMaxHei = maxHei != undefined ? maxHei : aniFrame.slideMaxHei // 최대 높이값 재설정
    }
    
    // 애니메이션 열림(+), 닫힘(-) 체크
    if(aniFrame.slideMath === true){
      aniFrame.slideHei += aniFrame.slideSpeed // 양수
    }else{
      aniFrame.slideHei -= aniFrame.slideSpeed // 음수
    }
    // 애니메이션 반복 실행
    cancelAnimationFrame(aniFrame.slideId)
    aniFrame.slideId = requestAnimationFrame(aniFrame.slideUpDown)
    aniFrame.element.style.maxHeight = `${aniFrame.slideHei}px`;
    // console.log('애니메이션 프레임', aniFrame.slideHei)

    // 애니메이션 정지
    if(aniFrame.slideHei >= aniFrame.slideMaxHei && aniFrame.slideShow === true){ // 열림
      cancelAnimationFrame(aniFrame.slideId)
      aniFrame.slideMath = false
      aniFrame.slideId = null
    }else if(aniFrame.slideHei < 0){ // 닫힘
      cancelAnimationFrame(aniFrame.slideId)
      aniFrame.slideShow = false
      aniFrame.slideId = null
      aniFrame.slideHei = 0
    }
  }
}

// 함수 호츌
gnb.gnbOpen() // 카테고리 gnb

const body = document.querySelector('body');

// 상단 부모(body) 클릭시 비노출
// body.addEventListener('click', (e) => {
//   // console.log('확인',e.target);
//   let closeEvent = new CustomEvent('closeEvent');
//   e.target.dispatchEvent(closeEvent);
//   console.log(CustomEvent);
// })
// body.unbind("click").bind("click", function(e){
//   // 헤더 네비게이션
//   if( $(e.target).closest('.crumbs > li').length == 0 ){
//      $(".crumbs > li.on > a").trigger("click");
//   };
  
//   // 상품평/옵션 셀렉트박스
//   if( $(e.target).closest(".prd-opt-info").length == 0 ){
//      if( $(e.target).closest('.custom-slt').length == 0 ){
//         $(".custom-slt.on .prd-sel").trigger("click");
//      };
//   }else{
//      if( $(e.target).closest(".prd-opt-info").find(".tbl-info").length > 0 ){
//         // console.log("상품 품절제외");
//      }else{
//         $(".prd-opt-info .custom-slt.on .prd-sel").trigger("click");
//      };
//   };      

//   // 상품유닛 정렬(필터)
//   if( $(e.target).closest('.sort-area').length == 0 ){
//      $(".sort-area.on > .btn-sort").trigger("click");
//   };
// });

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
let overlapMove = false // scroll-navi, scroll event 중복 방지

// scroll move 관련 모듈
const anchor = {
  naviMove:() => { // scroll-navi 활성화
    for (let idx = 0; idx < section.length; idx++) {
      const contTop = section[idx].getBoundingClientRect().top;
      console.log('탑',contTop);
      const contHei = section[idx].clientHeight;
      console.log('높이',contHei)
      const headHei = parseInt(getComputedStyle(document.querySelector('.gnb-area')).height); // 상단 헤더 높이값
      console.log('head높이',headHei)
      // console.log('스크롤 계산값', document.querySelectorAll('html')[0].scrollTop, section[idx].offsetTop)
      // anchorMove 호출 -> 스크롤 완료 후 (유사 콜백)
      if (section[idx].offsetTop === document.querySelectorAll('html')[0].scrollTop) {
        overlapMove = false
      }
      if (contTop <= headHei && contTop + contHei >= headHei) {
        if (!overlapMove) { // scroll-navi 클릭, scroll event 중복 방지
          // 선택한 영역 외 on 제거
          scrollNavis.forEach(item => {
            item.classList.remove("on"); // :not 으로 사용 가능하다면 사용해도 무방
            item.querySelector('a > span').classList.add('blind');
          })
          scrollNavis[idx].classList.add('on')
          scrollNavis[idx].querySelector('a > span').classList.remove('blind')
        }
      }
    }
  },
  anchorMove:() => { // scroll-navi 클릭 시 앵커이동
    for(let scrollNavi of scrollNavis){
      scrollNavi.addEventListener('click', (e) => {
        e.preventDefault();
        overlapMove = true;
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
          }
          scrollNavi.classList.add('on');
    
          console.log(scrollNavi.querySelector('.blind'));
          scrollNavis.forEach(item => item.querySelector('a > span').classList.add("blind")) // 선택한 영역 외 blind 추가
          if(scrollNavi.querySelector('.blind') != null){
            scrollNavi.querySelector('.blind').classList.remove('blind');
          }
        }
      });
    };
  },
};

anchor.anchorMove() // scroll-navi 클릭 시 앵커이동

// 퀵버튼 위치조정
window.addEventListener('scroll', () => {
  gnb.sticky() // 헤더 스티키
  anchor.naviMove() // 앵커이동

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


// 메인배너슬라이드
const slideWrapper = document.querySelector('.slide-wrapper.main-bnr');
const title = slideWrapper.querySelector('.card-info');
const slideContainer = slideWrapper.querySelector('.slide-list');
const slides = slideContainer.querySelectorAll('li');
const cardInfo = document.querySelectorAll('.main-con .info');
let currentIdx = 2;
const slideCount = slides.length;
const slideWidth = 310;
const slideMargin = 30;
const slideToShow = 3;
const prevBtn = slideWrapper.querySelector('.prev-btn');
const nextBtn = slideWrapper.querySelector('.next-btn');
const indicators =slideWrapper.querySelectorAll('.indicator .bullet');
const delay = 1000; // 딜레이
const slideFirstClone = slides[0]; // li 첫번쩨 객체
const slideFirstClone1 = slides[1]; // li 두번쩨 객체
const slideLastClone = slides[slideCount-1]; // li 마지막 객체
const slideLastClone1 = slides[slideCount-2]; // li 마지막 두번째 객체

// const firstNode = slideFirstClone.cloneNode(true);
slides[0].before(slideLastClone1.cloneNode(true));
slides[0].before(slideLastClone.cloneNode(true));
slides[slideCount-1].after(slideFirstClone1.cloneNode(true));
slides[slideCount-1].after(slideFirstClone.cloneNode(true));

// 로드 시 카드이벤트 정보 추가
let content = document.querySelectorAll('.main-con .info')[currentIdx].innerHTML;
console.log(content)
title.innerHTML= content;

// console.log(slides, '복사 전 slides 슬라이드 객체')
slides[0].classList.add('active')

const aaa = document.querySelectorAll('.slide-list > li').length

//슬라이드 배치, slideContainer의 너비를 지정
slideContainer.style.width = slideWidth*aaa + slideMargin*(aaa-1)+'px';
slideContainer.style.transform = `translateX(${-(currentIdx-1)*(slideWidth + slideMargin)}px)`;

// 이동함수
function moveSlide(idx){ // 다음 버튼
  slideContainer.style.transitionDuration = `600ms`;
  slideContainer.style.transform = `translateX(${-(idx-1)*(slideWidth + slideMargin)}px)`;

  if(idx === 7){
    for(let slide of document.querySelectorAll('.slide-list > li')){
      slide.classList.remove('active');
    }
    document.querySelectorAll('.slide-list > li')[idx].classList.add('active');
    setTimeout(() => {
      currentIdx = 2;
      for(let slide of document.querySelectorAll('.slide-list > li')){
        slide.style.transition = 'none'
        slide.classList.remove('active');
      }
      document.querySelectorAll('.slide-list > li')[currentIdx].classList.add('active');
      slideContainer.style.transitionDuration = `0ms`;
      slideContainer.style.transform = `translateX(${-(currentIdx-1)*(slideWidth + slideMargin)}px)`;

      // 상단 타이틀 데이터
      content = document.querySelectorAll('.main-con .info')[currentIdx].innerHTML;
      title.innerHTML= content;
    }, 600)
  }else if(idx === 1){ // 이전 버튼
    for(let slide of document.querySelectorAll('.slide-list > li')){
      slide.classList.remove('active');
    }
    document.querySelectorAll('.slide-list > li')[idx].classList.add('active');
    setTimeout(() => {
      currentIdx = 6;
      for(let slide of document.querySelectorAll('.slide-list > li')){
        slide.style.transition = 'none'
        slide.classList.remove('active');
      }
      document.querySelectorAll('.slide-list > li')[currentIdx].classList.add('active');
      slideContainer.style.transitionDuration = `0ms`;
      slideContainer.style.transform = `translateX(${-(currentIdx-1)*(slideWidth + slideMargin)}px)`;

      // 상단 타이틀 데이터
      content = document.querySelectorAll('.main-con .info')[currentIdx].innerHTML;
      title.innerHTML= content;
    }, 600)
  }else{
    for(let slide of document.querySelectorAll('.slide-list > li')){
      slide.style.transition = ''
      slide.classList.remove('active');
    }
    currentIdx = idx;
    document.querySelectorAll('.slide-list > li')[currentIdx].classList.add('active');
    // 상단 타이틀 데이터
    content = document.querySelectorAll('.main-con .info')[currentIdx].innerHTML;
    title.innerHTML= content;
    setTimeout(() => {
      slideContainer.style.transitionDuration = `1000ms`;
    }, delay)
  }
}
//다음 버튼으로 이동하기
nextBtn.addEventListener('click',()=>{
  console.log('확인', currentIdx, slideToShow) 
  moveSlide(currentIdx+1);
});
//이전 버튼으로 이동하기
prevBtn.addEventListener('click',()=>{
  moveSlide(currentIdx-1);
});

//이전 버튼으로 이동하기
document.querySelectorAll('.slide-wrapper.main-bnr .indicator > button').forEach((el, idx) => {
  el.addEventListener('click',()=>{
    moveSlide(idx+2);
  });
})


// 팝업
let btnFocus = document.activeElement;
function popupOpen(el){ // 팝업 열기
  // 선택한 팝업 열기 버튼
  btnFocus = document.activeElement;

  const popEl = document.querySelectorAll(el)[0] || document.querySelectorAll('.pop-wrap')[0].getAttribute('id')
console.log(123, popEl)
  document.querySelectorAll('.wrapper')[0].setAttribute("aria-hidden", true);
  document.querySelectorAll('.sitemap-area')[0].setAttribute("aria-hidden", true);
  popEl.style.display = 'block';

  setTimeout(function(){
    document.querySelectorAll('html')[0].classList.add("pop-open");
    popEl.classList.add('open');
  }, 200);
  // document.querySelector('.quick .btn-card').addEventListener('focus',(e)=>{
  //   // 선택한 팝업 열기 버튼
  //   btnFocus = document.activeElement;

  //   const popEl = el || document.querySelectorAll('.pop-wrap')[0].getAttribute('id')

  //   document.querySelectorAll('.wrapper')[0].setAttribute("aria-hidden", true);
  //   document.querySelectorAll('.sitemap-area')[0].setAttribute("aria-hidden", true);
  //   popEl.style.display = 'block';

  //   setTimeout(function(){
  //     document.querySelectorAll('html')[0].classList.add("pop-open");
  //     popEl.classList.add('open');
  //   }, 200);
  // });
}
function popupClose(el){ // 팝업 닫기
  const popEl = document.querySelectorAll(el)[0] || document.querySelectorAll('.pop-wrap')[0].getAttribute('id')

  setTimeout(function(){
    document.querySelectorAll('html')[0].classList.remove("pop-open");
    popEl.style.display = 'none';
  }, 100);

  if(document.querySelectorAll(".pop-wrap.open").length === 0){
    document.querySelectorAll('.wrapper')[0].removeAttribute("aria-hidden", false);
    document.querySelectorAll('.sitemap-area')[0].removeAttribute("aria-hidden", false);
  };

  btnFocus.focus()
}

// 쿠키팝업
const cookiePopup = document.querySelector('.pop-wrap.cookie');
const cookieInput = cookiePopup.querySelector('.today-del-btn input');
const tdColseBtn = cookiePopup.querySelector('.btn-close');

tdColseBtn.addEventListener('click',()=>{
  console.log('체크', cookieInput.checked);
  if(cookieInput.checked){
    //쿠키생성
    setCookie('lotte','lottecard',1);
  }else{
    //쿠키삭제
    delCookie('lotte');
  }
  cookiePopup.classList.add('hide');
});

function setCookie(name,val,day){
  let date = new Date();
  date.setDate(date.getDate()+day);
  document.cookie = `${name}=${val};Expires=${date}`;
}
function delCookie(name){
  let date = new Date();
  date.setDate(date.getDate()-1);
  document.cookie = `${name}='';Expires=${date}`;
}

function checkCookie(name) {
  let cookieArr = document.cookie.split(';');
  let visited = false;

  for (let cookie of cookieArr) {
    if (cookie.indexOf(name) > -1) {
      visited = true;
    }
  }
  if (visited) {
    cookiePopup.classList.add('hide');
  } else {
    cookiePopup.classList.remove('hide');
  }
}
checkCookie('lotte');

// 푸터 패밀리 사이트 (첫번째 이벤트 작동 x)
const siteGroup = document.querySelector('.site-group');
let familyCon = siteGroup.querySelector('.site-list');

siteGroup.addEventListener('click',() => {
  if(!siteGroup.classList.contains('on')){
    siteGroup.classList.add('on');
    familyCon.style.height = familyCon.scrollHeight + "px";
  }else{
    siteGroup.classList.remove('on');
    familyCon.style.height = "0";
  }
})


// 자동검색 (임시 수정해야함)
const searchDeleteButton = document.getElementById("search-btn-del");

// 검색 필드 값이 변경될 때마다 검색 결과 업데이트
searchInput.addEventListener("input", function() {
  const searchText = searchInput.value.trim().toLowerCase();
  const searchResults = document.getElementById("search-results");

  // 입력한 검색어에 대한 결과를 필터링하여 표시
  const filteredResults = data.filter(item => item.toLowerCase().includes(searchText));
  displayResults(filteredResults);
});

// 입력 필드 삭제 버튼 클릭 시 입력 값 삭제
searchDeleteButton.addEventListener("click", function() {
  searchInput.value = "";
  document.getElementById("search-results").innerHTML = "";
});

// 검색 결과를 표시하는 함수
function displayResults(results) {
  const searchResultsContainer = document.getElementById("search-results");
  searchResultsContainer.innerHTML = "";

  results.forEach(function(result) {
    const listItem = document.createElement("li");
    listItem.textContent = result;
    searchResultsContainer.appendChild(listItem);

    // 검색 결과 항목에 클릭 이벤트 리스너 추가
    listItem.addEventListener("click", function() {
      // 클릭된 검색 결과를 검색 입력 필드에 설정
      searchInput.value = result;
      // 검색 결과 목록을 비움
      searchResultsContainer.innerHTML = "";
    });
  });
}

// 정적 데이터 예시
const data = [
  "롯데카드1",
  "롯데카드2",
  "롯데카드3",
  "롯데카드4",
  "롯데카드5",
  "로카머니1",
  "로카머니2",
  "로카",
  "로카로카",
  "로카머니3"
  // 이하 데이터 계속 추가 가능
];