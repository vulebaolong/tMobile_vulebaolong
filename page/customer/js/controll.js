const $ = (selector, doc = document) => doc.querySelector(selector);
const $$ = (selector, doc = document) => doc.querySelectorAll(selector);
const BASE_URL = "https://643a58bdbd3623f1b9b164ba.mockapi.io/customor/";

const cart = {
    arrCart: [],
    upQuantity: async function (id) {
        try {
            // 1) tìm index trong mảng arrCart
            const index = this.finIndexCart(id);

            // 2) tăng quantity
            this.arrCart[index].quantity++;

            // 3) tăng price
            this.arrCart[index].priceAll = this.calPrice("up", this.arrCart[index]);

            // 4) update dữ liệu
            this.toggleLoading("on");
            await updateItem(this.arrCart[index]);

            // 5) read dữ liệu
            const result = await readItem();
            this.arrCart = result.data;

            // 6) render dữ liệu
            this.render(this.arrCart);
            this.toggleLoading("off");
        } catch (error) {
            console.log(error);
        }
    },
    downQuantity: async function (id) {
        try {
            // 1) tìm index trong mảng arrCart
            const index = this.finIndexCart(id);

            // 2) giảm quantity
            this.arrCart[index].quantity--;

            // 3) giảm price
            this.arrCart[index].priceAll = this.calPrice("down", this.arrCart[index]);

            // 4) update dữ liệu
            this.toggleLoading("on");
            if (this.arrCart[index].quantity === 0) {
                await deleteItem(this.arrCart[index].id);
            }
            if (this.arrCart[index].quantity > 0) {
                await updateItem(this.arrCart[index]);
            }

            // 5) read dữ liệu
            const result = await readItem();
            this.arrCart = result.data;

            // 6) render dữ liệu
            this.render(this.arrCart);
            this.toggleLoading("off");
        } catch (error) {
            console.log(error);
        }
    },
    addItem: async function (id) {
        try {
            const productItemEl = $(`[data-id="${id}"]`);
            const btn = productItemEl.querySelector("button");
            if (btn.disabled) return;
            const name = $(".product_item-name", productItemEl).innerText;
            const price = priceStrToNumber(
                $(".product_item-price", productItemEl).innerText
            );
            const img = $(".product_item-img", productItemEl).src;
            const type = $(".product_item-type", productItemEl).innerText;
            const quantity = 1;
            const value = {
                id,
                name,
                price,
                priceAll: price,
                img,
                type,
                quantity,
            };
            const index = this.finNameCart(name);

            // Nếu trùng nhau
            if (index !== -1) {
                // cộng quantity trong mảng arrCart
                this.arrCart[index].quantity++;
                // tính giá priceAll trong mảng arrCart
                this.arrCart[index].priceAll =
                    this.arrCart[index].price * this.arrCart[index].quantity;

                //spin
                this.toggleSpinBtn("on", btn);

                // fetch API update
                await updateItem(this.arrCart[index]);
                // fetch API read
                const resultRead = await readItem();
                // cập nhật lại mảng arrCart
                this.arrCart = resultRead.data;
                // render
                this.render(this.arrCart);
                //spin
                this.toggleSpinBtn("off", btn);
                return;
            }

            this.toggleSpinBtn("on", btn);
            await createItem(value);
            const resultRead = await readItem();
            this.arrCart = resultRead.data;
            this.render(this.arrCart);
            this.toggleSpinBtn("off", btn);
        } catch (error) {
            console.log(error);
        }
    },
    removeItem: async function (id) {
        // 1) tìm index trong mảng arrCart
        const index = this.finIndexCart(+id);

        // 2) delete item trên server
        this.toggleLoading("on");
        await deleteItem(this.arrCart[index].id);

        // 5) read dữ liệu
        const result = await readItem();
        this.arrCart = result.data;

        // 6) render dữ liệu
        this.render(this.arrCart);
        this.toggleLoading("off");
    },
    render: function (arrData) {
        const cartListEl = $(".cart_list");
        const priceAllEl = $(".price_all");
        let string = "";
        let priceAll = 0;
        arrData.forEach((el) => {
            priceAll += el.priceAll;
            string += `<li class="cart_item flex flex-col gap-4 sm:flex-row sm:justify-between  sm:gap-0  py-6 w-full" data-id="${
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
                                <div class="flex flex-1 items-end justify-between text-sm gap-4">
                                    <div class="flex items-center gap-2 justify-center font-semibold">
                                        <button data-id="${
                                            el.id
                                        }" class="down_quantity btn btn-white "><i class="w-5 fa-solid fa-minus"></i></button>
                                        <p class="cart_quantity-${el.id}">${
                el.quantity
            }</p>
                                        <button data-id="${
                                            el.id
                                        }" class="up_quantity btn btn-white"><i class="w-5 fa-solid fa-plus"></i></button>
                                    </div>
                                    <div class="flex items-center gap-2 justify-center font-semibold">
                                        <button class="cart_item-delete btn btn-blue">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </li>`;
        });
        cartListEl.innerHTML = string;
        priceAllEl.innerHTML = `${formatCurrency(priceAll)} ₫`;
        $(".cart_count ").innerText = arrData.length;
        $(".cart_count ").classList.remove("hidden");
        $(".cart_count ").classList.add("bum");
        setTimeout(() => {
            $(".cart_count ").classList.remove("bum");
        }, 300);
    },
    finIndexCart: function (id) {
        const index = this.arrCart.findIndex(function (item) {
            return +item.id === id;
        });
        return index;
    },
    finNameCart: function (name) {
        const index = this.arrCart.findIndex(function (item) {
            return item.name === name;
        });
        return index;
    },
    toggleSpinBtn: function (flag, el, color = "text-white") {
        const spin = `<svg
                            class="animate-spin h-5 w-5 ${color}"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>`;
        if (flag === "on") {
            el.disabled = true;
            el.insertAdjacentHTML("afterbegin", spin);
            el.querySelector("i")?.classList.add("hidden");
        }
        if (flag === "off") {
            el.disabled = false;
            console.log(el.querySelector("svg"));
            el.querySelector("svg").remove();
            el.querySelector("i")?.classList.remove("hidden");
        }
    },
    toggleLoading: function (flag) {
        if (flag === "on") {
            $(".cart_loading").classList.remove("hidden");
        }
        if (flag === "off") {
            $(".cart_loading").classList.add("hidden");
        }
    },
    calPrice: function (flag, item) {
        const priceAll = item.priceAll;
        const priceFix = item.price;
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

function createItem(value) {
    return axios.post(BASE_URL, value);
}

function readItem(id = null, url = BASE_URL) {
    if (id !== null) {
        url += id;
    }
    return axios.get(url);
}

function updateItem(item) {
    return axios.put(BASE_URL + item.id, item);
}

function deleteItem(id) {
    return axios.delete(BASE_URL + id);
}

function renderProduct(arrData) {
    const productListEl = $(".product_list");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `<div class="product_item group" data-id="${el.id}">
                         <!-- PRODUCT ITEM TITLE -->
                        <div class="transition duration-300 group-hover:opacity-40">
                            <!-- IMAGE -->
                            <div
                                class="min-h-80 bg-white aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-44 xl:h-64"
                            >
                                <img
                                    src="${el.img}"
                                    alt="img"
                                    class="product_item-img h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <!-- TITLE -->
                            <div class="mt-4 space-y-2">
                                <p
                                    class="product_item-name text-base font-bold text-gray-900 truncate text-center"
                                >
                                    ${el.name}
                                </p>
                                <p
                                    class="product_item-price text-sm font-medium text-gray-700 text-center truncate"
                                >
                                    ${formatCurrency(el.price)} ₫
                                </p>
                                <div>
                                    <span class="product_item-type inline-block mt-4 p-1 bg-neutral-200 rounded text-sm">
                                        ${el.type}
                                    </span>
                                </div>
                                <div class="">
                                    <span
                                        class="text-sm font-bold text-gray-900 truncate text-center"
                                    >
                                        Mô tả:
                                    </span>
                                    <span class="mt-1 w-full text-sm text-gray-500">
                                    ${el.desc}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <!-- OVERLAY -->
                        <div
                            class="group/product_overlay absolute flex flex-col justify-center z-10 inset-0 p-6 space-y-2 bg-black bg-opacity-70 group-hover:opacity-100 opacity-0 transition duration-300"
                        >
                            <div
                                class="mb-5 transition duration-500 -translate-y-full opacity-0 group-hover/product_overlay:translate-y-0 group-hover/product_overlay:opacity-100"
                            >
                                <div class="">
                                    <span
                                        class="text-sm font-bold text-white truncate text-center"
                                    >
                                        Screen:
                                    </span>
                                    <span class="mt-1 w-full text-sm text-white">
                                    ${el.screen}
                                    </span>
                                </div>
                                <div class="">
                                    <span
                                        class="text-sm font-bold text-white truncate text-center"
                                    >
                                        Camera sau:
                                    </span>
                                    <span class="mt-1 w-full text-sm text-white">
                                    ${el.backCamera}
                                    </span>
                                </div>
                                <div class="">
                                    <span
                                        class="text-sm font-bold text-white truncate text-center"
                                    >
                                        Camera trước:
                                    </span>
                                    <span class="mt-1 w-full text-sm text-white">
                                    ${el.frontCamera}
                                    </span>
                                </div>
                            </div>
                            <button
                               onclick="addCart(${el.id})"
                                class="flex items-center justify-center gap-4 disabled:cursor-not-allowed !text-base w-full btn btn-blue transition duration-500 translate-y-full opacity-0 group-hover/product_overlay:translate-y-0 group-hover/product_overlay:opacity-100"
                            >
                                Giỏ hàng
                            </button>
                        </div>
                    </div>`;
    });
    productListEl.innerHTML = string;
}

