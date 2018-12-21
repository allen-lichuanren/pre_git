<template>
  <div class="deepNews" @click=initAll>
    <headerBox></headerBox>
    <div class="banner">
      <img style="max-width: 100%;margin: 0 auto" src="../../img/news_banner.png" alt="">
    </div>
    <div class="a">
      <div class="row">
        <div class="col-lg-8">
          <div class="hot_news">
            <div class="hot_tab">
              <span class="color_red">精選</span><span>新聞</span>
            </div>
            <div class="hot_list">
              <div class="col-sm-5">
                <div class="hot_item" :title="hotNews[0].title" @click=article_detial(hotNews[0].aid) style="background: url(/static/img/news1.png) no-repeat center center; background-size: cover;">
                  <!-- <img src="../../img/news1.png" alt=""> -->
                  <div class="news_txt">{{hotNews[0].title}}</div>
                </div>
              </div>
              <div class="col-sm-7" style="display: flex">
                <div class="col-sm-6">
                  <div class="hot_item" :title="hotNews[1].title" @click=article_detial(hotNews[1].aid) style="background: url(/static/img/news2.png) no-repeat center center; background-size: cover;">
                    <!-- <img src="../../img/news2.png" alt=""> -->
                    <div class="news_txt">{{hotNews[1].title}}</div>
                  </div>
                  <div class="hot_item" :title="hotNews[2].title" @click=article_detial(hotNews[2].aid) style="background: url(/static/img/news4.png) no-repeat center center; background-size: cover;">
                    <!-- <img src="../../img/news4.png" alt=""> -->
                    <div class="news_txt">{{hotNews[2].title}}</div>  
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="hot_item" :title="hotNews[3].title" @click=article_detial(hotNews[3].aid) style="background: url(/static/img/news3.png) no-repeat center center; background-size: cover;">
                    <!-- <img src="../../img/news3.png" alt=""> -->
                    <div class="news_txt">{{hotNews[3].title}}</div>
                  </div>
                  <div class="hot_item" :title="hotNews[4].title" @click=article_detial(hotNews[4].aid) style="background: url(/static/img/news5.png) no-repeat center center; background-size: cover;">
                    <!-- <img src="../../img/news5.png" alt=""> -->
                    <div class="news_txt">{{hotNews[4].title}}</div>  
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="col-lg-4">
            <div class="conjuncture">
                <div class="con_head">
                  <span class="color_red">熱門</span><span>行情</span>
                </div>
                <div class="con_list">
                    <div class="con_item" v-for="(item,key) in conjuncture_list">
                      <div class="item_head"  style="cursor: pointer" @click=toggle_conjuncture(item.active,key)>
                        <span class="symbol">{{item.name}}</span><span class="price">{{item.now}}</span>
                        <span>
                          <span v-bind:class="{'riseup':item.rise>0,'rise':true}" >{{item.rise}}</span><span><img src="../../img/open.png" alt=""></span>
                        </span>
                      </div>
                      <div class="svg_box" v-show="item.active">
                        <svg version="1.1"><polyline :points="item.line" style="fill:white;stroke:#e8e8e8;stroke-width:2"/></svg> 
                      </div>
                      <div class="max&min" v-show="item.active" style="display: flex;align-items: center;justify-content: space-between;padding: 0 10%">
                        <span>最高：{{item.height}}</span>
                        <span>最低：{{item.low}}</span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <div class="list_tab">
            <div style="display: flex; position: relative; z-index: 1;">
              <span class="tab_item" v-show="toggle_btn" v-for="item in tabLists" @click=toggleTab(item) v-bind:class="{'active':item.show===true}"><a href="javascript:void(0)">{{item.name}}</a></span>

              <button @blur="select_blur" class="select_coin" v-show="!toggle_btn"  @click.stop=toggle_select_tab>
                {{sel_coin}}
                <img class="select_btn" src="../../img/trigon.png" alt="">
              </button>
              <div class="select_tab" style="width:300px;line-height: initial;" v-show="select_tab">
                  <div v-for="(coin,index) in coin_list" v-if="index%3==0" style="display: flex;align-items: center;justify-content: space-between;">
                    <span  @click.prevent=changeCoin(index) >{{coin_list[index]}}</span>
                    <span v-show="index+1<coin_list.length" @click.prevent=changeCoin(index+1) >{{coin_list[index+1]}}</span>
                    <span v-show="index+2<coin_list.length" @click.prevent=changeCoin(index+2) >{{coin_list[index+2]}}</span>
                  </div>
              </div>
            </div>
            <div style="position:absolute; right: 10px; z-index: 0;">
              <img src="../../img/toggle_bg.png" alt="" class="tab_bg">
              <img class="tab_btn" :src="toggle_btn?'static/img/on.png':'static/img/off.png'" @click=btn_toggle>
            </div>
          </div>
          <div class="list_cont">
            <div class="news" v-for="item in select.data">
             <div class="news_img" v-bind:style="{backgroundImage:'url('+item.thumbnail+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}">
               <!-- <img :src="item.thumbnail" alt=""> -->
             </div>
             <div class="news_article">
               <div v-if="item.tags.length>0" class="news_head">
                <span  class="news_mark">
                  <span v-for="(mark,index) in item.tags" v-if="index<5

                  " style="margin-right: 12px">{{mark}}</span>
                </span>
                 
               </div>
               <div class="news_cont" @click=article_detial(item.aid) style="cursor: pointer;">
                 <div class="news_title">{{item.title}}</div>
                 <div class="instroduce">{{item.summary}}</div>
               </div>
               <div class="news_footer">
                 <span><!-- <span class="read_all" @click=article_detial(item.aid)> 閱讀全文</span> --><span class="news_data">{{item.resource}} &bull; {{item.published_time}}</span></span>
                  <span class="share" @click=collect(item.aid)>收藏</span>
               </div>
             </div>
            </div>
            <div class="more" @click=nextPage><img src="../../img/arrow_down.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import footerBox from '@/components/footerBox_td';
