import {render, unmountComponentAtNode} from 'react-dom';

class InjectNode {
  constructor(node, container) {
    this._container = container;
    this._injectNode = node;
    this._render();
  }

  _render() {
    render(
      this._injectNode,
      this._container
    );
  }

  get injectNode() {
    return this._injectNode;
  }

  set injectNode(value) {
    this._injectNode = value;
    this._render();
  }

  destroy() {
    unmountComponentAtNode(this._container);
  }
}

export default InjectNode;
