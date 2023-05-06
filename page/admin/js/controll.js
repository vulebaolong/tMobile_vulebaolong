// import validator from "../../node_modules/validator/validator.min";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const BASE_URL = "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin/";
let arrProducts = [];

console.log();

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
    $("#search-input").value = obj === "" ? "" : obj.name;
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
    console.log(arrProducts);
    const productItemsEl = $(".product_items");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `
        <li id="item${el.id}" class="product_item flex gap-4 py-4">
            <div class="w-5% font-medium">${el.id}</div>
            <div class="w-[10%] font-medium">${el.name}</div>
            <div class="w-[10%] text-slate-500 ">${formatCurrency(
                el.price
            )} <sup>₫</sup></div>
            <div class="w-[7%] text-slate-500">${el.screen}</div>
            <div class="w-[10%] text-slate-500">${el.frontCamera}</div>
            <div class="w-[10%] text-slate-500">${el.backCamera}</div>
            <div class="w-[7%] text-slate-500">
                <img
                    src="${el.img}"
                    alt="img"
                    class="bg-white border border-slate-200  rounded-md h-28 w-full object-cover object-center lg:w-full"
                />
            </div>
            <div class="flex-1 text-slate-500">${el.desc}</div>
            <div class="w-5%  text-slate-500">${el.type}</div>
            <div class="w-[10%] flex justify-around   font-semibold text-sky-500 text-right pr-2">
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
