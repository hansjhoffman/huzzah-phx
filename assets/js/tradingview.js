import { createChart, CrosshairMode, PriceScaleMode } from "lightweight-charts";

/*
 * Custom Web Component to render TradingView chart
 * and interact w/ LiveView through Custom Events.
 */

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

class Chart extends HTMLElement {
  static get observedAttributes() {
    return ["data-candles"];
  }

  constructor() {
    super();

    this.candleData = [];
  }

  connectedCallback() {
    console.log("connected");

    this.chart = createChart(this, CONFIG);

    let candleSeries = this.chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candleSeries.setData(this.candleData);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log("attribute changed");

    if (newVal == oldVal) {
      return;
    }

    switch (attrName) {
      case "data-candles":
        this.candleData = JSON.parse(newVal);
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {}
}

customElements.define("tv-chart", Chart);
