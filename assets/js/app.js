// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import { createChart, CrosshairMode, PriceScaleMode } from "lightweight-charts";

import topbar from "../vendor/topbar";

const Hooks = {
  Chart: {
    mounted() {
      const elChart = document.getElementById("tv-chart");

      if (elChart === undefined) {
        return;
      }

      const chart = createChart(elChart, {
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
      });

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
    updated() {
      console.log("updated");
    },
  },
  Hotkeys: {
    mounted() {},
  },
};

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
  hooks: Hooks,
});

// Show progress bar on live navigation and form submits
topbar.config({
  barColors: { 0: "#29d" },
  shadowColor: "rgba(0, 0, 0, .3)",
});
window.addEventListener("phx:page-loading-start", (info) => topbar.show());
window.addEventListener("phx:page-loading-stop", (info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;
