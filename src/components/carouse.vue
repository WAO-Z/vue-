<template>
  <div id="index">
    <div
      class="carouselBox w"
      @mouseenter="clearInterval"
      @mouseleave="setInterval"
    >
      <transition :name="isDir ? 'left' : 'right'">
        <template v-for="(item, i) in carouselArr.slice(0, 3)">
          <div :key="i" v-if="index == i" class="img">
            <div
              class="a-img"
              :key="index"
              @click="toHyperLink(item.hyperlink)"
            >
              <img :src="item.s_photos[0].path" alt="" />
            </div>
          </div>
        </template>
      </transition>

      <section class="arrow leftArrow" @click="ltClick">&lt;</section>
      <section class="arrow rightArrow" @click="rtClick">&gt;</section>
      <section class="pointBox">
        <ol>
          <template v-for="(item, i) in carouselArr.slice(0, 3)">
            <li
              :key="i"
              :class="[i == index ? 'active' : '']"
              @mouseover="index = i"
            ></li>
          </template>
        </ol>
      </section>
    </div>
  </div>
</template>

<script >
export default {
  data: function () {
    return {
      index: 0,
      isDir: true,
      isAuto: true,
      timer: null,
      carouselArr: [],
    };
  },

  methods: {
    ltClick() {
      this.isDir = false;
      if (--this.index < 0) {
        this.index = this.carouselArr.slice(0, 3).length - 1;
      }
    },
    rtClick() {
      this.isDir = true;
      if (++this.index == this.carouselArr.slice(0, 3).length) {
        this.index = 0;
      }
    },
    // 定时器函数
    autoPlay() {
      this.timer = setInterval(() => {
        this.rtClick();
      }, 4000);
    },
    clearInterval() {
      clearInterval(this.timer);
      this.timer = null;
    },
    setInterval() {
      this.autoPlay();
    },
    toHyperLink(a) {
      this.$router.push(a);
    },
  },
  created() {
    this.axios
      .get(`/api/carousel?project_id=18`)
      .then((res) => {
        this.carouselArr = res.data.result.rows;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.autoPlay();
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清除定时器
    this.timer = null;
  },
};
</script>

<style lang="scss" scoped >
#index {
  .carouselBox {
    position: relative;
    width: 100%;
    height: 520px;
    // margin: 0 auto;
    // box-shadow: 0 0 10px #000;
    overflow: hidden;
    margin-bottom: 20px;

    > .img {
      position: absolute;
      width: 1920px;
      cursor: pointer;
      // height: 100%;

      font-size: 100px;
      text-align: center;
      line-height: 300px;

      img {
        width: 100%;
      }
    }

    .arrow {
      width: 160px;
      height: 562px;
      text-align: center;
      line-height: 562px;
      font-size: 36px;
      position: absolute;
      top: 0;
      color: #fff;
      transition: all 0.3s;
      cursor: pointer;
      user-select: none;
    }
    .leftArrow {
      left: 0;
      background: linear-gradient(90deg, #000, transparent);
      transform: translateX(-100%);
    }
    .rightArrow {
      right: 0;
      background: linear-gradient(-90deg, #000, transparent);
      transform: translateX(100%);
    }
    &:hover .arrow {
      transform: translateX(0%);
    }
    .pointBox {
      position: absolute;
      bottom: -100px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 0;
      transition: all 0.3s;
      ol {
        display: inline-block;
        white-space: nowrap;
        background-color: #87ceeb;
        border-radius: 50% 0%;
        padding: 12px 8px;
        li {
          width: 10px;
          height: 10px;
          display: inline-block;
          background-color: #fff;
          margin: 0 8px;
          cursor: pointer;
          border-radius: 50%;
        }
        .active {
          background-color: orange;
        }
      }
    }
    &:hover .pointBox {
      bottom: 30px;
    }
  }
}

.left-enter-active,
.left-leave-active {
  transition: all 0.5s;
}

.left-enter {
  left: 100%;
}

.left-enter-to {
  left: 0%;
}

.left-leave {
  left: 0%;
}

.left-leave-to {
  left: -100%;
}

.right-enter-active,
.right-leave-active {
  transition: all 0.5s;
}

.right-enter {
  left: -100%;
}

.right-enter-to {
  left: 0%;
}

.right-leave {
  left: 0%;
}

.right-leave-to {
  left: 100%;
}
</style>