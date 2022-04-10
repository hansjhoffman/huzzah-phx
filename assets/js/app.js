import "phoenix_html";
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";

import topbar from "../vendor/topbar";
import ChartHook from "./chartHook";

const hooks = {
  Chart: ChartHook,
};

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
  hooks: hooks,
});

// Show progress bar on live navigation and form submits
topbar.config({
  barColors: { 0: "#29d" },
  shadowColor: "rgba(0, 0, 0, .3)",
});
window.addEventListener("phx:page-loading-start", (_info) => topbar.show());
window.addEventListener("phx:page-loading-stop", (_info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// liveSocket.enableDebug();
// liveSocket.enableLatencySim(1000);  // enabled for duration of browser session
// liveSocket.disableLatencySim();
window.liveSocket = liveSocket;

let loginPasswordMaskEl = document.getElementById("login-password-mask");
if (loginPasswordMaskEl !== null) {
  loginPasswordMaskEl.addEventListener("click", (_evt) => {
    const passwordInputEl = document.getElementById("user_password");

    if (passwordInputEl.getAttribute("type") == "password") {
      passwordInputEl.setAttribute("type", "text");
      loginPasswordMaskEl.innerText = "Hide";
    } else {
      passwordInputEl.setAttribute("type", "password");
      loginPasswordMaskEl.innerText = "Show";
    }
  });
}

let registerPasswordMaskEl = document.getElementById("register-password-mask");
if (registerPasswordMaskEl !== null) {
  registerPasswordMaskEl.addEventListener("click", (_evt) => {
    const passwordInputEl = document.getElementById("user_password");

    if (passwordInputEl.getAttribute("type") == "password") {
      passwordInputEl.setAttribute("type", "text");
      registerPasswordMaskEl.innerText = "Hide";
    } else {
      passwordInputEl.setAttribute("type", "password");
      registerPasswordMaskEl.innerText = "Show";
    }
  });
}
