const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
fetchRead();
$("#update").disabled = true;

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
        .then(() => {
            notification("<span>Thêm sản phẩm thành công</span>");
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
        })
        .catch((err) => {
            console.log("👙 fetchUpdate err: ", err);
        });
}

function fetchDelete(params) {}

function render(arrData) {
    const productItemsEl = $(".product_items");
    let string = "";
    arrData.reverse().forEach((el) => {
        string += `
        <li class="product_item flex gap-4 py-4">
            <div class="w-5% break-all font-medium">${el.id}</div>
            <div class="w-[7%] break-all font-medium">${el.name}</div>
            <div class="w-[7%] break-all text-slate-500">${el.price}</div>
            <div class="w-[7%] break-all text-slate-500">${el.screen}</div>
            <div class="w-[7%] break-all text-slate-500">${el.frontCamera}</div>
            <div class="w-[7%] break-all text-slate-500">${el.backCamera}</div>
            <div class="w-[7%] break-all text-slate-500">${el.img}</div>
            <div class="flex-1 text-slate-500">${el.desc}</div>
            <div class="w-5% break-all text-slate-500">${el.type}</div>
            <div class="w-[10%] flex justify-around  break-all font-semibold text-sky-500 text-right pr-2">
                <span onclick="edit(${el.id})" class="cursor-pointer">Edit</span>
                <span onclick="delete(${el.id})" class="cursor-pointer">Delete</span>
            </div>
        </li>`;
    });
    productItemsEl.innerHTML = string;
}

//click thêm
$("#add").addEventListener("click", (e) => {
    const value = getValueForm();
    console.log(value);
    fetchCreate(value);
});

//click edit
function edit(id) {
    $("#fid").disabled = true;
    $("#add").disabled = true;
    $("#update").disabled = false;

    console.log($("#add"));
    fetchRead(id).then((result) => {
        console.log(result.data);
        fillForm(result.data);
    });
}

//click update
$("#update").addEventListener("click", (e) => {
    const value = getValueForm();
    fetchUpdate(value.id, value);
    $("#fid").disabled = false;
    $("#add").disabled = false;
    $("#update").disabled = true;
    fillForm("");
});
