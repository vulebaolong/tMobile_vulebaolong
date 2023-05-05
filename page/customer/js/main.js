init();

//Click vào ​‌‍‌⁡⁢⁣⁢𝗶𝗰𝗼𝗻⁡​ ⁡⁢⁣⁢​‌‍‌giỏ hàng​⁡
$("#cart").addEventListener("click", function () {
    openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

// Click vào nút ⁡⁢⁣⁢​‌‍‌𝗫​⁡ khi giỏ hàng đang mở
$("#close-cart").addEventListener("click", function () {
    closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

//Click vào ⁡⁢⁣⁢​‌‍‌menu​⁡ khi ở ⁡⁣⁣⁢mobile⁡
$("#M_btn_show-nav").addEventListener("click", function () {
    openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào ⁡⁢⁣⁢​‌‍‌‍𝗰𝗹𝗼𝘀𝗲​⁡ khi ở ⁡⁣⁣⁢mobile⁡
$("#M_btn_close-nav").addEventListener("click", function () {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});

// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢dekstop⁡
$("#theme-toggle").addEventListener("click", function () {
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});
// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢mobile⁡
$("#M_theme-toggle").addEventListener("click", function () {
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});

// Click ​‌‍‌⁡⁢⁣⁢𝗖𝗔𝗥𝗧-𝗟𝗜𝗦𝗧⁡​
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

//click ​‌‍‌⁡⁢⁣⁢𝗴𝗶ỏ 𝗵à𝗻𝗴⁡​ trên item product
function addCart(id) {
    cart.addItem(id);
}

// Click ​‌‍‌⁡⁢⁣⁢𝘁𝗵𝗮𝗻𝗵 𝘁𝗼á𝗻⁡​
$(".cart_order").addEventListener("click", async function () {
    cart.removeAll();
});

// Click ​‌‍‌⁡⁢⁣⁢𝘁𝗶ế𝗽 𝘁ụ𝗰 𝗺𝘂𝗮 𝘀ắ𝗺⁡​
$(".continue_shopping").addEventListener("click", function () {
    closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

// Click ​‌‍‌⁡⁢⁣⁢𝗹ọ𝗰⁡​
$(".filter_btn").addEventListener("click", function () {
    // filter_list
    $(".filter_list").classList.toggle("filter_from");
    $(".filter_list").classList.toggle("filter_to");
});
$("#filter_samsung").addEventListener("click", function () {
    filterToggle();
    const arr = product.filterTypeProduct("Samsung");
    product.render(arr);
});
$("#filter_apple").addEventListener("click", function () {
    filterToggle();
    const arr = product.filterTypeProduct("Apple");
    product.render(arr);
});

function filterToggle() {
    $(".filter_list").classList.toggle("filter_from");
    $(".filter_list").classList.toggle("filter_to");
}
