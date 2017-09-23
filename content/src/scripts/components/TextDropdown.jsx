import React, {Component} from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {connect} from 'react-redux';
import {get} from 'lodash';
import { Dropdown, Table } from 'semantic-ui-react';

class TextDropdown {
  constructor(text, container, options) {
    this._container = container;
    this._text = text;
    this._options = options;
    this._render();
  }

  _render() {
    render(
      <Dropdown text={this._text} openOnFocus simple item options={this._options} />,
      this._container
    );
  }

  get text() {
    return this.text;
  }

  set text(value) {
    this._text = value;
    this._render();
  }

  destroy() {
    unmountComponentAtNode(this._container);
  }
}

export default TextDropdown;
