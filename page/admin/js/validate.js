function validateEmpty(str) {
    return validator.isEmpty(str, { ignore_whitespace: true });
}

function showValidate(selector, mes) {
    $(selector).innerHTML = mes;
    $(selector).classList.remove("hidden");
}

function hiddenValidate(selector) {
    $(selector).innerHTML = "";
    $(selector).classList.add("hidden");
}

function resetValidate() {
    const arrSelector = [
        ".validate-fid",
        ".validate-fname",
        ".validate-fprice",
        ".validate-fscreen",
        ".validate-ffront",
        ".validate-fback",
        ".validate-fimage",
        ".validate-fdesc",
        ".validate-ftype",
    ];

    arrSelector.forEach((selector) => {
        $(selector).innerHTML = "";
        $(selector).classList.add("hidden");
    });
}

// NAME
function validateName(value) {
    //validate-fname hidden
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fname", "Không được để trống tên");
        return false;
    }
    hiddenValidate(".validate-fname");
    return true;
}

// PRICE
function validatePrice(value) {
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fprice", "Không được để trống giá");
        return false;
    }

    if (!validator.isNumeric(value, { no_symbols: true })) {
        showValidate(".validate-fprice", "Vui lòng nhập số và không có ký tự lạ và chữ");
        return false;
    }
    console.log(+value < 1000000);

    //kiểm tra giá phải lớn hơn 1.000.000
    if (+value < 1000000) {
        showValidate(".validate-fprice", "Giá phải lớn hơn 1.000.000");
        return false;
    }

    hiddenValidate(".validate-fname");
    return true;
}

// SCREEN
function validateScreen(value) {
    //validate-fscreen hidden
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fscreen", "Không được để trống màn hình");
        return false;
    }
    hiddenValidate(".validate-fscreen");
    return true;
}

// FRONT
function validateFront(value) {
    //validate-ffront hidden
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-ffront", "Không được để trống camera trước");
        return false;
    }
    hiddenValidate(".validate-ffront");
    return true;
}

// BACK
function validateBack(value) {
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fback", "Không được để trống camera trước");
        return false;
    }
    hiddenValidate(".validate-fback");
    return true;
}

// BACK
function validateImg(value) {
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fimage", "Không được để trống hình ảnh");
        return false;
    }
    hiddenValidate(".validate-fimage");
    return true;
}

// DESC
function validateDesc(value) {
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-fdesc", "Không được để trống mô tả");
        return false;
    }
    hiddenValidate(".validate-fdesc");
    return true;
}

// DESC
function validateType(value) {
    //true => trống
    //kiểm tra trống
    if (validateEmpty(value)) {
        showValidate(".validate-ftype", "Không được để trống Hãng");
        return false;
    }
    value = value.trim().toLowerCase();
    console.log(value);
    const arrType = [
        "apple",
        "samsung",
        "xiaomi",
        "oppo",
        "realme",
        "nokia",
        "oneplus",
        "asus",
        "vivo",
        "nubia",
        "tecno",
    ];
    if (!arrType.includes(value)) {
        showValidate(".validate-ftype", "Hãng điện thoại không hợp lệ");
        return false;
    }

    hiddenValidate(".validate-ftype");
    return true;
}

// true dữ liệu hợp lệ
function validate(obj) {
    resetValidate();

    let isName = true,
        isPrice = true,
        isScreen = true,
        isFront = true,
        isBack = true,
        isImg = true,
        isDesc = true,
        isType = true;
    if (!validateName(obj.name)) {
        isName = false;
        console.log(isName);
    }

    if (!validatePrice(obj.price)) {
        isPrice = false;
    }

    if (!validateScreen(obj.screen)) {
        isScreen = false;
    }

    if (!validateFront(obj.frontCamera)) {
        isFront = false;
    }

    if (!validateBack(obj.backCamera)) {
        isBack = false;
    }

    if (!validateImg(obj.img)) {
        isImg = false;
    }

    if (!validateDesc(obj.desc)) {
        isDesc = false;
    }

    if (!validateType(obj.type)) {
        isType = false;
    }
    // console.log("isName", isName);
    // console.log("isPrice", isPrice);
    // console.log("isScreen", isScreen);
    // console.log("isFront", isFront);
    // console.log("isBack", isBack);
    // console.log("isImg", isImg);
    // console.log("isDesc", isDesc);
    // console.log("isType", isType);
    isValid =
        isName && isPrice && isScreen && isFront && isBack && isImg && isDesc && isType;
    console.log(isValid);
    return isValid;
}
