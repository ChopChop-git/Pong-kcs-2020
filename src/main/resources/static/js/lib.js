
function showWrap() {
    document.getElementById("loading").style.display = "none";
    document.getElementById("wrap").style.display = "flex";
}

function getCurrentHostname() {
    return window.location.href.split('/').slice(0, 3).join('/')
}

function proceedToPage(path) {
    window.location.href = getCurrentHostname() + path;
}

function changeActiveDiv(from, to) {
    from.className = '';
    to.className = 'active';
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function resizeCanvas() {
    let canvas = document.getElementById("gameCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

