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
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
    }).showToast();
}

function fillForm(obj) {
    $("#fid").value = obj.id;
    $("#fname").value = obj.name;
    $("#fprice").value = obj.price;
    $("#fscreen").value = obj.screen;
    $("#ffront").value = obj.frontCamera;
    $("#fback").value = obj.backCamera;
    $("#fimage").value = obj.img;
    $("#fdesc").value = obj.desc;
    $("#ftype").value = obj.type;
}
