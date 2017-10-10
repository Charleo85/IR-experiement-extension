import React, {Component, PureComponent} from 'react';

import {connect} from 'react-redux';
import {get} from 'lodash';
import { Dropdown, Table } from 'semantic-ui-react';


const openReviewLink = (id) => {
  window.open('https://www.amazon.com/gp/customer-reviews/'+id);
};

export class TextDropdown extends PureComponent {
  constructor(props) {
    super();
  }

  render(){
    return (
      <Dropdown text={this.props.text}>
        <Dropdown.Menu>
          {this.props.options.map(option => (
            <Dropdown.item text={option.text} onClick={openReviewLink(option.key)}/>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
