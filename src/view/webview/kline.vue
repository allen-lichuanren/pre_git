<template>
  <div>
      <div id="kline">
              
      </div>
  </div>
  
</template>

<script>
import '@/util/tradingView.js';
import * as api from "@/api/api";
import {  mapMutations ,mapGetters } from 'vuex';


export default {
    data(){
        return {
          ST:[]
        }
    },
    computed:{
    },
    created(){
      var coin = this.$route.query.source;
      var symbol=this.$route.query.symbol;
      var ST=[coin,symbol.replace('_','')];
      this.ST=ST;
    },
    methods:{
        drowKline(ST,h){
          console.log(ST)
          var str=ST[0]+':'+ST[1];
          var line= new TradingView.widget(
            {
            "width": '100%',
            "height":h,
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
        },
    },
    watch:{
    },
    mounted(){
      if(this.ST[0]&&this.ST[1]){
        this.drowKline(this.ST,window.innerHeight)
      }
    }
}
</script>

