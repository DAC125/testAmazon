class Footer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<h1 class="test-footer">soy footer</h1>`;
    }
}

customElements.define("footer-element", Footer);

