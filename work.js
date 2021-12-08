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

function showProfile() {
    profile(uuid);
}

function profile(e) {
    document.getElementById("work-content").innerHTML = "<div style='width:500px;margin-left:50px;padding-top:30px;'><div class='text-gray'>uuid</div><div class='text-normal' id='profile-uuid'></div><div class='text-gray'>用户名</div><div class='text-normal' id='profile-username'></div><div class='text-gray'>手机号</div><input type='text' name='phone' id='profile_phone' style='width: 90%;' class='input' value='' size='20' onfocus='changeNormal(this)'><div class='text-gray'>邮箱</div><input type='text' name='phone' id='profile_mail' style='width: 90%;' class='input' value='' size='128' onfocus='changeNormal(this)'><input type='button' class='button' style='display:block;' value='保存' onclick='saveprofile()' id='savebutton'></div>";
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

function saveprofile() {
    var phone = /^(13|14|15|17|18)\d{9}$/
    var mail = /^\w+[A-Za-z0-9|-]*\w*@([A-Za-z0-9]{1,}\.)+[A-Za-z0-9]{2,}$/
    if (!phone.test(document.getElementById("profile_phone").value)) {
        document.getElementById("profile_phone").style = "border:1px solid red";
        message("手机号码位13、14、15、17、18开头的11位手机号");
        return;
    }
    if (!mail.test(document.getElementById("profile_mail").value)) {
        document.getElementById("profile_mail").style = "border:1px solid red";
        message("邮箱格式错误");
        return;
    }
    var Obj = {
        uuid: uuid,
        token: token,
        phone: document.getElementById("profile_phone").value,
        email: document.getElementById("profile_mail").value
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/saveprofile.jsp';
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
                message("保存成功");

            } else {
                message("未知系统错误");
            }
        }
    };
}

function changePass() {
    document.getElementById("work-content").innerHTML = "<div style='width:500px;margin-left:50px;padding-top:30px;'><div class='text-gray'>输入原始密码</div><input type='password' name='pass' id='change_o' style='width: 90%;' class='input' value='' size='20' onfocus='changeNormal(this)'><div class='text-gray'>新密码</div><input type='password' name='pass' id='change_pass' style='width: 90%;' class='input' value='' size='128' onfocus='changeNormal(this)'><div class='text-gray'>再次输入密码</div><input type='password' name='pass' id='change_repass' style='width: 90%;' class='input' value='' size='128' onfocus='changeNormal(this)'><input type='button' class='button' style='display:block;' value='保存' onclick='savepass()' id='savebutton'></div>"
}

function savepass() {
    var password = /^\w{6,20}$/
    if (!password.test(document.getElementById("change_pass").value)) {
        document.getElementById("change_pass").style = "border:1px solid red";
        message("密码为6-20位大小写字母、数字或下划线");
        return;
    }
    var passtest = RegExp('^' + document.getElementById("change_pass").value + '$')
    if (!passtest.test(document.getElementById("change_repass").value)) {
        document.getElementById("change_pass").style = "border:1px solid red";
        document.getElementById("change_repass").style = "border:1px solid red";
        message("两次输入的密码不同");
        return;
    }
    var Obj = {
        uuid: uuid,
        token: token,
        pass: hex_md5(document.getElementById("change_o").value),
        newpass: hex_md5(document.getElementById("change_pass").value)
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/savepass.jsp';
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
                message("修改成功");

            } else if (status == 2) {
                message("未知系统错误");
            } else if (status == 1) {
                message("原始密码错误");
            }
        }
    };
}

function admin() {
    document.getElementById("work-content").innerHTML = "<div style='width:800px;margin-left:50px;padding-top:30px;'><table id='table'><tr><td>uuid</td><td>用户名</td><td>手机号</td><td>邮箱</td></tr></table></div><div class='login'id='adduser' style='margin-top: 20px;margin-left:80px' onclick='addUserDia()'>添加用户</div>";
    var Obj = {
        uuid: uuid,
        token: token
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/getallusers.jsp';
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
                message("查询成功");
                showUsers(eval(result));
            } else if (status == 1) {
                message("没有权限");
            } else if (status == 2) {
                message("token过期，请重新登录");
            } else if (status == 3) {
                message("未知系统错误");
            }
        }
    };
}

