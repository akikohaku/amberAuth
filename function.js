var index = 0;
var uuid;
var token;

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
var logint = 0;

function logintype(e) {
    var line = document.getElementsByClassName("login-line");
    var info = document.getElementById("info");
    logint = e;
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
    if (logint == 0) {
        switchWaiting(0);
        changeLoading("正在登录");
        var Obj = {
            username: document.getElementById("user_login").value,
            password: hex_md5(document.getElementById("user_pass").value)
        };

        console.log(Obj);

        // 将 js 对象格式化为 JSON 字符串
        var jsonStr = JSON.stringify(Obj);
        console.log(jsonStr);
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:8090/amberAuthApi_Web_exploded/login.jsp';
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
                var result = JSON.parse(xhr.responseText);
                var status = eval(result).status;
                if (status == 0) {
                    changeLoaded("登录成功");
                    uuid = eval(result).uuid;
                    token = eval(result).token;
                    setTimeout(function() {
                        changeWork(0);
                    }, 3000);
                    cleanInput(1);
                } else {
                    changeLoaded("用户名或密码错误");
                    cleanInput(0);
                }
                setTimeout(function() { switchWaiting(1) }, 4000);
            } else {
                changeLoaded("未知系统错误");
                setTimeout(function() { switchWaiting(1) }, 4000);
            }
        };
    } else {
        switchWaiting(0);
        changeLoading("正在登录");
        var Obj = {
            email: document.getElementById("user_phone_mail").value,
            code: document.getElementById("user_code").value
        };

        console.log(Obj);

        // 将 js 对象格式化为 JSON 字符串
        var jsonStr = JSON.stringify(Obj);
        console.log(jsonStr);
        var xhr = new XMLHttpRequest();
        var url = 'http://localhost:8090/amberAuthApi_Web_exploded/loginv.jsp';
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
                var result = JSON.parse(xhr.responseText);
                var status = eval(result).status;
                if (status == 0) {
                    changeLoaded("登录成功");
                    uuid = eval(result).uuid;
                    token = eval(result).token;
                    setTimeout(function() {
                        changeWork(0);
                    }, 3000);
                    cleanInput(1);
                } else {
                    changeLoaded("验证码错误");
                    document.getElementById("user_code").style = "border:1px solid red;width: 50%;";
                    cleanInput(3);
                }
                setTimeout(function() { switchWaiting(1) }, 4000);
            } else {
                changeLoaded("未知系统错误");
                setTimeout(function() { switchWaiting(1) }, 4000);
            }
        };
    }
}
var buttondis = false;

function sendCode() {
    if (!buttondis) {


        var mail = /^\w+[A-Za-z0-9|-]*\w*@([A-Za-z0-9]{1,}\.)+[A-Za-z0-9]{2,}$/
        var phone = /^(13|14|15|17|18)\d{9}$/
        if (mail.test(document.getElementById("user_phone_mail").value)) {
            var button = document.getElementById("sendbutton");
            button.value = "发送中";
            buttondis = true;
            var Obj = {
                email: document.getElementById("user_phone_mail").value,
            };

            console.log(Obj);

            // 将 js 对象格式化为 JSON 字符串
            var jsonStr = JSON.stringify(Obj);
            console.log(jsonStr);
            var xhr = new XMLHttpRequest();
            var url = 'http://localhost:8090/amberAuthApi_Web_exploded/sendMail.jsp';
            // 设置属性
            xhr.open('post', url);

            // 如果想要使用post提交数据,必须添加此行
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

            // 将数据通过send方法传递
            xhr.send(jsonStr);

            // 发送并接受返回值
            xhr.onreadystatechange = function() {
                // 这步为判断服务器是否正确响应
                var button = document.getElementById("sendbutton");
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText)
                    var result = JSON.parse(xhr.responseText);
                    var status = eval(result).status;
                    if (status == 0) {
                        message("已发送验证码，请注意查收");
                        buttonClicked(60);
                    } else {
                        changeLoaded("未知系统错误");
                        button.value = "发送验证码";
                        buttondis = false;
                    }

                } else {
                    changeLoaded("未知系统错误");

                }
            };
        }
        if (phone.test(document.getElementById("user_phone_mail").value)) {
            var Obj = {
                phone: document.getElementById("user_phone_mail").value,
            };
            var button = document.getElementById("sendbutton");
            button.value = "发送中";
            buttondis = true;
            console.log(Obj);

            // 将 js 对象格式化为 JSON 字符串
            var jsonStr = JSON.stringify(Obj);
            console.log(jsonStr);
            var xhr = new XMLHttpRequest();
            var url = 'http://localhost:8090/amberAuthApi_Web_exploded/sendSMS.jsp';
            // 设置属性
            xhr.open('post', url);

            // 如果想要使用post提交数据,必须添加此行
            xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

            // 将数据通过send方法传递
            xhr.send(jsonStr);

            // 发送并接受返回值
            xhr.onreadystatechange = function() {
                // 这步为判断服务器是否正确响应
                var button = document.getElementById("sendbutton");
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText)
                    var result = JSON.parse(xhr.responseText);
                    var status = eval(result).status;
                    if (status == 0) {
                        message("已发送验证码，请注意查收");
                        buttonClicked(60);
                    } else {
                        changeLoaded("未知系统错误");
                        button.value = "发送验证码";
                        buttondis = false;
                    }

                } else {
                    changeLoaded("未知系统错误");
                }
            };
        }
    }


}

