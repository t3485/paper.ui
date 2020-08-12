<template>
  <div ref="chartLineBox" style="width: 90%;height: 70vh;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      chartLine: null,
      option: {
        tooltip: {
          //设置tip提示
          trigger: "axis",
          formatter: this.format
        },
        legend: {
          data: []
        },
        color: ["#ede387", "#e03636", "#3b200c", "#de8100", "#ccfc62"], //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {
          //设置x轴
          type: "category",
          boundaryGap: false, //坐标轴两边不留白
          data: [],
          name: "年份", //X轴 name
          nameTextStyle: {
            //坐标轴名称的文字样式
            color: "#FA6F53",
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {
            //坐标轴轴线相关设置。
            lineStyle: {
              color: "#FA6F53"
            }
          }
        },
        yAxis: {
          name: "元",
          nameTextStyle: {
            color: "#FA6F53",
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: "#FA6F53"
            }
          },
          type: "value",
          axisLabel: {
            formatter: this.yAxisFormat
          },
        },
        series: [
          {
            name: "平均成绩",
            data: [220, 232, 201, 234, 290, 230, 220],
            type: "line", // 类型为折线图
            lineStyle: {
              // 线条样式 => 必须使用normal属性
              normal: {
                color: "#8AE09F"
              }
            }
          },
          {
            name: "学生成绩",
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line",
            lineStyle: {
              normal: {
                color: "#FA6F53"
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.chartLine = echarts.init(this.$refs.chartLineBox)
  },
  methods: {
    format (o) {
      let temp = o[0].name
      let addition = typeof this.tipAddition === 'function'

      for (let i = 0; i < o.length; i++) {
        temp += `<br/>
              <span class="circle" style="background-color:${o[i].color};"></span>
              ${o[i].seriesName}: ${this.tranNumber(o[i].value, 2)}`
      }
      if (addition) {
        temp += '<br/>' + this.tipAddition(o)
      }

      return temp
    },
    yAxisFormat (v) {
      return this.tranNumber(v, 2)
    },
    tranNumber (num, point) {
      if (typeof num != 'number') {
        return '0'
      }

      let numStr = num.toString()

      let i = numStr[0] == '-' ? 1 : 0
      let len = numStr.indexOf('.') - i
      if (len <= -1) {
        len = numStr.length - i
      }

      // 十万以内直接返回 
      if (len < 5) {
        //小数比例
        if (num !== 0) {
          var index = len
          if (index + 4 < numStr.length) {
            return numStr.substring(0, index + 4)
          }
        }
        return numStr;
      }
      //大于8位数是亿 012345678.9
      else if (len > 8) {
        let decimal = numStr.substr(len - 8 + i, point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 4) {
        let decimal = numStr.substr(len - 4 + i, point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
      }
    },
    loadData () {
      this.option.xAxis.data = this.time
      let cart = this.data

      this.option.series = new Array(cart.length)
      this.option.legend.data = []

      for (let i = 0; i < cart.length; i++) {
        this.$set(this.option.series, i, {
          name: cart[i].name,
          data: cart[i].data,
          id: cart[i].fieldName,
          type: "line",
          normal: {
            color: this.option.color[i]
          }
        })
        this.option.legend.data.push(cart[i].name)
      }
      this.chartLine.setOption(this.option, true)
    }
  },
  props: ['time', 'data', 'tipAddition'],
  watch: {
    data () {
      this.loadData()
    }
  }
}
</script>

<style scoped>
div >>> .circle {
  display: inline-block;
  margin-right: 5px;
  border-radius: 10px;
  width: 10px;
  height: 10px;
}
</style>