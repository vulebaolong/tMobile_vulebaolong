import control from "../control/main_control.js";

// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢dekstop⁡
control.$("#theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});
// Click vào ⁡⁢⁣⁢​‌‍‌𝘁𝗵𝗮𝘆 đổ𝗶 𝘁𝗵𝗲𝗺𝗲​⁡ ở ⁡⁣⁣⁢mobile⁡
control.$("#M_theme-toggle").addEventListener("click", function () {
    control.toggleTheme();
});

control.$("#M_btn_show-nav").addEventListener("click", function () {
    control.openComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
control.$("#M_btn_close-nav").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
control.$("#M-nav_backdrop").addEventListener("click", function () {
    control.closeComponent("#M-nav", "#M-nav_content", "#M-nav_backdrop");
});
