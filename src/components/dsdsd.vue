<template>
  <div id="dsdsd">
    <div class="nav w">
      <a href="https://www.baidu.com/" target="_blank"
        ><svg-icon iconname="icon-buoumaotubiao46" class="icon"> </svg-icon
        >预约维修</a
      >
      <span class="sep">|</span>
      <a href="https://www.baidu.com/" target="_blank"
        ><svg-icon iconname="icon-7tiantuihuanhuo" class="icon"> </svg-icon
        >7天无理由退货</a
      >
      <span class="sep">|</span>
      <a href="https://www.baidu.com/" target="_blank"
        ><svg-icon iconname="icon-15tianwuliyoutuihuo" class="icon"> </svg-icon
        >15天免费换货</a
      >
      <span class="sep">|</span>
      <a href="https://www.baidu.com/" target="_blank"
        ><svg-icon iconname="icon-liwu" class="icon"> </svg-icon>满60包邮</a
      >
      <span class="sep">|</span>
      <a href="https://www.baidu.com/" target="_blank"
        ><svg-icon iconname="icon-weizhi" class="icon"> </svg-icon
        >520余家售后网点</a
      >
    </div>
    <div class="about w">
      <dl class="fl">
        <dt>帮助中心</dt>
        <dd>购物指南</dd>
        <dd>订单操作</dd>
      </dl>
      <dl class="fl">
        <dt>服务支持</dt>
        <dd>售后政策</dd>
        <dd>自助服务</dd>
        <dd>相关下载</dd>
      </dl>
      <dl class="fl">
        <dt>线下门店</dt>
        <dd>DA米之家</dd>
        <dd>服务网点</dd>
        <dd>授权体验店</dd>
      </dl>
      <dl class="fl">
        <dt>关于DA米</dt>
        <dd>了解DA米</dd>
        <dd>加入DA米</dd>
        <dd>投资者关系</dd>
        <dd>企业社会责任</dd>
        <dd>廉洁举报</dd>
      </dl>
      <dl class="fl">
        <dt>关于我们</dt>
        <dd>新浪微博</dd>
        <dd>官方微信</dd>
        <dd>联系我们</dd>
        <dd>公益基金会</dd>
      </dl>
      <dl class="fl">
        <dt>特色服务</dt>
        <dd>F码通道</dd>
        <dd>礼物码</dd>
        <dd>防伪查询</dd>
      </dl>
      <div class="call fr">
        <h5>400-100-5678</h5>
        <p>8:00-18:00(仅首市话费)</p>
        <div>
          <svg-icon iconname="icon-xinxi" class="icon"> </svg-icon>人工客服
        </div>
        <span
          >关注DA米: <svg-icon iconname="icon-weibo" class="icon"> </svg-icon
          ><svg-icon iconname="icon-weixin" class="icon"> </svg-icon
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang = "scss" scoped>
#dsdsd {
  .nav {
    display: flex;
    justify-content: space-around;
    padding: 25px 0;
    border-bottom: 1px solid rgba(176, 176, 176, 0.3);

    a {
      color: rgb(66, 66, 66);
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: rgb(228, 103, 20);
      }
    }
    .sep {
      margin: 0 10px;
      color: rgba(176, 176, 176, 0.3);
    }
    .icon {
      font-size: 20px;
      margin: 0 5px;
    }
  }
  .about {
    padding: 40px 0;
    overflow: hidden;
    dl {
      width: 160px;

      dt {
        margin-bottom: 30px;
        font-size: 14px;
        color: rgb(66, 66, 66);
      }
      dd {
        margin-top: 10px;
        font-size: 12px;
        color: rgb(93, 93, 93);
        cursor: pointer;
        &:hover {
          color: rgb(228, 103, 20);
        }
      }
    }
    .call {
      width: 239px;
      text-align: center;
      border-left: 1px solid rgb(93, 93, 93);
      font-size: 12px;
      color: rgb(93, 93, 93);
      h5 {
        color: rgb(228, 103, 20);
        font-weight: 400;
        font-size: 22px;
      }
      div {
        width: 120px;
        border: 1px solid rgb(228, 103, 20);
        margin: 5px auto;
        padding: 5px 0;
        color: rgb(228, 103, 20);
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: rgb(228, 103, 20);
        }
      }
      .icon {
        font-size: 20px;
        margin: 0 5px;
        cursor: pointer;
        &:hover {
          color: rgb(228, 103, 20);
        }
      }
    }
  }
}
</style>