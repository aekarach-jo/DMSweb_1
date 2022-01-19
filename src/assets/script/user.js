function userDesign() {
  window.onclick=function(){
  const hamburger_menu = document.querySelector(".hamburger-menu");
  const toggleClose = document.querySelector(".toggleClose");
  const container = document.querySelector(".container");

  hamburger_menu.addEventListener("click", () => {
    container.classList.toggle("active");
  })
  toggleClose.addEventListener("click", () => {
    container.classList.toggle("active");
  });
}
}

