const $ = (selector, doc = document) => doc.querySelector(selector);
const $$ = (selector, doc = document) => doc.querySelectorAll(selector);
const BASE_URL = "https://643a58bdbd3623f1b9b164ba.mockapi.io/customor/";

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
                            class="group/product_overlay absolute flex flex-col justify-center z-50 inset-0 p-6 space-y-2 bg-black bg-opacity-70 group-hover:opacity-100 opacity-0 transition duration-300"
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
                                class="w-full btn btn-blue transition duration-500 translate-y-full opacity-0 group-hover/product_overlay:translate-y-0 group-hover/product_overlay:opacity-100"
                            >
                                Giỏ hàng
                            </button>
                        </div>
                    </div>`;
    });
    productListEl.innerHTML = string;
}

function init() {
    //danh sách
    readItem(null, "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/")
        .then((result) => {
            renderProduct(result.data);
        })
        .catch((err) => {});

    // giỏ hàng
    readItem()
        .then((result) => {
            let quantity = result.data.length;
            if (quantity > 0) addCount(quantity);
            cart.arrCart = result.data;
            cart.render(cart.arrCart);
        })
        .catch((err) => {});
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

function addCount(count) {
    $(".cart_count ").classList.remove("hidden");
    $(".cart_count ").classList.add("bum");
    $(".cart_count ").innerText = count;
    setTimeout(() => {
        $(".cart_count ").classList.remove("bum");
    }, 300);
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
