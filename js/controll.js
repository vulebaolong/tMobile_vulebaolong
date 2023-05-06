const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function openComponent(elSection, elContent, elBackdrop) {
  $(elSection).classList.toggle("hidden");

  setTimeout(() => {
    $(elBackdrop).classList.toggle("opacity-0");
    $(elContent).classList.toggle("translate-x-full");
  }, 0);
}

function closeComponent(elSection, elContent, elBackdrop) {
  $(elBackdrop).classList.toggle("opacity-0");
  $(elContent).classList.toggle("translate-x-full");
  setTimeout(() => {
    $(elSection).classList.toggle("hidden");
  }, 400);
}
