<template>
  <div class="forget">
    <headerBox></headerBox>
    <div class="box">
      <div class="head">
         <div class="title">重置密碼</div>
      </div>
      <div class="body">
        <div><input @focus=changeBorder(0) v-bind:class="{'active':active[0]}" type="text" name="" placeholder="電子郵件" v-model="email"></div>
        <div class="code_box"><input @focus=changeBorder(1) v-bind:class="{'active':active[1]==1}" type="text" name="" placeholder="郵箱驗證碼" v-model="code"> <span class="send_code"  @click=send_code>{{send}}</span></div>
        <div><input @focus=changeBorder(2) v-bind:class="{'active':active[2]==1}" type="password" name="" placeholder="新密碼" v-model="password"></div>
        <div><input @focus=changeBorder(3) v-bind:class="{'active':active[3]==1}" type="password" name="" placeholder="確認密碼" v-model="repassword"></div>
        <div class="submit_box"><span class="submit_btn" @click=forget>提交</span></div>
      </div>
      <!-- <div class="footer">
        <div>
          *登錄後，即表示您同意我們的<router-link to="/">使用條款</router-link>並接受中環數字電子郵件和更新，並確認您已閱讀我們的<router-link to="/">隱私政策</router-link>。
        </div>
      </div> -->
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import headerBox from "@/components/headerBox_td";
import footerBox from '@/components/footerBox_td';
import * as com from '@/util/common'
import * as api from '@/api/api'
import '@/util/jq_md5.js';
export default {
    data(){
        return {
          send:'發送郵箱驗證碼',
          email:'',
          code:'',
          password:'',
          repassword:'',
          submit:0,
          active:[0,0,0,0]
        }
    },
    computed:{
        
    },
    components:{headerBox,footerBox},
    methods:{
        forget:function(){
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
          api.forget({'email':this.email,'password1':$.md5(this.password),'password2':$.md5(this.repassword),'email_code':this.code}).then(res=>{
            if(res.code==200){
              com.toast('修改成功,頁面即將跳轉...');
              var time=setTimeout(()=>{
                this.$router.push({path:'/login'});
              },2000)
            }else{
              com.toast(res.msg_cn)
            }
          })
        },
        changeBorder:function(n){
          this.active=[0,0,0,0];
          this.active[n]=1;
        },
        send_code:function(){
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
            api.repasswordSendEmailCode({email:this.email}).then(res=>{
              if(res.code==200){
                com.toast('發送成功');
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
              }else{
                com.toast(res.msg_cn);
                return
              }
            })
          }else{
            com.toast('郵箱格式錯誤')
          }
        }
    },
    watch:{
  
    }
}
</script>

<style lang="less" scoped>
  .forget{
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
            border-bottom: 2px solid #3891e3;
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
            padding: 10px 16px;
            background-color:#3891e3;
            color: #fff;
            border-radius: 8px;
            cursor: pointer;
            min-width: 100px;
            text-align: center;
          }
          .active{
            border:none;
            top: 0;
            outline: 2px solid #3891e3;
          }
        }
        .submit_box{
          border:none;
          margin-top: 10%;
          .submit_btn{
            padding: 10px 44px;
            border:1px solid #3891e3;
            color: #3891e3;
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
          a{
            color: #3891e3;
            text-decoration: none;
          }
        }
      }
    }
  }
  @media screen and(max-width: 560px){ 
    .forget{
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