function register() {
    var username = /^[a-zA-Z]{4,12}$/;
    var password = /^\w{6,20}$/
    var phone = /^(13|14|15|17|18)\d{9}$/
    var mail = /^\w+[A-Za-z0-9|-]*\w*@([A-Za-z0-9]{1,}\.)+[A-Za-z0-9]{2,}$/
    if (!username.test(document.getElementById("reg_name").value)) {
        document.getElementById("reg_name").style = "border:1px solid red";
        message("用户名为4-16位英文字母");
        return;
    }
    if (!password.test(document.getElementById("reg_pass").value)) {
        document.getElementById("reg_pass").style = "border:1px solid red";
        message("密码为6-20位大小写字母、数字或下划线");
        return;
    }
    var passtest = RegExp('^' + document.getElementById("reg_pass").value + '$')
    if (!passtest.test(document.getElementById("reg_re_pass").value)) {
        document.getElementById("reg_pass").style = "border:1px solid red";
        document.getElementById("reg_re_pass").style = "border:1px solid red";
        message("两次输入的密码不同");
        return;
    }
    if (!phone.test(document.getElementById("reg_phonenum").value)) {
        document.getElementById("reg_phonenum").style = "border:1px solid red";
        message("手机号码位13、14、15、17、18开头的11位手机号");
        return;
    }
    if (!mail.test(document.getElementById("reg_mail").value)) {
        document.getElementById("reg_mail").style = "border:1px solid red";
        message("邮箱格式错误");
        return;
    }
    switchWaiting(0);
    changeLoading("正在注册");
    var Obj = {
        username: document.getElementById("reg_name").value,
        phone: document.getElementById("reg_phonenum").value,
        email: document.getElementById("reg_mail").value,
        password: hex_md5(document.getElementById("reg_pass").value)
    };
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/register.jsp';
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
                changeLoaded("注册成功");
                cleanInput(2);
                switchLogin();
            }
            if (status == "username used") {
                changeLoaded("用户名已被占用");
                document.getElementById("reg_name").style = "border:1px solid red";
            }
            if (status == "phone used") {
                changeLoaded("手机号已被占用");
                document.getElementById("reg_phonenum").style = "border:1px solid red";
            }
            if (status == "email used") {
                changeLoaded("邮箱已被占用");
                document.getElementById("reg_mail").style = "border:1px solid red";
            }
            if (status == "system error") {
                changeLoaded("未知系统错误");
            }
            setTimeout(function() { switchWaiting(1) }, 4000);
        } else {
            changeLoaded("未知系统错误");
            setTimeout(function() { switchWaiting(1) }, 4000);
        }

    };
}
var timeb = 60;
var buttontimer;

function buttonClicked(e) {
    timeb = e;
    buttontimer = setInterval(buttonCooling, 1000);
}

function buttonCooling() {
    document.getElementById("sendbutton").value = timeb + "s";
    timeb--;
    if (timeb <= -1) {
        window.clearInterval(buttontimer);
        document.getElementById("sendbutton").value = "发送验证码";
        buttondis = false;
    }
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
        var wait = document.getElementById("waiting-pic");
        wait.style.display = "block";
        mainitem.style.left = -400;
        maincontent[0].style.opacity = 0;
        maincontent[1].style.opacity = 100;
        // waitingTimmer = setInterval(changeWaiting, 2000);


    }
    if (e == 1) {
        var mainitem = document.getElementById("main-scroll");
        var maincontent = document.getElementsByClassName("main-items");
        var wait = document.getElementById("waiting-pic");
        setTimeout(function() {
            wait.style.display = "none";
        }, 1000);
        mainitem.style.left = 0;
        maincontent[0].style.opacity = 100;
        maincontent[1].style.opacity = 0;
        window.clearInterval(waitingTimmer);
        changeLoading("");
    }
}

function changeLoading(e) {
    var loading = document.getElementById("loading");
    var loaded = document.getElementById("loaded");
    loading.style = "width:200px;margin-left:100px";
    loaded.style = "height:0px";
    loading.innerText = e;
}

function changeLoaded(e) {
    setTimeout(function() {
        var loading = document.getElementById("loading");
        var loaded = document.getElementById("loaded");
        loading.style = "width:0px;margin-left:200px";
        loaded.style = "height:50px";
    }, 1000);
    loaded.innerText = e;
}

function cleanInput(e) {
    if (e == 0) {
        //清除登录区密码
        var pass = document.getElementById("user_pass");
        pass.value = "";
    }
    if (e == 1) {
        //清空登录区
        document.getElementById("user_pass").value = "";
        document.getElementById("user_login").value = "";
        document.getElementById("user_code").value = "";
        document.getElementById("user_phone_mail").value = "";
    }
    if (e == 2) {
        //清空注册信息
        document.getElementById("reg_name").value = "";
        document.getElementById("reg_mail").value = "";
        document.getElementById("reg_phonenum").value = "";
        document.getElementById("reg_pass").value = "";
        document.getElementById("reg_re_pass").value = "";
    }
    if (e == 3) {
        //清空验证码
        document.getElementById("user_code").value = "";
    }
}

function changeNormal(e) {
    e.style = "border:1px solid #EAEAEA;";
}

function message(e) {
    var mess = document.getElementById("message");
    mess.innerText = e;
    mess.style.top = 30;
    setTimeout(function() {
        var mess = document.getElementById("message");
        mess.style.top = -120;
    }, 3000);
}