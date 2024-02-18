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

// 스크롤 네비
const scrollNaviList = document.querySelector('.scroll-navi .menu-list')
const scrollNavis = scrollNaviList.querySelectorAll('li')

for(let scrollNavi of scrollNavis){
  scrollNavi.addEventListener('click', () => {
    // console.log(scrollNavi.classList.contains('on'));
    if(scrollNavi.classList.contains('on') === false){
      // console.log(scrollNavi.closest('.menu-list').querySelectorAll('li.on').length > 0);
      if(scrollNaviList.querySelectorAll('li.on').length > 0){
        scrollNaviList.querySelectorAll('li.on')[0].classList.remove('on');
      }
      scrollNavi.classList.add('on');
      scrollNavi.querySelector('.blind').classList.remove('blind');
      console.log(scrollNavi.querySelector('span'));
    }
  });
}