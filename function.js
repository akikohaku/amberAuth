var index = 0;

//生命周期:加载完成
window.onload = function() {
    scroll();
}

//生命周期:释放
window.onunload = function() {

}

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
    changeBack();
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
        login.style = "margin-top:-520px";
    } else {
        logorreg = 0;
        var box = document.getElementById("buttons");
        box.style = "margin-top:0px";
        var sw = document.getElementById("switcher");
        sw.innerText = "注册";
        var login = document.getElementById("logins");
        login.style = "margin-top:0px";
    }
    changeBack();
}

function login() {
    var Obj = {
        username: document.getElementById("user_login").value,
        password: hex_md5(document.getElementById("user_pass").value)
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8089/amberAuthApi_Web_exploded/login.jsp';
    // 设置属性
    xhr.open('post', url);

    // 如果想要使用post提交数据,必须添加此行
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    // 将数据通过send方法传递
    xhr.send(jsonStr);

    // 发送并接受返回值
    xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
        }
    };
}

function register() {
    switchWaiting(0);
    var Obj = {
        username: document.getElementById("reg_name").value,
        phone: document.getElementById("reg_phonenum").value,
        mail: document.getElementById("reg_mail").value,
        password: hex_md5(document.getElementById("reg_pass").value)
    };
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8089/amberAuthApi_Web_exploded/register.jsp';
    // 设置属性
    xhr.open('post', url);
    // 如果想要使用post提交数据,必须添加此行
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    // 将数据通过send方法传递
    xhr.send(jsonStr);
    // 发送并接受返回值
    xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var result = JSON.parse(xhr.responseText);
            var status = eval(result).status;
            if (status == "success") {

            }
            if (stauts == "username used") {

            }
            if (status == "system error") {

            }
            setTimeout(switchWaiting(1), 4000);
        } else {
            setTimeout(switchWaiting(1), 4000);
        }

    };
}

function changeBack() {
    const doodle = document.querySelector('css-doodle');

    /* just refresh */
    doodle.update();
}

function changeWaiting() {
    const doodle = document.querySelectorAll('css-doodle');

    /* just refresh */
    doodle[1].update();
}
var waitingTimmer;

function switchWaiting(e) {
    if (e == 0) {
        var mainitem = document.getElementById("main-scroll");
        var maincontent = document.getElementsByClassName("main-items");
        mainitem.style.left = -400;
        maincontent[0].style.opacity = 0;
        maincontent[1].style.opacity = 100;
        waitingTimmer = setInterval(changeWaiting, 2000);
    }
    if (e == 1) {
        var mainitem = document.getElementById("main-scroll");
        var maincontent = document.getElementsByClassName("main-items");
        mainitem.style.left = 0;
        maincontent[0].style.opacity = 100;
        maincontent[1].style.opacity = 0;
        window.clearInterval(waitingTimmer);
    }
}