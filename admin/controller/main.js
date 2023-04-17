axios({
    url: "https://643a58bdbd3623f1b9b164ba.mockapi.io/admin",
    method: "GET",
})
    .then((result) => {
        console.log("👙  result: ", result);
        console.log("👙  result: ", result.data);
        render(result.data);
    })
    .catch((err) => {
        console.log("👙  err: ", err);
    });

function render(data) {
    const productItemsEl = document.querySelector(".product_items");
    let string = "";
    data.forEach((el) => {
        string += `
        <li class="product_item flex gap-4 py-4">
            <div class="w-1/12 break-all font-medium">${el.name}</div>
            <div class="w-1/12 break-all text-slate-500">${el.price}</div>
            <div class="w-1/12 break-all text-slate-500">${el.screen}</div>
            <div class="w-1/12 break-all text-slate-500">${el.frontCamera}</div>
            <div class="w-1/12 break-all text-slate-500">${el.backCamera}</div>
            <div class="w-1/12 break-all text-slate-500">${el.img}</div>
            <div class="flex-1 text-slate-500">${el.desc}</div>
            <div class="w-1/12 break-all text-slate-500">${el.type}</div>
            <div class="w-1/12 break-all font-semibold text-sky-500 text-right pr-2"><span class="cursor-pointer">Edit</span></div>
        </li>`;
    });
    productItemsEl.innerHTML = string;
}
