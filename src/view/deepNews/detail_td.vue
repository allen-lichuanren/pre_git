<template>
  <div class="news_detail">
      <headerBox style="z-index: 10"></headerBox>
      <div class="row top" style="z-index: 0">
        <div class="col-lg-9">
            <div class="article">
              <div class="article_title">{{article_detail.title}}</div>
              <div class="explain">
                <div>
                  <span>12小時前</span>
                  <span><img src="../../img/eye.png" alt="">&nbsp;&nbsp;123444</span>
                  <span><img src="../../img/word.png" alt="">&nbsp;&nbsp;123444</span>
                </div>
                <span class="share" @click=collect>收藏</span>
              </div>
              <div class="content" v-html="article_detail.content">
              </div>
            </div>
        </div>
        <div class="col-lg-3">
          <div class="aside">
            <!-- <div class="aside_title">相關推薦</div>
            <div class="aside_item">
              <img src="../../img/news.png" alt="">
              <div class="suggest_con">
                <div>油價飆升會導致 股市崩盤嗎？</div>
                <span class="time">19小時前</span>
              </div>
            </div>

            <div class="aside_item">
              <img src="../../img/news.png" alt="">
              <div class="suggest_con">
                <div>油價飆升會導致 股市崩盤嗎？</div>
                <span class="time">19小時前</span>
              </div>
            </div>

            <div class="aside_item">
              <img src="../../img/news.png" alt="">
              <div class="suggest_con">
                <div>油價飆升會導致 股市崩盤嗎？</div>
                <span class="time">19小時前</span>
              </div>
            </div> -->
            <div class="aside_title" >最近浏览</div>
            <div v-if="read_record.length==0" style="height: 120px;display: flex;align-items: center;justify-content: center;border:1px solid #ccc">
              登录后查看浏览记录
            </div>
            <div class="recent_view" v-for="item in read_record" v-if="item">
              <img src="../../img/dot.png" alt="">
              <div @click=article_detial(item.aid)>{{item.title}}</div>
            </div>

          </div>
        </div>
      </div>
      <div id="user_do" style="z-index: 0" v-bind:class="{'user_do':true,'opacity':fixed}">
        <div>
          <span class="hourse" @click=collect><img src="../../img/hourse.png" alt="">收藏</span>
          <span class="share">分享 <img src="../../img/hourse.png" alt=""> <img src="../../img/hourse.png" alt=""> <img src="../../img/hourse.png" alt=""></span>
        </div>
      </div>
      <div v-bind:class="{'user_do':true,'fixed':fixed}" v-show="fixed">
        <div>
          <span class="hourse" @click=collect><img src="../../img/hourse.png" alt="">收藏</span>
          <span class="share">分享 <img src="../../img/hourse.png" alt=""> <img src="../../img/hourse.png" alt=""> <img src="../../img/hourse.png" alt=""></span>
        </div>
      </div>

      <div class="row assess_box">
          <div class="col-lg-9">
             <div class="assess">
               <div class="assess_head">
                 <span class="num">共{{judge_total.number}}條評論</span>
                 <span class="sort">按熱度排序</span>
               </div>
               <div class="assess_list">
                 <div class="assess_item" v-for="item in judgement">
                    <div>
                      <div class="img_person">
                        <img :src="item.headImg" alt="">
                      </div>
                      <div class="assess_cont">
                         {{item.content}}
                      </div>
                    </div>
                    <div class="item_footer">
                      <span class="time">{{item.time}}</span>
                      <span class="zan" @click=zan(item)><img src="../../img/like_r.png" alt="">{{item.favorite}}</span>
                    </div>
                 </div>


                <div class="page_select pageContainer">
                  <ul class="pagesInner">
                     <li v-if="judge_total.select!=1" class="page" @click="prevOrNext(-1)"><span aria-hidden="true">上壹頁</span></li>
                     <li class="page" v-for="(item, index) in pages" :key="index" :class="{actived: item === judge_total.select}" @click="select(item)"><span>{{item}}</span></li>
                     <li v-if="judge_total.select<judge_total.pages" class="page" @click="prevOrNext(1)"><span aria-hidden="true">下壹頁</span></li>
                  </ul>
                </div>
               </div>


               <div class="do_assess">
                 <input type="text" name="" placeholder="寫下您的評論" v-model="judge_text">
                 <span class="access_btn" @click=judge>發表</span>
               </div>
              </div>
              
          </div>
      </div>
      <footerBox></footerBox>
  </div>
</template>

<script>
import headerBox from "@/components/headerBox_td";
import footerBox from '@/components/footerBox_td';
import * as api from "@/api/api";
import * as com from "@/util/common";
import { mapMutations ,mapGetters } from 'vuex';


