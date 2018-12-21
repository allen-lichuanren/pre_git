<template>
  <article>
    <headerBox></headerBox>
    <!-- <div class="banner text-center">
      <img @load=moveScreen src="../../img/banner.jpg" alt="">
    </div> -->
    <div class="article_inner">
      <div class="row">
        <div class="col-lg-3 left-side">
          <div class="content_box" style="">
              <div class="market">
                <div style="display: flex;align-items: center;justify-content: space-between;padding-right: 5px;">
                  <span class="title">市场</span>
                  <select @change=changesource($event.target.value)>
                    <option v-for="(item,key) in symbolData" :value="key">{{key}}</option>
                  </select>
                </div>
                <div class="market_source">
                  <span v-for="source in sources" @click=toggle_source(source) v-bind:class="{'active':source.show===true}"><a href="javascript:void(0)">{{source.name}}</a></span>
                </div>
              </div>
              <div class="content" style="">
                <div class="market_mark">
                    <span>Symbol</span>
                    <span>最新价</span>
                    <span>涨幅</span>
                </div>
                <div class="diliver"></div>
                <div class="tab-content symbol_list" style="">
                    <div v-for="source in sources" v-bind:class="{'active':source.show===true}">
                      <div v-for="item in source.showData" @click=drowKline(item.name) class="market_mark data_line" style="display: flex;align-items: center;justify-content: space-between;cursor: pointer"><span style="">{{item.name}}</span><span>{{item.price_usd}}</span><span v-bind:class="{'up':item.percent_change_24h>0}">{{item.percent_change_24h+'%'}}</span></div>
                    </div>
                    <span class="loading" v-show="load">
                      <span class="loading_content">
                        
                      </span>
                    </span>
                </div>
              </div>
          </div>
        </div>
        <div class="col-lg-9 right-side">
          <div style="min-height: 600px">
            <!-- <script type="text/javascript" src="@/util/tradingView.js"></script> -->
            <div id="kline">
              
            </div>
          </div>
        </div>
      </div>
      <div class="row">
          <div class="col-lg-3 left-side order">
            <div class="content_box" style="">
              <div class="cont_header quick_news" @click=toggle(0)>
                <img src="../../img/arrow_d.png" alt=""><span class="title">快讯</span><span class="date"><span class="day">{{quick_news.date}}</span> <span class="week">{{quick_news.week}}</span></span>
              </div>
              <div v-bind:class="{'content':true,'hide':toggle_detail[0].hide}">
                  <div class="quick" v-for="news in quick_news.data">
                    <div class="quick_head">
                      <span class="time" v-show="news.created_at">{{news.created_at}}</span>
                    </div>
                    <div class="quick_cont">{{news.content}}</div>
                  </div>
              </div>
            </div>
          </div>
        <div class="col-lg-9 middle-side">

          <div v-show="historyState" class="content_box" style="margin-bottom: 26px;">
              <div class="cont_header" @click=toggle(4)>
                <img src="../../img/arrow_d.png" alt=""><span class="title">历史走向</span>
              </div>
              <div  v-bind:class="{'row':true,'content':true,'datum':true,'hide':toggle_detail[4].hide}" style="margin-top: 0">
                <div id='history' style="width: 100%;height: 400px;position: relative;">
                  <span class="loading" v-show="historyload">
                      <span class="loading_content">
                        
                      </span>
                  </span>
                </div>
              </div>
              
          </div>





          <div class="content_box" style="">
              <div class="cont_header" @click=toggle(1)>
                <img src="../../img/arrow_d.png" alt=""><span class="title">币种资料</span>
              </div>
              <div  v-bind:class="{'row':true,'content':true,'datum':true,'hide':toggle_detail[1].hide}" style="margin-top: 0">
                <div class="col-md-6">
                  <div class="ins_info">
                      <div class="datum_head">
                        <div class="name">{{coin_info.code}}</div>
                        <div class="sub_name">{{coin_info.chinese_name_zh}}（{{coin_info.english_name}}）</div>
                    </div>
                    <div class="introduce">
                      <div class="title">简介</div>
                      <div class="ins_cont">{{coin_info.description_zh}}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-5 offset-sm-1">
                  <div class="ins_detail">
                    <div><span>发行时间</span><span>{{coin_info.publish_time}}</span></div>
                    <div><span>发行总量</span><span>{{coin_info.market_capitalization}}</span></div>
                    <div><span>流通总量</span><span>{{coin_info.market_count}}</span></div>
                    <div><span>众筹价格</span><span>{{coin_info.ico_price}}</span></div>
                    <div><span>白皮书</span><span><a style="display:flex;font-size: 12px;line-height: 20px;max-width: 100%;word-break: break-all;" :href="coin_info.white_paper" target="_blank">{{coin_info.white_paper}}</a></span></div>
                    <div><span>官网</span><span><a style="display:flex;font-size: 12px;line-height: 20px;max-width: 100%;word-break: break-all;" :href="coin_info.website[0]" target="_blank">{{coin_info.website[0]}}</a></span></div>
                    <div><span>区块链查询</span><span><a style="display:flex;font-size:12px;line-height: 20px;max-width: 100%;word-break: break-all;" :href="coin_info.block_explorer[0]">{{coin_info.block_explorer[0]}}</a></span></div>
                  </div>
                </div>
              </div>
          </div>
          <div class="row">
            <div class="col-lg-12" style="padding-left:0; padding-right: 0;">
                <div class="content_box" style="">
                    <div class="cont_header" @click=toggle(2)>
                      <img src="../../img/arrow_d.png" alt=""><span class="title">币种深度新闻</span>
                    </div>
                    <div v-bind:class="{'content':true,'hide':toggle_detail[2].hide}">
                      
                      <div v-show="!articles[0].aid" class="" style="height: 180px;display: flex;align-items: center;justify-content: center;font-size: 16px">该币种暂无新闻</div>

                      <div v-if="articles[0].aid" v-for="item in articles" class="news" news_id='1'>
                         <div class="news_img" v-bind:style="{backgroundImage:'url('+item.thumbnail+')',backgroundRepeat:'no-repeat',backgroundPosition:'center center',backgroundSize:'cover'}">
                           <!-- <img :src="item.thumbnail" alt=""> -->
                         </div>
                         <div class="news_article">
                           <div class="news_head">
                             <span>
                               <span class="news_mark" v-for="(tag,index) in item.tags" v-if="index<5" style="margin-right: 12px">{{tag}}</span>
                             </span>
                             
                           </div>
                           <div class="news_cont" @click=read_detail(item.aid) style="cursor: pointer;">
                             <div class="news_title">{{item.title}}</div>
                             <div class="introduce">{{item.summary}}</div>
                           </div>
                           <div class="news_footer">
                             <span><!-- <span class="read_all" @click=read_detail(item.aid)> 阅读全文</span> --><span class="news_date"> {{item.resource}} &bull; {{item.published_time}}</span></span>
                             <span class="share" @click=collect(item.aid)>收藏</span>
                           </div>
                         </div>
                      </div>
                    </div>
                    <div v-show="articles[0].aid" v-bind:class="{'cont_footer':true,'hide':toggle_detail[2].hide}">
                        <router-link :to="{path:'/coinDeepNews',query:{coin:select_symbol}}">查看全部深度新闻</router-link>
                    </div>
                </div>
            </div>
            <!-- <div class="col-lg-3" style="padding-right:0;">
                <div class="content_box" style="">
                  <div class="cont_header" @click=toggle(3)>
                      <img src="../../img/arrow_d.png" alt=""><span class="title">用户评论</span>
                  </div>
                  <div v-bind:class="{'content':true,'comment':true,'hide':toggle_detail[3].hide}">
                    <div class="comment_login" v-if="!getToken.length"><router-link to="/login">登录 </router-link>或<router-link to="/regist"> 注册</router-link>才能评论</div>
                    <template v-else-if="getToken.length">
                       <div comment_box></div>
                    </template>
                  </div>
                </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <footerBox></footerBox>
  </article>
