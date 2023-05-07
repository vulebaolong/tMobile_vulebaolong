document.querySelector("#theme-toggle").addEventListener("click", function () {
    document.querySelector("#theme-toggle-dark-icon").classList.toggle("hidden");
    document.querySelector("#theme-toggle-light-icon").classList.toggle("hidden");
    document.querySelector("html").classList.toggle("dark");
});

document.querySelector("#M_theme-toggle").addEventListener("click", function () {
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
$("#M-nav_backdrop").addEventListener("click", function () {
    closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
