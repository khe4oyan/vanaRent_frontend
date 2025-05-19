const burgerButton = document.querySelector(".nav_mobile .burgerButton")
burgerButton.addEventListener("click", () => {
  const burgerLink = document.querySelector(".nav_mobile .links");
  burgerLink.classList.toggle("hide");
});
