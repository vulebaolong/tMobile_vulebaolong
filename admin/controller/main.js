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
            <div class="w-[7%] break-all text-slate-500">${el.img}</div>
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

//click thêm
$("#add").addEventListener("click", (e) => {
    const value = getValueForm();
    console.log(value);
    fetchCreate(value);
});

//click edit
function edit(id) {
    fetchRead(id).then((result) => {
        console.log(result.data);
        console.log($(`#item${id}`));
        $(`.focus-edit`)?.classList.remove("focus-edit");
        $(`#item${id}`).classList.add("focus-edit");
        $("#fid").disabled = true;
        $("#add").disabled = true;
        $("#update").disabled = false;
        fillForm(result.data);
    });
}

//click update
$("#update").addEventListener("click", (e) => {
    const value = getValueForm();
    fetchUpdate(value.id, value).then(() => {
        $("#fid").disabled = false;
        $("#add").disabled = false;
        $("#update").disabled = true;
        fillForm("");
    });
});

//click delete
function deleteProduct(id, name) {
    console.log(id);
    fetchDelete(id, `Đã xóa thành công "${name}"`);
}

//click save test
$("#savechange").addEventListener("click", (e) => {
    notification("Vũ Lê Bảo Long");
});
