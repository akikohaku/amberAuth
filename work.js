function changeWork(e) {
    if (e == 0) {
        var black = document.getElementById("black");
        black.style.left = 0;
        profile(uuid);
        setTimeout(function() {
            var work = document.getElementById("work");
            work.style.left = 0;
        }, 500);

    }
    if (e == 1) {

        var work = document.getElementById("work");
        setTimeout(function() {
            var black = document.getElementById("black");
            black.style.left = '-100vw';
        }, 500);

        work.style.left = '-100vw';
    }
}

function logout() {
    uuid = "";
    token = "";
    changeWork(1);
    message("已登出");
}


function profile(e) {
    document.getElementById("work-content").innerHTML = "<div class='text-gray'>uuid</div><div class='text-normal' id='profile-uuid'></div><div class='text-gray'>用户名</div><div class='text-normal' id='profile-username'></div><div class='text-gray'>手机号</div><input type='text' name='phone' id='profile_phone' style='width: 30%;' class='input' value='' size='20' onfocus='changeNormal(this)'><div class='text-gray'>邮箱</div><input type='text' name='phone' id='profile_mail' style='width: 30%;' class='input' value='' size='128' onfocus='changeNormal(this)'>";
    var Obj = {
        uuid: uuid,
        token: token,
        target: e
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/getprofile.jsp';
    // 设置属性
    xhr.open('post', url);

    // 如果想要使用post提交数据,必须添加此行
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    // 将数据通过send方法传递
    xhr.send(jsonStr);

    // 发送并接受返回值
    var result;
    xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            result = JSON.parse(xhr.responseText);
            var status = eval(result).status;
            if (status == 0) {
                message("获取用户资料成功");
                var res = eval(result);
                setTimeout(function() {
                    document.getElementById("profile-uuid").innerText = res.uuid;
                    document.getElementById("profile-username").innerText = res.username;
                    document.getElementById("profile_phone").value = res.phone;
                    document.getElementById("profile_mail").value = res.email;
                }, 1000);

            } else {
                message("未知系统错误");
            }
        }
    };
}