<template>
  <div class="personal_center" @click=init_modify>
    <headerBox></headerBox>
    <div class="row box">
        <div class="col-lg-2 box_left offset-lg-2">
          <ul class="text-center">
            <div class="head ">
              <div class="img_box">
                  <img class="" v-bind:src="'./static/img/'+imgName[userInfo.img]+'.png'" alt="">
              </div>
              <p class="integ">积分 <span class="num_red">{{userInfo.award_points}}</span></p>
            </div>
            <li v-for="(tab,index) in tabLists" @click=hoho(tab) v-bind:class="{'active':tab.active==true}" v-if="index<4">
              <img :src="tab.icon" alt=""><span>{{tab.name}}</span>
            </li>
          </ul>
        </div>
        <div class="box_left_m">
          <div class="head ">
              <div class="img_box">
                  <img class="" v-bind:src="'./static/img/'+imgName[userInfo.img]+'.png'" alt="">
              </div>
              <p class="integ">{{userInfo.nickname.val}} <span class="num_red">积分{{userInfo.award_points}}</span></p>
            </div>
          <ul class="text-center row">
            <li class="col-sm-3" v-for="(tab,index) in tabLists" @click=hoho(tab) v-bind:class="{'active':tab.active==true}" v-if="index<4">
              <div class="btn-group" v-if="index==0">
                <a class="btn dropdown-toggle" data-toggle="dropdown">{{tab.name}}<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><span @click.stop=hoho(tabLists[0])>修改个人资料</span></li>
                  <li><span @click.stop=hoho(tabLists[5])>修改头像</span></li>
                </ul>
              </div>
              <div class="btn-group" v-if="index==2">
                <a class="btn dropdown-toggle" data-toggle="dropdown">{{tab.name}}<span class="caret"></span></a>
                <ul class="dropdown-menu" role="menu">
                  <li><span @click.stop=hoho(tabLists[2])>我的收藏</span></li>
                  <li><span @click.stop=hoho(tabLists[6])>最近浏览</span></li>
                </ul>
              </div>
              <span v-if="index!=0&&index!=2">{{tab.name}}</span>
            </li>
          </ul>
        </div>
        <div class="col-lg-6 box_right"  >
            <div v-bind:class="{'right_mation':true,'right_mation1':true,'active':tabLists[0].active==true}" >
              <div class="head"><span @click=hoho(tabLists[0]) class="span_sel">修改个人资料</span><span @click=hoho(tabLists[5])>修改头像</span></div>
              
              <div class="form_box">
                <ul>
                  <li>昵称：<input type="text" v-model="userInfo.nickname.val"  v-bind:disabled="userInfo.nickname.state==false" v-focus="userInfo.nickname.focus"><span class="revise" @click="revise('nickname')">{{userInfo.nickname.state==false?'修改':'取消'}}</span></li>
                  <li>性别 
                    <input id="man" type="radio" v-model="userInfo.gender.val" value="1"  :disabled="userInfo.gender.state==false"/><label for="man">男</label>
                    <input id="woman" type="radio" v-model="userInfo.gender.val" value="2" :disabled="userInfo.gender.state==false"/><label for="woman">女</label>
                    <span class="revise" @click="revise('gender')">{{userInfo.gender.state==false?'修改':'取消'}}</span>
                  </li>
                  <!-- <li>邮箱：<input type="email" v-model="userInfo.email.val"  v-bind:disabled="userInfo.email.state==false" v-focus="userInfo.email.focus"><span class="revise" @click="revise('email')">{{userInfo.email.state==false?'修改':'取消'}}</span></li> -->
                  <li>公司：<input type="text" v-model="userInfo.company.val"  v-bind:disabled="userInfo.company.state==false" v-focus="userInfo.company.focus"><span class="revise" @click="revise('company')">{{userInfo.company.state==false?'修改':'取消'}}</span></li>
                  <li>职位：<input type="text" v-model="userInfo.position.val"  v-bind:disabled="userInfo.position.state==false" v-focus="userInfo.position.focus"><span class="revise" @click="revise('position')">{{userInfo.position.state==false?'修改':'取消'}}</span></li>
                  <li>邀请码：<input type="text" v-model="userInfo.invite.val"  v-bind:disabled="false"><span></span></li>
                </ul>
                <span v-show="submit_base_info" @click="updateInfo('submit_base_info')" class="sub-btn">提交</span>
              </div>
            </div>
            <div v-bind:class="{'right_mation':true,'right_mation2':true,'active':tabLists[2].active==true}" >
              <div class="head"><span @click=hoho(tabLists[2]) class="span_sel">我的收藏</span><span @click=hoho(tabLists[6])>最近浏览</span></div>
              <ul>
                <li v-if="collection.length==0" style="height: 160px;border-bottom: none; justify-content: center;">
                  暂无收藏
                </li>
                <li v-if="collection.length!=0" v-for="item in collection">
                  <img :src="item.thumbnail" alt="">
                  <div class="new_txt">
                      <div class="txt_mation">
                          <h2>{{item.title}}</h2>
                          <div @click=article_detial(item.aid) >{{item.summary}}</div>
                          <div style="display: flex; justify-content: space-between;align-items: flex-end;">
                            <span>
                              <span @click=article_detial(item.aid) class="read_txt">阅读全文</span>
                              <span class="time">{{item.time}}</span>
                            </span>
                            
                            <span class="concern" @click=cancelCollect >取消收藏</span>
                          </div>
                      </div>
                  </div>
                </li>
              </ul>
              <div class="page_select pageContainer" v-if="collection.length>0">
                  <ul class="pagesInner">
                     <li v-if="collectionState.select!=1" class="page" @click="prevOrNext(-1)"><span aria-hidden="true">上一页</span></li>
                     <li class="page" v-for="(item, index) in pages" :key="index" :class="{actived: item === collectionState.select}" @click="select(item)"><span>{{item}}</span></li>
                     <li v-if="collectionState.select!=collectionState.pages" class="page" @click="prevOrNext(1)"><span aria-hidden="true">下一页</span></li>
                  </ul>
                </div>
            </div>
            <div v-bind:class="{'right_mation':true,'right_mation3':true,'active':tabLists[3].active==true}" >
              <div class="head"><span class="span_sel">我的邀请</span></div>
              <div class="invite_hint">
                  <div class="title">温馨提示</div>
                  <ul>
                    <li>1、分享好友并注册成功后，您可获得2积分奖励。</li>
                    <li>2、您邀请的好友成功再邀请其他好友，您可获得1积分的额外奖励。</li>
                    <li>3、二级邀请：您邀请的好友成功再邀请其他好友。</li>
                    <li>4、积分可兑换代币哦，赶紧来分享吧~</li>
                  </ul>
              </div>
              <div class="invite_link">
                <span>我的邀请链接</span>
                <span class="link_box">
                  <span id="clicpcopy" >http://market.centralcrypto.io/#/regist?inviteCode={{userInfo_default.invite.val}}</span>
                  <span class="cliptext_btn" @click=clickCopy :data-clipboard-text="'http://market.centralcrypto.io/#/regist?inviteCode='+userInfo_default.invite.val" >点击复制</span>
                </span>
              </div>
              <div class="head"><span class="span_sel">邀请记录</span></div>
              <div class="invite_list"> 
                  <table class="table">
                    <thead>
                      <tr>
                        <th>邀请用户</th>
                        <th>二级邀请</th>
                        <th>注册时间</th>
                        <th>邀请奖励（积分）</th>
                        <th>奖励状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="inviteRecord.length==0">
                        <td colspan=5 style="text-align: center;">暂无邀请记录</td>
                      </tr>
                      <tr v-if="inviteRecord.length>0" v-for="item in inviteRecord">
                        <td :title="item.email">{{item.email}}</td>
                        <td>{{item.second?'是':'否'}}</td>
                        <td>{{item.registe_time}}</td>
                        <td>{{item.second?'1':'2'}}</td>
                        <td>{{item.state}}</td>
                      </tr>

                    </tbody>
                  </table>
              </div>
              
            </div>
            <div v-bind:class="{'right_mation':true,'right_mation4':true,'active':tabLists[1].active==true}" >
              <div class="head"><span class="span_sel">安全设置</span></div>
              <ul>
                  <li><span class="name">密码登陆</span><span class="bind">已设置</span> <span class="suggest">建议使用8-12 个字符以上的字母与数字组合</span> <span></span><span @click.stop=toggle_modify style="cursor: pointer;" class="revise">修改</span></li>
                  <li><span class="name">绑定邮箱</span><span class="bind">已绑定</span> <span class="suggest">绑定邮箱可找回密码，登录平台，重要通知等</span> <span></span><a style="opacity: 0" class="revise">修改</a></li>
                  <li><span class="name">绑定手机</span><span class="unbind">未绑定</span> <span class="suggest">绑定手机可找回密码（适用APP），活动通知等</span> <span></span><span class="suggest">未开放</span></li>
              </ul>
              <button class="esc btn btn-primary" @click=signout>退出账号</button>
            </div>

            <div v-bind:class="{'right_mation':true,'right_mation1':true,'active':tabLists[5].active==true}" >
              <div class="head"><span @click=hoho(tabLists[0])>修改个人资料</span><span @click=hoho(tabLists[5]) class="span_sel">修改头像</span></div>
              <div class="select_box">
                <div>
                  已选
                </div>
                <div class="select_img">
                  <img :src="'./static/img/'+imgName[userInfo.imgUp]+'.png'">
                  <img class="select_icon" src="../../img/select_img.png">
                </div>
              </div>
              <div class="pic_box">
                <div>
                  可选
                </div>
                <div class="pic_list">
                  <div v-for="(item,index) in imgName" v-if="index>0">
                    <img   :src="'./static/img/'+item+'.png'" alt="" @click=changePic(index)>
                  </div>
                </div>
              </div>
              <span v-show="submit_pic" @click="updateInfo('submit_pic')" class="sub-btn">提交</span>
            </div>

            <div v-bind:class="{'right_mation':true,'right_mation1':true,'active':tabLists[6].active==true}">
              <div class="head"><span @click=hoho(tabLists[2]) >我的收藏</span><span class="span_sel" @click=hoho(tabLists[6])>最近浏览</span></div>
              <ul class="read_record">
                  <li v-if="record.length==0" style="height: 160px;justify-content: center;">
                    暂无浏览记录
                  </li>
                  <li  v-for="item in record" v-if="item" @click=article_detial(item.aid)>
                    <span class="circ"></span><span class="title">{{item.title}}</span>
                  </li>
              </ul>
            </div>
        </div>
    </div>
    <div class="modify" v-if="modify_pass" @click.stop>
      <div class="title">修改登陆密码</div>
      <div class="cont">
        <div><label>当前登陆邮箱</label><span>{{userInfo_default.email.val}}</span></div>
        <div><label>当前登陆密码</label><input v-model="password[0]" type="password"/></div>
        <div><label>新登陆密码</label><input v-model="password[1]" type="password"/><p>建议使用8-12 个字符以上的字母与数字组合</p></div>
        <div><label>确认新密码</label><input v-model="password[2]" type="password"/></div>
      </div>
      <div class="confirm"><button @click=resetPass>确定</button></div>
    </div>
    <footerBox></footerBox>
    </div>
    



  </div>
