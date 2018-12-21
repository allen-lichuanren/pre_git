<template>
    <section>
        <div class="footer">
            <div class="">
                <img src="../img/foot_logo.png" width='216' height="138">
                <ul class="">
                  <li class="title">服务说明</li>
                  <li><router-link to="/disclaimer">免责条款</router-link></li>
                  <li><router-link to="/faq">常见问题</router-link></li>
                </ul>
                <ul class="">
                  <li class="title">链接</li>
                  <li><a href="https://www.huobi.com/" target="_blank">Huobi</a></li>
                  <li><a href="https://www.kraken.com/" target="_blank">Kraken</a></li>
                </ul>
            </div>
        </div>
        <div class="bottom">
            <div>
                <span style="margin-right: 30px;">如有疑问，欢迎您的投递我们的邮箱：tech@centralcrypto.io</span>
                <!-- <span>&copy; 2018 - Théâtre de la Ville</span> -->
            </div>
        </div>
        <div class="footer_mobile">
            <div class="">
                <ul class="title">
                  <li>服务说明</li>
                  <li>链接</li>
                  <li>联系我们</li>
                </ul>
                <ul class="center">
                  <li><router-link to="/disclaimer">免责条款</router-link></li>
                  <li><a href="https://www.huobi.com/" target="_blank">Huobi</a></li>
                  <li><a href="Mailto:832982890@qq.com">832982890@qq.com</a></li>
                </ul>
                <ul class="">
                  <li><router-link to="/faq">常见问题</router-link></li>
                  <li><a href="https://www.kraken.com/" target="_blank">Kraken</a></li>
                </ul>
            </div>
        </div>
        <div class="bottom_mobile">
            <div>
                <!-- <span>&copy; 2018 - Théâtre de la Ville</span> -->
            </div>
        </div>
    </section>
</template>
<style lang='less' scoped>
section{
    background: url(../img/foot_bg.png) no-repeat center center;
    margin-top:20px;
} 
.footer_mobile,.bottom_mobile{
    display: none;
}
.footer,.bottom{
    width: 100%;
    max-width: 1200px;
    margin:0 auto;
}
.footer>div{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 60px;
    ul{
        border-left: 2px solid #283c4c;
        padding-left: 60px;
       li{
            color: #a7b4c4;
            margin-bottom: 36px;
            a{
                color: #a7b4c4;
            }
        } 
        li:last-child{
            margin-bottom: 0;
        }
        .title{
            color:#fff;
            font-size: 18px;
        }
    }
}
.bottom{
    div{
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding: 20px 0;
        color: #fff;
    }
}
@media screen and(max-width: 320px){ 
    .footer,.bottom{
        display: none;
    }
    .footer_mobile,.bottom_mobile{
        display: block;
        width: 90%;
        margin:0 auto;
    }
    .footer_mobile>div{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-top: 60px;
        ul{
           li{
                color: #a7b4c4;
                margin-bottom: 36px;
                a{
                    color: #a7b4c4;
                }
            } 
            li:last-child{
                margin-bottom: 0;
            }
            
        }
        .center{
            width: 62px;
        }
        .title{
            li{
                color:#fff;
                font-size: 16px;
            }
        }
    }
    .bottom_mobile{
        div{
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 20px 0;
            color: #fff;
        }
    }
} 
@media screen and(min-width: 321px)and(max-width: 700px){ 
    .footer,.bottom{
        display: none;
    }
    .footer_mobile,.bottom_mobile{
        display: block;
        width: 80%;
        margin:0 auto;
    }
    .footer_mobile>div{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-top: 60px;
        ul{
           li{
                color: #a7b4c4;
                margin-bottom: 36px;
                a{
                    color: #a7b4c4;
                }
            } 
            li:last-child{
                margin-bottom: 0;
            }
            
        }
        .center{
            width: 62px;
        }
        .title{
            li{
                color:#fff;
                font-size: 18px;
            }
        }
    }
    .bottom_mobile{
        div{
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 20px 0;
            color: #fff;
        }
    }
}
@media screen and(min-width: 701px)and(max-width: 1199px){ 
    .footer,.bottom{
        width: 80%;
        margin:0 auto;
    }
} 
</style>
