const control = {
    $: function (selector, doc = document) {
        return doc.querySelector(selector);
    },
    $$: function (selector) {
        return doc.querySelectorAll(selector);
    },
    openComponent: function (elSection, elContent, elBackdrop) {
        this.$(elSection).classList.toggle("hidden");

        setTimeout(() => {
            this.$(elBackdrop).classList.toggle("opacity-0");
            this.$(elContent).classList.toggle("translate-x-full");
        }, 0);
    },
    closeComponent: function (elSection, elContent, elBackdrop) {
        this.$(elBackdrop).classList.toggle("opacity-0");
        this.$(elContent).classList.toggle("translate-x-full");
        setTimeout(() => {
            this.$(elSection).classList.toggle("hidden");
        }, 400);
    },
    toggleTheme: function () {
        this.$("#theme-toggle-dark-icon").classList.toggle("hidden");
        this.$("#theme-toggle-light-icon").classList.toggle("hidden");
        this.$("#M_theme-toggle-dark-icon").classList.toggle("hidden");
        this.$("#M_theme-toggle-light-icon").classList.toggle("hidden");
        this.$("html").classList.toggle("dark");
    },
    loadding: function (flag, selector) {
        if (flag === "on") {
            this.$(selector).classList.remove("hidden");
        }
        if (flag === "off") {
            this.$(selector).classList.add("hidden");
        }
    },
    createItem: function (BASE_URL, value) {
        return axios.post(BASE_URL, value);
    },
    readAllItem: function (BASE_URL) {
        return axios.get(BASE_URL);
    },
    readOneItem: function (BASE_URL, id) {
        let url = BASE_URL + id;
        return axios.get(url);
    },
    updateItem: function (BASE_URL, item) {
        return axios.put(BASE_URL + item.id, item);
    },
    deleteItem: function (BASE_URL, id) {
        return axios.delete(BASE_URL + id);
    },
    formatCurrency: function (num, locale = navigator.language) {
        return new Intl.NumberFormat(locale).format(num);
    },
    validate: function (obj) {
        this.resetValidate();

        let isName = this.validateName(obj.name.trim()),
            isPrice = this.validatePrice(obj.price.trim()),
            isScreen = this.validateScreen(obj.screen.trim()),
            isFront = this.validateFront(obj.frontCamera.trim()),
            isBack = this.validateBack(obj.backCamera.trim()),
            isImg = this.validateImg(obj.img.trim()),
            isDesc = this.validateDesc(obj.desc.trim()),
            isType = this.validateType(obj.type.trim());

        const isValid =
            isName &&
            isPrice &&
            isScreen &&
            isFront &&
            isBack &&
            isImg &&
            isDesc &&
            isType;
        return isValid;
    },
    resetValidate: function () {
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
            this.mesValidate(selector, "");
        });
    },
    mesValidate: function (selector, mes) {
        if (mes === "") {
            this.$(selector).classList.add("hidden");
        } else {
            this.$(selector).classList.remove("hidden");
        }
        this.$(selector).innerHTML = mes;
    },
    validateEmpty: function (str) {
        return validator.isEmpty(str, { ignore_whitespace: true });
    },
    // NAME
    validateName: function (value) {
        //validate-fname hidden
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fname", "Không được để trống tên");
            return false;
        }
        this.mesValidate(".validate-fname", "");
        return true;
    },
    // PRICE
    validatePrice: function (value) {
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fprice", "Không được để trống giá");
            return false;
        }

        if (!validator.isNumeric(value, { no_symbols: true })) {
            this.mesValidate(
                ".validate-fprice",
                "Vui lòng nhập số và không có ký tự lạ và chữ"
            );
            return false;
        }

        //kiểm tra giá phải lớn hơn 1.000.000
        if (+value < 1000000) {
            this.mesValidate(".validate-fprice", "Giá phải lớn hơn 1.000.000");
            return false;
        }

        this.mesValidate(".validate-fprice", "");
        return true;
    },
    // SCREEN
    validateScreen: function (value) {
        //validate-fscreen hidden
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fscreen", "Không được để trống màn hình");
            return false;
        }
        this.mesValidate(".validate-fscreen", "");
        return true;
    },
    // FRONT
    validateFront: function (value) {
        //validate-ffront hidden
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-ffront", "Không được để trống camera trước");
            return false;
        }
        this.mesValidate(".validate-ffront", "");
        return true;
    },
    // BACK
    validateBack: function (value) {
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fback", "Không được để trống camera sau");
            return false;
        }
        this.mesValidate(".validate-fback", "");
        return true;
    },
    // BACK
    validateImg: function (value) {
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fimage", "Không được để trống hình ảnh");
            return false;
        }
        this.mesValidate(".validate-fimage", "");
        return true;
    },
    // DESC
    validateDesc: function (value) {
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-fdesc", "Không được để trống mô tả");
            return false;
        }
        this.mesValidate(".validate-fdesc", "");
        return true;
    },
    // DESC
    validateType: function (value) {
        //true => trống
        //kiểm tra trống
        if (this.validateEmpty(value)) {
            this.mesValidate(".validate-ftype", "Không được để trống Hãng");
            return false;
        }

        this.mesValidate(".validate-ftype", "");
        return true;
    },
    notification: function (mes) {
        Toastify({
            text: "",
            duration: 3000,
            // destination: "123123123123",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            className: "info",
            style: {
                background: "white",
            },
            stringHTML: `
                              <i class="notification_suc fa-regular fa-circle-check"></i>
                              <span class="notification_title">Successfully!</span>
                              <span class="notification_mes">${mes}</span>
                          `,

            onClick: function () {}, // Callback after click
        }).showToast();
    },
    debounce: function (fn, ms) {
        let timer;

        return function () {
            // Nhận các đối số
            const args = arguments;
            const context = this;

            if (timer) clearTimeout(timer);

            timer = setTimeout(() => {
                fn.apply(context, args);
            }, ms);
        };
    },
    priceStrToNumber: function (str) {
        return +str.slice(0, -1).trim().replaceAll(".", "");
    },
};

export default control;
