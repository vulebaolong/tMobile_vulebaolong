// import validator from "../../node_modules/validator/validator.min";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const BASE_URL = "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/";
let arrProducts = [];

function getValueForm() {
    const valueFid = $("#fid").value;
    const valueFname = $("#fname").value;
    const valueFprice = $("#fprice").value;
    const valueFscreen = $("#fscreen").value;
    const valueFfront = $("#ffront").value;
    const valueFback = $("#fback").value;
    const valueFimage = $("#fimage").value;
    const valueFdesc = $("#fdesc").value;
    const valueFtype = $("#ftype").value;

    const objValueForm = {
        id: valueFid,
        name: valueFname,
        price: valueFprice,
        screen: valueFscreen,
        frontCamera: valueFfront,
        backCamera: valueFback,
        img: valueFimage,
        desc: valueFdesc,
        type: valueFtype,
    };

    return objValueForm;
}

function notification(mes) {
    Toastify({
        text: "",
        duration: 3000,
        // destination: "123123123123",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "info",
        style: {
            background: "white",
        },
        stringHTML: `
                        <i class="notification_suc fa-regular fa-circle-check"></i>
                        <span class="notification_title">Successfully!</span>
                        <span class="notification_mes">${mes}</span>
                    `,

        onClick: function () {}, // Callback after click
    }).showToast();
}

/**
 * nếu không truyền đối số sẽ fill "" rỗng
 *
 * nếu có đối số phải là obj
 * @param {*} obj
 */
function fillForm(obj) {
    resetValidate();
    $("#search-input").value = "";
    $("#fid").value = obj === "" ? "" : obj.id;
    $("#fname").value = obj === "" ? "" : obj.name;
    $("#fprice").value = obj === "" ? "" : obj.price;
    $("#fscreen").value = obj === "" ? "" : obj.screen;
    $("#ffront").value = obj === "" ? "" : obj.frontCamera;
    $("#fback").value = obj === "" ? "" : obj.backCamera;
    $("#fimage").value = obj === "" ? "" : obj.img;
    $("#fdesc").value = obj === "" ? "" : obj.desc;
    $("#ftype").value = obj === "" ? "" : obj.type;
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

async function init() {
    loadding("on");
    const result = await readItem();
    loadding("off");
    render(result.data);
    $("#update").disabled = true;
}

function render(arrData) {
    arrProducts = arrData;
    const productItemsEl = $(".product_items");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `
        <li id="item${el.id}" class="product_item flex flex-col lg:flex-row gap-4 py-4">
            <div class="lg:w-5% font-medium">
                <span class="lg:hidden underline decoration-1">ID:</span> 
                <span>${el.id}</span>
            </div>
            <div class="lg:w-[10%] font-medium">
                <span class="lg:hidden underline decoration-1">Tên:</span>
                <span>${el.name}</span>
            </div>
            <div class="lg:w-[10%] ">
                <span class="lg:hidden underline decoration-1">Giá:</span>
                <span class="text-slate-500">${formatCurrency(
                    el.price
                )} <sup>₫</sup></span>
            </div>
            <div class="lg:w-[7%] ">
                <span class="lg:hidden underline decoration-1">Màn hình:</span>
                <span class="text-slate-500">${el.screen}</span>
            </div>
            <div class="lg:w-[10%] ">
                <span class="lg:hidden underline decoration-1">Camera trước:</span>
                <span class="text-slate-500">${el.frontCamera}</span>
            </div>
            <div class="lg:w-[10%] ">
                <span class="lg:hidden underline decoration-1">Camera sau:</span>
                <span class="text-slate-500">${el.backCamera}</span>
            </div>
            <div class="lg:w-[7%] w-2/5">
                <span class="lg:hidden underline decoration-1">Hình:</span>
                <img
                    src="${el.img}"
                    alt="img"
                    class="bg-white border border-slate-200 rounded-md lg:h-28 w-full h-full object-cover object-center lg:w-full"
                />
            </div>
            <div class="flex-1">
                <span class="lg:hidden underline decoration-1">Mô tả:</span>
                <span class="text-slate-500">${el.desc}</span>
                
            </div>
            <div class="lg:w-5%">
                <span class="lg:hidden underline decoration-1">Hãng:</span>
                <span class="text-slate-500">${el.type}</span>
            </div>
            <div class="lg:w-[10%] flex justify-around font-semibold text-sky-500 text-right pr-2">
                <span onclick="edit(${el.id})" class="cursor-pointer">Edit</span>
                <span onclick="deleteProduct(${
                    el.id
                })" class="cursor-pointer">Delete</span>
            </div>
        </li>`;
    });
    productItemsEl.innerHTML = string;
}

function createItem(value) {
    return axios.post(BASE_URL, value);
}

function readItem(id = null) {
    let url = BASE_URL;
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

function searchByName(name) {
    return axios.get(BASE_URL, {
        params: {
            name: name,
        },
    });
}

function formatCurrency(num, locale = navigator.language) {
    return new Intl.NumberFormat(locale).format(num);
}

function loadding(flag) {
    if (flag === "on") {
        $(".body_loading").classList.remove("hidden");
    }
    if (flag === "off") {
        $(".body_loading").classList.add("hidden");
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
