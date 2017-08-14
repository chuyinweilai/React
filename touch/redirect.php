<?php
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Headers:Content-Type, X-PINGOTHER, If-Modified-Since, Origin, No-Cache, X-Requested-With');
    header('Access-Control-Allow-Methods:POST, GET, OPTIONS');
    header('X-Accel-Buffering: no');
    header("Content-type: application/json;charset=utf-8");
    header("Connection: Keep-alive");

    $url = $_GET['url']?$_GET['url']:$_POST['url'];


    //$url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='.$appid.'&secret='.$secret.'&code='.$code.'&grant_type=authorization_code';
    $res = file_get_contents($url);
    echo $res;
?>
