<template>
  <div class="loginbox">
    <headerBox></headerBox>
    <div class="box">
      <div class="head">
         <div class="title">登录</div>
         <div class="sub_title">没有账号？<router-link to="/regist">注册</router-link></div>
      </div>
      <div class="body">
        <div><input v-bind:class="{'active':active[0]==1}" @focus=changeBorder(0) type="text" name="" placeholder="电子邮件" v-model="email" autofocus></div>
        <div><input v-bind:class="{'active':active[1]==1}" @focus=changeBorder(1) type="password" name="" placeholder="密码" v-model="password"></div>
        <div class="forget"><router-link to="/forget">忘记密码</router-link></div>
        <div class="submit_box"><span class="submit_btn" @click=login>登录</span></div>
      </div>
      <div class="footer">
        <div>
          *登录后，即表示您同意我们的<router-link to="/disclaimer">免责条款</router-link>并接受中环数字电子邮件和更新，并确认您已阅读我们的<router-link to="/faq">常见问题</router-link>。
        </div>
      </div>
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import * as com from '@/util/common';
import * as api from '@/api/api';
import headerBox from "@/components/headerBox";
import footerBox from '@/components/footerBox';
import { mapGetters ,mapMutations  } from 'vuex';
import '@/util/jq_md5.js';


export default {
    data(){
        return {
          email:'',
          password:'',
          submit:0,
          active:[0,0]
        }
    },
    computed:{
        
    },
    components:{headerBox,footerBox},
    methods:{
        ...mapMutations({
          userLogin:'COM_USER_LOGIN',
          setUser:'COM_SET_RIGHTUSERNAME',
        }),
        login:function(){
          //邮箱密码验证
          if(this.email==''){
            com.toast('请先填写邮箱')
            return
          }
          if(this.password==''){
            com.toast('请填写密码')
            return
          }
          var Reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9_-]+$/;
          if(!Reg.test(this.email)){
            com.toast('邮箱格式错误');
            return
          }
          api.login({'email':this.email,'password':$.md5(this.password)}).then(res=>{
            if(res.code==200){
              com.toast('登录成功，页面即将跳转...');
              this.userLogin({name:this.email});
              this.setUser(this.email);
              setTimeout(()=>{
                com.layer_cancel();
                this.$router.push({path:'/deepNews'})
              },2000)
            }else{
              com.toast(res.msg_cn)
            }
          })
        },
        changeBorder:function(n){
          this.active=[0,0];
          this.active[n]=1;
        }
    },
    watch:{
  
    }
}
</script>

<style lang="less" scoped>
  .loginbox{
    color: #262b48;
    .box{
      max-width: 1200px;
      margin:0 auto;
      padding: 4% 2%;
      .head{
        .title{
          padding: 12px;
          font-size: 30px;
          text-align: center;
          line-height: initial;
          color: #262b48;
        }
        .sub_title{
          font-size: 20px;
          text-align: center;
          line-height: initial;
          a{
            text-decoration: none;
          }
        }
      }
      .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        div{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 400px;
          margin-top:4%;
          input{
            width: 100%;
            box-sizing: border-box;
            border:none;
            outline: none;
            font-size: 20px;
            padding: 12px;
            border-bottom: 1px solid #d7d7d7;
          }
          .active{
            border-bottom:2px solid #16436a;
          }
        }
        .forget{
          justify-content: flex-end;
          margin-top: 2%;
          a{
            color: #262b48;
            text-decoration: none;
          }
        }
        .submit_box{
          margin-top:2%;
          .submit_btn{
            padding: 10px 44px;
            border:1px solid #16436a;
            color: #16436a;
            border-radius: 20px;
            cursor: pointer;
          } 
        }
      }
      .footer{
        margin-top: 4%;
        line-height: 36px;
        div{
          width: 344px;
          text-align: center;
          margin: 0 auto;
          font-size: 12px;
          color: #999999;
          a{
            color: #3891e3;
            text-decoration: none;
          }
        }
      }
    }
  }
  @media screen and(max-width: 560px){ 
    .loginbox{
      .box{
        width: 90%;
        .body{
          div{
            width: 100%;
          }
        }
        .footer{
          div{
            width: 100%;
          }
        }
      }
    }
  }
</style>
