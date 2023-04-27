init();

//click savechange
$("#opencart").addEventListener("click", function (params) {
    openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

$("#cart").addEventListener("click", function (params) {
    openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

$("#M_cart").addEventListener("click", function (params) {
    openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

$("#close-cart").addEventListener("click", function (params) {
    closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

$("#M_btn_show-nav").addEventListener("click", function (params) {
    openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
$("#M_btn_close-nav").addEventListener("click", function (params) {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});

let count = 0;
//click add cart
const openCart = debounce(() => {
    console.log(123);
}, 300);
