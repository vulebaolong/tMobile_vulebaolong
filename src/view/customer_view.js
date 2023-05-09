import customer from "../control/customer_control.js";
import control from "../control/main_control.js";

customer.init();

//Click vào ​‌‍‌⁡⁢⁣⁢𝗶𝗰𝗼𝗻⁡​ ⁡⁢⁣⁢​‌‍‌giỏ hàng​⁡
control.$("#cart").addEventListener("click", function () {
    control.openComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});
// Click vào nút ⁡⁢⁣⁢​‌‍‌𝗫​⁡ khi giỏ hàng đang mở
control.$("#close-cart").addEventListener("click", function () {
    control.closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});
// Click ⁡⁢⁣⁢​‌‍‌𝗕𝗔𝗖𝗞𝗗𝗥𝗢𝗣​⁡ của giỏ hàng
control.$(".cart-backdrop").addEventListener("click", function (e) {
    e.stopPropagation();
    control.closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

//Click vào ⁡⁢⁣⁢​‌‍‌𝗠𝗘𝗡𝗨​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M_btn_show-nav").addEventListener("click", function () {
    control.openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào ⁡⁢⁣⁢​‌‍‌𝗖𝗟𝗢𝗦𝗘​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M_btn_close-nav").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào ⁡⁢⁣⁢​‌‍‌𝗕𝗔𝗖𝗞𝗗𝗥𝗢𝗣​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M-nav_backdrop").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});

// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢dekstop⁡
control.$("#theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});
// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢mobile⁡
control.$("#M_theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});

// Click ​‌‍‌⁡⁢⁣⁢𝗖𝗔𝗥𝗧-𝗟𝗜𝗦𝗧⁡​
control.$(".cart_list").addEventListener("click", function name(e) {
    e.stopPropagation;
    const el = e.target;
    const parentEl = el.closest(".cart_item");
    const id = parentEl.dataset.id;
    const upQuantityEl = el.closest(".up_quantity");
    const downQuantityEl = el.closest(".down_quantity");
    const cartItemDelete = el.closest(".cart_item-delete");
    // Click ​‌‍‌⁡⁢⁣⁢𝗨𝗣⁡​ quantity
    if (upQuantityEl) {
        customer.upQuantity(+upQuantityEl.dataset.id);
    }
    // Click ​‌‍‌⁡⁢⁣⁢𝗗𝗢𝗪𝗡⁡​ quantity
    if (downQuantityEl) {
        customer.downQuantity(+downQuantityEl.dataset.id);
    }
    // Click ​‌‍‌⁡⁢⁣⁢𝗥𝗘𝗠𝗢𝗩𝗘⁡​
    if (cartItemDelete) {
        customer.removeItem(id);
    }
});

//click ​‌‍‌⁡⁢⁣⁢𝗴𝗶ỏ 𝗵à𝗻𝗴⁡​ trên item product
control.$(".product_list ").addEventListener("click", (e) => {
    e.stopPropagation;
    const el = e.target;
    const cartItemBtn = el.closest(".cart_item_btn");
    if (cartItemBtn) {
        const id = cartItemBtn.dataset.id;
        customer.addItem(id);
    }
});

// Click ​‌‍‌⁡⁢⁣⁢𝘁𝗵𝗮𝗻𝗵 𝘁𝗼á𝗻⁡​
control.$(".cart_order").addEventListener("click", async function () {
    customer.removeAll();
});

// Click ​‌‍‌⁡⁢⁣⁢𝘁𝗶ế𝗽 𝘁ụ𝗰 𝗺𝘂𝗮 𝘀ắ𝗺⁡​
control.$(".continue_shopping").addEventListener("click", function () {
    control.closeComponent(".cart-section", ".cart-slide", ".cart-backdrop");
});

// Click ​‌‍‌⁡⁢⁣⁢𝗹ọ𝗰⁡​
control.$("#filter_seclect").addEventListener("change", function (e) {
    const value = e.target.value;
    const arr = customer.filterTypeProduct(value);
    if (arr.length === 0) {
        const productListEl = control.$(".product_list");
        const string = `<div class="inset-0 absolute flex items-center justify-center gap-4 py-10">
                            <i class="text-5xl fa-regular fa-face-sad-tear"></i>
                            <span>Không tìm thấy sản phẩm thuộc hãng: "<span class="text-red-600 font-semibold">${value}</span>"</span>
                        </div>`;
        productListEl.innerHTML = string;
        return;
    }
    customer.renderList(arr);
});
