const menu = document.querySelector('.menu');
const navOpen = document.querySelector('.hamburger')
const navClose = document.querySelector('.close')
const navBar = document.querySelector('.nav')

const navLeft =menu.getBoundingClientRect().left;


navOpen.addEventListener("click", () => {
    if(navLeft < 0) {
        menu.classList.add("show");
        document.body.classList.add('show');
        navBar.classList.add('show');
    }
});


navClose.addEventListener("click", () => {
    if(navLeft < 0) {
        menu.classList.remove("show");
        document.body.classList.remove('show');
        navBar.classList.remove('show');
    }
});

// --------------------------------- Advitsement slider 1
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


