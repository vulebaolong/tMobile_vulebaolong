const cart = {
    arrCart: [],
    upQuantity: function (id) {
        const index = this.arrCart.findIndex(function (item) {
            return +item.id === id;
        });
        this.arrCart[index].quantity++;
        this.render(this.arrCart);
        this.updateArrCart(this.arrCart[index]);
    },
    downQuantity: function (id) {
        console.log(id);
        const index = this.finIndexCart(id);
        console.log(this.arrCart[index]);
        this.arrCart[index].quantity--;
        this.render(this.arrCart);
        if (this.arrCart[index].quantity === 0) {
            this.removeItem(id);
        } else {
            this.updateArrCart(this.arrCart[index]);
        }
    },
    addItem: function (id) {
        const productItemEl = $(`[data-id="${id}"]`);
        const name = $(".product_item-name", productItemEl).innerText;
        const price = priceStrToNumber($(".product_item-price", productItemEl).innerText);
        const img = $(".product_item-img", productItemEl).src;
        const type = $(".product_item-type", productItemEl).innerText;
        const quantity = 1;
        const value = {
            name,
            price,
            priceAll: price,
            img,
            type,
            quantity,
        };
        createItem(value)
            .then(() => {
                return readItem();
            })
            .then((result) => {
                this.arrCart = result.data;
                this.render(this.arrCart);
            })
            .catch((err) => {
                console.log("👙  err: ", err);
            });
    },
    removeItem: function (id) {
        const index = this.finIndexCart(id);
        this.arrCart.splice(index, 1);
        deleteItem(id)
            .then(() => {
                return readItem();
            })
            .then((result) => {
                this.arrCart = result.data;
                this.render(this.arrCart);
            });
    },
    render: function (arrData) {
        const cartListEl = $(".cart_list");
        const priceAllEl = $(".price_all");
        let string = "";
        let priceAll = 0;
        arrData.forEach((el) => {
            priceAll += el.priceAll;
            string += `<li class="cart_item flex flex-col gap-4 sm:gap-0 sm:flex-row py-6 sm:px-4" data-id="${
                el.id
            }">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src="${
                                    el.img
                                }" class="h-full w-full object-cover object-center" alt="img product cart"/>
                            </div>
    
                            <div class="sm:ml-4 flex flex-1 flex-col sm:gap-0 gap-3">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3 ><a  href="#">${el.name}</a></h3>
                                        <p class="ml-4">${formatCurrency(el.price)} ₫</p>
                                    </div>
                                    <div>
                                        <span class="inline-block p-1 bg-neutral-200 rounded text-sm">
                                            ${el.type}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                    <div class="flex items-center gap-2 justify-center font-semibold">
                                        <button data-id="${
                                            el.id
                                        }" class="down_quantity btn btn-white"><i class="fa-solid fa-minus"></i></button>
                                        <p>${el.quantity}</p>
                                        <button data-id="${
                                            el.id
                                        }" class="up_quantity btn btn-white"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                    <div class="flex items-center gap-2 justify-center font-semibold">
                                        <button class="cart_item-delete btn btn-blue">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        });
        cartListEl.innerHTML = string;
        priceAllEl.innerHTML = `${formatCurrency(priceAll)} ₫`;
    },
    finIndexCart: function (id) {
        const index = this.arrCart.findIndex(function (item) {
            return +item.id === id;
        });
        return index;
    },
    updateArrCart: function (item) {
        updateItem(item)
            .then(() => {
                return readItem();
            })
            .then((result) => {
                this.arrCart = result.data;
                console.log("👙  updateArrCart arrCart: ", this.arrCart);
            });
    },
};

const settingCart = {
    arrItem: [],
    addCart: function () {
        console.log(this.arrItem);
    },
    upQuantity: function () {
        // 1) tăng số lượng
        this.arrItem.quantity++;

        // 2) kiểm tra nếu số lượng lớn hơn 1 HIỆN btn trừ
        if (this.arrItem.quantity > 1) {
            $(".setting_cart_down-qty").disabled = false;
        }

        // 3) in số lượng ra ngoài giao diện
        $(".setting_cart-qty").innerText = this.arrItem.quantity;

        // 4) tính toán và cập nhật price trong mảng arrItem
        this.arrItem.priceAll = this.calPrice("up");

        // 5) in price mới cập nhật ra giao diện
        $(".setting_cart-price").innerText = `${formatCurrency(this.arrItem.priceAll)} ₫`;
    },
    downQuantity: function () {
        // 1) giảm số lượng
        this.arrItem.quantity--;

        // 2) kiểm tra nếu số lượng lớn bằng 1 ẨN btn trừ
        if (this.arrItem.quantity === 1) {
            $(".setting_cart_down-qty").disabled = true;
        }

        // 3) in số lượng ra ngoài giao diện
        $(".setting_cart-qty").innerText = this.arrItem.quantity;

        // 4) tính toán và cập nhật price trong mảng arrItem
        this.arrItem.priceAll = this.calPrice("down");

        // 5) in price mới cập nhật ra giao diện
        $(".setting_cart-price").innerText = `${formatCurrency(this.arrItem.priceAll)} ₫`;
    },
    getItem: function (id) {
        const productItemEl = $(`[data-id="${id}"]`);
        const name = $(".product_item-name", productItemEl).innerText;
        const price = priceStrToNumber($(".product_item-price", productItemEl).innerText);
        const img = $(".product_item-img", productItemEl).src;
        const type = $(".product_item-type", productItemEl).innerText;
        const quantity = 1;
        this.arrItem = {
            id,
            name,
            price,
            priceAll: price,
            img,
            type,
            quantity,
        };
    },
    render: function () {
        const settingCartInfo = $(".setting_cart-info");
        let string = `<div class="setting_cart-item pt-6" data-id="${this.arrItem.id}">
                        <div class="flex">
                            <!-- IMG-->
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src="${
                                    this.arrItem.img
                                }" class="h-full w-full object-cover object-center" alt="img product cart"/>
                            </div>
    
                            <!-- TEXT-->
                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3><a href="#">${this.arrItem.name}</a></h3>
                                        <p class="setting_cart-price-fix ml-4">${formatCurrency(
                                            this.arrItem.price
                                        )} ₫</p>
                                    </div>
                                    <div>
                                        <span class="inline-block p-1 bg-neutral-200 rounded text-sm">
                                            ${this.arrItem.type}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>`;
        settingCartInfo.innerHTML = string;
    },
    calPrice: function (flag) {
        const priceAll = this.arrItem.priceAll;
        const priceFix = this.arrItem.price;
        if (flag === "up") {
            // Lấy giá tổng cộng, cộng giá fix
            const result = priceAll + priceFix;
            return result;
        }
        if (flag === "down") {
            // Lấy giá tổng cộng, trừ giá fix
            const result = priceAll - priceFix;
            return result;
        }
    },
};
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
//Click vào menu khi ở mobile
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
    // Click up quantity
    if (upQuantityEl) {
        cart.upQuantity(+upQuantityEl.dataset.id);
    }
    // Click up quantity
    if (downQuantityEl) {
        cart.downQuantity(+downQuantityEl.dataset.id);
    }

    // Click remove
    if (cartItemDelete) {
        console.log(id);
        cart.removeItem(id);
    }
});

//click addSettingCart
addCart;
function addCart(id) {
    cart.addItem(id);

    // settingCart.getItem(id);
    // settingCart.render();
    // $(".setting_cart_down-qty").disabled = true;
    // $(".setting_cart-qty").innerText = 1;
    // $(".setting_cart-price").innerText = `${formatCurrency(settingCart.arrItem.price)} ₫`;
    // openComponent(
    //     ".setting_cart-section",
    //     ".setting_cart-slide",
    //     ".setting_cart-backdrop",
    //     "translate-y-full"
    // );
}
//click tắt setting cart
$("#seting_close-cart").addEventListener("click", function () {
    closeComponent(
        ".setting_cart-section",
        ".setting_cart-slide",
        ".setting_cart-backdrop",
        "translate-y-full"
    );
});

// SETTING CART
$(".setting_cart_down-qty").addEventListener("click", function (e) {
    settingCart.downQuantity();
});

$(".setting_cart_up-qty").addEventListener("click", function (e) {
    settingCart.upQuantity();
});

// //Click thêm vào giỏ hàng
// $(".add_cart").addEventListener("click", function () {
//     settingCart.addCart();
//     // closeComponent(
//     //     ".setting_cart-section",
//     //     ".setting_cart-slide",
//     //     ".setting_cart-backdrop",
//     //     "translate-y-full"
//     // );
// });