export default {
    data(){
        return {
          news:{},
          aid:'',
          article_detail:{},
          fixed:true,
          judge_text:'',
          judge_total:{pages:0,number:0,select:1},
          //judgement:[{img:'/static/img/default.png',txt:'111',time:'07-10',zan:'666'},{img:'/static/img/default.png',txt:'222',time:'07-10',zan:'666'},{img:'/static/img/default.png',txt:'333',time:'07-10',zan:'666'}],
          judgement:[],
          read_record:[],
        }
    },
    computed:{
        ...mapGetters([
            'getToken',
            'getLoginUser'
         ]),
        pages() {
          const c = this.judge_total.select
          const t = this.judge_total.pages
          if (t <= 5) {
            var arr=[];
            for(let i=1;i<=t;i++){
              arr.push(i)
            }
            return arr //第壹種情況
          } else if (c >= t - 4) {
            return [1, '...', t-4, t-3, t-2, t-1, t] //第二種情況
          } else {
            return [1, '...', c, c+1, c+2, c+3, '...', t] //第三種情況
          }
        }
    },
    components:{headerBox,footerBox},
    created(){
        var aid = this.$route.query.aid;
        this.aid=aid;
        this.getData();
        this.setName();
        this.getRecord();
        this.changeJudge();
    },
    methods:{
        ...mapMutations({
             setRightName: 'COM_SET_RIGHTUSERNAME'
        }),
        getData(){
           api.getArticles({aid:this.aid,language:2}).then(res=>{
              if(res[0]&&JSON.stringify(res[0])!='{}'){
                this.article_detail=res[0];
              }
           })
        },
        setName(){
         this.setRightName(this.getLoginUser);
        },
        scroll(){
          //變量t是滾動條滾動時，距離頂部的距離
          var t = document.documentElement.scrollTop||document.body.scrollTop;
          var docHeight=window.innerHeight;
          var elHeight = document.getElementById('user_do').offsetHeight;
          var height=$('.top').outerHeight()+$('.top')[0].offsetTop;
          if(t+docHeight-elHeight>=height){
            this.fixed=false
          }else{
            this.fixed=true
          }
        },
        collect(){
          api.collect({aid:this.aid}).then(res=>{
            if(res.code!=200){
              com.toast(res.msg)  
            }else{
              com.toast(res.msg_cn)
            }
          })
        },
        judge(){
          if(!this.judge_text){
            com.toast("請輸入內容");
            return
          }
          if(this.judge_text.length>200){
            com.toast("評論不能超過200字")
            return
          }
          api.judge({aid:this.aid,text:this.judge_text}).then(res=>{
            if(res.code==200){
              com.toast('評論成功');
              //刷新評論數據
              this.judge_total={pages:0,number:0,select:1},
              this.changeJudge();


              this.judge_text='';

            }else{
              com.toast(res.msg_cn);
            }
          })
        },
        select(n) {
          if (n === this.judge_total.select) return
          if (typeof n === 'string') return
          this.judge_total.select = n;
          this.changeJudge();
        },
        prevOrNext (n) {
          this.judge_total.select += n
          this.judge_total.select < 1 ? this.judge_total.select = 1 : this.judge_total.select > this.judge_total.pages ? this.judge_total.select = this.judge_total.pages : null
          this.changeJudge();
        },
        changeJudge(){
          api.getJudge({page:this.judge_total.select,aid:this.aid,pageSize:3}).then(res=>{
              if(!res.code){
                this.judge_total.number=res.totalcount*1;
                this.judge_total.pages=Math.ceil(res.totalcount*1/3);
                if(res.commentsList.length){
                  let data=res.commentsList;
                  this.judgement=[];
                  for(var i=0; i<data.length; i++){
                      let obj={};
                      obj.rid=data[i].rid;
                      obj.headImg=data[i].headImg;
                      obj.content=data[i].content;
                      obj.time=(new Date(data[i].operate_time*1)).getFullYear()+'-'+((new Date(data[i].operate_time*1)).getMonth()*1+1)+'-'+(new Date(data[i].operate_time*1)).getDate()+' '+(new Date(data[i].operate_time*1)).getHours()+':'+(new Date(data[i].operate_time*1)).getMinutes();
                      obj.favorite=data[i].favorite;
                      this.judgement.push(obj);
                  }

                }else if(this.judge_total.select!=1){
                  com.toast("沒有更多評論");
                }
              }else{
                com.toast(res.msg_cn);
              }
          })
        },
        getRecord(){
          api.record({language:2}).then(res=>{
            if(!res.code){
              this.read_record=[res[0],res[1],res[2],res[3],res[4]];
            }
          })
        },
        article_detial(aid){
          this.$router.push({path:'/newsDetail_td',query:{'aid':aid}})
          this.$router.go(0)
        },
        zan(item){
          api.zan({aid:this.aid,rid:item.rid}).then(res=>{
            if(res.code==200){
              com.toast(res.msg_cn)
              item.favorite=item.favorite*1+1;
            }else{
              com.toast(res.msg_cn)
            }
          })
        }

    },
    mounted:function(){
      window.addEventListener('scroll', this.scroll)
    },
    destroyed:function(){
      window.removeEventListener('scroll',this.scroll)
    },
    watch:{
      
    }
}
</script>

