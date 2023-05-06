init();

//click thêm
$("#add").addEventListener("click", async (e) => {
    try {
        const value = getValueForm();
        console.log(value);
        if (!validate(value)) return;
        loadding("on");
        await createItem(value);
        const result = await readItem();
        console.log(result);
        render(result.data);
        fillForm("");
        loadding("off");
        notification(`"${value.name}" Thêm sản phẩm thành công`);
    } catch (error) {
        console.error("👙  error: ", error);
    }
});

//click edit
async function edit(id) {
    try {
        loadding("on");
        const result = await readItem(id);
        console.log(result);
        fillForm(result.data);
        $(`.focus-edit`)?.classList.remove("focus-edit");
        $(`#item${id}`).classList.add("focus-edit");
        $("#add").disabled = true;
        $("#update").disabled = false;
        loadding("off");
    } catch (error) {
        console.error("👙  error: ", error);
    }
}

//click update
$("#update").addEventListener("click", async (e) => {
    try {
        const value = getValueForm();
        if (!validate(value)) return;
        loadding("on");
        await updateItem(value);
        const result = await readItem();
        console.log(result);
        render(result.data);
        fillForm("");
        $("#add").disabled = false;
        $("#update").disabled = true;
        loadding("off");
        notification(`Cập nhật sản phẩm "${value.name}" thành công`);
    } catch (error) {
        console.error("👙  error: ", error);
    }
});

//click delete
async function deleteProduct(id) {
    try {
        loadding("on");
        const resultDelete = await deleteItem(id);
        const resultRead = await readItem();
        render(resultRead.data);
        $("#add").disabled = false;
        $("#update").disabled = true;
        fillForm("");
        loadding("off");
        notification(`Đã xóa thành công sản phẩm "${resultDelete.data.name}"`);
    } catch (error) {
        console.error("👙  error: ", error);
    }
}

//search
$("#search-input").addEventListener(
    "input",
    debounce(async (event) => {
        const valueInput = event.target.value;
        loadding("on");
        const result = await searchByName(valueInput);
        if (result.data.length === 0) {
            const string = `<div class="flex items-center justify-center gap-4 py-10">
                                <i class="text-5xl fa-regular fa-face-sad-tear"></i>
                                <span>Không tìm thấy sản phẩm có tên: "<span class="text-red-600 font-semibold">${valueInput}</span>"</span>
                            </div>`;
            const productItemsEl = $(".product_items");
            productItemsEl.innerHTML = string;
            loadding("off");
            return;
        }
        render(result.data);
        loadding("off");
    }, 500)
);

//click sort
$("#max_min").addEventListener("click", (e) => {
    arrProducts.sort((a, b) => +a.price - +b.price);
    render(arrProducts);
});
$("#min_max").addEventListener("click", () => {
    arrProducts.sort((a, b) => +b.price - +a.price);
    render(arrProducts);
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

//Click vào ⁡⁢⁣⁢​‌‍‌menu​⁡ khi ở ⁡⁣⁣⁢mobile⁡
$("#M_btn_show-nav").addEventListener("click", function () {
    openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào ⁡⁢⁣⁢​‌‍‌‍𝗰𝗹𝗼𝘀𝗲​⁡ khi ở ⁡⁣⁣⁢mobile⁡
$("#M_btn_close-nav").addEventListener("click", function () {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
