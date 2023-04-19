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
        text: mes,
        duration: 3000,
        destination: "123123123123",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "info",
        style: {
            background: "white",
        },
        onClick: function () {}, // Callback after click
    }).showToast();
}

function fillForm(obj) {
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