import headerBox from '@/components/headerBox_td';
import * as api from "@/api/api";
import * as com from '@/util/common.js';
import {  mapMutations ,mapGetters } from 'vuex';

//政策方向、項目資訊、技術前沿、投資研究、深度訪談、專欄
export default {
    data(){
        return {
            select:{
              kind:1,
              data:[],
              page:1,
              pagesize:4,
              language:2,
              coin:''
            },
            tabLists:[
                {name:'政策方向',show:true,data:[],kind:1},
                {name:'項目資訊',show:false,data:[],kind:2},
                {name:'技術前沿',show:false,data:[],kind:3},
                {name:'投資研究',show:false,data:[],kind:4},
                {name:'深度訪談',show:false,data:[],kind:5},
                {name:'專欄',show:false,data:[],kind:6},
                ],
            listData:[],
            conjuncture_list:[
              {name:'BTC/USDT',line:'0,40 20,23 40,30 60,27 80,28 100,22 120,24 140,18 160,19 180,22 200,26 220,20',rise:'-0.79',height:'$45613',low:'$45342',now:'$45763',active:true},
              {name:'ETH/USD',line:'0,30 20,35 40,22 60,35 80,22 100,26 120,32 140,44 160,27 180,30 200,26 220,20',rise:'-0.68',height:'$47913',low:'$47456',now:'$456I7',active:false},
              {name:'BNB/USD',line:'0,20 20,35 40,30 60,30 80,40 100,37 120,22 140,24 160,22 180,25 200,32 220,20',rise:'-0.59',height:'$44513',low:'$44232',now:'$43446',active:false},
              {name:'BTC/ETH',line:'0,20 20,35 40,20 60,30 80,40 100,24 120,19 140,24 160,32 180,34 200,19 220,20',rise:'-0.81',height:'$43546',low:'$43314',now:'$47456',active:false}
            ],
            toggle_btn:true,
            coin_list:['BTC','ETH','BNB','ADA','ADX','AE','BAT','BCD','BNT','CDT'],
            sel_coin:'BTC',
            select_tab:false,
            hotNews:[{title:''},{title:''},{title:''},{title:''},{title:''}],
        }
    },
    computed:{
        ...mapGetters([
            'getToken',
            'getLoginUser'
         ])
    },
    components:{ footerBox,headerBox },
    created(){
        this.getData();
        this.setName();
        this.getHotNews();
    },
    methods:{
        ...mapMutations({
             setRightName: 'COM_SET_RIGHTUSERNAME'
        }),
        getData(){

           var load=layer.load(2, { shade: [0.01, '#fff'] });
           api.getArticles({kinds:this.select.kind,language:this.select.language,pagesize:this.select.pagesize,page:this.select.page}).then(res=>{
            layer.close(load)
            if(!res.length){
              com.toast('沒有更多新聞了');
              return
            }
            for(var i=0;i<res.length;i++){
              res[i].published_time=(new Date(res[i].published_time*1)).getFullYear()+'/'+((new Date(res[i].published_time*1)).getMonth()+1)+'/'+(new Date(res[i].published_time*1)).getDate();
                this.select.data.push(res[i]);
            }
           })
        },
        clickPage(num){
            this.page=num;

        },
        setName(){
         this.setRightName(this.getLoginUser);
        },
        toggleTab(item){
          for(var i in this.tabLists){
            this.tabLists[i].show=false;
          };
          item.show=true;
          this.select.kind=item.kind;
          this.select.page=1;
          this.select.data=[];
          this.getData();

        },
        nextPage(){
          this.select.page=this.select.page+1;
          if(this.select.coin){
            this.getCoinNews()
          }else{
            this.getData();
          }

        },
        article_detial(aid){
          this.$router.push({path:'/newsDetail_td',query:{'aid':aid}})
        },
        toggle_conjuncture(active,key){
          this.conjuncture_list.forEach(function(val,key){
            val.active=false;
          })
          this.conjuncture_list[key].active=!active;
        },
        btn_toggle(){
          this.toggle_btn=!this.toggle_btn;
          if(this.toggle_btn){
            this.select={
              kind:1,
              data:[],
              page:1,
              pagesize:4,
              language:1,
            }
            this.getData();
          }else{
            this.select={
              data:[],
              page:1,
              pagesize:4,
              language:1,
              coin:'BTC'
            }
            this.getCoinNews()
          }
        },
        toggle_select_tab(){
          this.select_tab=!this.select_tab;
        },
        select_blur(){
          //this.select_tab=false;
        },
        changeCoin(index){
          this.sel_coin=this.coin_list[index];
        },
        initAll(){
          this.select_tab=false;
        },
        getCoinNews(){
          var load=layer.load(2, { shade: [0.01, '#fff'] });
          api.getArticles({lanuage:this.select.language,coin:this.select.coin,page:this.select.page,pagesize:this.select.pagesize}).then(res=>{
            layer.close(load);
            if(res.code==100){
              com.toast(res.msg_cn);
              return
            }
            if(!res||!res.length){
              com.toast('沒有更多新聞了');
            }else{
              for(var i=0;i<res.length;i++){
                res[i].published_time=(new Date(res[i].published_time*1)).getFullYear()+'-'+((new Date(res[i].published_time*1)).getMonth()+1)+'-'+(new Date(res[i].published_time*1)).getDate();
                this.select.data.push(res[i]);
              }
            }
          })
        },
        getHotNews(){
          api.getArticles({language:2,page:1,pagesize:5}).then(res=>{
            if(res.code==100){
              com.toast(res.msg_cn);
              return
            }
            this.hotNews=res;
          })
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
        getSvgData(){
          var svgData=[
            {'name':"BTC/USD",'data':[7449.76,7467.58,7466.40,7452.92,7470.74,7473.22,7439.56,7404.59,7377.84,7427.70,7424.68,7443.85],'height':'$7473.52','low':'$7375.05','now':'$7457.15','rise':'1.27'},
            {'name':"ETH/USD",'data':[479.58,479.90,478.09,479.15,481.94,481.24,483.24,481.07,482.05,475.19,475.93,465.31],'height':'$482.53','low':'$455.64','now':'$464.30','rise':'-3.02'},
            {'name':"BCH/USD",'data':[808.73,818.03,821.46,825.54,825.43,814.41,818.24,814.69,813.63,779.99,802.17,791.40],'height':'$813.63','low':'$779.99','now':'$790.66','rise':'-3.86'},
            {'name':"BNB/USD",'data':[9.41,18.51,24.46,22.16,16.16,7.53,10.31,13.48,15.01,14.90,16.52,12.02],'height':'$24.46','low':'$5.72','now':'$12.36','rise':'-5.48'},
          ];
          this.conjuncture_list=[];
          for(var i=0;i<svgData.length;i++){
            var str="";
            for(var j=10;j<1000;j++){
              if(Math.max(...svgData[i].data)/j<100 && Math.max(...svgData[i].data)/j>10){
                for(var k=0;k<svgData[i].data.length;k++){
                  str+=k*20+','+(100-svgData[i].data[k]/j).toFixed(2)+" ";
                }
              }
                j=j*10;
            };
            this.conjuncture_list.push({name:svgData[i].name,line:str,rise:svgData[i].rise,height:svgData[i].height,low:svgData[i].low,now:svgData[i].now,active:i==0?true:false});
          };
        },
    },
    watch:{
      sel_coin:function(val,oldVal){
        this.select={
          data:[],
          page:1,
          pagesize:4,
          language:2,
          coin:val,
        };
        this.getCoinNews();
      }
        
    },
    mounted:function(){
      this.getSvgData();
    }

}
</script>

<style lang="less" scoped>
.deepNews{
  position: relative;
  margin: 0 auto;
  color: #3a416e;
  z-index: 0;
  .a{
    max-width: 1200px;
    margin: 0 auto;
    z-index: 0;
  }
  .hot_news{
    padding: 0 0px 0 20px;
    .hot_tab{
      padding: 40px 0;
      font-size: 26px;
      line-height:initial;
    }
    .hot_list{
      display: flex;
      .col-sm-5{
        padding-right:8px; 
      }
      .hot_item{
        position: relative; 
        overflow: hidden; 
        height: 310px;
        cursor: pointer;
      }
      .col-sm-6{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left:0;
        padding-right:12px;
        .hot_item{
          position: relative; 
          overflow: hidden; 
          height: 149px; 
        }
      }
      .col-sm-6:last-child{
        position: relative;
        left:-4px;
      }
      .news_txt{
        position: absolute;
        width: 100%;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        background-color:#000;
        font-size: 14px;
        color: #fff;
        opacity: 0.6;
        text-indent: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }
    .hot_list>div{
      padding-left:0;
      padding-right:10px;
      position: relative;
    }
  }
  .color_red{
    color:#862d32;
  }
  .select_tab{
    position: absolute;
    background-color:#fff;
    border:1px solid #c7c7c7;
    border-radius: 4px;
    padding: 10px 16px;
    top:66px;

    span{
      padding: 8px 10px;
      text-align: center;
      width: 80px;
      cursor: pointer;
    }
    span:hover{
      background-color: #d5dde2;
    }
    div:nth-child(even){
      color: #333333;
    }

  }
  .list_tab{
    position: relative;
    display: flex;
    font-size: 20px;
    align-items: center;
    padding: 0 20px;
    margin-top: 40px;
    justify-content: space-between;
    span{
      padding: 8px 16px;
    }
    
    a{
      text-decoration: none;
      color:#3a416e;
      line-height: 40px;
    }
    .active{
      background-color:#16436a;
      a{
        color: #fff;
      }
    }
  }
  .tab_btn{
    position: absolute;
    z-index: 1000;
    right: 0;
    bottom: -8px;
    cursor: pointer;
  }
  .select_coin{
    width: 110px;
    box-sizing: border-box;
    border: none;
    outline:none;
    padding: 16px 26px !important;
    font-size: 20px;
    background-color: #16436a;
    color: #fff;
    line-height: initial;
    letter-spacing: 2px;
    cursor: pointer;
    position: relative;
    text-align: left;
  }
  .select_btn{
    position: absolute; 
    right: 12px; 
    top:24px
  }
  .list_cont{
    min-height: 400px;
    .news{
      display: flex;
      justify-content: space-between;
      padding:3% 2%; 
      background-color: #fff;
      border-bottom:1px solid #eee;
    }
    .news_img{
      width: 30%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
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
        cursor: pointer;
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
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color:#fff;
      cursor: pointer;
    }
  }
  .conjuncture{
    padding: 0 20px;
    background-color: #fff;
    .con_head{
      padding: 40px 0 30px;
      font-size: 26px;
      line-height: initial;
    }
    .con_list{
          padding:10px 12px;
          border: 1px solid #ccc;
    }
    .con_item{
      padding:6px 0;
      .item_head{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .rise{
          padding:4px 10px;
          background-color:#f55352;
          color: #fff;
          font-size: 12px;
          margin-right: 10px;
        }
        .riseup{
          background-color: green;
        }

      }
      .price{
          font-size: 16px;
          line-height: 32px;
      }
      .svg_box{
        height: 100px;
        text-align: center;
        svg{
          height: 100%;
          max-width: 100%;
          width: 222px;
        }
      }
    }
    .con_item~.con_item{
      border-top: 1px solid #ccc;
    }
  } 
}
@media screen and(min-width: 561px) and(max-width: 820px){ 
  .deepNews{
    .list_tab{
        font-size: 18px;
        span{
          padding: 8px;
        }
      .tab_bg{
        opacity: 0.7;
      }
    } 
    .hot_news{
      .hot_list{
        .hot_item{
          height: 260px; 
        }
        .col-sm-6{
          .hot_item{ 
            height: 128px; 
          }
        }
      }
    }
  }
}
@media screen and(min-width: 466px) and(max-width: 560px){ 
  .deepNews {
    .list_tab{
      font-size: 14px;
      span{
        padding: 8px;
      }
      .tab_bg{
        opacity: 0.7;
      }
    }
    .hot_news{
      .hot_list{
        .hot_item{
          height: 200px; 
        }
        .col-sm-6{
          .hot_item{ 
            height: 98px; 
          }
        }
      }
    }
    .list_cont{
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
}
@media screen and(min-width: 375px) and(max-width: 465px){ 
  .deepNews {
    .list_tab{
      font-size: 12px;
      padding: 0 10px;
      span{
        padding: 4px;
        a{
          line-height: initial;
        }
      }
      .tab_bg{
        opacity: 0.7;
        width: 80px;
      }
    }
    .hot_news{
      .hot_tab{
        padding: 20px 0;
      }
      .hot_list{
        .hot_item{
          height: 150px; 
        }
        .news_txt{
          height: 26px;
          line-height: 26px;
          font-size: 12px;
        }
        .col-sm-6{
          .hot_item{ 
            height: 73px; 
          }
        }
      }
    }
    .list_cont{
      .news_article {
        .news_head{
          height: 20px;
          line-height: initial;
          align-items: flex-start;
          .news_mark span{
            font-size: 12px;
            margin-right: 8px !important;
            padding: 0px 6px;
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
    .select_coin{
      padding: 4px 12px !important;
      width: 68px;
      font-size: 12px;
      text-align: left;
    }
    .select_btn{
      top:10px;
      width: 12px;
      right: 10px;
    }
    .select_tab{
      top:34px;
    }
  }
}
@media screen and(max-width: 374px){ 
  .deepNews {
    .list_tab{
      font-size: 10px;
      padding: 0 4px;
      margin-bottom: 10px;
      span{
        padding: 2px;
        a{
          line-height: initial;
        }
      }
      .tab_bg{
        opacity: 0.7;
        width: 60px;
      }
    }
    .hot_news{
      .hot_tab{
        padding: 20px 0;
      }
      .hot_list{
        .hot_item{
          height: 150px; 
        }
        .news_txt{
          height: 26px;
          line-height: 26px;
          font-size: 12px;
        }
        .col-sm-6{
          .hot_item{ 
            height: 73px; 
          }
        }
      }
    }
    .list_cont{
      .news_article {
        .news_head{
          height: 20px;
          line-height: initial;
          align-items: flex-start;
          .news_mark span{
            font-size: 10px;
            margin-right: 6px !important;
            padding: 0px 4px;
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
    .select_coin{
      padding: 4px 12px !important;
      width: 68px;
      font-size: 10px;
      text-align: left;
    }
    .select_btn{
      top:8px;
      width: 12px;
      right: 8px;
    }
    .select_tab{
      top:34px;
    }
  }
}
</style>
