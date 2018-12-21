<template>
  <div class="claimbox">
    <headerBox></headerBox>
    <div class="box col-sm-8 offset-sm-2">
      <div class="head">常見問題</div>
      <div class="content">
          <div class="item">
              <div class="question" @click=toggle(0)>1、如何查看幣種新聞？</div>
              <div class="answer" v-if="questions[0].show">
                <div>1）行情中：在行情中點擊K線圖左側的幣種，即可在下方幣種深度新聞查看；</div>
                <div>2）深度新聞：在新聞列查看區域的右上角，打開幣種新聞開關，即可查看幣種新聞，支持搜索各類幣種查詢相關新聞。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(1)>2、深度新聞與幣種新聞有何區別？</div>
              <div class="answer" v-if="questions[1].show">
                <div>深度新聞相關的是行業內技術與項目，研究與訪談類新聞信息；幣種新聞相關的是相關各類幣種的財經類新聞。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(2)>3、如何搜索信息？</div>
              <div class="answer" v-if="questions[2].show">
                <div>在頂部導航欄的搜索欄中，輸入對應導航塊的信息關鍵字，即可搜索相關信息。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(3)>4、如何查看我的個人中心</div>
              <div class="answer" v-if="questions[3].show">
                <div>在頂部導航欄中，點擊您的個人郵箱號，即可進入個人中心查看。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(4)>5、“關於中環數字”說明</div>
              <div class="answer" v-if="questions[4].show">
                <div>關於中環數字的整體介紹。包括中環數字行情和旗下的中環數字學院的相關說明。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(5)>6、如何查看行情中的K線圖？</div>
              <div class="answer" v-if="questions[5].show">
                <div>我們平臺的K線圖多以綠為升，紅為跌。</div>
                <img src="../../img/faq.png"/>
                <div>以上圖為例，當日最高、收盤價、開盤價、當日最低，等同於系統的開（開盤價）、高（最高價）、低（最低價）、收（收盤價），在K線圖上方展示出，鼠標懸浮即可知曉。</div>
                <div style="font-weight: 600">K線的原理：</div>
                <div style="text-indent: 26px"> K線是由開盤價、最高價、最低價、收盤價所構成，也是記錄買方和賣方實戰的過程；如果收盤價高於開盤價就以【實體綠線】表示，。收盤價低於開盤價則以【實體紅線】表示，最高價及最低價則以【影線】表示，高價拉回則留上影線，低價回升則留下影線，</div>
                <div>因此這種多空實戰的記錄，就是來預測未來是多頭還是空頭的壹種指標。</div>
                <div style="font-weight: 600">K線說明：</div>
                <div> K線圖是將每天開盤價與收盤價化成直立的方塊，若當天最高價>收盤價或開盤價，則在方塊上方加畫壹條直線成為上影線；而當天之最低價<開盤價或收盤價，則子方塊下方加畫壹條直線為下影線。方塊以綠色表示，代表當天收【綠盤】，方塊會以紅色表示，當天則收【紅盤】。</div>
                <div>綠K線並不代表今天的幣種壹定漲的，也有可能開在底盤，而收盤卻在平盤壹下的綠K線，以K線的原理來說，綠K線所代表的的意義是在整個漲升的氣勢，而不是漲跌，這是諸多投資人所誤解的。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(6)>7、中環數字的發言可信度</div>
              <div class="answer" v-if="questions[6].show">
                <div>在做出任何投資決策之前，需要建立在自己獨立思考之上或投資專業人士給予盡職盡責和建議。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(7)>8、什麽是法幣交易、幣幣交易、期貨交易，他們的區別？</div>
              <div class="answer" v-if="questions[7].show">
                <div><span style="font-weight: 600;">法幣交易：</span>傳統的加密貨幣交易平臺只有法幣交易，即法幣兌數字貨幣交易。如果想要購買其他數字貨幣，要麽增加投資，直接充值法幣進行購買；要麽把之前的數字貨幣兌換回法幣，再用這筆資金購買其他所需數字貨幣。受到監管因素的影響，部分地區政府已明令禁止金融機構為加密貨幣業務提供銀行服務，或者禁止該地區境內的數字貨幣兌法幣交易。也就是說，數字貨幣對法幣交易在某些場景下將無法順利進行，而幣幣交易則可作為替代方式供用戶選擇。</div>
                <div><span style="font-weight: 600;">幣幣交易：</span>幣幣交易是壹種可實現數字資產間兌換的交易，可讓用戶在不增加投資的基礎之上，使用更為便捷及節約的方式進行數字貨幣投資。如果數字貨幣市場全線下跌之時，投資者還可通過USDT（與美元掛鉤的數字貨幣）交易對交易，來減少損失並確保資產安全。</div>
                <div><span style="font-weight: 600;">期貨交易：</span>期貨交易是以現貨交易為基礎，以遠期合同交易為雛形而發展起來的壹種高級的交易方式。它是指為轉移市場價格波動風險，而對那些大批量均質商品所采取的，通過經紀人在商品交易所內，以公開競爭的形式進行期貨合約的買賣形式。期貨是期貨合約買賣交換的活動或行為。註意區分，期貨交割是另外壹個概念，期貨交割，是期貨合約內容裏規定的標的物（基礎資產）在到期日的交換活動或行為。多數期貨交易是通過電子化交易完成的，交易時，投資者通過期貨公司的電腦系統輸入買賣指令，由交易所的撮合系統進行撮合成交。</div>
              </div>
          </div>
          <div class="item">
              <div class="question" @click=toggle(8)>9、代幣（Token）和虛擬幣（coins）的區別？</div>
              <div class="answer" v-if="questions[8].show">
                <div>虛擬貨幣是指實際不存在、以虛擬狀態存在的貨幣，比如比特幣、萊特幣、以太坊等等的虛擬數字；代幣是指可以充當貨幣職能，可以用於購買物品交易的貨幣形式。</div>
                <div>虛擬貨幣在某種情況下，比如說國外個別地方，可用於購物交易；這時，它就數當於代幣，扮演了貨幣的角色。</div>
                <div>代幣可在虛擬貨幣的運轉網絡上直接發行，目前大部分的代幣都是基於以太坊上發行的ERC20代幣；但是，它卻不是虛擬貨幣。</div>
                <div>也就是說虛擬貨幣可能是代幣；但代幣，卻不壹定是虛擬貨幣。</div>
              </div>
          </div>
      </div>
    </div>
    <footerBox></footerBox>
  </div>
</template>

<script>
import * as com from '@/util/common';
import headerBox from "@/components/headerBox_td";
import footerBox from '@/components/footerBox_td';
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
