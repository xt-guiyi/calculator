<template>
  <div class="input-container" >
    <ul class="keys" @touchstart="touchStart" @touchend="touchEnd">
      <li
        class="items"
        v-for="(item, index) in keys"
        :key="index"
        :data-value="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "InputTable",
  data() {
    return {
      keys: [
        "C",
        "DEL",
        "%",
        "/",
        "7",
        "8",
        "9",
        "*",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "0",
        ".",
        "="
      ]
    };
  },
  methods: {
    touchStart(e) {
      e.target.style.backgroundColor = '#75787a'
    },
    touchEnd(e) {
      let dataValue = e.target.dataset.value;
      // 如果是数字或者., 则为ture.
      let outcome = /\d|\./.test(dataValue);
      this.$emit("computerRes", [dataValue, outcome]);
      e.target.style.backgroundColor = 'white'
    },
    
  }
};
</script>

<style scoped lang="scss">
  .input-container {
    width: 100%;
    height: 60%;
    font-size: 24px;
    text-align: center;
  }

  .keys {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    .items {
      flex: 1 1 25%;
      height: 80px;
      line-height: 80px;
      border-top: 0.1px solid rgba($color: #b3b3b3, $alpha: 0.5);
      border-right: 0.1px solid rgba($color: #b3b3b3, $alpha: 0.5);
      box-sizing: border-box;
      &:nth-of-type(4n) {
        color: rgb(25, 0, 255);
        border-right: none;
      }
      &:last-of-type {
        color: rgb(25, 0, 255);
        border-right: none;
      }
    }
  }
</style>
