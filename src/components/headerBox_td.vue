<template>
  <div class="navbar">
    <div class="navbar-inner" id="navbar-inner">
      <div class="container">
        <ul class="nav f-l">
          <li>
            <router-link to="/deepNews_td" class="brand">
              <img src="../img/head_logo.png">
            </router-link>
              <!-- <img class="text-img" src="../img/describe.png" alt=""> -->
              <span>中環數字資本</span>
          </li>
        </ul>
        <ul class="nav f-r">
          <li>
            <div class="btn-group">
              <a class="btn dropdown-toggle" data-toggle="dropdown">語言切換<span class="caret"></span></a>
              <ul class="dropdown-menu" role="menu">
                <li><a @click="changeLan('')" href="javascript:void(0)">簡體中文</a></li>
                <li><a @click="changeLan('td')" href="javascript:void(0)">繁體中文</a></li>
              </ul>
            </div>
          </li>
          <li class="login" v-if="!getLoginUser.length"><router-link to="/login_td">登錄</router-link></li>
          <template v-else-if="getLoginUser.length">
             <li class="name"><router-link to="/personalCenter_td">{{getLoginUser}}</router-link></li>
          </template>
        </ul>
      </div>
    </div>
    <div class="navbar-inner head_bg nav-fix" v-if="state"  v-show="nav_opacity">
      <div class="container">
        <ul class="nav f-l">
          <template v-if="!nav_menu">
            <li :class="{active:nav.deepNews}"><router-link to="/deepNews_td">深度新聞</router-link></li>
            <li :class="{active:nav.conjuncture}"><router-link to="/conjuncture_td">行情</router-link></li>
            <li :class="{active:nav.quickNews}"><router-link to="/quickNews_td">快訊</router-link></li>
            <li ><a href="https://www.centralcrypto.io/" target="_blank">關於中環數字</a></li>
          </template>
          <li v-if="nav_menu">
            <button class="menu_btn" @click=toggle_menu_list(1) @blur=menu_blur>
              <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
            </button>
          </li>
        </ul>
        <ul :class="{'nav':true,'f-r':true,'nav_opacity':nav_opacity}">
          <li></li>
          <li class="search">
            <div class="search_box">
              <input v-model="search_text" @focus="inFocus" @blur="outFocus" class="search_text" type="text" name="" style="margin-right: 12px" disabled="disabled"> <img src="../img/search.png" alt="">
            </div>
            <div class="search_list"  v-show="searchItems.length&&list_show">
              <div v-for="item in searchItems" v-html="item"></div>
            </div>
          </li>
          <li v-if="getLoginUser.length">
            <div class="btn-group">
              <a v-show="!nav_menu" style="padding-left: 0;padding-right:0;  " class="btn dropdown-toggle fix_name" data-toggle="dropdown">{{getLoginUser}}<span class="caret"></span></a>
              <ul class="dropdown-menu menu_bg" role="menu" style="width: 100%">
                <li class="text-center"><a @click="changeLan('')" href="javascript:void(0)">簡體中文</a></li>
                <li class="text-center"><a @click="changeLan('td')" href="javascript:void(0)">繁體中文</a></li>
                <li class="login text-center" v-if="!getLoginUser.length"><router-link to="/login_td">登錄</router-link></li>
                <template v-else-if="getLoginUser.length">
                   <li class="text-center"><router-link to="/personalCenter_td">個人中心</router-link></li>
                </template>
              </ul>
            </div>
          </li>
          <li v-if="!getLoginUser.length" v-show="!nav_menu">
            <div class="btn-group">
              <a class="btn dropdown-toggle" data-toggle="dropdown">語言切換<span class="caret"></span></a>
              <ul class="dropdown-menu menu_bg" role="menu">
                <li><a @click="changeLan('')" href="javascript:void(0)">簡體中文</a></li>
                <li><a @click="changeLan('td')" href="javascript:void(0)">繁體中文</a></li>
              </ul>
            </div>
          </li>
          <li v-if="!getLoginUser.length" v-show="!nav_menu" class="login"><router-link to="/login_td">登錄</router-link></li>
        </ul>
        <ul class="meun_list head_bg" v-show="menu_list_fix">
          <li>
            <div ><router-link to="/deepNews_td">深度新聞</router-link></div>
          </li>
          <li>
            <div ><router-link to="/conjuncture_td">行情</router-link></div>
          </li>
          <li>
            <div><router-link to="/quickNews_td">快訊</router-link></div>
          </li>
          <li>
            <div><a href="https://www.centralcrypto.io/" target="_blank">關於中環數字</a></div>
          </li>
        </ul>
      </div>
    </div>

    <div class="navbar-inner head_bg" v-if="state">
      <div class="container">
        <ul class="nav f-l">
          <template v-if="!nav_menu">
            <li :class="{active:nav.deepNews}"><router-link to="/deepNews_td">深度新聞</router-link></li>
            <li :class="{active:nav.conjuncture}"><router-link to="/conjuncture_td">行情</router-link></li>
            <li :class="{active:nav.quickNews}"><router-link to="/quickNews_td">快訊</router-link></li>
            <li><a href="https://www.centralcrypto.io/" target="_blank">關於中環數字</a></li>
          </template>

          <li v-if="nav_menu"><button class="menu_btn" @click=toggle_menu_list(2) @blur=menu_blur><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button></li>
        </ul>
        <ul class="nav f-r">
          <li class="search">
            <div class="search_box">
              <input v-model="search_text" @focus="inFocus" @blur="outFocus" class="search_text" type="text" name="" style="margin-right: 12px" disabled="disabled"> <img src="../img/search.png" alt="">
            </div>
            <div class="search_list"  v-show="searchItems.length&&list_show">
              <div v-for="item in searchItems" v-html="item"></div>
            </div>
          </li>
        </ul>
        <ul @click.stop class="meun_list head_bg" v-show="menu_list">
          <li >
            <div ><router-link to="/deepNews_td">深度新聞</router-link></div>
          </li>
          <li>
            <div ><router-link to="/conjuncture_td">行情</router-link></div>
          </li>
          <li>
            <div><router-link to="/quickNews_td">快訊</router-link></div>
          </li>
          <li>
            <div><a href="https://www.centralcrypto.io/" target="_blank">關於中環數字</a></div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!state" class="underline"></div>
  </div>