<style lang="less">
    .news_detail{
      color:#333;
      background-color: #fff;
      .top{
        max-width: 1200px;
        margin:0 auto;
        padding-top: 32px;
        .article{
          padding: 0 15px;
          .article_title{
            font-size: 30px;
            color:#262a43;
            line-height: initial;
          }
          .explain{
            display: flex;
            font-size: 14px;
            align-items: center;
            justify-content: space-between;
            margin:40px 0;
            .share{
              cursor: pointer;
              color: #3891e3;
            }
            div{
              display: flex;
              align-items: center;
              span{
                display: inline-flex;
                align-items: center;
                margin-right:40px;
              }
            }
          }
          .content{
            font-size: 16px;
            line-height: 36px;
            text-align: justify;
            padding-bottom: 20px;
          }

        }

      }
      .user_do{
          border-top:2px solid #ccc;
          border-bottom:2px solid #ccc;
          font-size: 16px;
          color: #333;
          display: none;
          div{
            max-width: 1200px;
            margin: 0 auto;
            padding:20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
              display: flex;
              align-items: center;
              cursor: pointer;
              img{
                margin: 0 12px;
              }
            }
          }        
      }
      .opacity{
        opacity: 0;
      }
      .fixed{
        position: fixed;
        width: 100%;
        bottom:0;
        background-color: #fff;
        z-index: 100
      }
      .assess_box{
        max-width: 1200px;
        margin:0 auto;
        .assess{
          margin: 20px;
          border:1px solid #eee;
          border-radius: 8px;
          .assess_head{
            padding: 4%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;
            border-bottom: 1px solid #ddd;
            .sort{
              color:#7c7c7c;
            }
          }
          .assess_list{
            border-bottom: 1px solid #ddd;
          }
          .assess_item{
            padding: 4%;
            border-bottom: 1px solid #ddd;
            div:first-child{
              display:flex;
              align-items: center;
              .img_person{
                width:96px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 4px;
                img{
                  border-radius: 50%;
                  width: 48px;
                }
              }
              .assess_cont{
                font-size: 16px;
              }
            }
            .item_footer{
              padding:12px 0 12px 96px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .zan{
                display: flex;
                align-items: center;
                img{
                  margin-right:10px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .page_select{
          text-align: center;
          padding: 30px 0;
          ul{
            li{
              display: inline-block;
              padding: 4px 14px;
              border: 1px solid #ccc;
              border-radius: 4px;
              margin: 0 4px;
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
        .do_assess{
          padding: 4% 3%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          input{
            padding: 1.5% 5%;
            background-color: #f4f4f4;
            color: #cecece;
            font-size: 18px;
          }
          input{
            border:none;
            outline: none;
            width: 60%;
          }
          .access_btn{
            padding:12px 40px;
            background-color: #f4f4f4;
            color: #cecece;
            font-size: 18px;
            cursor:pointer;
          }
        }
      }
      .aside{
        color: #1f233c;
        .aside_title{
          font-size: 24px;
          line-height: initial;
          background: #012646;
          color: #fff;
          padding: 8px 0 8px 20px;
        }
        .aside_item{
          display: flex;
          align-items: center;
          height: 120px;
          border: 1px solid #eee;
          border-top: none;
          padding: 10px;
          img{
            max-width: 50%;
          }
          .suggest_con{
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            padding: 15px 0 15px 12px;
            div{
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
        .recent_view{
          display: flex;
          align-items: center;
          border: 1px solid #eee;
          height: 80px;
          border-top: none;
          padding-left: 10px;
          cursor: pointer;
          div{
            padding: 12px;
          }
        }
      }
    }
    @media screen and(min-width: 560px) and(max-width: 992px){ 
        .col-lg-3{
          display: none;
        }
        .content{
          img{
            max-width: 100% !important;
          }
        }
        .news_detail{
          .assess_box{
            .page_select{
              ul{
                li{
                  padding: 4px 8px;
                  margin: 0 4px;
                }
              } 
            }
          }
        }
    }
    @media screen and(min-width: 361px) and(max-width: 559px){ 
        .col-lg-3{
          display: none;
        }
        .news_detail{
          .top .article{
              padding: 0;
              .explain div span{
                margin-right: 10px;
              }
            } 
          .content{
            img{
              max-width: 100% !important;
            }
          }
          .assess_box{
            .assess{
              margin: 20px 0;
            }
            .page_select{
              ul{
                li{
                  padding: 2px 6px;
                  margin: 0 2px;
                  font-size: 12px;
                }
              } 
            }
            .do_assess .access_btn{
                padding: 6px 20px;
            }
          } 
        }
    }
    @media screen and(max-width: 360px){ 
        .col-lg-3{
          display: none;
        }
        .news_detail{
          .top .article{
              padding: 0;
              .explain div span{
                margin-right: 10px;
              }
            } 
          .content{
            img{
              max-width: 100% !important;
            }
          }
          .assess_box{
            .assess{
              margin: 20px 0;
            }
            .page_select{
              ul{
                li{
                  padding: 0px 4px;
                  margin: 0 2px;
                  font-size: 10px;
                }
              } 
            }
            .do_assess .access_btn{
                padding: 6px 20px;
            }
          } 
        }
    }
</style>