<template>
  <div class="cal-container">
    <div class="cal-center">
      <input
        type="text"
        name="first"
        id="first"
        v-model="firstValue"
        disabled
      />
      <input type="text" name="sign" id="sign" v-model="sign" disabled />
      <input type="text" name="end" id="end" v-model="endValue" disabled />
      <div id="result"  ref="resultRef">{{ result }}</div>
    </div>
  </div>
</template>

<script>
import { animateCSS } from '../utils/setAnimate.js'
export default {
  name: "CalResult",
  props: {
    firstValue: {
      type: [String, Number],
      default: ""
    },
    sign: {
      type: String
    },
    endValue: {
      type: [String, Number],
      default: ""
    },
    result: {
      type: [String, Number],
      default: ""
    }
  },
  watch: {
    result:function(){
      // 添加动画
      animateCSS(this,"resultRef",'fadeInUp')
    }
  },
};
</script>

<style scoped lang="scss">
  .cal-container {
    height: 60%;
    width: 100%;
    position: relative;
  }

  .cal-center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  #first,
  #sign,
  #end,
  #result {
    width: 100%;
    height: 40px;
    border: none;
    outline: white;
    font-size: 34px;
    padding: 0 4px 0 4px 0;
  }
</style>
