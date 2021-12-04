var index = 0;

function scroll() {
    var scrollitem = document.getElementsByClassName("scroll-item");
    var dots = document.getElementsByClassName("dot");
    for (var i = 0; i < scrollitem.length; i++) {
        scrollitem[i].style = "opacity:0;z-index:1;";
        dots[i].style = "background:#ffffff11;width:15px";
    }
    scrollitem[index].style = "opacity:100;z-index:2;";
    dots[index].style = "background:#ffffff99;width:20px";
    index = (index + 1) % 3;
}

function dotClick(e) {
    index = e;
    var scrollitem = document.getElementsByClassName("scroll-item");
    var dots = document.getElementsByClassName("dot");
    for (var i = 0; i < scrollitem.length; i++) {
        scrollitem[i].style = "opacity:0;z-index:1;";
        dots[i].style = "background:#ffffff11;width:15px";
    }
    scrollitem[index].style = "opacity:100;z-index:2;";
    dots[index].style = "background:#ffffff99;width:20px";
}

setInterval(scroll, 7000);

function logintype(e) {
    var line = document.getElementsByClassName("login-line");
    var info = document.getElementById("info");
    if (e == 0) {
        var type = document.getElementById("login-type1");
        var type2 = document.getElementById("login-type2");
        type.style.color = "#8F8FFF";
        type2.style.color = "#999999";
        line[0].style = "width:150px;margin-left:25px";
        line[1].style = "width:0px;margin-left:100px";
        info.style.left = 0;
    }
    if (e == 1) {
        var type = document.getElementById("login-type1");
        var type2 = document.getElementById("login-type2");
        type.style.color = "#999999";
        type2.style.color = "#8F8FFF";
        line[1].style = "width:150px;margin-left:25px";
        line[0].style = "width:0px;margin-left:100px";
        info.style.left = -300;
    }
}
var logorreg = 0

function switchLogin() {
    if (logorreg == 0) {
        logorreg = 1;
        var box = document.getElementById("buttons");
        box.style = "margin-top:-52px";
        var sw = document.getElementById("switcher");
        sw.innerText = "登录";
        var login = document.getElementById("logins");
        login.style = "margin-top:-500px";
    } else {
        logorreg = 0;
        var box = document.getElementById("buttons");
        box.style = "margin-top:0px";
        var sw = document.getElementById("switcher");
        sw.innerText = "注册";
        var login = document.getElementById("logins");
        login.style = "margin-top:0px";
    }
}