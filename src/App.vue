<template>
  <div id="app">
    <calculation-result
      :firstValue="firstValue"
      :sign="sign"
      :endValue="endValue"
      :result="result"
    ></calculation-result>
    <input-table @computerRes="computerRes"></input-table>
  </div>
</template>

<script>
import InputTable from "./components/InputTable.vue";
import CalculationResult from "./components/CalResult.vue";
import { floatObj } from "./utils/floatObj.js";

export default {
  name: "App",
  data() {
    return {
      firstValue: "0",
      sign: "",
      endValue: "",
      result: "",
      isSign: false,
      checkValue: ""
    };
  },
  methods: {
    /**
     * 最终求值(=)
     */
    _finalRes() {
      // 转换为数字型
      this.firstValue = Number(this.firstValue);
      this.endValue = Number(this.endValue);
      console.log(this.firstValue);
      switch (this.sign) {
        case "+":
          // this.result = '='+(this.firstValue + this.endValue);
          this.result = "=" + floatObj.add(this.firstValue, this.endValue);
          break;
        case "-":
          this.result = "=" + floatObj.subtract(this.firstValue, this.endValue);
          break;
        case "*":
          this.result = "=" + floatObj.multiply(this.firstValue, this.endValue);
          break;
        case "/":
          this.result = "=" + floatObj.divide(this.firstValue, this.endValue);
          break;
        case "%":
          this.result = "=" + (this.firstValue % this.endValue);
          break;
        default:
          this.sign = "+";
          this.result = "=" + this.firstValue;
          break;
      }
    },

    /**
     * 删除(DEL)
     */
    _scliceValue() {
      // 当还没有求值时才可删除
      if (this.result === "" && this.isSign === false) {
        this.firstValue = this.firstValue.slice(0, -1);
        this.checkValue = this.firstValue;
        if (this.firstValue === "") {
          this.firstValue = "0";
        }
      } else if (this.result === "") {
        this.endValue = this.endValue.slice(0, -1);
        this.checkValue = this.endValue;
      }
    },

    /**
     * 初始化数值(C)
     */
    _initValue() {
      this.firstValue = "0";
      this.sign = "";
      this.endValue = "";
      this.result = "";
      this.isSign = false;
      this.checkValue = "";
    },

    /**
     * 校验合法性
     */
    checkLegality(feild, checkObj) {
      this.checkValue += checkObj;
      if (feild === true && /^0/.test(this.checkValue)) {
        this.checkValue = "";
        return false;
      } else if (feild === false && /^0\d+/.test(this.checkValue)) {
        return false;
      }
      return true;
    },
    
    /**
     * 设置表达式
     * @param { array } dataValue 按键数组
     */
    computerRes(dataValue) {
      // console.log(dataValue);
      // 如果输入是数字或.
      if (this.result === "" && dataValue[1] === true) {
        // 如果运算符号还没写，则设置第一个值
        if (this.isSign === false) {
          // 校验输入合法性
          if (this.checkLegality(true, dataValue[0])) {
            this.firstValue = this.checkValue;
          }
          // 写了则是设置第二个值
        } else {
          if (this.checkLegality(false, dataValue[0])) {
            this.endValue = this.checkValue;
          }
        }
      } else if (dataValue[1] === false && dataValue[0] === "=") {
        this._finalRes();
      } else if (dataValue[1] === false && dataValue[0] === "DEL") {
        this._scliceValue();
      } else if (dataValue[1] === false && dataValue[0] === "C") {
        this._initValue();
        // 如果输入是运算符号
      } else if (
        dataValue[1] === false &&
        this.result === "" &&
        this.endValue === ""
      ) {
        this.sign = dataValue[0];
        this.isSign = true;
        this.checkValue = "";
      }
    }
  },
  components: {
    InputTable,
    CalculationResult
  }
};
</script>

<style lang="scss">
  * {
    padding: 0px;
    margin: 0px;
  }
  #app {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
