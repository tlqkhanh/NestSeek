<?php

use function PHPSTORM_META\type;

    function isAuth($type = null){
        if (isset($_SESSION['token']) && isset($_COOKIE['token'])){
            if ($_SESSION['token']==$_COOKIE['token']){
                if ($type){
                    return $_SESSION['type']==$type;
                }
                return true;
            }
        }
        return false;
    }


?>