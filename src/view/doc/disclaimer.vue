<template>
  <div class="claimbox">
    <headerBox></headerBox>
    <div class="box col-sm-8 offset-sm-2">
      <div class="head">中环数字网免责声明</div>
      <div class="content">
          <div class="item">
              <div class="title">第一条</div>
              <div>本网站所刊载的所有资料及图表仅供参考使用。刊载这些文档并不构成对任何股份的收购、购买、认购、抛售或持有的邀约或意图。参阅本网站上所刊内容的用户，应被视为已确认得悉上述立场。投资者依据本网站提供的信息、资料及图表等进行金融、证券等投资项目所造成的盈亏与本网站无关。</div>
          </div>
          <div class="item">
              <div class="title">第二条</div>
              <div>所有注册用户须按照“后台实名、前台自愿”原则进行真实身份信息认证。我们在未经您同意的情况下，不会将您的任何资料以任何方式泄露给任何第三方。</div>
          </div>
          <div class="item">
              <div class="title">第三条</div>
              <div>当政府司法机关依照法定程序要求本网站披露个人资料时，我们将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下之任何披露，本网站均得免责。</div>
          </div>
          <div class="item">
              <div class="title">第四条</div>
              <div>用户将个人账户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露及其他后果的，本网站对此不负任何责任。</div>
          </div>
          <div class="item">
              <div class="title">第五条</div>
              <div>因任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营的不可抗力而造成的个人资料泄露、丢失、被盗用或被窜改等，本网站及时采取补救措施后，本网站均得免责。</div>
          </div>
          <div class="item">
              <div class="title">第六条</div>
              <div>由于与本网站链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果，本网站均得免责。</div>
          </div>
          <div class="item">
              <div class="title">第七条</div>
              <div>本网站如因系统维护或升级而需暂停服务，或因线路及非本公司控制范围外的硬件故障或其它不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，本网站不负任何责任。</div>
          </div>
          <div class="item">
              <div class="title">第八条</div>
              <div>本网站发现法律、法规禁止发布或者传输的信息的，将立即停止传输该信息，采取消除等处置措施，保存有关记录，并有权向有关主管部门报告；除此之外，本网站使用者因为违反本声明的规定而触犯中华人民共和国法律的，一切后果自己负责，本网站不承担任何责任。</div>
          </div>
          <div class="item">
              <div class="title">第九条</div>
              <div>中环数字网（包含各子页面等）页面展示信息的目的在于传播更多信息，与本网站立场无关。网站不保证该信息(包括但不限于文字、数据及图表)全部或者部分内容的准确性、真实性、完整性、有效性、及时性、原创性等。相关信息并未经过本网站证实，不对您构成任何投资建议，据此操作，风险自担。</div>
          </div>
          <div class="item">
              <div class="title">第十条</div>
              <div>使用本网站，您应当对因自身使用而引发的任何行为的后果承担赔偿及辩护责任并同意网站对此免责，不论该行为是因侵权、合同或者其他原因发生。其次，您因使用网站内他人提供的信息而引起诉讼的，不论该诉讼是因为侵权、合同或其他原因发生，信息的提供者对此免责。因此，中环数字网以及信息提供者对基于您对网站的使用而遭受损失的任何用户或第三方免责，不论该损失是因为侵权、合同或者其他原因发生，并且您承诺放弃提起任何与上述事项相关的索赔或诉讼请求。</div>
          </div>
          <div class="item">
              <div class="title">第十一条</div>
              <div>凡以任何方式登陆本网站或直接、间接使用本网站资料者，视为自愿接受本网站免责声明的约束。</div>
          </div>
          <div class="item">
              <div class="title">第十二条</div>
              <div>本声明未涉及的问题参见国家有关法律法规，当本声明与国家法律法规冲突时，以国家法律法规为准。</div>
          </div>
          <div class="item">
              <div class="title">第十三条</div>
              <div>本网站之声明以及其修改权、更新权及最终解释权均属中环数字网所有。</div>
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
