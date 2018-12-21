<template>
  <div class="quickNews">
      <headerBox></headerBox>
      <div class="con_box">
         <div class="news_box">
            <div v-for="item in quickNews.data">
                <div class="box_nav">
                   <div class="time"><div class="date">{{item.showDate}}</div><div class="week">{{item.showDay}}<span>{{item.showWeek}}</span></div></div>
                </div>
                <div class="news_list">
                    <div class="no_news text-center" v-show="no_news">
                      今日暫無快訊                  
                    </div>
                    <div class="news_item" v-for="news in item.news">
                       <div class="date">
                         <span>{{news.created_at}}</span>
                       </div>
                       <div class="item_cont">
                         <div class="cont_title">{{news.title}}</div>
                         <div class="cont">
                           {{news.content}}
                         </div>
                         <div class="cont_footer">
                           <span><img src="../../img/up.jpg" alt="">&nbsp;利好&nbsp;{{news.up_counts}}</span>
                           <span><img src="../../img/down.jpg" alt="">&nbsp;利空&nbsp;{{news.down_counts}}</span>
                           <span><img src="../../img/share.jpg" alt="">分享</span>
                         </div>
                       </div>
                    </div>
                </div>
            </div>
            <div class="more" @click=clickPage  v-show="addMore_show">
              <img src="../../img/arrow_d.png" alt="">
            </div>
           
         </div>
      </div>
      <footerBox></footerBox>
    </div>
  </div>
</template>

<script>
import footerBox from "@/components/footerBox_td";
import headerBox from "@/components/headerBox_td";
import * as api from "@/api/api";
import {  mapMutations ,mapGetters } from 'vuex';
import * as com from "@/util/common.js"


