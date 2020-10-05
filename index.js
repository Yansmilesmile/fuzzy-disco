$(function () {
    var http = 'http://ajax.frontend.itheima.net'
    console.log(localStorage.getItem('token1'));
    getinfo(http)
})

//退出点击绑定事件
$('#log-out').click(function () {
    layer.open({
        content: '确定要退出吗'
        , btn: ['确定', '取消']
        , yes: function (index, layero) {
            //按钮【按钮一】的回调
            return self.location.href = 'login.html'
        }
        , btn2: function (index, layero) {
            //按钮【按钮二】的回调

            // return false
        }


    });
})
//获取基本信息函数
function getinfo(http) {
    $.ajax({
        method: 'GET',
        url: `${http}/my/userinfo`,
        headers: { Authorization: localStorage.getItem('token1') || '' },
        success: function (ajax) {
            console.log(localStorage.getItem('token1'));
            if (ajax.status !== 0) {
                console.log(ajax);
                layer.msg(ajax.message);

            } else {
                layer.msg(ajax.message);
                console.log(ajax);
                innerHTML(ajax)
            }
        },
        //这个回调函数无论请求成功失败都会调用这个函数
        complete: function (ajax) {
            console.log(ajax);
        //在complte函数中可以使用ajax。responseJSON.message 数据
            if (ajax.responseJSON.status == 1)
            {
               localStorage.removeItem('token1')
                return self.location.href = 'login.html'
            }
          }
    })

//渲染函数
    function innerHTML(ajax) {
        var name = ajax.data.username
        document.querySelector('#uname-span').innerHTML = name
        var name1 = ajax.data.username
        console.log(name1.substring(0,1));
       
        if (ajax.user_pic != undefined) {
            document.querySelector('#substr').innerHTML =  '<img src="" class="layui-nav-img"></img>'
            document.querySelector('#substr1').innerHTML=  '<img src="" class="layui-nav-img"></img>'
        } else {
            document.querySelector('#substr').innerHTML = name1.substring(0, 1)
            document.querySelector('#substr1').innerHTML = name1.substring(0, 1)
        }
    }
   
    

}