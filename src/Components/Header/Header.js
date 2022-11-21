

class Header extends HTMLElement {
        connectedCallback() {
          this.innerHTML = `
          <h1 class="test-header">hola soy un header</>
          `
        }
    }

    customElements.define("header-element", Header);





