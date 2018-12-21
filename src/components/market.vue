<template>
  <ul class="lists-box">
      <template v-if="data.length">
          <li v-for="(item,index) in data" :key="index" >
                
          </li>
      </template>
      <template v-else-if="!data.length">
          
      </template>
  </ul>
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
        formatDate:(time) => com.formatDate(time),
    }
  
}
</script>

<style lang='less' scoped>
.lists-box{
    
}
</style>
