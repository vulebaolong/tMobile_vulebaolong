const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

fetchRead();

function fetchCreate(value) {
    axios({
        url: "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin",
        method: "POST",
        data: value,
    })
        .then((result) => {
            console.log("👙 fetchCreate result: ", result);
            console.log("👙 fetchCreate result: ", result.data);
            return fetchRead();
        })
        .then((resultRead) => {
            console.log(resultRead);
            console.log(value.name);
            notification(`"${value.name}" Thêm sản phẩm thành công`);
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
}

function fetchRead(id = false) {
    return new Promise((resolve, reject) => {
        axios({
            url: `https://643a58bdbd3623f1b9b164ba.mockapi.io/admin${id ? `/${id}` : ""}`,
            method: "GET",
        })
            .then((result) => {
                console.log("👙 fetchRead result: ", result);
                console.log("👙 fetchRead result: ", result.data);
                if (!id) render(result.data);
                resolve(result);
            })
            .catch((err) => {
                console.log("👙  err: ", err);
            });
    });
}

function fetchUpdate(id, value) {
    return new Promise((resolve, reject) => {
        axios({
            url: `https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/${id}`,
            method: "PUT",
            data: value,
        })
            .then((result) => {
                console.log("👙 fetchUpdate  result: ", result);
                console.log("👙 fetchUpdate  result: ", result.data);
                return fetchRead();
            })
            .then(() => {
                notification("Cập nhật sản phẩm thành công");
                resolve();
            })
            .catch((err) => {
                console.log("👙 fetchUpdate err: ", err);
            });
    });
}

function fetchDelete(id, mes) {
    axios({
        url: `https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/${id}`,
        method: "DELETE",
    })
        .then((result) => {
            console.log("👙 fetchUpdate  result: ", result);
            console.log("👙 fetchUpdate  result: ", result.data);
            return fetchRead();
        })
        .then(() => {
            notification(mes);
        })
        .catch((err) => {
            console.log("👙 fetchUpdate err: ", err);
        });
}

function render(arrData) {
    const productListEl = $(".product_list");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `<div class="product_item group">
                         <!-- PRODUCT ITEM TITLE -->
                        <div class="transition duration-300 group-hover:opacity-40">
                            <!-- IMAGE -->
                            <div
                                class="min-h-80 bg-white aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none lg:h-44 xl:h-64"
                            >
                                <img
                                    src="${el.img}"
                                    alt="img"
                                    class="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <!-- TITLE -->
                            <div class="mt-4 space-y-2">
                                <p
                                    class="text-base font-bold text-gray-900 truncate text-center"
                                >
                                    ${el.name}
                                </p>
                                <p
                                    class="text-sm font-medium text-gray-700 text-center truncate"
                                >
                                    ${el.price} ₫
                                </p>
                                <div>
                                    <span class="inline-block mt-4 p-1 bg-neutral-200 rounded text-sm">
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
                               onclick="openCart()"
                                class="w-full btn btn-blue transition duration-500 translate-y-full opacity-0 group-hover/product_overlay:translate-y-0 group-hover/product_overlay:opacity-100"
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>`;
    });
    productListEl.innerHTML = string;
}

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

function openCart() {
    $(".cart-section").classList.toggle("hidden");

    setTimeout(() => {
        $(".cart-backdrop").classList.toggle("opacity-0");
        $(".cart-slide").classList.toggle("translate-x-full");
    }, 0);
}
