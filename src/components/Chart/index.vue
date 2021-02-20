<template>
  <div :class="className" :style="{height: height, width: width}" />
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    isClick:{
      type:Boolean,
      default: false
    },
    height: {
      type: String,
      default: "360px"
    },
    option: {
      type: Object,
      required: true
    },
    clickIt: {
      type: Boolean,
      default: false
    },
    toMethod: {
      type: Function
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    option: {
      deep: true,
      handler(val) {
        this.chart.setOption(val, true);
      }
    }
  },
  mounted() {
    this.initChart();
    if(this.isClick){
      let that = this
      this.chart.on('click', function(params) {
        that.$emit("showAgeToast",params)
      })
    }

  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "walden");
      this.chart.setOption(this.option);
      if (this.clickIt === true) {
        this.chart.on('click', data => {
          this.toMethod(data)
        });
      }
    }
  }
};
</script>
