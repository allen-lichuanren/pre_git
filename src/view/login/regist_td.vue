<template>
  <div class="regist">
    <headerBox></headerBox>
    <div class="box">
      <div class="head">
         <div class="title">註冊</div>
         <div class="sub_title">已有賬號？<router-link to="/login_td">登錄</router-link></div>
      </div>
      <div class="body">
        <div><input @focus=changeBorder(0) v-bind:class="{'active':active[0]}" type="text" name="" placeholder="電子郵件" v-model="email"></div>
        <div class="code_box"><input @focus=changeBorder(1) v-bind:class="{'active':active[1]==1}" type="text" name="" placeholder="郵箱驗證碼" v-model="code"> <span class="send_code" @click=send_email(send)>{{send}}</span></div>
        <div><input @focus=changeBorder(2) v-bind:class="{'active':active[2]==1}" type="password" name="" placeholder="密碼" v-model="password"></div>
        <div><input @focus=changeBorder(3) v-bind:class="{'active':active[3]==1}" type="password" name="" placeholder="確認密碼" v-model="repassword"></div>
        <div><input @focus=changeBorder(4) v-bind:class="{'active':active[4]==1}" type="text" name="" placeholder="邀請碼" v-model="inviteCode"></div>
        <div class="footer">
          <input type="checkbox" v-model=check id="myCheck" /><label for="myCheck"></label>
          <div>
            *註冊即表示您同意我們的<router-link to="/disclaimer_td">免責條款</router-link>並接受已閱讀我們的<router-link to="/faq_td">常見問題</router-link>。
          </div>
        </div>
        <div class="submit_box"><span class="submit_btn" @click=regist>註冊</span></div>
      </div>
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import headerBox from "@/components/headerBox_td";
import footerBox from '@/components/footerBox_td';
import * as com from "@/util/common";
import * as api from "@/api/api";
import '@/util/jq_md5.js';

export default {
    data(){
        return {
          send:'發送郵箱驗證碼',
          email:'',
          code:'',
          password:'',
          repassword:'',
          inviteCode:'',
          submit:0,
          active:[0,0,0,0,0],
          check:true,
        }
    },
    computed:{
        
    },
    created(){
        //邀请链接注册
        var inviteCode = this.$route.query.inviteCode;
        if(inviteCode){
          this.inviteCode=inviteCode
        }
    },
    components:{headerBox,footerBox},
    methods:{
        regist:function(){
          if(this.code==''){
            com.toast('請填寫驗證碼');
            return
          }
          if(this.email==''){
            com.toast('請填寫郵箱');
            return
          }
          if(this.password==''){
            com.toast('請填寫密碼');
            return
          }

          //密码校验 密码规则：长度为8-16个字符；不能使用中文、空格；至少含数字/字母/符号2种组合；不能含有非法字符，非法字符：\ / * ? : "<> | -+；~·

          if(this.password.length<8||this.password.length>16){
            com.toast('密碼長度為8-16個字符');
            return
          }

          
          if(this.repassword==''){
            com.toast('請重復填寫密碼');
            return
          }
          var Reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9_-]+$/;
          if(!Reg.test(this.email)){
            com.toast('郵箱格式錯誤')
            return
          }
          if(this.password!=this.repassword){
            com.toast('兩次密碼不壹致');
            return
          }
          if(!this.check){
            com.toast('請閱讀使用條款和隱私政策');
            return
          }

          api.regist({'email':this.email,'email_code':this.code,'password1':$.md5(this.password),'password2':$.md5(this.repassword),'invite_code':this.inviteCode}).then(res=>{
            if(res.code==200){
              com.toast('註冊成功,頁面即將跳轉...');
              var time=setTimeout(()=>{
                this.$router.push({path:'/login'});
              },2000)
            }else{
              com.toast(res.msg_cn)
            }
          })

        },
        send_email:function(){

          if(this.send.length<=3){
            return
          }
          //郵箱格式驗證
          if(this.email==''){
            com.toast('請填寫郵箱')
            return
          }
          var Reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9_-]+$/;
          if(Reg.test(this.email)){
            api.sendEmailCode({email:this.email}).then(res=>{

              if(res.code!=200){
                com.toast(res.msg_cn);
                return
              }
              
              com.toast('發送成功')
              var t=60;
              var time=setInterval(()=>{
                if(t<=0){
                  this.send='發送郵箱驗證碼';
                  clearInterval(time);
                  return
                }
                this.send=t+'s';
                t--;
              },1000)
            })
          }else{
            com.toast('郵箱格式錯誤')
          }
        },
        changeBorder:function(n){
          this.active=[0,0,0,0];
          this.active[n]=1;
        }
    },
    watch:{
  
    }
}
</script>

<style lang="less" scoped>
  .regist{
    color: #3a416e;
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
            color: #3891e3;
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
          border-bottom: 1px solid #d7d7d7;
          input{
            width: 100%;
            box-sizing: border-box;
            border:none;
            outline: none;
            font-size: 20px;
            padding: 12px;
          }
          .active{
            border-bottom: 2px solid #16436a;
            position: relative;
            top:1px;
          }
        }
        .code_box{
          justify-content: space-between;
          input{
            width: 50%;
            border:none;
          }
          .send_code{
            display: inline-block;
            padding: 10px 16px;
            background-color:#16436a;
            color: #fff;
            border-radius: 8px;
            cursor: pointer;
            min-width: 100px;
            text-align:center;
          }
          .active{
            border:none;
            top: 0;
            outline: 2px solid #16436a;
          }
        }
        .submit_box{
          border:none;
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
        border-bottom: none !important;
        display: flex;
        #myCheck{
          width: auto;
          display: none;
        }
        #myCheck + label{
          background-color: white;
          border:1px solid #d3d3d3;
          width:16px;
          height:16px;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          line-height: 14px;
        }
        #myCheck:checked + label{
            background-color: #eee;
        }
        #myCheck:checked + label:after{
            content:"\2714";
        }
        div{
          width: 344px;
          margin: 0 auto;
          font-size: 14px;
          display: block;
          border-bottom: none;
          line-height: 24px;
          a{
            color: #3891e3;
            text-decoration: none;
          }
        }
      }
    }
  }
  @media screen and(max-width: 560px){ 
    .regist{
      .box{
        width: 90%;
        .body{
          div{
            width: 100%;
          }
        }
        .footer{
          div{
            width: 84%;
          }
        }
      }
    }
  }
</style>
