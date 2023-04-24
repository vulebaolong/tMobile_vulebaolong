const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const BASE_URL = "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin";

function fetchCreate(value) {
    axios({
        url: BASE_URL,
        method: "POST",
        data: value,
    })
        .then((result) => {
            console.log("👙 fetchCreate result: ", result);
            console.log("👙 fetchCreate result: ", result.data);
            return fetchRead({ render: true });
        })
        .then((resultRead) => {
            console.log(resultRead);
            console.log(value.name);
            notification(`"${value.name}" Thêm sản phẩm thành công`);
            fillForm("");
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
}

function fetchRead(option) {
    console.log(option);
    return new Promise((resolve, reject) => {
        axios({
            url: BASE_URL,
            method: "GET",
            params: option.params,
        })
            .then((result) => {
                console.log("👙 fetchRead result: ", result);
                console.log("👙 fetchRead result: ", result.data);
                if (option.render) render(result.data);
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
            url: `${BASE_URL}/${id}`,
            method: "PUT",
            data: value,
        })
            .then((result) => {
                console.log("👙 fetchUpdate  result: ", result);
                console.log("👙 fetchUpdate  result: ", result.data);
                return fetchRead({ render: true });
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
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
    })
        .then((result) => {
            console.log("👙 fetchDelete  result: ", result);
            console.log("👙 fetchDelete  result: ", result.data);
            return fetchRead({ render: true });
        })
        .then(() => {
            notification(mes);
        })
        .catch((err) => {
            console.log("👙 fetchDelete err: ", err);
        });
}

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
    $("#search-input").value = obj === "" ? "" : obj.name;
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

function init() {
    fetchRead({ render: true });
    $("#update").disabled = true;
}

function render(arrData) {
    const productItemsEl = $(".product_items");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `
        <li id="item${el.id}" class="product_item flex gap-4 py-4">
            <div class="w-5% break-all font-medium">${el.id}</div>
            <div class="w-[7%] break-all font-medium">${el.name}</div>
            <div class="w-[7%] break-all text-slate-500">${el.price}</div>
            <div class="w-[7%] break-all text-slate-500">${el.screen}</div>
            <div class="w-[7%] break-all text-slate-500">${el.frontCamera}</div>
            <div class="w-[7%] break-all text-slate-500">${el.backCamera}</div>
            <div class="w-[7%] break-all text-slate-500">
            <img
                src="${el.img}"
                alt="img"
                class="h-28 w-full object-cover object-center  lg:w-full"
            />
            </div>
            <div class="flex-1 text-slate-500">${el.desc}</div>
            <div class="w-5% break-all text-slate-500">${el.type}</div>
            <div class="w-[10%] flex justify-around  break-all font-semibold text-sky-500 text-right pr-2">
                <span onclick="edit(${el.id})" class="cursor-pointer">Edit</span>
                <span onclick="deleteProduct(${el.id},'${el.name}')" class="cursor-pointer">Delete</span>
            </div>
        </li>`;
    });
    productItemsEl.innerHTML = string;
}
