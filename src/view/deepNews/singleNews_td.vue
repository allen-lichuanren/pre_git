<template>
  <div class="news_list">
      <headerBox></headerBox>
      <div class="box">
        <div class="nav">
          <span><a @click=goBack href="javascript:void(0)">返回</a></span><span>&nbsp;&nbsp;>&nbsp;&nbsp; </span><span>幣種深度新聞</span>
        </div>
        <div class="list">
          <div v-for="item in news" class="news">
             <div class="news_img" v-bind:style="{backgroundImage:'url('+item.thumbnail+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}">
               <!-- <img :src="item.thumbnail" alt=""> -->
             </div>
             <div class="news_article">
               <div class="news_head">
                  <span class="news_mark">
                    <span v-for="(mark,index) in item.tags" v-if="index<5" style="margin-right: 12px">{{mark}}</span>
                  </span>
               </div>
               <div class="news_cont" @click=read_detail(item.aid) style="cursor: pointer;">
                 <div class="news_title">{{item.title}}</div>
                 <div class="instroduce">{{item.summary}}</div>
               </div>
               <div class="news_footer">
                 <span><!-- <span class="read_all" @click=read_detail(item.aid)> 閱讀全文</span> --><span class="news_data">{{item.resource}} &bull; {{item.published_time}}</span></span>
                 <span class="share" @click=collect(item.aid)>收藏</span>
               </div>
             </div>
          </div>
          <div class="more" @click=nextPage><img src="../../img/arrow_d.png" alt=""></div>
        </div>
      </div>
      <footerBox></footerBox>  
  </div>
</template>

<script>
import footerBox from "@/components/footerBox_td";
import headerBox from "@/components/headerBox_td";
import * as api from "@/api/api";
import * as com from "@/util/common.js"
import {  mapMutations ,mapGetters } from 'vuex';


export default {
    data(){
        return {
            listData:[],
            page:1,
            coin:'',
            news:[]
        }
    },
    computed:{
        ...mapGetters([
            'getToken',
            'getLoginUser'
         ])
    },
    components:{ footerBox,headerBox },
    created: function() {
      var coin = this.$route.query.coin;
      this.coin=coin;
      this.getData();
      this.setName();
    },
    methods:{
        ...mapMutations({
             setRightName: 'COM_SET_RIGHTUSERNAME'
        }),
        getData(){
          var load=layer.load(2, { shade: [0.01, '#fff'] });
          api.getArticles({language:2,coin:this.coin.split('_')[0],page:this.page,pagesize:3}).then(res=>{
            layer.close(load);
            if(!res||!res.length){
              com.toast('沒有更多新聞了');
            }else{
              for(var i=0;i<res.length;i++){
                res[i].published_time=(new Date(res[i].published_time*1)).getFullYear()+'-'+((new Date(res[i].published_time*1)).getMonth()+1)+'-'+(new Date(res[i].published_time*1)).getDate();
                  this.news.push(res[i]);
              }
            }
          })
        },
        setName(){
         this.setRightName(this.getLoginUser);
        },
        nextPage(){
          this.page=this.page+1;
          this.getData()
        },
        goBack(){
          this.$router.go(-1);
        },
        read_detail(aid){
          this.$router.push({path:'/newsDetail_td',query:{'aid':aid}})
        },
        collect(aid){
          api.collect({aid:aid}).then(res=>{
            if(res.code!=200){
              com.toast(res.msg)  
            }else{
              com.toast(res.msg_cn)
            }
          })
        },
    }
}
</script>

<style lang="less" scoped>
.news_list{
  background-color:#f9f9f9;
  .box{
    max-width: 1200px;
    margin: 0 auto;
  }
  .nav{
    color: #9ab3d0;
    padding-top:30px;
    line-height: 40px;
    font-size: 16px;
    a{
      text-decoration: none;
      color: #9ab3d0;
    }
  }
  .news{
    display: flex;
    justify-content: space-between;
    margin: 2% 4%;
    padding:3% 2%; 
    background-color: #fff;
    border-radius: 8px;
  }
  .news_img{
    width: 32%;
    img{
      max-width: 100%;
    }
  }
  .news_article{
    width: 68%;
    padding-left:8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .news_head{
      display: flex;
      width: 100%;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      .news_mark{
        span{
          color: #999999;
          border: 1px solid #ef315a;
          border-radius: 10px;
          padding: 4px 8px;
        }
      }
    }
    .instroduce{
      text-align: justify;
      color: #767676;
    }
    .news_title{
      font-weight: 600;
    } 
  }
  .news_cont{
    line-height: 30px;
  }
  .news_footer{
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #9fb3cd;
    font-size: 16px;
    .read_all,.share{
      cursor: pointer;
      color:#3891e3;
      margin-right: 12px;
    }
    .read_all{
      font-size: 14px;
    }
    .news_date{
      font-size: 14px;
      color: #333333;
    }
  }
  .more{
    margin:0 4%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#fff;
    cursor: pointer;
    position: relative;
    z-index: 11;
  }
}
@media screen and(min-width: 466px) and(max-width: 560px){ 
  .news_list{
    .news_article {
      .news_head{
        height: 20px;
        line-height: initial;
        align-items: flex-start;
        .news_mark span{
          font-size: 10px;
          margin-right: 10px !important;
          padding: 0px 8px;
        }
      }
      .news_title{
        padding-bottom: 0px;
        font-size: 11px;
        line-height: 14px;
      }
      .instroduce{
        display: none;
      }
    }
    .news_img{
      height: 100px;
    }
    .news_footer{
      font-size: 12px;
    }
  }
}
@media screen and(max-width: 465px){ 
  .news_list{
    .news_article {
      .news_head{
        height: 20px;
        line-height: initial;
        align-items: flex-start;
        .news_mark span{
          font-size: 10px;
          margin-right: 6px !important;
          padding: 2px 4px;
        }
      }
      .news_title{
        padding-bottom: 0px;
        font-size: 11px;
        line-height: 14px;
      }
      .instroduce{
        display: none;
      }
    }
    .news_img{
      height: 100px;
    }
    .news_footer{
      font-size: 10px;
    }
  }
}
</style>
