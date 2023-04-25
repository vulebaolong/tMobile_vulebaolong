init();

//click thêm
$("#add").addEventListener("click", (e) => {
    const value = getValueForm();
    console.log(value);
    createItem(value)
        .then(() => {
            return readItem();
        })
        .then((result) => {
            console.log(result);
            notification(`"${value.name}" Thêm sản phẩm thành công`);
            render(result.data);
            fillForm("");
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
});

//click edit
function edit(id) {
    readItem(id)
        .then((result) => {
            console.log(result);
            $("#fid").value = result.data.id;
            fillForm(result.data);
            // console.log($(`#item${id}`));
            $(`.focus-edit`)?.classList.remove("focus-edit");
            $(`#item${id}`).classList.add("focus-edit");
            $("#add").disabled = true;
            $("#update").disabled = false;
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
}

//click update
$("#update").addEventListener("click", (e) => {
    const value = getValueForm();
    updateItem(value)
        .then(() => {
            return readItem();
        })
        .then((result) => {
            console.log(result);
            notification("Cập nhật sản phẩm thành công");
            render(result.data);
            fillForm("");
            $("#fid").value = "";
            $("#add").disabled = false;
            $("#update").disabled = true;
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
});

//click delete
function deleteProduct(id) {
    console.log(id);
    deleteItem(id)
        .then((result) => {
            console.log(result);
            notification(`Đã xóa thành công "${result.data.name}"`);
            return readItem();
        })
        .then((result) => {
            render(result.data);
        })
        .catch((err) => {
            console.log("👙  err: ", err);
        });
}

//search
$("#search-input").addEventListener(
    "input",
    debounce((event) => {
        const valueInput = event.target.value;
        searchByName(valueInput).then((result) => {
            render(result.data);
        });
    }, 500)
);

//click save test
// $("#savechange").addEventListener("click", (e) => {
//     notification("Vũ Lê Bảo Long");
// });
// params: {
//     name: searchTerms,
// },