</template>

<script>
import footerBox from '@/components/footerBox'
import headerBox from '@/components/headerBox'
import * as api from '@/api/api'
import * as com from '@/util/common'
import Clipboard from 'clipboard'
import '@/util/jq_md5.js';
import { mapGetters ,mapMutations  } from 'vuex';
export default {
    data(){
        return {
          tabLists:[
            {'name':'个人资料','icon':require('../../img/per-icon.png'),'active':true},
            {'name':'安全设置','icon':require('../../img/set-icon.png'),'active':false},
            {'name':'我的收藏','icon':require('../../img/collect-icon.png'),'active':false},
            {'name':'我的邀请','icon':require('../../img/invite-icon.png'),'active':false},
            {'name':'帮助中心','icon':require('../../img/help-icon.png'),'active':false},
            {'name':'修改头像','icon':require('../../img/help-icon.png'),'active':false},
            {'name':'浏览记录','icon':require('../../img/help-icon.png'),'active':false},
          ],
          img_list:['./static/img/male1.png','./static/img/female1.png','./static/img/male2.png','./static/img/female2.png','./static/img/male3.png','./static/img/female3.png'],
          userInfo:{
            img:1,
            imgUp:1,
            nickname:{val:'Wang',state:false,focus:false,modify:false},
            gender:{val:2,state:false,modify:false},
            email:{val:'732332881@qq.com',state:false,focus:false,modify:false},
            company:{val:'暂无',state:false,focus:false,modify:false},
            position:{val:'暂无',state:false,focus:false,modify:false},
            invite:{val:'112340'},
            create:{val:''},
            award_points:'',
          },
          userInfo_default:{
            img:1,
            imgUp:1,
            nickname:{val:'Wang',state:false,focus:false,modify:false},
            gender:{val:2,state:false,modify:false},
            email:{val:'732332881@qq.com',state:false,focus:false,modify:false},
            company:{val:'暂无',state:false,focus:false,modify:false},
            position:{val:'暂无',state:false,focus:false,modify:false},
            invite:{val:'112340'},
            create:{val:''},
            award_points:'',
          },
          submit_base_info:false,
          file:'',
          submit_pic:false,
          modify_pass:false,
          collection:[],
          record:[],
          collectionState:{pages:1,number:0,select:1},
          imgName:['default','male1','female1','male2','female2','male3','female3'],
          password:['','',''],
          inviteRecord:[],
        }
    },
    components:{ footerBox,headerBox },
    computed:{
        pages() {
          const c = this.collectionState.select;
          const t = this.collectionState.pages;
          if (t <= 5) {
            var arr=[];
            for(let i=1;i<=t;i++){
              arr.push(i)
            }
            return arr //第一种情况
          } else if (c >= t - 4) {
            return [1, '...', t-4, t-3, t-2, t-1, t] //第二种情况
          } else {
            return [1, '...', c, c+1, c+2, c+3, '...', t] //第三种情况
          }
        }
    },
    methods:{
      ...mapMutations({
          userLogin:'COM_USER_LOGIN',
          setUser:'COM_SET_RIGHTUSERNAME',
          userLogout:'COM_USER_LOGOUT'
        }),
      hoho(tab){
        for(var i=0;i<this.tabLists.length;i++){
          this.tabLists[i].active=false;
        }
        tab.active=true;
      },
      revise(key){
        var keys=Object.keys(this.userInfo);
        if(this.userInfo[key].state){
          this.userInfo[key].val=this.userInfo_default[key].val
        }

        this.userInfo[key].state=!this.userInfo[key].state;

        var submit_base_info=0;
        for(var i=0;i<keys.length;i++){
          var v=keys[i];
          if(typeof this.userInfo[v].focus!=='undefined'){
            this.userInfo[v].focus=false;
          }
          if(v!='img'&&this.userInfo[v].state){
            submit_base_info++;
          }
        }
        this.submit_base_info=submit_base_info>0?1:0;
        this.userInfo[key].modify=!this.userInfo[key].modify;
        if(typeof this.userInfo[key].focus!=='undefined'){
          this.userInfo[key].focus=this.userInfo[key].state
        }       
      },
      upload(){
        var btn=window.document.getElementById('uploadFile')
        btn.click();
      },
      changeFile(e){

        var file=e.target.files[0];

        var reader = new FileReader();  
  
        //创建文件读取相关的变量  
        var imgFile;  
        //为文件读取成功设置事件  
        reader.onload=(e)=>{  
            imgFile = e.target.result;  
            this.userInfo.imgUp=imgFile;
            this.submit_base_info=true;
            this.file=file;
        };
        //正式读取文件  
        reader.readAsDataURL(file);
      },
      //退出登录
      signout(){
        api.signout().then(res=>{
          if(res.code==200){
            this.userLogout();
            com.toast('退出成功,页面即将跳转...');
            setTimeout(()=>{
              this.$router.replace({path:'/deepNews'})
            },2000)
          }else{
            com.toast(res.msg_cn)
          }
        })
      },
      //更新用户信息
      updateInfo(state){
        var data={
          email:this.userInfo.email.val,
          nick:this.userInfo.nickname.val,
          gender:this.userInfo.gender.val,
          company:this.userInfo.company.val,
          position:this.userInfo.position.val,
          headImg:this.imgName[this.userInfo.imgUp]
        }
        var load=layer.load(2, { shade: [0.01, '#fff']});
        api.upDateUserInfo(data).then(res=>{
          if(res.code==200){
            com.toast('修改成功');
            //1s后刷新页面
            setTimeout(()=>{
              layer.closeAll()
              //this.$router.go(0);
              this.getUserInfo();
              this[state]=false;

            },1000)
          }else{
            com.toast(res.msg_cn)
          }
        })
      },
      //获取用户信息
      getUserInfo(){
        api.getRightUserInfo().then(res=>{

          //获取当前用户基本信息
          if(JSON.stringify(res)=='{}'||res.success===false){
            com.toast('系统错误')
          }else if(res.code){
            com.toast(res.msg_cn)
          }
          else{
            //更新data

            //res=res.userinfo;
            //日期格式化
            //var date=new Date(res.CREATE_TIME*1);
            //var dateStr=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日';

            // company:中精,                   //单位：默认为 ''
            // email:"836023725@qq.com",             //注册邮箱
            // gender:1,                     //性别：1 男 ；2 女 ；'' 未填写
            // headImg:'http:192.168.31.99:7000/img/default.png',  //返回默认头像
            // nickname:'',                    //昵称：默认为 ''
            // position:'',                    //职位：默认为 ''
            // inviteCode
            let imgIndex=0
            if(res.headImg){
              let str=res.headImg.split('/img/')[1]
              str=str.split('.')[0]
              imgIndex=this.imgName.indexOf(str);
            }

            this.userInfo_default={
              img:imgIndex,
              imgUp:imgIndex,
              nickname:{val:res.nick?res.nick:'',state:false,focus:false,modify:false},
              gender:{val:res.gender!=null&&res.gender!=undefined&&res.gender!=''?res.gender:1,state:false,modify:false},
              email:{val:res.email,state:false,focus:false,modify:false},
              company:{val:res.company?res.company:'',state:false,focus:false,modify:false},
              position:{val:res.position?res.position:'',state:false,focus:false,modify:false},
              invite:{val:res.inviteCode},
              award_points:res.award_points,
            }
            this.userInfo=this.userInfo_default;
          }
        })
      },
      changePic(address){
        if(this.userInfo.img!=address){
          this.userInfo.imgUp=address;
          this.submit_pic=true;
        }
      },
      toggle_modify(){
        this.modify_pass=!this.modify_pass;
      },
      init_modify(){
        this.modify_pass=false;
      },
      article_detial(aid){
        this.$router.push({path:'/newsDetail',query:{'aid':aid}})
      },
      getcollection(){
        api.getcollection({language:'1',pagesize:'3',page:this.collectionState.select}).then(res=>{
          if(res.code!=102&&res.code!=100){

            //更新 收藏文章状态
            this.collectionState.number=res.totalCount;//pages:1,number:0;
            this.collectionState.pages=Math.ceil(res.totalCount*1/3)

            this.collection=[];
            res=res.collectionList;
            for(let i=0;i<res.length;i++){
              let date=new Date(res[i].published_time*1);
              res[i].time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
              
            }
            this.collection=res;
          }else{
            com.toast(res.msg_cn)
          }
        })
      },
      getRecord(){
        api.record({language:1}).then(res=>{
          if(res.code!=100&&res.code!=102){
            this.record=[res[0],res[1],res[2],res[3],res[4]];
            if(!res[0]){
              this.record=[];
            }
          }else{
            com.toast(res.msg_cn)
          }
        })
      },
      select(n) {
        if (n === this.collectionState.select) return
        if (typeof n === 'string') return
        this.collectionState.select = n;
        this.getcollection();
      },
      prevOrNext (n) {
        this.collectionState.select += n
        this.collectionState.select < 1 ? this.collectionState.select = 1 : this.collectionState.select > this.collectionState.pages ? this.collectionState.select = this.collectionState.pages : null
        this.getcollection();
      },
      clickCopy(){
          var clipboard = new Clipboard('.cliptext_btn');
          clipboard.on('success', function(e) {
              
              com.toast('复制成功！')
          });
          //浏览器不支持clicpboard
          clipboard.on('error', function(e) {
              com.toast('您的浏览器不支持该功能，请在页面中手动复制该链接');
          });
      },
      cancelCollect(aid){
        console.log(aid)

      },
      resetPass(){

        if(this.password[0]==''){
          com.toast('请填写旧密码');
          return
        }
        if(this.password[1]==''){
          com.toast('请填写新密码');
          return
        }
        if(this.password[2]==''){
          com.toast('请重复填写新密码');
          return
        }
        
        if(this.password[1]!=this.password[2]){
          com.toast('两次新密码不一致');
          return
        }
        if(this.password[1].length<8||this.password[1].length>16){
          com.toast('密码长度为8-16个字符');
          return
        }
        api.forget({'password1':$.md5(this.password[1]),'password2':$.md5(this.password[2])}).then(res=>{
          if(res.code==200){

            api.signout().then(res=>{
              if(res.code==200){
                this.userLogout();
              }else{
                com.toast(res.msg_cn)
              }
            })
            
            com.toast('修改成功,页面即将跳转...');
            var time=setTimeout(()=>{

              this.$router.push({path:'/login'});
            },2000)
          }else{
            com.toast(res.msg_cn)
          }
        })
      },
      getInviteRecord(){
        api.getInviteRecord().then(res=>{
          if(res.code==102||res.code==100){
            com.toast(res.msg_cn)
          }else{
            this.inviteRecord=[];
            if(res.firstInvite){
              for(var i=0;i<res.firstInvite.length;i++){

                var data=res.firstInvite[i];
                var date=new Date(data.registe_time*1)
                data.registe_time=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
                data.second=false;
                data.state='已发送'

                this.inviteRecord.push(data)
              }
            }
            if(res.secondInvite){
              for(var i=0;i<res.secondInvite.length;i++){
                var data=res.secondInvite[i];
                var date=new Date(data.registe_time*1)
                data.registe_time=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
                data.second=true;
                data.state='已发送'

                this.inviteRecord.push(data)
              }
            }
          }
        })
      }

      
    },
    watch:{
  
    },
    created(){
      this.getUserInfo();
      this.getcollection();
      this.getRecord();
      this.getInviteRecord();
    }
}