</template>

<script>

import * as api from '@/api/api'
import { mapGetters ,mapMutations  } from 'vuex';

import router from '@/router';

export default {
  data(){
    return {
      nav:{
        deepNews:true,
        conjuncture:false,
        quickNews:false,
      },
      state:true,
      search_text:'',
      timeout:'',
      searchItems:[1,2,3,"<span class='color' style='color:red'>22222</span>33333"],
      list_show:false,
      toggle_nav:false,
      nav_opacity:false,
      screenWidth:document.body.clientWidth,
      nav_menu:true,
      menu_list:false,
      menu_list_fix:false,
    }
  },
  created(){
    var path=this.$router.currentRoute.fullPath;
    this.nav={
      deepNews:false,
      conjuncture:false,
      quickNews:false,
    }

    if(path.indexOf('deepNews')!=-1){
      this.nav.deepNews=true;
    }
    if(path.indexOf('conjuncture')!=-1){
      this.nav.conjuncture=true;
    }
    if(path.indexOf('quickNews')!=-1){
      this.nav.quickNews=true;
    }
    if(path.indexOf('regist')!=-1){
      this.state=false;
    }
    if(path.indexOf('login')!=-1){
      this.state=false;
    }

    if(this.screenWidth<1200){
      this.nav_menu=true
    }else{
      this.nav_menu=false
    }

  },
  computed:{
    ...mapGetters([
      'getToken',
      'getRightName',
      'getLoginUser'
    ])
  },
  methods:{
    ...mapMutations({
          logOut:'COM_USER_LOGOUT',
          setLan:'COM_SET_LAN',
      }),
    changeLan(lan){
      var str=this.$route.path.split('_');
      var path=lan?('_'+lan):'';
      this.setLan(lan);
      this.$router.push({path:str[0]+path,query:this.$route.query})
    },
    toggle_search(){
      this.search_box.show=!this.search_box.show;
    },
    search(text){
      var path=this.$router.currentRoute.fullPath;
      var key=''

      if(path.indexOf('deepNews')!=-1){
        key='article';
      }else if(path.indexOf('quickNews')!=-1){
        key='news';
      }else if(path.indexOf('conjuncture')!=-1){
        key="coin";
      }else{
        key='article';
      }
      console.log(key)

      /*api.search({key:key,text:this.search_text}).then(res=>{
        console.log(res)
      })*/
    },
    outFocus(){
      if(this.list_show){
        this.list_show=false;
      }
    },
    inFocus(){
      this.list_show=true
    },
    scroll(){
      //變量t是滾動條滾動時，距離頂部的距離
      var t = document.documentElement.scrollTop||document.body.scrollTop;
      //var docHeight=window.innerHeight;
      var elHeight = document.getElementById('navbar-inner').offsetHeight;
        
      if(t>elHeight){
        this.nav_opacity=true;
      }else{
        this.nav_opacity=false;
      }
      this.menu_blur();
    },
    toggle_menu_list(v){
      //v=1 fixed v=2 not fixed
      let v2=this.menu_list;
      let v1=this.menu_list_fix;
      this.menu_list=false;
      this.menu_list_fix=false;

      if(v==1){
        this.menu_list_fix=!v1
      }
      if(v==2){
        this.menu_list=!v2
      }

    },
    menu_blur(){
      this.menu_list=false;
      this.menu_list_fix=false;
    },

  },
  mounted:function(){
    window.addEventListener('scroll', this.scroll)

    const that=this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }


  },
  destroyed:function(){
    window.removeEventListener('scroll',this.scroll)
  },
  watch:{
    search_text:function(val,oldVal){
      if(this.timeout){
        window.clearTimeout(this.timeout)
      }
      this.timeout=window.setTimeout(()=>{
        if(val){
          this.search(val)
        }
      },1000)
    },
    screenWidth (val) {
        if(this.screenWidth<1200){
          this.nav_menu=true
        }else{
          this.nav_menu=false
        }
        
    }

  }
}
</script>
<style lang="less" scoped>
.navbar{
  width: 100%;
  font-size: 18px;
  padding:0;
  z-index: 111110;
  font-family: '微軟雅黑';
  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
  }
  .brand {
    width: 108px;
    padding-left:0 !important;
    padding-right:0 !important;
    display: block;
    font-size: 20px;
    font-weight: 200;
    color: #777;
    img{
      vertical-align: middle;
      width: 104px;
    }
  }
  .active{
    background-color: #16436a;

  }
}
.banner{
  z-index: 0;
}
.nav-fix{
  position: fixed !important;
  width: 100%;
  top:0;
  z-index: 1000;
}
.navbar-inner{
  position: relative;
  width: 100%;
  box-sizing: border-box;
  margin: auto;
  .nav{
    list-style: none;
    height: 100px;
    a{
      color: #3b426b;
      padding: 10px 30px;
      text-decoration: none;
      display: inline-block;
    }
    span{
      font-size: 24px;
    }
    .name a{
      padding: 10px;
      width: 200px;
      overflow-y: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li{
      display: inline-block;
      display: flex;
      align-items: center;
    }
  }
  .meun_list{
    width: 100%;
    position: absolute;
    left: 0;
    top:100px;
    z-index: 100;
    li{
      cursor: pointer;

      div{
        max-width: 1200px;
        margin:0 auto;
        height: 100px;
        line-height: 100px;
        padding: 0 20px;
        a{
          display: block;
          text-decoration: none;
        }
      }
    }
    li:hover{
      background-color: #16436a;
    }

  }
  .search_text{
    background-color:transparent;
    border:none;
    outline: none;
    color: #fff;
  }
  .search{
    position: relative;
    margin-right: 30px;
  }
  
  .search_list{
    position: absolute;
    width: 100%;
    top:80px;
    height: 240px;
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    overflow-y:auto;
    div{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 4px;
      cursor: pointer;
      color: #000;
    }
    div:hover{
      background-color: #eee;
    }
    span.color{
      color:red !important;
    }
  }
  .search_box{
    border:2px solid #7c7c7c;
    padding: 8px;
    display: flex;
    align-items: center;
    border-radius: 8px;
  }
}
.head_bg{
  background-image:url('/static/img/head_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  a{
    color: #fff !important;
  }
}
.dropdown-menu{
  min-width: auto;
  li{
    display: block !important
  }
}
.menu_btn{
  background-color: transparent;
  border: none;
  outline:none;
  cursor: pointer;
}
.icon-bar{
  display: block;
  width: 28px;
  height: 2px;
  background-color: #ccc;
  margin:8px 0;
}
.menu_bg{
  min-width: auto;
  background-color:#272a30;
  opacity: 0.8;
  border: none;
  li{
    display: block !important
  }
  li:hover{
    background-color: #2c363f
  }
}

.login{
  a{
    color: #fff !important;
    background-color: #022647;
    padding: 12px 26px !important;
    border-radius: 12px;
  }
}
.underline{
  width: 100%;
  box-shadow: 0 0 2px 2px #eee;
}

@media(max-width: 768px){
  .navbar{
    .brand{
      width: 90px;
      img{
        width: 90px;
      }
    }
    .text-img{
      width: 200px
    }

  }
  .navbar-inner{
    .nav .name a{
      padding: 10px;
      width: 120px;
      overflow-y: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .nav a{
      padding: 10px 16px;
    }
    .nav span{
      font-size: 20px;
    }
  }
  
}
@media(max-width: 578px){
  .navbar{
    .brand{
      width: 54px;
      img{
        width: 54px;
      }
    }
    .text-img{
      display: none;
    }

  } 
  .navbar-inner .nav span{
    font-size: 16px;
  }
}

@media(max-width: 412px){
  .navbar{
    .brand{
      width: 80px;
      img{
        width: 80px;
      }
    }
    .text-img{
      display: none;
    }

  } 
  .navbar-inner{
    .search{
      margin-right: 0;
    }
    .search_box{
      padding: 6px;
    }
    .nav{
      height: 72px;
      a{
        padding: 8px 12px;
      }
      span{
        display: none;
      }
      .name a{
        width: 100px
      }
    }
    .meun_list{
      top:72px;
      li>div{
        height: 72px;
        line-height: 72px;
      }
    }
  }
  
}
@media(max-width: 360px){
  .navbar{
    font-size: 14px;
    .brand{
      width: 80px;
      img{
        width: 80px;
      }
    }
  } 
  .navbar-inner{
    .nav{
      height: 52px;
      a{
        padding: 6px 12px;
      }
    }
    .meun_list{
      top:52px;
      li>div{
        height: 52px;
        line-height: 52px;
      }
    }
  }
  
}
</style>
