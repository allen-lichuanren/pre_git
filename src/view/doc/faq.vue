<template>
  <div class="claimbox">
    <headerBox></headerBox>
    <div class="box col-sm-8 offset-sm-2">
      <div class="head">常见问题</div>
      <div class="content">
          <div class="item">
              <div class="question" @click=toggle(0)>1、如何查看币种新闻？</div>
              <div class="answer" v-if="questions[0].show">
                <div>1）行情中：在行情中点击K线图左侧的币种，即可在下方币种深度新闻查看；</div>
                <div>2）深度新闻：在新闻列查看区域的右上角，打开币种新闻开关，即可查看币种新闻，支持搜索各类币种查询相关新闻。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(1)>2、深度新闻与币种新闻有何区别？</div>
              <div class="answer" v-if="questions[1].show">
                <div>深度新闻相关的是行业内技术与项目，研究与访谈类新闻信息；币种新闻相关的是相关各类币种的财经类新闻。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(2)>3、如何搜索信息？</div>
              <div class="answer" v-if="questions[2].show">
                <div>在顶部导航栏的搜索栏中，输入对应导航块的信息关键字，即可搜索相关信息。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(3)>4、如何查看我的个人中心</div>
              <div class="answer" v-if="questions[3].show">
                <div>在顶部导航栏中，点击您的个人邮箱号，即可进入个人中心查看。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(4)>5、“关于中环数字”说明</div>
              <div class="answer" v-if="questions[4].show">
                <div>关于中环数字的整体介绍。包括中环数字行情和旗下的中环数字学院的相关说明。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(5)>6、如何查看行情中的K线图？</div>
              <div class="answer" v-if="questions[5].show">
                <div>我们平台的K线图多以绿为升，红为跌。</div>
                <img src="../../img/faq.png"/>
                <div>以上图为例，当日最高、收盘价、开盘价、当日最低，等同于系统的开（开盘价）、高（最高价）、低（最低价）、收（收盘价），在K线图上方展示出，鼠标悬浮即可知晓。</div>
                <div style="font-weight: 600">K线的原理：</div>
                <div style="text-indent: 26px"> K线是由开盘价、最高价、最低价、收盘价所构成，也是记录买方和卖方实战的过程；如果收盘价高于开盘价就以【实体绿线】表示，。收盘价低于开盘价则以【实体红线】表示，最高价及最低价则以【影线】表示，高价拉回则留上影线，低价回升则留下影线，</div>
                <div>因此这种多空实战的记录，就是来预测未来是多头还是空头的一种指标。</div>
                <div style="font-weight: 600">K线说明：</div>
                <div> K线图是将每天开盘价与收盘价化成直立的方块，若当天最高价>收盘价或开盘价，则在方块上方加画一条直线成为上影线；而当天之最低价<开盘价或收盘价，则子方块下方加画一条直线为下影线。方块以绿色表示，代表当天收【绿盘】，方块会以红色表示，当天则收【红盘】。</div>
                <div>绿K线并不代表今天的币种一定涨的，也有可能开在底盘，而收盘却在平盘一下的绿K线，以K线的原理来说，绿K线所代表的的意义是在整个涨升的气势，而不是涨跌，这是诸多投资人所误解的。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(6)>7、中环数字的发言可信度</div>
              <div class="answer" v-if="questions[6].show">
                <div>在做出任何投资决策之前，需要建立在自己独立思考之上或投资专业人士给予尽职尽责和建议。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(7)>8、什么是法币交易、币币交易、期货交易，他们的区别？</div>
              <div class="answer" v-if="questions[7].show">
                <div><span style="font-weight: 600;">法币交易：</span>传统的加密货币交易平台只有法币交易，即法币兑数字货币交易。如果想要购买其他数字货币，要么增加投资，直接充值法币进行购买；要么把之前的数字货币兑换回法币，再用这笔资金购买其他所需数字货币。受到监管因素的影响，部分地区政府已明令禁止金融机构为加密货币业务提供银行服务，或者禁止该地区境内的数字货币兑法币交易。也就是说，数字货币对法币交易在某些场景下将无法顺利进行，而币币交易则可作为替代方式供用户选择。</div>
                <div><span style="font-weight: 600;">币币交易：</span>币币交易是一种可实现数字资产间兑换的交易，可让用户在不增加投资的基础之上，使用更为便捷及节约的方式进行数字货币投资。如果数字货币市场全线下跌之时，投资者还可通过USDT（与美元挂钩的数字货币）交易对交易，来减少损失并确保资产安全。</div>
                <div><span style="font-weight: 600;">期货交易：</span>期货交易是以现货交易为基础，以远期合同交易为雏形而发展起来的一种高级的交易方式。它是指为转移市场价格波动风险，而对那些大批量均质商品所采取的，通过经纪人在商品交易所内，以公开竞争的形式进行期货合约的买卖形式。期货是期货合约买卖交换的活动或行为。注意区分，期货交割是另外一个概念，期货交割，是期货合约内容里规定的标的物（基础资产）在到期日的交换活动或行为。多数期货交易是通过电子化交易完成的，交易时，投资者通过期货公司的电脑系统输入买卖指令，由交易所的撮合系统进行撮合成交。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(8)>9、代币（Token）和虚拟币（coins）的区别？</div>
              <div class="answer" v-if="questions[8].show">
                <div>虚拟货币是指实际不存在、以虚拟状态存在的货币，比如比特币、莱特币、以太坊等等的虚拟数字；代币是指可以充当货币职能，可以用于购买物品交易的货币形式。</div>
                <div>虚拟货币在某种情况下，比如说国外个别地方，可用于购物交易；这时，它就数当于代币，扮演了货币的角色。</div>
                <div>代币可在虚拟货币的运转网络上直接发行，目前大部分的代币都是基于以太坊上发行的ERC20代币；但是，它却不是虚拟货币。</div>
                <div>也就是说虚拟货币可能是代币；但代币，却不一定是虚拟货币。</div>
              </div>
          </div>
      </div>
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import * as com from '@/util/common';
import headerBox from "@/components/headerBox";
import footerBox from '@/components/footerBox';
import { mapGetters ,mapMutations  } from 'vuex';
export default {
    data(){
      return{
        questions:[{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false},{show:false}]
      }
    },
    components:{headerBox,footerBox},
    methods:{
      toggle(key){
        for(var i=0; i<this.questions.length;i++){
          this.questions[i].show=false;
        }
        this.questions[key].show=true;
      }
    }
}
</script>
<style lang="less" scoped>
  .claimbox{
    .box{
      margin: 30px auto;
      background: #fff;
      padding: 20px 40px;
      font-size: 16px;
      color: #1d2032;
      min-height: 420px;
      .head{
        font-size: 22px;
        font-weight: 600px;
        padding: 20px 0;
      }
      .item{
        margin: 20px 0;
        .question{
          padding: 10px 0;
          cursor: pointer;
        }
        .answer{
          background: #eee;
          padding: 10px;
          div{
            line-height: 30px;
            text-align: justify-content;
          }
        }
      }
    }
  }
</style>
