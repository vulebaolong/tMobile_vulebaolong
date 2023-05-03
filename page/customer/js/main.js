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
        const price = this.priceStrToNumber(
            $(".product_item-price", productItemEl).innerText
        );
        const img = $(".product_item-img", productItemEl).src;
        const type = $(".product_item-type", productItemEl).innerText;
        const quantity = 1;
        const value = {
            name,
            price,
            img,
            type,
            quantity,
        };
        createItem(value)
            .then((result) => {
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
    priceStrToNumber: function (str) {
        return +str.slice(0, -1).trim().replaceAll(".", "");
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
        let string = "";
        arrData.forEach((el) => {
            string += `<li class="cart_item flex py-6" data-id="${el.id}">
                            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img src="${
                                    el.img
                                }" class="h-full w-full object-cover object-center" alt="img product cart"/>
                            </div>
    
                            <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <h3><a href="#">${el.name}</a></h3>
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

//click add cart
const addCart = debounce((id) => {
    cart.addItem(id);
}, 300);
