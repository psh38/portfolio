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
   body.classList.add('all-menu')   
  }else{
      body.classList.remove('all-menu')
  }
});

allColseBtn.addEventListener("click", () => {
  if(body.classList.contains('all-menu') === false){
   body.classList.add('all-menu')   
  }else{
      body.classList.remove('all-menu')
  }
});