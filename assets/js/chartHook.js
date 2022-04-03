import { createChart, CrosshairMode, PriceScaleMode } from "lightweight-charts";

const CONFIG = {
  width: 1000,
  height: 600,
  layout: {
    background: {
      color: "#161a25",
    },
    textColor: "#b2b5be",
    fontSize: 12,
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "#b2b5be",
    mode: PriceScaleMode.Logarithmic,
  },
  timeScale: {
    borderColor: "#b2b5be",
  },
};

export default {
  mounted() {
    const chart = createChart(this.el, CONFIG);

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    this.handleEvent("ohlc", ({ ohlc_data }) => {
      candleSeries.setData(JSON.parse(ohlc_data));
    });
  },
  beforeUpdate() {},
  updated() {
    console.log("updated");
  },
  destroyed() {},
  disconnected() {},
  reconnected() {},
};
