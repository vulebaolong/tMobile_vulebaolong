document.querySelector("#theme-toggle").addEventListener("click", function () {
    console.log(123);
    document.querySelector("#theme-toggle-dark-icon").classList.toggle("hidden");
    document.querySelector("#theme-toggle-light-icon").classList.toggle("hidden");
    document.querySelector("html").classList.toggle("dark");
});
$("#M_btn_show-nav").addEventListener("click", function () {
    openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
$("#M_btn_close-nav").addEventListener("click", function () {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
