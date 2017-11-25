import React, {Component, PureComponent} from 'react';

import {connect} from 'react-redux';
import {get} from 'lodash';
import { Dropdown, Table, Icon } from 'semantic-ui-react';


const openReviewLink = (id, text) => () => {
  // chrome.tabs.create({url:'https://www.amazon.com/gp/customer-reviews/'+id},
  // function(tab){
  //     chrome.tabs.sendRequest(tab.id, {highlight: text}, function(response) {
  //         console.log("highlighted");
  //     });
  //   }
  // );

  window.open('https://www.amazon.com/gp/customer-reviews/'+id);
};

const positiveIcon = chrome.extension.getURL('/icons/thumbup.png');
const negtiveIcon = chrome.extension.getURL('/icons/thumbdown.png');
const neutralIcon = chrome.extension.getURL('/icons/neutral.png');

const selectIcon = (score) => {
  if (score > 0.3){
    return positiveIcon;
  }else if (score < -0.3){
    return negtiveIcon;
  }else{
    return neutralIcon;
  }
}

export class TextDropdown extends PureComponent {
  constructor(props) {
    super();
  }

  render(){
    return (
      <Dropdown text={this.props.text} style={{width:'1200px'}}>
         <Dropdown.Menu scrolling>
             {this.props.options.map(option => (
               <Dropdown.Item onClick={openReviewLink(option.key, option.text)} key={option.key} content={option.text} image={selectIcon(option.score)}></Dropdown.Item>
             ))}
         </Dropdown.Menu>
      </Dropdown>
    );
  }
}