function deleteUser(e) {
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
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/deleteuser.jsp';
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
                message("删除成功");
                admin();
            } else if (status == 1) {
                message("没有权限");
            } else if (status == 2) {
                message("token过期，请重新登录");
            } else if (status == 3) {
                message("未知系统错误");
            } else if (status == 4) {
                message("不能删除管理员");
            }
        }
    };
}

function showUsers(e) {
    for (var i = 0; i < e.users.length; i++) {
        var info = eval(e.users[i]);
        var td_id = document.createElement("td"); // 创建单元格
        var text_id = document.createTextNode(info.uuid); // 赋值给单元格的标签体
        td_id.appendChild(text_id);
        // name 的 单元格
        var td_name = document.createElement("td");
        var text_name = document.createTextNode(info.username);
        td_name.appendChild(text_name);
        //phone 的 单元格
        var td_phone = document.createElement("td");
        var text_phone = document.createTextNode(info.phone);
        td_phone.appendChild(text_phone);
        //email 的 单元格
        var td_email = document.createElement("td");
        var text_email = document.createTextNode(info.email);
        td_email.appendChild(text_email);
        // a标签的单元格
        var td_a = document.createElement("td");
        var ele_a = document.createElement("a");
        ele_a.setAttribute("href", "javascript:void(0);");
        ele_a.setAttribute("onclick", "deleteTr(this);");
        var text_a = document.createTextNode("删除");
        ele_a.appendChild(text_a); // 为a标签写入文本内容："删除"
        td_a.appendChild(ele_a); // 为td标签添加子标签（a标签）

        // 4.创建表格行
        var tr = document.createElement("tr");
        // 5.添加单元格到表格行中
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_phone);
        tr.appendChild(td_email);
        tr.appendChild(td_a);
        // 6.获取table
        var table = document.getElementById("table");
        table.appendChild(tr);
    }
}

function deleteTr(object) {
    // 获取table节点
    var table = object.parentNode.parentNode.parentNode;
    // 获取te节点
    var tr = object.parentNode.parentNode;
    console.log(tr.cells[0].innerText);
    if (tr.cells[0].innerText == uuid) {
        message("不能删除自己！");
        return;
    }
    deleteUser(tr.cells[0].innerText);
    // 删除（并返回）当前节点的指定子节点。
}

function addUser() {
    var username = /^[a-zA-Z]{4,12}$/;
    var password = /^\w{6,20}$/
    var phone = /^(13|14|15|17|18)\d{9}$/
    var mail = /^\w+[A-Za-z0-9|-]*\w*@([A-Za-z0-9]{1,}\.)+[A-Za-z0-9]{2,}$/
    if (!username.test(document.getElementById("add_name").value)) {
        document.getElementById("add_name").style = "border:1px solid red";
        message("用户名为4-16位英文字母");
        return;
    }
    if (!password.test(document.getElementById("add_pass").value)) {
        document.getElementById("add_pass").style = "border:1px solid red";
        message("密码为6-20位大小写字母、数字或下划线");
        return;
    }
    if (!phone.test(document.getElementById("add_phone").value)) {
        document.getElementById("add_phone").style = "border:1px solid red";
        message("手机号码位13、14、15、17、18开头的11位手机号");
        return;
    }
    if (!mail.test(document.getElementById("add_email").value)) {
        document.getElementById("add_email").style = "border:1px solid red";
        message("邮箱格式错误");
        return;
    }
    var Obj = {
        uuid: uuid,
        token: token,
        username: document.getElementById("add_name").value,
        phone: document.getElementById("add_phone").value,
        email: document.getElementById("add_email").value,
        pass: hex_md5(document.getElementById("add_pass").value)
    };

    console.log(Obj);

    // 将 js 对象格式化为 JSON 字符串
    var jsonStr = JSON.stringify(Obj);
    console.log(jsonStr);
    var xhr = new XMLHttpRequest();
    var url = 'http://localhost:8090/amberAuthApi_Web_exploded/adduser.jsp';
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
                message("添加成功");
                admin();
                removedia();
            } else if (status == 1) {
                message("没有权限");
            } else if (status == 2) {
                message("token过期，请重新登录");
            } else if (status == 3) {
                message("未知系统错误");
            } else if (status == 5) {
                message("用户名已被占用");
            } else if (status == 6) {
                message("手机号已被占用");
            } else if (status == 7) {
                message("邮箱已被占用");
            }
        }
    };
}