function loadding(flag) {
    if (flag === "on") {
        $(".body_loading").classList.remove("hidden");
    }
    if (flag === "off") {
        $(".body_loading").classList.add("hidden");
    }
}

async function init() {
    try {
        loadding("on");
        const resultReadProduct = await readItem(
            null,
            "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/"
        );
        renderProduct(resultReadProduct.data);
        const resultReadCart = await readItem();
        cart.arrCart = resultReadCart.data;
        cart.render(cart.arrCart);
        loadding("off");
    } catch (error) {
        console.log(error);
    }
}

function openComponent(elSection, elContent, elBackdrop, trans = "translate-x-full") {
    $(elSection).classList.toggle("hidden");

    setTimeout(() => {
        $(elBackdrop).classList.toggle("opacity-0");
        $(elContent).classList.toggle(trans);
    }, 0);
}

function closeComponent(elSection, elContent, elBackdrop, trans = "translate-x-full") {
    $(elBackdrop).classList.toggle("opacity-0");
    $(elContent).classList.toggle(trans);
    setTimeout(() => {
        $(elSection).classList.toggle("hidden");
    }, 400);
}

function debounce(fn, ms) {
    let timer;

    return function () {
        // Nhận các đối số
        const args = arguments;
        const context = this;

        if (timer) clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args);
        }, ms);
    };
}

function formatCurrency(num, locale = navigator.language) {
    return new Intl.NumberFormat(locale).format(num);
}

function priceStrToNumber(str) {
    return +str.slice(0, -1).trim().replaceAll(".", "");
}

function wait(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds);
    });
}
