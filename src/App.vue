<template>
  <div>
  	<!-- <template v-if="getLan==''">
    	<headerBox></headerBox>
    </template>
    <template v-else-if="getLan=='td'">
    	<headerBox_td></headerBox_td>
    </template> -->
    <div id="main">
        <router-view></router-view>
    </div>
    <!-- <footerBox></footerBox> -->
  </div>
</template>

<script>
import headerBox from '@/components/headerBox';
import headerBox_td from '@/components/headerBox_td'
import {  mapMutations ,mapGetters } from 'vuex';

export default {
  components: {headerBox,headerBox_td},
  computed:{
    ...mapGetters([
      'getLan'
    ])
  },
};
</script>

<style lang="less" scoped>

</style>
