<template>
  <div class="claimbox">
    <headerBox></headerBox>
    <div class="box col-sm-8 offset-sm-2">
      <div class="head">中環數字網免責聲明</div>
      <div class="content">
          <div class="item">
              <div class="title">第壹條</div>
              <div>本網站所刊載的所有資料及圖表僅供參考使用。刊載這些文檔並不構成對任何股份的收購、購買、認購、拋售或持有的邀約或意圖。參閱本網站上所刊內容的用戶，應被視為已確認得悉上述立場。投資者依據本網站提供的信息、資料及圖表等進行金融、證券等投資項目所造成的盈虧與本網站無關。</div>
          </div>
          <div class="item">
              <div class="title">第二條</div>
              <div>所有註冊用戶須按照“後臺實名、前臺自願”原則進行真實身份信息認證。我們在未經您同意的情況下，不會將您的任何資料以任何方式泄露給任何第三方。</div>
          </div>
          <div class="item">
              <div class="title">第三條</div>
              <div>當政府司法機關依照法定程序要求本網站披露個人資料時，我們將根據執法單位之要求或為公共安全之目的提供個人資料。在此情況下之任何披露，本網站均得免責。</div>
          </div>
          <div class="item">
              <div class="title">第四條</div>
              <div>用戶將個人賬戶密碼告知他人或與他人共享註冊帳戶，由此導致的任何個人資料泄露及其他後果的，本網站對此不負任何責任。</div>
          </div>
          <div class="item">
              <div class="title">第五條</div>
              <div>因任何由於黑客攻擊、計算機病毒侵入或發作、因政府管制而造成的暫時性關閉等影響網絡正常經營的不可抗力而造成的個人資料泄露、丟失、被盜用或被竄改等，本網站及時采取補救措施後，本網站均得免責。</div>
          </div>
          <div class="item">
              <div class="title">第六條</div>
              <div>由於與本網站鏈接的其它網站所造成之個人資料泄露及由此而導致的任何法律爭議和後果，本網站均得免責。</div>
          </div>
          <div class="item">
              <div class="title">第七條</div>
              <div>本網站如因系統維護或升級而需暫停服務，或因線路及非本公司控制範圍外的硬件故障或其它不可抗力而導致暫停服務，於暫停服務期間造成的壹切不便與損失，本網站不負任何責任。</div>
          </div>
          <div class="item">
              <div class="title">第八條</div>
              <div>本網站發現法律、法規禁止發布或者傳輸的信息的，將立即停止傳輸該信息，采取消除等處置措施，保存有關記錄，並有權向有關主管部門報告；除此之外，本網站使用者因為違反本聲明的規定而觸犯中華人民共和國法律的，壹切後果自己負責，本網站不承擔任何責任。</div>
          </div>
          <div class="item">
              <div class="title">第九條</div>
              <div>中環數字網（包含各子頁面等）頁面展示信息的目的在於傳播更多信息，與本網站立場無關。網站不保證該信息(包括但不限於文字、數據及圖表)全部或者部分內容的準確性、真實性、完整性、有效性、及時性、原創性等。相關信息並未經過本網站證實，不對您構成任何投資建議，據此操作，風險自擔。</div>
          </div>
          <div class="item">
              <div class="title">第十條</div>
              <div>使用本網站，您應當對因自身使用而引發的任何行為的後果承擔賠償及辯護責任並同意網站對此免責，不論該行為是因侵權、合同或者其他原因發生。其次，您因使用網站內他人提供的信息而引起訴訟的，不論該訴訟是因為侵權、合同或其他原因發生，信息的提供者對此免責。因此，中環數字網以及信息提供者對基於您對網站的使用而遭受損失的任何用戶或第三方免責，不論該損失是因為侵權、合同或者其他原因發生，並且您承諾放棄提起任何與上述事項相關的索賠或訴訟請求。</div>
          </div>
          <div class="item">
              <div class="title">第十壹條</div>
              <div>凡以任何方式登陸本網站或直接、間接使用本網站資料者，視為自願接受本網站免責聲明的約束。</div>
          </div>
          <div class="item">
              <div class="title">第十二條</div>
              <div>本聲明未涉及的問題參見國家有關法律法規，當本聲明與國家法律法規沖突時，以國家法律法規為準。</div>
          </div>
          <div class="item">
              <div class="title">第十三條</div>
              <div>本網站之聲明以及其修改權、更新權及最終解釋權均屬中環數字網所有。</div>
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
    components:{headerBox,footerBox},
}
</script>
<style lang="less" scoped>
  .claimbox{
    background: #f9f9f9;

  }
  .box{
    margin: 40px auto;
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
      .title{
        font-weight: 600;
        padding: 10px 0;
      }
      div:last-child{
        line-height: 30px;
        text-align: justify-content;
      }
    }
  }
</style>
