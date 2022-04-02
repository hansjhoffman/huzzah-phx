class Hotkeys extends HTMLElement {
  static get observedAttributes() {
    return ["open"];
  }

  constructor() {
    super();

    let shadowRoot = this.attachShadow({ mode: open });
  }

  _toggle() {
    if (this.getAttribute("open")) {
      this.removeAttribute("open");
    } else {
      this.setAttribute("open", value);
    }
  }

  connectedCallback() {}

  attributeChangedCallback(attrName, oldVal, newVal) {}

  disconnectedCallback() {}
}

customElements.define("hotkeys-modal", Hotkeys);

// https://developers.google.com/web/fundamentals/web-components/examples/howto-checkbox
// Super + k
// https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/
// https://blog.bitsrc.io/web-components-without-a-framework-lets-build-a-modal-a450a4536340