</script>

<style lang="less" scoped>
    .personal_center{
      position: relative;
      color: #3a416e;
      background: #f9f9f9;
      .box{
        /*max-width: 1200px;*/
        margin:0 auto;
        clear: both;
        overflow: hidden;
        padding: 2% 0;
        .span_sel{
          border-bottom:2px solid #1d2032;
          color: #1d2032 !important;
        }
        .box_left_m{
          display: none;
        }
        .box_left{
          display: block;
          height: 720px;
          background: #fff;
          position: relative;
          box-shadow: 0px 10px 2px 24px #f9f9f9;
          z-index: 1;
          ul li{
            font-size: 16px;
            padding: 12px 0;
            box-sizing: border-box;
            margin-bottom: 8px;
            cursor: pointer;
            border-left:2px solid #fff;
            img{margin-right: 3%;}
            span{width: 68px;text-align: justify;display: inline-block;text-align: justify;text-align-last: justify;}
            /*span:after{content: "";}*/
          }

          

          .active{
            border-left: 2px solid #3891e3;
            background-color:#f8f8f8;
          }
          .head{
            height: 160px;
            .img_box{
              margin:20% auto;
              width: 100px;
              height: 100px;
              background-color: #ccc;
              border-radius: 50%;
              overflow: hidden;
            }

            img{
              width: 100%;
            }
            .integ{
              position: relative;
              top:-30px;
              line-height: 20px;
              font-size: 14px;
            }
            .num_red{color: red;}
          }
        }
        .page_select{
            text-align: center;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            ul{
              height: auto !important;
              li{
                display: inline-block !important;
                padding: 4px 14px !important;
                border: 1px solid #ccc !important;
                border-radius: 4px !important;
                margin: 0 4px !important;
                cursor: pointer;
              }
              .actived{
                background: #16436a;
                cursor: default;
                color: #fff;
                border: 1px solid #16436a;
              }
            } 
          }
        .table thead {
          th{
            vertical-align: middle;
            border-bottom:none;
            background-color:#e9ebef;
            max-width: 90px;
          }
        }
        .table th, .table td{
          vertical-align: middle;
        }
        .table tbody{
          tr td:first-child{
            max-width: 60px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .read_record{
          padding: 16px 8px;
          li{
            display: flex;
            align-items: center;
            color: #20243a;
            cursor: pointer;
            padding: 20px 0;
            .circ{
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background-color: #20243a;
              margin-right: 16px;
              min-width: 6px;
            }
          }
        }
        .invite_hint{
          margin: 16px;
          padding: 12px;
          color: #9fb3cd;
          background-color:#e9ebef;
          .title{
            font-size: 16px;
          }
        }
        .invite_link{
          color: #1d2032;
          margin: 30px 16px; 
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          span{
            margin-bottom: 4px;
          }
          .link_box{
            display: flex;
            align-items: center;
            span:first-child{
              border: 1px solid #eee;
              padding: 10px;
              word-break: break-all;
            }
            span:last-child{
              padding: 10px;
              background: #0d2645;
              color: #fff;
              text-align: center;
              cursor: pointer;
            }
          }
        }
        .invite_list{
          padding: 16px;
        }
        .select_box{
          display: flex;
          align-items: center;
          div:first-child{
            margin-top:30px;
            margin-right:50px;
            color: #1d2032;
          }
        }
        .pic_box{
          display: flex;
          align-items: flex-start;
        }
        .pic_box>div:first-child{
            margin-top:40px;
            margin-right:50px;
            color: #1d2032;
            min-width: 28px;
        }
        .select_img{
          width: 33.33%;
          margin-top: 30px;
          position: relative;
          min-width: 100px;
          img{
            max-width: 100%;
            width: 100px;
          }
          .select_icon{
            position: absolute;
            bottom: 0;
            left:13px;
            width: 74px;
          }
        }
        .pic_list{
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          div{
            width: 33.33%;
            margin-top: 30px;
            max-width: 100%;
            min-width: 120px;
            img{
              cursor: pointer;
            }
          }
        }
        .box_right{
          min-height: 720px;
          background: #fff;
          position: relative;
          .right_mation{
            width: 100%;height: 100%;
            display: none;padding:5% 7%;
          }
          .active{
            display:block;
          }
          .right_mation1{
            .head{
              box-sizing: border-box;
              border-bottom:2px solid #f7f7fb;
              font-size: 16px;color: #1c2033;
              line-height: 30px;
              span{
                margin-right: 20px;
                display:inline-block;
                height: 100%;
                position: relative;
                bottom:-2px;
                color: #666;
                cursor: pointer;
              }
              
            }
            .user_per{
              height: 194px;position: relative;
              img{
                width: 15%;
                margin-top: 5%;  
              }
              button{
                position: absolute;width: 82px;height: 30px;
                left: 0;right: 0;top: 0;bottom: 0;margin:14% auto;
                border-radius: 5px;background: #3891e3;outline: none;border:none;
                color: white;cursor: pointer;
              }
            }
            .form_box{
              margin-top: 40px;
            }
            .form_box ul li{
                height: 60px;
                line-height: 60px;
                font-size: 16px;
                input[type="text"],input[type="email"]{
                  border:none;
                  outline: none;
                  height: 25px;
                  background: transparent;
                  margin-left: 20px;
                  width: 160px;
                }
                input[type="radio"]{
                  margin-left: 20px;
                  position: absolute;
                  clip: rect(0, 0, 0, 0);

                }
                input[type="radio"] + label::before {
                    content: "\a0"; 
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 16px;
                    width: 16px;
                    height: 16px;
                    margin-right:4px;
                    border-radius: 50%;
                    border:1.5px solid #ddd;
                    box-shadow: 0px 0px 0px 1px #ccc inset;
                    line-height: 16px; 
                    margin-top:-3px;
                }
                input[type="radio"]:checked + label::before {
                    background-color: #fff;
                    background-clip: content-box;
                    padding: 3px;
                    border:5px solid #367aff;
                }
                label{margin-left: 25px;}
                .revise{
                  float: right;
                  color: #3891e3;
                  cursor: pointer;
                }

              }
                .sub-btn{
                  width: 123px;
                  height: 44px;
                  border-radius:5px;
                  background: #3891e3;
                  color:#fff;
                  margin: 60px auto 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                }
          }
          .right_mation2{
            .head{
               border-bottom:2px solid #f7f7fb;
              font-size: 16px;color: #1c2033;
              line-height: 30px;
              span{
                margin-right: 20px;
                display:inline-block;
                height: 100%;
                position: relative;
                bottom:-2px;
                color: #666;
                cursor: pointer;
              }
            }
            ul{
              height: 600px;
              overflow: auto;
            }
            li{
              clear: both;
              overflow: hidden;
              padding: 12px 0;
              border-bottom: 1px solid #ddd; 
              display: flex;
              align-items: center;
              >img{
                width: 236px; 
                height:160px;
              }
            }
            li .new_txt{
              margin-left: 30px;
              font-size: 14px;
              .txt_type{
                color: #3891e3;
              }
              .time{
                margin-left: 14px;
                color: #999;
              }
              .txt_mation{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 160px;
                h2{
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 0;
                }
                .read_txt{
                  color: #3891e3;
                  display: inline-block;
                  margin-top:9%;
                  cursor: pointer;
                  img{width: 11px;height:11px;float: right;margin-top:4px;margin-left: 4px;}
                }
                .share{color: #3891e3;display: inline-block;margin-left: 41%;}
                .concern{
                  color: #9ab3d0;
                  cursor: pointer;
                  img{width: 20px;margin-top:-3px;}
                }
              }

            }

          }
          .right_mation3{
            .head{
              border-bottom:2px solid #f7f7fb;
              font-size: 16px;color: #1c2033;
              line-height: 30px;
              span{
                margin-right: 20px;
                display:inline-block;
                height: 100%;
                position: relative;
                bottom:-2px;
                color: #666;
                cursor: pointer;
              }
            }
            ul{
              overflow: auto;
            }
            ul li{
              padding: 4px 0;
              font-size: 14px;
    
              .tit{
                color: #333;
                line-height: 33px;
              }
              .txt{
                color: #7b7b7b;
                line-height: 33px;
              }
            }
          }
          .right_mation4{
            .head{
              border-bottom:2px solid #f7f7fb;
              font-size: 16px;color: #1c2033;
              line-height: 30px;
              span{
                margin-right: 20px;
                display:inline-block;
                height: 100%;
                position: relative;
                bottom:-2px;
                color: #666;
                cursor: pointer;
              }
            }
            .esc{
              width:123px;
              height: 43px;
              margin:80px auto;
              display: block;
            }
            ul{
              margin-top: 40px;
            }
            ul li{
              display:flex;
              align-items: center;
              justify-content: space-between;
              height: 73px;
              border-bottom: 2px solid #f7f7fb;
              font-size: 14px;
              span:nth-child(3){
                width: 360px;
              };
              .name{
                color:#1d2032 !important;
              }
              .bind{
                color:#4477f6 !important;
              }
              .unbind{
                color:#cf4854 !important;
              }
              .suggest{
                color: #c1c1c1 !important;
              }
              .proving{
                width: 143px;
                height: 43px;
                float: right;
              }
              .far{
                margin-left:50px;
              }
              input.far{
                border:0;
                background: transparent;
              }
              .revise{
                color: #3891e3;
                font-size: 14px;
                float: right;
                display: block;
                line-height: 73px;
                margin-right:10px;
                text-decoration: none;
              }

            }
          }
        }
      }
      .modify{
        background: #fff;
        border-radius: 8px;
        width: 40%;
        height: 460px;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 22%;
        z-index: 10;
        font-size: 16px;
        border: 1px solid #ced3dc;
        .title{
          background: #0d2645;
          color: #fff;
          font-size: 20px;
          padding: 20px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .cont{
          width: 70%;
          margin: 40px auto;
          div{
            margin: 20px 0;
            label{
              min-width: 120px;
            }
            input{
              width: 60%;
              height: 40px;
              border: 1px solid #ced3dc;
            }
            p{
              margin-left: 120px;
              font-size: 14px;
              color: #c1c1c1;
            }
            span{
              color: #4477f6;
              font-weight: 600;
            }
          }
        }
      }
      .confirm{
        text-align: right;
        padding-right: 30px;
        button{
          border: none;
          padding: 10px 40px;
          background: #0d2645;
          color: #fff;
          border-radius: 6px;
        }
      }
    }
    @media screen and(min-width: 577px) and(max-width: 1200px){ 
      .personal_center{
        background: #fff;
        .box{
          padding: 0;
          .box_left{
            display: none;
          }
          .box_left_m{
            display: block;
            width: 100%;
            .head{
              display: flex;
              align-items: center;
              padding: 2% 7%;
              background: #e7ebed;
              .integ{
                margin-left: 4%;
                font-size: 20px;
                line-height: 26px;
                text-align: center;
                color: #0d2645;
                .num_red{
                  display: block;
                  color: #f00;
                  font-size: 14px;
                }
              }
            }
            .text-center{
              border-bottom: 1px solid #eee;
              color: #0d2645;
              padding: 0 4%;
              font-size: 18px;
              li{
                display: flex;
                justify-content: center;
                >span{
                  display: block;
                  width: 100px;
                  padding: 20px 0;
                }
                .btn-group{
                  padding: 16px 0;
                  a{
                    font-size: 18px;
                    padding: 0;
                  }
                  .dropdown-menu{
                    width: auto;
                    top: 12px !important;
                    left: -30px !important;
                    min-width: 100px;
                    li{
                      padding: 0 20px;
                      cursor: pointer;
                    }
                  }
                }
              }
              .active {
                >span{
                  border-bottom: 2px solid #0d2645; 
                }
                .btn-group{
                  border-bottom: 2px solid #0d2645; 
                }
              }
            }
          }
          .box_right{
            max-width: 100%;
            flex: none;
            min-height: 400px;
            .right_mation{
              padding: 4%;
              ul{
                margin-top: 0;
              }
              .form_box{
                margin-top: 0;
              }
              .head{
                display: none;
              }
            }
            .right_mation1{
              .sub-btn{
                margin:40px auto;
              }
            }
            .right_mation2 ul{
              height: auto;
            }
            .right_mation4{
              ul li{
                span:nth-child(3){
                  width: 260px;
                }
              }
              .esc{
                margin: 40px auto 0;
              } 
            } 
          }
        }
        .modify{
          width: 56%;
          height: 460px;
          font-size: 16px;
          .title{
            font-size: 20px;
            padding: 20px;
          }
          .cont{
            width: 70%;
            margin: 40px auto;
            div{
              margin: 20px 0;
              input{
                width: 60%;
              }
              p{
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    @media screen and(max-width: 768px){ 
      .personal_center{
        .modify{
          width: 76%;
        }
      }
    }
    @media screen and(max-width: 576px){ 
      .personal_center{
        background: #fff;
        .box{
          padding: 0;
          .box_left{
            display: none;
          }
          .box_left_m{
            display: block;
            width: 100%;
            .head{
              display: flex;
              align-items: center;
              padding: 2% 7%;
              background: #e7ebed;
              .integ{
                margin-left: 4%;
                font-size: 20px;
                line-height: 26px;
                text-align: center;
                color: #0d2645;
                .num_red{
                  display: block;
                  color: #f00;
                  font-size: 14px;
                }
              }
            }
            .text-center{
              border-bottom: 1px solid #eee;
              color: #0d2645;
              display: flex;
              justify-content: space-between;
              padding: 0 14px;
              li{
                  width: auto;
                  font-size: 14px;
                  padding-left: 4px;
                  padding-right: 4px;
                  >span{
                  display: block;
                  padding: 10px 0;
                }
                .btn-group{
                  padding: 8px 0;
                  a{
                    font-size: 14px;
                    padding: 0;
                  }
                  .dropdown-menu{
                    width: auto;
                    top: 12px !important;
                    left: -10px !important;
                    min-width: 120px;
                    li{
                      padding: 0 10px;
                      cursor: pointer;
                      font-size: 14px;
                      span{
                        padding: 10px 0;
                      }
                    }
                  }
                }
              }
              .active{
                border-bottom: 2px solid #0d2645; 
              }
            }
          }
          .col-lg-6{
            padding-left: 0;
            padding-right: 0;
          }
          .box_right{
            max-width: 100%;
            flex: none;
            min-height: 400px;
            .right_mation{
              padding: 4%;
              .head{
                display: none;
              }
              ul{
                margin-top: 0;
              }
              .form_box{
                margin-top: 0;
              }
            }
            .right_mation1{
              .sub-btn{
                margin:40px auto;
              }
            }
            .right_mation2 ul{
              height: auto;
              li{
                padding: 10px 0;
                >img{
                  width: 30%;
                  height: 80px;
                }
                .new_txt{
                  margin-left: 10px;
                  min-width: 200px;
                  font-size: 10px;
                  p{
                    display: none;
                  }
                  .txt_mation{
                    height: 80px;
                    h2{
                      font-size: 12px;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                      width: 240px;
                      line-height: initial;
                      margin-bottom: 0;
                    }
                    .concern{
                      /*display: none;*/
                    }
                    div{
                      font-size: 10px;
                      line-height: 12px;
                      height: 48px;
                      overflow-y: hidden;
                      .read_txt{
                        margin-top: 0;
                      }
                    }
                  }
                } 
              }
            }
            .right_mation4{
              ul li{
                font-size: 12px;
                span:nth-child(3){
                  width: 140px;
                }
              }
              .esc{
                margin: 40px auto 0;
              } 
            } 
          }
          .invite_hint,.invite_link{
            margin: 16px 0;
          }
          .invite_list{
            margin: 16px 0;
            padding: 16px 0;
            font-size: 13px;
          }
        }
        .modify{
          width: 90%;
          height: 400px;
          font-size: 14px;
          .title{
            font-size: 20px;
            padding: 20px 10px;
          }
          .cont{
            width: 90%;
            margin: 20px auto;
            div{
              margin: 10px 0;
              input{
                width: 60%;
              }
              label{
                min-width: 100px;
              }
              p{
                font-size: 10px;
                margin-left: 100px;
              }
            }
          }
        }
      }
    }
</style>
