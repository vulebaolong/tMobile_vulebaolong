document.querySelector("#theme-toggle").addEventListener("click", function () {
    console.log(123);
    document.querySelector("#theme-toggle-dark-icon").classList.toggle("hidden");
    document.querySelector("#theme-toggle-light-icon").classList.toggle("hidden");
    document.querySelector("html").classList.toggle("dark");
});
