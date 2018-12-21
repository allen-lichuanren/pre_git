<template>
  <div class="kline">
      
  </div>
</template>

<script>
import *as com from "@/util/common";

export default {
    props:{
        data:{
            type: Array,
            default:() => []
        },
        type:{
            type:String,
            default:"details"
        }
    },
    data(){
        return {
            classify:{
                
            }
        }
    },
    methods:{
        
    }
  
}
</script>

<style lang='less' scoped>
.kline{

}
</style>
