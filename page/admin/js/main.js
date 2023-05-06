init();

//click thêm
$("#add").addEventListener("click", (e) => {
    const value = getValueForm();
    console.log(value);
    if (!validate(value)) return;
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
    if (!validate(value)) return;
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
            $("#add").disabled = false;
            $("#update").disabled = true;
            fillForm("");
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

//click sort
$("#max_min").addEventListener("click", (e) => {
    // $("#max_min").classList.toggle("hidden");
    // $("#min_max").classList.toggle("hidden");

    arrProducts.sort((a, b) => +a.price - +b.price);
    render(arrProducts);
    console.log(arrProducts);
});
$("#min_max").addEventListener("click", () => {
    // $("#max_min").classList.toggle("hidden");
    // $("#min_max").classList.toggle("hidden");
    arrProducts.sort((a, b) => +b.price - +a.price);
    render(arrProducts);
    console.log(arrProducts);
});

// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢dekstop⁡
$("#theme-toggle").addEventListener("click", function () {
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});
// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢mobile⁡
$("#M_theme-toggle").addEventListener("click", function () {
    $("#theme-toggle-dark-icon").classList.toggle("hidden");
    $("#theme-toggle-light-icon").classList.toggle("hidden");
    $("html").classList.toggle("dark");
});
