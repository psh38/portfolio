// 헤더 전체메뉴 접기 펼침 기능
document.querySelector('.btn-all-menu').addEventListener("click", (e) => {
  console.log(e, 'all menu')
  if(document.querySelector('body').classList.contains('all-menu') === false){
   document.querySelector('body').classList.add('all-menu')   
  }else{
      document.querySelector('body').classList.remove('all-menu')
  }
});

document.querySelector('.btn-all-close').addEventListener("click", (e) => {
  console.log(e, 'all menu')
  if(document.querySelector('body').classList.contains('all-menu') === false){
   document.querySelector('body').classList.add('all-menu')   
  }else{
      document.querySelector('body').classList.remove('all-menu')
  }
});