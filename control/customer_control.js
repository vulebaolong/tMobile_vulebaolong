import control from "./main_control.js";
import admin from "../control/admin_control.js";
import Cart from "../model/customer_model.js";

const customer = {
    BASE_URL: "https://643a58bdbd3623f1b9b164ba.mockapi.io/customor/",
    arrProduct: [],
    arrCart: [],
    init: async function () {
        try {
            control.loadding("on", ".body_loading");
            const resultReadProduct = await control.readAllItem(admin.BASE_URL);

            // cập nhật arrProduct
            this.arrProduct = resultReadProduct.data;
            this.renderList(this.arrProduct);

            const resultReadCart = await control.readAllItem(this.BASE_URL);
            this.arrCart = resultReadCart.data;

            this.renderCart(this.arrCart);
            control.loadding("off", ".body_loading");
        } catch (error) {
            console.error(error);
        }
    },
    renderList: function (arrData) {
        const productListEl = control.$(".product_list");
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
                                    ${control.formatCurrency(el.price)} ₫
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
                                data-id="${el.id}"
                                class="cart_item_btn flex items-center justify-center gap-4 disabled:cursor-not-allowed !text-base w-full btn btn-blue transition duration-500 translate-y-full opacity-0 group-hover/product_overlay:translate-y-0 group-hover/product_overlay:opacity-100"
                            >
                                Giỏ hàng
                            </button>
                        </div>
                    </div>`;
        });
        productListEl.innerHTML = string;
    },
    renderCart: function (arrData) {
        const cartListEl = control.$(".cart_list");
        const priceAllEl = control.$(".price_all");
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
                                        <p class="ml-4">${control.formatCurrency(
                                            el.price
                                        )} ₫</p>
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
        priceAllEl.innerHTML = `${control.formatCurrency(priceAll)} ₫`;
        control.$(".cart_count ").innerText = arrData.length;
        control.$(".cart_count ").classList.remove("hidden");
        control.$(".cart_count ").classList.add("bum");
        setTimeout(() => {
            control.$(".cart_count ").classList.remove("bum");
        }, 300);
    },
    upQuantity: async function (id) {
        try {
            // 1) tìm index trong mảng arrCart
            const index = this.finIndexCart(id);

            // 2) tăng quantity
            this.arrCart[index].quantity++;

            // 3) tăng price
            this.arrCart[index].priceAll = this.calPrice("up", this.arrCart[index]);

            // 4) update dữ liệu
            control.loadding("on", ".cart_loading");
            await control.updateItem(this.BASE_URL, this.arrCart[index]);

            // 5) read dữ liệu
            const result = await control.readAllItem(this.BASE_URL);
            this.arrCart = result.data;

            // 6) render dữ liệu
            this.renderCart(this.arrCart);
            control.loadding("off", ".cart_loading");
        } catch (error) {
            console.error(error);
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
            control.loadding("on", ".cart_loading");
            if (this.arrCart[index].quantity === 0) {
                await control.deleteItem(this.BASE_URL, this.arrCart[index].id);
            }
            if (this.arrCart[index].quantity > 0) {
                await control.updateItem(this.BASE_URL, this.arrCart[index]);
            }

            // 5) read dữ liệu
            const result = await control.readAllItem(this.BASE_URL);
            this.arrCart = result.data;

            // 6) render dữ liệu
            this.renderCart(this.arrCart);
            control.loadding("off", ".cart_loading");
        } catch (error) {
            console.error(error);
        }
    },
    addItem: async function (id) {
        try {
            const productItemEl = control.$(`[data-id="${id}"]`);
            const name = control.$(".product_item-name", productItemEl).innerText;
            const price = control.priceStrToNumber(
                control.$(".product_item-price", productItemEl).innerText
            );
            const img = control.$(".product_item-img", productItemEl).src;
            const type = control.$(".product_item-type", productItemEl).innerText;
            const quantity = 1;
            const value = new Cart(id, name, price, price, img, type, quantity);
            const index = this.finNameCart(name);

            // Nếu trùng nhau
            if (index !== -1) {
                // cộng quantity trong mảng arrCart
                this.arrCart[index].quantity++;
                // tính giá priceAll trong mảng arrCart
                this.arrCart[index].priceAll =
                    this.arrCart[index].price * this.arrCart[index].quantity;

                //spin
                control.loadding("on", ".body_loading");

                // fetch API update
                await control.updateItem(this.BASE_URL, this.arrCart[index]);
                // fetch API read
                const resultRead = await control.readAllItem(this.BASE_URL);
                // cập nhật lại mảng arrCart
                this.arrCart = resultRead.data;
                // render
                this.renderCart(this.arrCart);
                //spin
                control.loadding("off", ".body_loading");
                control.notification(
                    `Thêm thành công sản phẩm "${value.name}" vào giỏ hàng.`
                );
                return;
            }

            control.loadding("on", ".body_loading");

            await control.createItem(this.BASE_URL, value);
            const resultRead = await await control.readAllItem(this.BASE_URL);
            this.arrCart = resultRead.data;
            this.renderCart(this.arrCart);

            control.loadding("off", ".body_loading");
            control.notification(
                `Thêm thành công sản phẩm "${value.name}" vào giỏ hàng.`
            );
        } catch (error) {
            console.error(error);
        }
    },
    removeItem: async function (id) {
        // 1) tìm index trong mảng arrCart
        const index = this.finIndexCart(+id);
        const name = this.arrCart[index].name;

        // 2) delete item trên server
        control.loadding("on", ".cart_loading");
        await control.deleteItem(this.BASE_URL, this.arrCart[index].id);

        // 5) read dữ liệu
        const result = await control.readAllItem(this.BASE_URL);
        this.arrCart = result.data;

        // 6) render dữ liệu
        this.renderCart(this.arrCart);
        control.loadding("off", ".cart_loading");
        control.notification(`Xóa thành công sản phẩm "${name}" khỏi giỏ hàng.`);
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
    removeAll: async function () {
        if (this.arrCart.length === 0) return;
        control.loadding("on", ".cart_loading");
        for (let index = 0; index < this.arrCart.length; index++) {
            const id = this.arrCart[index].id;
            await control.deleteItem(this.BASE_URL, id);
        }
        this.arrCart = (await control.readAllItem(this.BASE_URL)).data;
        this.renderCart(this.arrCart);
        control.loadding("off", ".cart_loading");
        control.notification("Thanh Toán Thành Công");
    },
    filterTypeProduct: function (type) {
        if (type === "all") {
            return this.arrProduct;
        }
        const arrResult = this.arrProduct.filter(function (item) {
            const itemType = item.type.toLowerCase();
            const typeLower = type.toLowerCase();
            return itemType === typeLower;
        });
        return arrResult;
    },
};

export default customer;
