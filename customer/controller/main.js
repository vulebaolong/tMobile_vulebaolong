const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

//click savechange
$("#opencart").addEventListener("click", function (params) {
    $(".cart-section").classList.toggle("hidden");

    setTimeout(() => {
        $(".cart-backdrop").classList.toggle("opacity-0");
        $(".cart-slide").classList.toggle("translate-x-full");
    }, 0);
});

$("#close-cart").addEventListener("click", function (params) {
    $(".cart-backdrop").classList.toggle("opacity-0");
    $(".cart-slide").classList.toggle("translate-x-full");
    setTimeout(() => {
        $(".cart-section").classList.toggle("hidden");
    }, 500);
});
