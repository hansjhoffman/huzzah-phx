import { createChart } from "lightweight-charts";

/*
 * Custom Web Component to render TradingView chart
 * and interact w/ LiveView through Custom Events.
 */

class Chart extends HTMLElement {
  static get observedAttributes() {
    return ["data-candles"];
  }

  constructor() {
    super();
    // let shadowRoot = this.attachShadow({ mode: "open" });

    this.candleData = [];
  }

  connectedCallback() {
    console.log("connected");

    this.chart = createChart(this, { width: 500, height: 300 });

    let lineSeries = this.chart.addLineSeries();
    lineSeries.setData(this.candleData);
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log("attribute changed");

    if (newVal == oldVal) {
      return;
    }

    switch (attrName) {
      case "data-candles":
        this.candleData = JSON.parse(newVal);
        console.log("new data: ", newVal);
        break;
      default:
        break;
    }
  }

  disconnectedCallback() {}
}

customElements.define("tradingview-chart", Chart);