export default {
    data(){
        return {
            tabLists:[
                
                ],
            listData:[],
            quickNews:{
              
              date:'',
              page:'',
              totalPage:'',
              data:[
                {
                  showDate:'',
                  showWeek:'',
                  showDay:'',
                  news:[],
                }
              ],
              from:'',
              to:'',
            },
            addMore_show:false,
            no_news:false,
            week:["星期日","星期壹","星期二","星期三","星期四","星期五","星期六"],
            day:["今天","昨天","前天","本周","上周","本月","歷史"]
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
        var date=new Date();

        date.setHours(0,0,0,0);

        this.quickNews.date=date;

        this.quickNews.data[0].showDate=(date.getMonth()+1)+'月'+date.getDate()+'日';

        this.quickNews.data[0].showWeek=this.week[(new Date()).getDay()];



        this.quickNews.data[0].showDay=this.day[0];

        var from = date.getTime();

        this.quickNews.from=from

        date.setDate(date.getDate()+1);

        var to = date.getTime();

        this.quickNews.to=to;

        this.quickNews.page=1;


        this.getData(from,to,1);
        this.setName();
    },
    methods:{
        ...mapMutations({
             setRightName: 'COM_SET_RIGHTUSERNAME'
        }),
        getData(from,to,page){
            var load=layer.load(2, { shade: [0.01, '#fff'] });

            api.getQuickNews({'page':page,pagesize:5,language:2}).then(res=>{

              layer.close(load);
               /*if(!res.success){
                console.log('syetem_err');
                this.no_news=true;
                this.addMore_show=false;
                return
               }*/

               if(res.code==100){
                  com.toast(res.msg_cn);
                  return
               }

               if(!res.totalPage||res.totalPage<1){
                  this.no_news=true;
                  this.addMore_show=false;
                  return
               }

               this.quickNews.totalPage=res.totalPage?res.totalPage:0;

               for(var i=0;i<res.news.length;i++){
                var text=res.news[i].content.split('】')
                res.news[i].title=text[0]+"】";
                res.news[i].content=text[1];
                var time=res.news[i].created_at*1;

                if((res.news[i].created_at+'').length==10){
                  res.news[i].created_at=res.news[i].created_at*1000;
                }
                var h=(new Date(res.news[i].created_at*1)).getHours();
                var m=(new Date(res.news[i].created_at*1)).getMinutes();
                if(h<10){
                  h='0'+h;
                }
                if(m<10){
                  m='0'+m
                }
                res.news[i].created_at=h+':'+m;

                if(time>=(new Date(this.quickNews.date)).getTime()-24*60*60*1000){
                  this.quickNews.data[this.quickNews.data.length-1].news.push(res.news[i])
                }else{
                  let obj={};
                  //showDate:'',
                  //showWeek:'',
                  //showDay:'',
                  //news:[],

                  if(this.quickNews.data.length==1){
                      obj.showDay=this.day[1]
                  }else if(this.quickNews.data.length==2){
                      obj.showDay=this.day[2]
                  }else if((new Date()).getDay()+1>=this.quickNews.data.length&&this.quickNews.data.length>2){
                      obj.showDay=this.day[3]
                  }else if(this.quickNews.data.length>(new Date()).getDay()+1&&this.quickNews.data.length<(new Date()).getDay()+8){
                      obj.showDay=this.day[4]
                  }else if(this.quickNews.data.length>=(new Date()).getDay()+8&&this.quickNews.data.length<(new Date()).getDate()+1){
                      obj.showDay=this.day[5]
                  }else{
                      obj.showDay=this.day[6]
                  }

                  obj.showDate=((new Date(time)).getMonth()+1)+'月'+(new Date(time)).getDate()+'日';

                  obj.showWeek=this.week[(new Date(time)).getDay()];

                  obj.news=[];

                  this.quickNews.date=(new Date(this.quickNews.date)).getTime()-24*60*60*1000;

                  this.quickNews.data.push(obj)
                  this.quickNews.data[this.quickNews.data.length-1].news.push(res.news[i])
                }
                


               }
               this.no_news=false;

               if(this.quickNews.totalPage>page){
                this.addMore_show=true;
               }else{
                this.addMore_show=false;
               }
            })
        },
        clickPage(){
          /*if(this.quickNews.totalPage==this.quickNews.page){
            this.quickNews.date=new Date(this.quickNews.from-24*60*60*1000);
            this.quickNews.from=this.quickNews.date.getTime();
            this.quickNews.to=this.quickNews.from+24*60*60*1000;
            this.quickNews.showDate=this.quickNews.date.getFullYear()+'年'+(this.quickNews.date.getMonth()+1)+'月'+this.quickNews.date.getDate()+'日';
            this.quickNews.page=1;

          }else if(this.quickNews.page<this.quickNews.totalPage){
            this.quickNews.page=this.quickNews.page*1+1;
          }*/
          if(this.quickNews.page<this.quickNews.totalPage){
            this.quickNews.page=this.quickNews.page+1;
            this.getData(this.quickNews.from,this.quickNews.to,this.quickNews.page)
          }else{

          }
        },
        setName(){
         this.setRightName(this.getLoginUser);
        }
    },
    watch:{
        
    }
}
</script>

<style lang="less" scoped>

.quickNews{
  background-color:#fff;
  color:#3a416e;
  .con_box{
    max-width: 1200px;
    margin:0 auto;
  }
  .news_box{
    padding: 4% 4% 0 4%;
    .box_nav{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .time{
        width: 240px;
        height: 90px;
        padding: 10px 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 2px solid #e1eefa;
        border-radius: 18px;
        font-size: 24px;
        .date{
          border-radius: 6px;
          color: #444b75;
        }
        .week{
          text-align: center;
          border-left: 1px solid #e1eefa;
          padding-left: 20px;
          color: #333333;
          line-height: 30px;
          span{
            display: block;
            font-size: 16px;
            color: #999999;
          }
        }
      }
    }
    .news_list{
      min-height: 160px;
      margin-left: 20px;
      border-left:1px solid #c2d1dc;
      padding-top: 40px;
      .no_news{
        display: flex;
        height: 160px;
        align-items: center;
        justify-content: center;
      }
      .news_item{
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        .date{
          font-size: 18px;
          width: 70px;
          padding: 6px 10px;
          background-color:#16436a;
          color: #fff;
          border-radius: 4px;
          position: relative;
          left:-6px;
        }
        .item_cont{
          width: 100%;
          padding-left: 40px;
          .cont_title{
            padding: 4px;
            font-size: 18px;
            color: #2f334f;
            line-height: 30px;
            margin-bottom: 10px;
          }
          .cont{
            padding-left:12px;
            line-height: 34px;
            text-align: justify;
            font-size: 14px;
            color: #2f334f;
          }
          .cont_footer{
            text-align:right;
            margin-top: 20px;
            span{
              margin-left: 12px;
              display: inline-flex;
              align-items: center;
              cursor: pointer;
            }
          }
        }
      }
    }
    .more{
      margin-top: 40px;
      height: 60px;
      background-color: #f1f1f1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
}
@media screen and(max-width: 700px){ 
    .quickNews{
      .news_box{
        padding: 10% 2% 0 2%;
        .box_nav{
          .time{
            width: 140px;
            height: 60px;
            padding: 6px 12px;
            font-size: 16px;
            border-radius: 12px;
            .week{
              line-height: 20px;
              padding-left: 14px;
              span{
                font-size: 12px;
              }
            }
          }
        }
        .news_list{
          margin-left: 0;
          .news_item{
            .date{
              font-size: 14px;
              width: 50px;
              padding: 4px 8px;
            }
            .item_cont{
              padding-left: 0px;
              .cont_title{
                margin-bottom: 0;
                height: 38px;
                padding: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 260px;
              }
              .cont{
                line-height: 24px;
                padding-left: 0;
                margin-left: -36px;
              }
            }
          } 
        } 
      } 
    } 
} 
@media screen and(min-width: 701px)and(max-width: 1199px){ 
    .quickNews{
      .news_box{
        .news_list{
          .news_item{
            .item_cont{
              padding-left: 2px;
              .cont_title{
                margin-bottom: 0;
              }
              .cont{
                line-height: 24px;
              }
            }
          } 
        } 
      } 
    } 
} 
</style>
