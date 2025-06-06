

window.addEventListener("DOMContentLoaded", () => {

    // display info alert
    function displayLimit() {
        let displayInfoDivs = document.querySelectorAll(".displayinfo");

        if (window.innerWidth < 784) {
            displayInfoDivs.forEach(div => {
                div.style.display = "flex";
            });
        } else {
            displayInfoDivs.forEach(div => {
                div.style.display = "none";
            });
        }
    };
    displayLimit(); // display info alert

})