</template>
<script>
import '@/util/tradingView.js';
//import '@/util/charting_library/charting_library.min.js';
import footerBox from '@/components/footerBox'

import headerBox from '@/components/headerBox'
import * as com from "@/util/common.js"
import * as api from "@/api/api";
import {  mapMutations ,mapGetters } from 'vuex';
import '@/util/highchart/highstock.js'
import '@/util/highchart/exporting.js'
import '@/util/highchart/highcharts-zh_CN.js';
import cookie from 'js-cookie'


export default {
    data(){
        return {
            load:true,
            source:'Binance',
            select_symbol:'AE_BTC',
            trans_symbol:'BTC',
            listData:[],
            sources:[
              {'name':'BTC','show':true,'data':[],'showData':[]},
              {'name':'USD','show':false,'data':[],'showData':[]},
              {'name':'USDT','show':false,'data':[],'showData':[]}
            ],
            symbolData:{
  "Binance":{"BTC":["AE_BTC","ADA_BTC","ARN_BTC","AION_BTC","ARK_BTC","APPC_BTC","AST_BTC","AMB_BTC","ADX_BTC","AGI_BTC","BNB_BTC","BCN_BTC","BCC_BTC","BAT_BTC","BTS_BTC","BQX_BTC","BTG_BTC","BLZ_BTC","BRD_BTC","BCPT_BTC","BCD_BTC","BNT_BTC","CMT_BTC","CND_BTC","CDT_BTC","CHAT_BTC","CVC_BTC","CLOAK_BTC","DGD_BTC","DASH_BTC","DNT_BTC","DLT_BTC","DATA_BTC","EOS_BTC","ETH_BTC","ETC_BTC","ELF_BTC","ENG_BTC","ENJ_BTC","EDO_BTC","EVX_BTC","FUN_BTC","FUEL_BTC","GNT_BTC","GVT_BTC","GTO_BTC","GAS_BTC","GXS_BTC","GRS_BTC","HSR_BTC","ICX_BTC","IOTA_BTC","IOST_BTC","IOTX_BTC","INS_BTC","ICN_BTC","KNC_BTC","KMD_BTC","LTC_BTC","LOOM_BTC","LSK_BTC","LUN_BTC","LEND_BTC","LINK_BTC","LRC_BTC","MTL_BTC","MANA_BTC","MCO_BTC","MOD_BTC","MTH_BTC","MDA_BTC","NANO_BTC","NEO_BTC","NULS_BTC","NEBL_BTC","NAV_BTC","NCASH_BTC","NXS_BTC","ONT_BTC","OMG_BTC","OST_BTC","OAX_BTC","PPT_BTC","POE_BTC","POA_BTC","POWR_BTC","PIVX_BTC","QKC_BTC","QSP_BTC","QTUM_BTC","QLC_BTC","RLC_BTC","RPX_BTC","REQ_BTC","RCN_BTC","RDN_BTC","REP_BTC","SUB_BTC","SALT_BTC","SKY_BTC","SNM_BTC","SNT_BTC","SYS_BTC","SC_BTC","STORM_BTC","STRAT_BTC","STEEM_BTC","SNGLS_BTC","STORJ_BTC","TRX_BTC","TRIG_BTC","TNB_BTC","TUSD_BTC","TNT_BTC","THETA_BTC","VEN_BTC","VIBE_BTC","VIB_BTC","VIA_BTC","WAN_BTC","WTC_BTC","WABI_BTC","WPR_BTC","WAVES_BTC","WINGS_BTC","XVG_BTC","XRP_BTC","XLM_BTC","XMR_BTC","XEM_BTC","XZC_BTC","YOYO_BTC","ZIL_BTC","ZRX_BTC","ZEC_BTC","ZEN_BTC"],"USDT":["ADA_USDT","BTC_USDT","BNB_USDT","BCC_USDT","ETH_USDT","EOS_USDT","ETC_USDT","ICX_USDT","IOTA_USDT","LTC_USDT","NEO_USDT","ONT_USDT","QTUM_USDT","TRX_USDT","TUSD_USDT","XRP_USDT","XLM_USDT"],"USD":["ADA_USD","AION_USD","ARK_USD","ARN_USD","AST_USD","APPC_USD","AMB_USD","ADX_USD","AE_USD","BNB_USD","BCC_USD","BTS_USD","BAT_USD","BTG_USD","BQX_USD","BCD_USD","BCPT_USD","BRD_USD","BNT_USD","BLZ_USD","CMT_USD","CND_USD","CDT_USD","CHAT_USD","DGD_USD","DASH_USD","DNT_USD","DLT_USD","EOS_USD","ETH_USD","ETC_USD","ENG_USD","ELF_USD","ENJ_USD","EVX_USD","EDO_USD","FUN_USD","FUEL_USD","GTO_USD","GVT_USD","GAS_USD","GXS_USD","HSR_USD","IOTA_USD","ICX_USD","IOST_USD","INS_USD","IOTX_USD","ICN_USD","KNC_USD","KMD_USD","LTC_USD","LSK_USD","LINK_USD","LRC_USD","LEND_USD","LUN_USD","LOOM_USD","MANA_USD","MTL_USD","MCO_USD","MOD_USD","MTH_USD","MDA_USD","NEO_USD","NEBL_USD","NAV_USD","NANO_USD","NULS_USD","NCASH_USD","OMG_USD","OST_USD","OAX_USD","ONT_USD","PPT_USD","POWR_USD","POE_USD","PIVX_USD","QSP_USD","QTUM_USD","QKC_USD","QLC_USD","REQ_USD","RLC_USD","RDN_USD","RCN_USD","RPX_USD","SUB_USD","SALT_USD","SNM_USD","SNT_USD","STRAT_USD","STORJ_USD","SNGLS_USD","SKY_USD","STORM_USD","TRX_USD","TRIG_USD","TNB_USD","TNT_USD","THETA_USD","VEN_USD","VIBE_USD","VIB_USD","WTC_USD","WABI_USD","WAVES_USD","WINGS_USD","WAN_USD","WPR_USD","XRP_USD","XLM_USD","XVG_USD","XMR_USD","XZC_USD","YOYO_USD","ZRX_USD","ZEC_USD","ZIL_USD"],"ETH":["ADA_ETH","AE_ETH","AION_ETH","ARN_ETH","ARK_ETH","AMB_ETH","APPC_ETH","AST_ETH","ADX_ETH","AGI_ETH","BNB_ETH","BCN_ETH","BCC_ETH","BAT_ETH","BQX_ETH","BLZ_ETH","BTS_ETH","BCPT_ETH","BTG_ETH","BRD_ETH","BNT_ETH","BCD_ETH","CMT_ETH","CND_ETH","CDT_ETH","CHAT_ETH","CVC_ETH","CLOAK_ETH","DGD_ETH","DASH_ETH","DNT_ETH","DLT_ETH","DATA_ETH","EOS_ETH","ETC_ETH","ELF_ETH","ENJ_ETH","ENG_ETH","EDO_ETH","EVX_ETH","FUN_ETH","FUEL_ETH","GNT_ETH","GVT_ETH","GTO_ETH","GXS_ETH","GRS_ETH","HSR_ETH","ICX_ETH","IOTA_ETH","IOST_ETH","IOTX_ETH","INS_ETH","ICN_ETH","KNC_ETH","KMD_ETH","LTC_ETH","LOOM_ETH","LSK_ETH","LEND_ETH","LRC_ETH","LINK_ETH","LUN_ETH","MANA_ETH","MTL_ETH","MCO_ETH","MTH_ETH","MOD_ETH","MDA_ETH","NEO_ETH","NANO_ETH","NULS_ETH","NEBL_ETH","NAV_ETH","NCASH_ETH","NXS_ETH","ONT_ETH","OMG_ETH","OST_ETH","OAX_ETH","PPT_ETH","POA_ETH","POE_ETH","POWR_ETH","PIVX_ETH","QKC_ETH","QSP_ETH","QTUM_ETH","QLC_ETH","REQ_ETH","RLC_ETH","RDN_ETH","RPX_ETH","REP_ETH","RCN_ETH","SUB_ETH","SKY_ETH","SNM_ETH","SALT_ETH","SYS_ETH","SNT_ETH","STORM_ETH","SC_ETH","STEEM_ETH","STRAT_ETH","SNGLS_ETH","STORJ_ETH","TRX_ETH","TUSD_ETH","TNB_ETH","THETA_ETH","TNT_ETH","TRIG_ETH","VEN_ETH","VIBE_ETH","VIB_ETH","VIA_ETH","WAN_ETH","WTC_ETH","WPR_ETH","WABI_ETH","WAVES_ETH","WINGS_ETH","XRP_ETH","XVG_ETH","XLM_ETH","XMR_ETH","XEM_ETH","XZC_ETH","YOYO_ETH","ZIL_ETH","ZRX_ETH","ZEC_ETH","ZEN_ETH"],"BNB":["ADA_BNB","AE_BNB","AION_BNB","ADX_BNB","AMB_BNB","APPC_BNB","AGI_BNB","BCC_BNB","BCN_BNB","BAT_BNB","BCPT_BNB","BTS_BNB","BLZ_BNB","BRD_BNB","CMT_BNB","CND_BNB","CVC_BNB","DLT_BNB","EOS_BNB","ENJ_BNB","ETC_BNB","GNT_BNB","GTO_BNB","IOTA_BNB","ICX_BNB","LTC_BNB","LOOM_BNB","LSK_BNB","MCO_BNB","NEO_BNB","NANO_BNB","NULS_BNB","NEBL_BNB","NAV_BNB","NCASH_BNB","NXS_BNB","ONT_BNB","OST_BNB","POWR_BNB","POA_BNB","PIVX_BNB","QSP_BNB","QTUM_BNB","QLC_BNB","RLC_BNB","RPX_BNB","RCN_BNB","REP_BNB","RDN_BNB","SKY_BNB","SYS_BNB","SC_BNB","STORM_BNB","STEEM_BNB","TUSD_BNB","TRIG_BNB","THETA_BNB","VEN_BNB","VIA_BNB","WAN_BNB","WTC_BNB","WABI_BNB","WAVES_BNB","XLM_BNB","XRP_BNB","XEM_BNB","XZC_BNB","YOYO_BNB","ZIL_BNB","ZEN_BNB"]},
  "Poloniex":{"BTC":["AMP_BTC","ARDR_BTC","BCH_BTC","BCN_BTC","BCY_BTC","BLK_BTC","BTCD_BTC","BTM_BTC","BTS_BTC","BURST_BTC","CLAM_BTC","CVC_BTC","DASH_BTC","DCR_BTC","DGB_BTC","DOGE_BTC","EMC2_BTC","ETC_BTC","ETH_BTC","EXP_BTC","FCT_BTC","FLDC_BTC","FLO_BTC","GAME_BTC","GAS_BTC","GNO_BTC","GNT_BTC","GRC_BTC","HUC_BTC","LBC_BTC","LSK_BTC","LTC_BTC","MAID_BTC","NAV_BTC","NEOS_BTC","NMC_BTC","NXC_BTC","NXT_BTC","OMG_BTC","OMNI_BTC","PASC_BTC","PINK_BTC","POT_BTC","PPC_BTC","RADS_BTC","REP_BTC","RIC_BTC","SBD_BTC","SC_BTC","STEEM_BTC","STORJ_BTC","STRAT_BTC","STR_BTC","SYS_BTC","USDT_BTC","VIA_BTC","VRC_BTC","VTC_BTC","XBC_BTC","XCP_BTC","XEM_BTC","XMR_BTC","XPM_BTC","XRP_BTC","XVC_BTC","ZEC_BTC","ZRX_BTC"],"USD":["AMP_USD","ARDR_USD","BCH_USD","BCN_USD","BCY_USD","BLK_USD","BTCD_USD","BTM_USD","BTS_USD","BURST_USD","CLAM_USD","DASH_USD","DCR_USD","DGB_USD","DOGE_USD","EMC2_USD","ETC_USD","ETH_USD","EXP_USD","FCT_USD","FLDC_USD","FLO_USD","GAME_USD","GNO_USD","GNT_USD","GRC_USD","HUC_USD","LBC_USD","LSK_USD","LTC_USD","MAID_USD","NAUT_USD","NAV_USD","NEOS_USD","NMC_USD","NOTE_USD","NXC_USD","NXT_USD","OMNI_USD","PASC_USD","PINK_USD","POT_USD","PPC_USD","RADS_USD","REP_USD","RIC_USD","SBD_USD","SC_USD","SJCX_USD","STEEM_USD","STRAT_USD","STR_USD","SYS_USD","USDT_USD","VIA_USD","VRC_USD","VTC_USD","XBC_USD","XCP_USD","XEM_USD","XMR_USD","XPM_USD","XRP_USD","XVC_USD","ZEC_USD","ZRX_USD"],"ETH":["BCH_ETH","CVC_ETH","ETC_ETH","GAS_ETH","GNO_ETH","GNT_ETH","LSK_ETH","OMG_ETH","REP_ETH","STEEM_ETH","ZEC_ETH","ZRX_ETH"],"USDT":["BCH_USDT","BTC_USDT","DASH_USDT","ETC_USDT","ETH_USDT","LTC_USDT","NXT_USDT","REP_USDT","STR_USDT","XMR_USDT","XRP_USDT","ZEC_USDT"],"XMR":["BCN_XMR","BLK_XMR","BTCD_XMR","DASH_XMR","LTC_XMR","MAID_XMR","NXT_XMR","ZEC_XMR"]},
  "Bitfinex":{"BTC":["AGI_BTC","AID_BTC","AVT_BTC","ANT_BTC","AIO_BTC","AUC_BTC","BCH_BTC","BTG_BTC","BAT_BTC","BFT_BTC","BCI_BTC","CFI_BTC","CBT_BTC","DSH_BTC","DAT_BTC","DTH_BTC","DAI_BTC","DAD_BTC","EOS_BTC","ETH_BTC","ETC_BTC","ETP_BTC","ELF_BTC","EDO_BTC","FUN_BTC","FSN_BTC","GNT_BTC","IOT_BTC","IOS_BTC","KNC_BTC","LTC_BTC","LRC_BTC","LYM_BTC","MTN_BTC","MKR_BTC","MNA_BTC","MIT_BTC","NEO_BTC","OMG_BTC","ODE_BTC","ORS_BTC","POA_BTC","POY_BTC","QSH_BTC","QTM_BTC","RLC_BTC","REQ_BTC","RCN_BTC","REP_BTC","RDN_BTC","RRT_BTC","SNT_BTC","SAN_BTC","SPK_BTC","STJ_BTC","SNG_BTC","TRX_BTC","TNB_BTC"],"USD":["AGI_USD","AVT_USD","AID_USD","AIO_USD","ANT_USD","AUC_USD","BTC_USD","BCH_USD","BTG_USD","BAT_USD","BCI_USD","BFT_USD","CFI_USD","CBT_USD","DSH_USD","DAT_USD","DTH_USD","DAI_USD","DAD_USD","ETH_USD","EOS_USD","ETC_USD","ETP_USD","ELF_USD","EDO_USD","FUN_USD","FSN_USD","GNT_USD","IOT_USD","IOS_USD","KNC_USD","LTC_USD","LRC_USD","LYM_USD","MNA_USD","MTN_USD","MKR_USD","MIT_USD","NEO_USD","OMG_USD","ODE_USD","ORS_USD","POA_USD","POY_USD","QTM_USD","QSH_USD","RRT_USD","REP_USD","RLC_USD","RCN_USD","REQ_USD","RDN_USD","SAN_USD","SNT_USD","SPK_USD","SNG_USD","STJ_USD","TRX_USD","TNB_USD"],"ETH":["AGI_ETH","AVT_ETH","AID_ETH","ANT_ETH","AIO_ETH","AUC_ETH","BCH_ETH","BAT_ETH","BFT_ETH","CFI_ETH","CBT_ETH","DAT_ETH","DTH_ETH","DAI_ETH","DAD_ETH","EOS_ETH","ETP_ETH","ELF_ETH","EDO_ETH","FUN_ETH","FSN_ETH","GNT_ETH","IOT_ETH","IOS_ETH","KNC_ETH","LRC_ETH","LYM_ETH","MKR_ETH","MTN_ETH","MIT_ETH","MNA_ETH","NEO_ETH","OMG_ETH","ODE_ETH","ORS_ETH","POA_ETH","POY_ETH","QSH_ETH","QTM_ETH","RLC_ETH","REQ_ETH","REP_ETH","RDN_ETH","RCN_ETH","SAN_ETH","SNT_ETH","SPK_ETH","STJ_ETH","SNG_ETH","TRX_ETH","TNB_ETH"],"EUR":["BTC_EUR","ETH_EUR","EOS_EUR","IOT_EUR","NEO_EUR"],"JPY":["BTC_JPY","ETH_JPY","EOS_JPY","IOT_JPY","NEO_JPY"],"GBP":["BTC_GBP","ETH_GBP","EOS_GBP","IOT_GBP","NEO_GBP"]}
},
            toggle_detail:[{hide:false},{hide:true},{hide:false},{hide:false},{hide:false}],
            quick_news:{date:'',week:'',data:[]},
            coin_info:{
              "description_zh":"Aeternity号称新一代区块链网络,由德裔计算机科学家“以太坊教父”Yanislav Malahov与前Augur核心开发者Zack Hess、前Synereo核心开发者Jack Pettersson于2016年发起，聚集诸多颠覆性创新于一身，旨在重树当今智能合约的底层协议。Aeternity的技术亮点是图灵完备状态通道(State Channels)和去中心化预言机（Oracles）。",
              "market_capitalization":"¥4,202,842,514",
              "market_count":"233,020,472 AE",
              "publish_count":"273,685,830 AE",
              "tx_count":"¥152,278,773",
              "time":1528705214,
              "english_name":"Aeternity/AE",
              "code":"AE",
              "chinese_name_zh":"阿姨币",
              "exchanger_count":"28",
              "publish_time":"－",
              "white_paper":"//blockchain.aeternity.com/%C3%A6ternity-blockchain-whitepaper.pdf",
              "website":["//www.aeternity.com/"],
              "block_explorer":["//etherscan.io/token/0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d","//ethplorer.io/address/0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d"],"ico_price":"¥1.88"},
            articles:[{aid:''}],
            historyState:false,
            historyload:false,
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
        //this.toggle_source(this.sources[this.trans_symbol])
    },
    methods:{
        ...mapMutations({
             setRightName: 'COM_SET_RIGHTUSERNAME'
        }),
        getData(){
            /*api.getTopicsList({page:this.page,tab: this.$route.query.tab}).then(res=>{
                if(res.success){
                    this.listData=res.data;
                }else{
                     console.log('获取数据失败！');
                }
            })*/
            //获取币种信息
            var data={coin:this.select_symbol.split('_')[0],language:1}
            api.getCoinInfo(data).then(res=>{
              if(typeof res[0]=='object'){
                this.coin_info=res[0];
              }
            })
            //获取快讯
            var time=(new Date()).getTime();
            var week=["星期一","星期二","星期三","星期四","星期五","星期六","星期日"]
            api.getQuickNews({page:1,pagesize:3,language:1}).then(res=>{
              this.quick_news.date=(new Date()).getFullYear()+'-'+((new Date()).getMonth()+1)+'-'+(new Date()).getDate();
              this.quick_news.week=week[(new Date()).getDay()-1];
              if(!res.news||!res.news.length){
                this.quick_news.data=[{created_at:null,content:'今日暂无快讯'}];
                return
              }
              res.news.forEach(function(v,k){
                if((v.created_at+'').length==10){
                  v.created_at=v.created_at+'000';
                }
                var h=(new Date(v.created_at*1)).getHours();
                var m=(new Date(v.created_at*1)).getMinutes();
                if(h<10){
                  h='0'+h;
                }
                if(m<10){
                  m='0'+m
                }
                v.created_at=h+':'+m;
              })
              this.quick_news.data=res.news;
            })
        },
        clickPage(num){
            this.page=num;
            this.getData();
        },
        setName(){
         this.setRightName(this.getLoginUser);
        },
        toggle_source(e){
            this.load=true;
            this.trans_symbol=e.name;
            var getKey=this.source+'_'+this.trans_symbol;
            let a=window.sessionStorage.getItem(getKey);
            if(a){
              for(let i=0;i<this.sources.length;i++){
                this.sources[i].show=false;
              }
              e.showData=JSON.parse(a);
              e.show=true;
              this.load=false;
              this.drowKline(e.showData[0].name); 
            }else{
              api.getPrice({'coin':JSON.stringify(e.data)}).then(res=>{
                for(let i=0;i<this.sources.length;i++){
                  this.sources[i].show=false;
                }
                if(res.length){
                  e.showData=res.sort(function(a,b){
                    if(a.name>b.name){
                      return 1
                    }else{
                      return -1
                    }
                  });
                  var key=this.source+'_'+this.trans_symbol;
                  var value= JSON.stringify(e.showData);
                  window.sessionStorage.setItem(key,value);
                  e.show=true;
                  this.load=false;
                  this.drowKline(e.showData[0].name); 
                }
              })
            }


        },
        toggle(n){
          this.toggle_detail[n].hide=!this.toggle_detail[n].hide;
        },
        changesource(key){
          this.source=key;
          var arr=[];
          var keys=Object.keys(this.symbolData[key]);
          for(var i=0;i<keys.length;i++){
            var obj={};
            obj['name']=keys[i];
            obj['show']=false;
            obj['data']=this.symbolData[key][keys[i]];
            obj['showData']=[];
            for(var j=0;j<obj['data'].length;j++){
              obj['showData'].push({'name':obj['data'][j].split('_')[0],'price_usd':'','percent_change_24h':''})
            }
            arr.push(obj)
            if(i==0){
              this.toggle_source(obj)
            }
          }
          this.sources=arr
        },
        // moveScreen(){
        //   //页面滚动
        //   var height = document.documentElement.clientHeight;
        //   console.log(height);
        //   var scroll=0;
        //   var scrollPlus=setInterval(function(){
        //     scroll+=3;
        //     if(scroll<=height){
        //       window.scrollTo(0,scroll);
        //     }else{
        //       clearInterval(scrollPlus)
        //       window.scrollTo(0,height)
        //     }
        //   },1)
          
        // },
        drowKline(key){
          this.select_symbol=key+'_'+this.trans_symbol;
          //获取币种信息
          var data={coin:this.select_symbol.split('_')[0],language:1}
          api.getCoinInfo(data).then(res=>{
            if(typeof res[0]=='object'){
              this.coin_info=res[0];
            }
          })
          var ST=[this.source,key+this.trans_symbol];
          var str=ST[0]+':'+ST[1];
          var kline= new TradingView.widget(
            {
            "width": '100%',
            "height":'100%',
            "symbol": str,
            "interval": "5",
            "timezone": "Etc/UTC",
            "theme": "Light",
            "style": "1",
            "locale": "zh_CN",
            "toolbar_bg": "rgba(255, 255, 255, 1)",
            "enable_publishing": false,
            "hide_top_toolbar": false,
            "allow_symbol_change": true,
            "save_image": false,
            "container_id": "kline"
          })
          this.getNews();
          this.getHistory();
        },
        getNews(){
          //获取币种新闻;
          var code=this.select_symbol.split('_')[0]
          api.getArticles({coin:code,pagesize:3,page:1,language:1}).then(res=>{
            if(res[0]&&JSON.stringify(res[0])!='{}'){

              for(var i=0;i<res.length;i++){
                res[i].published_time=(new Date(res[i].published_time*1)).getFullYear()+'-'+((new Date(res[i].published_time*1)).getMonth()+1)+'-'+(new Date(res[i].published_time*1)).getDate();
                  var news_length=res[i].summary.length;
                  if(news_length>100){
                    res[i].summary=res[i].summary.substring(0,100)+"……";
                  }else{
                    res[i].summary=res[i].summary
                  }
              }

              this.articles=res;

            }else{
              this.articles=[{aid:''}];
            }
          })

        },
        read_detail(aid){
          this.$router.push({path:'/newsDetail',query:{'aid':aid}})
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
        drawHistry(data,coin){
            Highcharts.stockChart('history', {
                rangeSelector : {
                    selected : 1,
                    buttons: [{
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    }, {
                        type: 'ytd',
                        text: 'YTD'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }]
                },
                title : {
                    text : coin+' Price'
                },
                series : [{
                    name : coin+' Price',
                    data : data,
                    type : 'areaspline',
                    threshold : null,
                    tooltip : {
                        valueDecimals : 2
                    },
                    fillColor : {
                        linearGradient : {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops : [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    }
                }]
            });
              
        },
        getHistory(){
            let coin=this.select_symbol.split('_')[0];
            this.historyload=true;

            api.getCoinHistory({coin:coin}).then(res=>{
              if(res){

                this.historyState=true;

                var data=res.result;

                for(let i=0;i<data.length;i++){
                  data[i]=[data[i][0],data[i][2]]
                }
                this.historyload=false;
                this.drawHistry(data,coin)

              }else{
              this.historyState=false;
            }
          })
        }
    },
    watch:{
        "$route":function(){
            this.clickPage(1);
        },
        'getToken':'setName'
    },
    mounted:function(){
      //页面渲染完成 回掉
      this.changesource(this.source);
      //var load=layer.load(2, { shade: [0.01, '#fff'] });
    },
    updated:function(){
       
    },

}
</script>

<style lang="less" scoped>
  article{
    width: 100%;
  }
  .banner{
    img{
      max-width: 100%;
    }
  }
  .article_inner{
    padding:20px 0 0;
    background-color:#f9f9f9;
    .row{
      margin-left: 0;
      margin-right: 0;
      margin-top: 26px;
    }
  }
  .cont_header{
    background-color: #fff;
    padding: 10px 12px;
    margin-bottom: 4px;
    border-top-left-radius:8px;
    border-top-right-radius:8px;
    box-shadow: 0px 4px 6px 2px #eee;
    cursor: pointer;
    .title{
      color:#3b426b;
      font-size: 16px;
      margin-left: 8px;
    }
  }
  .content{
    background-color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: #2f334f;
    box-shadow: 0px 4px 6px 2px #eee;
  }
  .news{
    display: flex;
    justify-content: space-between;
    margin: 0 5% 0 2%;
    padding:3% 0; 
    border-bottom: 1px solid #eee;
  }
  .news_img{
    width: 30%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
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
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      .news_mark{
        color: #999999;
        border: 1px solid #ef315a;
        border-radius: 10px;
        padding: 4px 8px;
      }
    }
    .introduce{
      text-align: justify;
      color: #767676;
    }
    .news_title{
      font-weight: 600;
      padding-bottom: 6px;
      cursor: pointer;
    } 
  }
  .news_footer{
    display: flex;
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
  .cont_footer{
    text-align: center;
    line-height: 52px;
    color: #5391dd;
    background-color:#fff;
    border-bottom-left-radius:8px;
    border-bottom-right-radius:8px;
    box-shadow: 0px 4px 6px 2px #eee;
    a{
      color: #3891e3;
      text-decoration: none;
    }
  }
  .comment{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
  .quick_news{
    position: relative;
    .date{
      position: absolute;
      right: 4px;
      font-size: 14px;
    }
  }
  .quick{
    padding:2% 2% 6%;
    .quick_head{
      margin-bottom: 4px;
      .time{
        background-color:#e4eef9;
        font-size: 12px;
        padding: 2px 6px;
        color: #454b72;
      }
    }
    .quick_cont{
      line-height: 28px;
      text-align: justify;
      word-break: break-all;
    }
  }
  .quick_news~.content{
    border-radius: 5px;
  }
  .datum{
    color:#20243a;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    .ins_info{
        padding: 3% 2% 5%;

        .datum_head{
          border-bottom: 1px solid #eee;
          .name{
            font-size: 26px;
            color: #7c7c7c;
            line-height: 40px;
          }
          .sub_name{
            font-size: 20px;
            line-height: 40px;
          }
        }
        .introduce{
          margin-top: 20px;
          .title{
            font-size: 20px;
            line-height: 40px;
            color: #7c7c7c;
          }
        }
        .ins_cont{
          margin-top: 12px;
          line-height: 26px;
          max-height:200px;
          overflow-y: auto;
          text-align: justify;
          
        }
        .ins_cont::-webkit-scrollbar{
            display: none;
            width: 0;
        }

    }
    .ins_detail{
          padding: 3% 2% 5%;
          div{
            line-height: 50px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            span{
              font-size: 16px;
            }
            span:first-child{
              width:30%;
              color: #7c7c7c;
            }
            span:last-child{
              width: 60%;
            }
            a{
              color: #5e82f5;
            }
          }
    }
  }
  .loading{
    position: absolute;
    z-index: 10000;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .loading_content{
    display: block;
    width: 32px;
    height: 32px;
    margin:15% auto;
    background: url('/static/img/loading-2.gif') no-repeat;
  }
  .symbol_list{
    height: 460px;
    width: 100%;
    position: relative;
    .loading{
      position: absolute;
      z-index: 10000;
      width: 100%;
      height: 100%;
      top: 0;
    }
    .loading_content{
      display: block;
      width: 32px;
      height: 32px;
      margin:40% auto;
      background: url('/static/img/loading-2.gif') no-repeat;
    }
  }
  
  .symbol_list>div{
    max-height: 460px;
    overflow-y: auto;
  }
  .symbol_list>div::-webkit-scrollbar{
      display: none;
      width: 0;
  }
  .symbol_list>div{
    display: none;
  }
  .symbol_list>div.active{
    display: block;
  }
  .market{
    background-color: #fff;
    padding-top:20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0px 4px 6px 2px #eee;
  }
  .market .title{
    font-size: 20px;
    margin-left: 20px;
  }
  .market select{
    height: 30px;
    border-radius: 4px;
    padding: 0 10px;
  }
  .market_source{
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 52px;
    border-bottom: 2px solid #eee;
    span{
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      a{
        text-decoration: none;
        color: #20243a;
        position: relative;
        top:2px;
      }
    }
    .active>a{
      border-bottom: 2px solid #5391dd;
      color: #5391dd;
    }
  }
  .market_mark{
    display: flex;
    align-items: center;
    line-height: 36px;
    span{
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .data_line span:last-child{
    color: red;
  }
  .data_line .up{
    color: green !important
  }
  .diliver{
    width: 90%;
    height: 1px;
    background-color: #eee;
    margin:0 auto;
  }
  .hide{
    display: none;
  }
  @media screen and(min-width: 767px)and(max-width: 992px){ 
    .col-lg-9,.col-lg-3{
      padding-right: 0;
      padding-left: 0;
    }
    .order{
      order:2;
    }
    .middle-side{
      .content_box{
        margin-bottom: 0!important;
      }
    }
    .cont_header{
      border-top-left-radius: 0px; 
      border-top-right-radius: 0px; 
      box-shadow: none; 
      background: #d5dde2;
      margin-bottom: 2px;
      .title{
        color: #3a416e;
      }
    }
    .article_inner .row{
      margin-top: 0;
    }
    .content{
      box-shadow: none; 
    }
    .quick{
      padding: 2%;
    }
  } 
  @media screen and(min-width: 560px)and(max-width: 768px){ 
    .col-lg-9,.col-lg-3{
      padding-right: 0;
      padding-left: 0;
    }
    .order{
      order:2;
    }
    .middle-side{
      .content_box{
        margin-bottom: 0!important;
      }
    }
    .cont_header{
      border-top-left-radius: 0px; 
      border-top-right-radius: 0px; 
      box-shadow: none; 
      background: #d5dde2;
      margin-bottom: 2px;
      .title{
        color: #3a416e;
      }
    }
    .article_inner .row{
      margin-top: 0;
    }
    .quick{
      padding: 2%;
    }
    .content{
      box-shadow: none; 
      .news_img{
        height: 100px;
      }
    }
    .news_article .introduce{
      display: none;
    }
  } 
  @media screen and(max-width: 560px){ 
    .col-lg-9,.col-lg-3{
      padding-right: 0;
      padding-left: 0;
    }
    .order{
      order:2;
    }
    .middle-side{
      .content_box{
        margin-bottom: 0!important;
      }
    }
    .cont_header{
      border-top-left-radius: 0px; 
      border-top-right-radius: 0px; 
      box-shadow: none; 
      background: #d5dde2;
      margin-bottom: 2px;
      .title{
        color: #3a416e;
      }
    }
    .article_inner .row{
      margin-top: 0;
    }
    .quick{
      padding: 2%;
    }
    .content{
      box-shadow: none; 
      .news_img{
        height: 80px;
      }
    }
    .news_article{
      .news_head{
        height: 20px;
        line-height: initial;
        align-items: flex-start;
        .news_mark{
          font-size: 10px;
          margin-right: 10px !important;
          padding: 0px 4px;
        }
      }
      .news_title{
        padding-bottom: 0px;
        font-size: 11px;
        line-height: 14px;
      }
      .introduce{
        display: none;
      }
    }
    .news_footer{
      font-size: 12px;
    }
  } 
</style>
