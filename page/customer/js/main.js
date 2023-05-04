init();

//Click vào giỏ hàng
$("#cart").addEventListener("click", function () {
    openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

// Click vào nút X khi giỏ hàng đang mở
$("#close-cart").addEventListener("click", function () {
    closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

//Click vào menu khi ở mobile
$("#M_btn_show-nav").addEventListener("click", function () {
    openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào close khi ở mobile
$("#M_btn_close-nav").addEventListener("click", function () {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});

// Click vào thay đổi theme ở dekstop
$("#theme-toggle").addEventListener("click", function () {
    console.log(123);
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});
// Click vào thay đổi theme ở mobile
$("#M_theme-toggle").addEventListener("click", function () {
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});

// Click CART-LIST
$(".cart_list").addEventListener("click", function name(e) {
    e.stopPropagation;
    const el = e.target;
    const parentEl = el.closest(".cart_item");
    const id = parentEl.dataset.id;
    const upQuantityEl = el.closest(".up_quantity");
    const downQuantityEl = el.closest(".down_quantity");
    const cartItemDelete = el.closest(".cart_item-delete");
    // Click UP quantity
    if (upQuantityEl) {
        cart.upQuantity(+upQuantityEl.dataset.id);
    }
    // Click DOWN quantity
    if (downQuantityEl) {
        cart.downQuantity(+downQuantityEl.dataset.id);
    }
    // Click REMOVE
    if (cartItemDelete) {
        cart.removeItem(id);
    }
});

//click giỏ hàng trên item product
function addCart(id) {
    cart.addItem(id);
}

// Click order
$(".cart_order").addEventListener("click", function () {
    console.log(123);
});

// Click continue_shopping
$(".continue_shopping").addEventListener("click", function () {
    closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

// Click filter_btn
$(".filter_btn").addEventListener("click", function () {
    console.log(123);
    // filter_list
    $(".filter_list").classList.toggle("filter_from");
    $(".filter_list").classList.toggle("filter_to");
});
