init();

//click thêm
$("#add").addEventListener("click", (e) => {
    const value = getValueForm();
    console.log(value);
    fetchCreate(value);
});

//click edit
function edit(id) {
    const option = {
        params: {
            id,
        },
        render: false,
    };
    fetchRead(option).then((result) => {
        $("#fid").value = result.data[0].id;
        fillForm(result.data[0]);
        // console.log($(`#item${id}`));
        $(`.focus-edit`)?.classList.remove("focus-edit");
        $(`#item${id}`).classList.add("focus-edit");
        $("#add").disabled = true;
        $("#update").disabled = false;
    });
}

//click update
$("#update").addEventListener("click", (e) => {
    const value = getValueForm();
    fetchUpdate(value.id, value).then(() => {
        $("#fid").value = "";
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

//search
$("#search-input").addEventListener(
    "input",
    debounce((event) => {
        const valueInput = event.target.value;
        console.log(valueInput);
        const option = {
            params: {
                name: valueInput,
            },
            render: true,
        };
        fetchRead(option);
    }, 500)
);

//click save test
// $("#savechange").addEventListener("click", (e) => {
//     notification("Vũ Lê Bảo Long");
// });
// params: {
//     name: searchTerms,
// },
