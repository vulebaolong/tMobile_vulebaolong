import admin from "../control/admin_control.js";
import control from "../control/main_control.js";
admin.init();

//click ⁡⁢⁣⁢​‌‍‌𝘁𝗵ê𝗺​⁡
control.$("#add").addEventListener("click", async (e) => {
    try {
        const value = admin.getValueForm();

        if (!control.validate(value)) return;

        control.loadding("on", ".body_loading");

        await control.createItem(admin.BASE_URL, value);

        const result = await control.readAllItem(admin.BASE_URL);

        admin.render(result.data);

        admin.fillForm("");

        control.loadding("off", ".body_loading");

        control.notification(`"${value.name}" Thêm sản phẩm thành công`);
    } catch (error) {
        console.error("👙  error: ", error);
    }
});

// Click ​‌‍‌⁡⁢⁣⁢𝗘𝗗𝗜𝗧⁡​ and ​‌‍‌⁡⁢⁣⁢𝗗𝗘𝗟𝗘𝗧𝗘⁡​
control.$(".product_items ").addEventListener("click", (e) => {
    e.stopPropagation;
    const el = e.target;
    const editItemEl = el.closest(".edit_item");
    const deleteItemEL = el.closest(".delete_item");

    // Click ⁡⁢⁣⁢​‌‍‌𝗘𝗗𝗜𝗧​⁡
    if (editItemEl) {
        admin.edit(editItemEl.dataset.id);
    }

    //Click ​‌‍‌⁡⁢⁣⁢𝗗𝗘𝗟𝗘𝗧𝗘⁡​
    if (deleteItemEL) {
        admin.delete(deleteItemEL.dataset.id);
    }
});

//click ⁡⁢⁣⁢​‌‍‌𝗨𝗣𝗗𝗔𝗧𝗘​⁡
control.$("#update").addEventListener("click", async (e) => {
    try {
        const value = admin.getValueForm();

        if (!control.validate(value)) return;

        control.loadding("on", ".body_loading");

        await control.updateItem(admin.BASE_URL, value);

        const result = await control.readAllItem(admin.BASE_URL);

        admin.render(result.data);

        admin.fillForm("");

        control.$("#add").disabled = false;

        control.$("#update").disabled = true;

        control.loadding("off", ".body_loading");

        control.notification(`Cập nhật sản phẩm "${value.name}" thành công`);
    } catch (error) {
        console.error("👙  error: ", error);
    }
});

//⁡⁢⁣⁢​‌‍‌𝘀𝗲𝗮𝗿𝗰𝗵​⁡
control.$("#search-input").addEventListener(
    "input",
    control.debounce(async (event) => {
        const valueInput = event.target.value;
        control.loadding("on", ".body_loading");
        const result = await admin.searchByName(valueInput);
        if (result.data.length === 0) {
            const string = `<div class="flex items-center justify-center gap-4 py-10">
                                <i class="text-5xl fa-regular fa-face-sad-tear"></i>
                                <span>Không tìm thấy sản phẩm có tên: "<span class="text-red-600 font-semibold">${valueInput}</span>"</span>
                            </div>`;
            const productItemsEl = control.$(".product_items");
            productItemsEl.innerHTML = string;
            control.loadding("off", ".body_loading");
            return;
        }
        admin.render(result.data);
        control.loadding("off", ".body_loading");
    }, 500)
);

//click ⁡⁢⁣⁢​‌‍‌𝗦𝗢𝗥𝗧​⁡
control.$("#max_min").addEventListener("click", (e) => {
    admin.arrProducts.sort((a, b) => +a.price - +b.price);
    admin.render(admin.arrProducts);
});
control.$("#min_max").addEventListener("click", () => {
    admin.arrProducts.sort((a, b) => +b.price - +a.price);
    admin.render(admin.arrProducts);
});

// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢dekstop⁡
control.$("#theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});
// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢mobile⁡
control.$("#M_theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});

//Click vào ⁡⁢⁣⁢​‌‍‌menu​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M_btn_show-nav").addEventListener("click", function () {
    control.openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
//Click vào ⁡⁢⁣⁢​‌‍‌‍𝗰𝗹𝗼𝘀𝗲​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M_btn_close-nav").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});

//Click vào ⁡⁢⁣⁢​‌‍‌𝗯𝗮𝗰𝗸𝗱𝗿𝗼𝗽​⁡ khi ở ⁡⁣⁣⁢mobile⁡
control.$("#M-nav_backdrop").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
