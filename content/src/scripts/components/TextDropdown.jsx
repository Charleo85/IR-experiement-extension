import React, {Component, PureComponent} from 'react';

import {connect} from 'react-redux';
import {get} from 'lodash';
import { Dropdown, Table, Icon, Rating, Label } from 'semantic-ui-react';
import {displaySentiment, selectIcon} from '../utils.js'

const openReviewLink = (id, text, score, store) => () => {
  store.dispatch({
    type: 'REVIEW_INFO',
    payload: {id, text, score}
  });
  window.open('https://www.amazon.com/gp/customer-reviews/'+id);
};

const recordRate = (id) => (event, {rating, maxRating}) => {
  console.log(id, rating);
  // store.dispatch({
  //   type: 'REVIEW_RATE',
  //   payload: {id, }
  // });
}

const sentimentLabel = (score) => {
  const {color, content} = selectIcon(score);
  return (
    <Label ribbon color={color}>
      {content}
      <Label.Detail>{displaySentiment(score)}</Label.Detail>
    </Label>
  );
}

class TextDropdownItem extends Component {
  constructor(props) {
    super();
  }

  render(){
    const {option, store} = this.props;
    return (
       <Table.Row>
         <Table.Cell width='1'>
           {sentimentLabel(option.score)}
         </Table.Cell>
         <Table.Cell width='2'>
           <Rating icon='star' clearable maxRating={5} onRate={recordRate(option.key)}/>
         </Table.Cell>
         <Table.Cell style={{cursor: 'pointer'}} onClick={openReviewLink(option.key, option.text, option.score, store)}>
           {option.text}
         </Table.Cell>
       </Table.Row>
    )
  }
}
//pagination
// <Table.Footer>
//   <Table.Row>
//     <Table.HeaderCell colSpan='3'>
//       <Menu floated='right' pagination>
//         <Menu.Item as='a' icon>
//           <Icon name='left chevron' />
//         </Menu.Item>
//         <Menu.Item as='a'>1</Menu.Item>
//         <Menu.Item as='a'>2</Menu.Item>
//         <Menu.Item as='a'>3</Menu.Item>
//         <Menu.Item as='a'>4</Menu.Item>
//         <Menu.Item as='a' icon>
//           <Icon name='right chevron' />
//         </Menu.Item>
//       </Menu>
//     </Table.HeaderCell>
//   </Table.Row>
// </Table.Footer>

export class TextDropdown extends PureComponent {
  constructor(props) {
    super();
  }
  render(){
    return (
      <Dropdown text={this.props.text} style={{width:'1200px', 'zIndex':'999'}}>
         <Dropdown.Menu scrolling>
           <Table celled padded onClick={(e)=> e.stopPropagation()}>
             <Table.Header>
               <Table.Row>
                 <Table.HeaderCell width='2'>Review <br/>Sentiment</Table.HeaderCell>
                 <Table.HeaderCell width='2'>Feedback on <br/>Matching Relavance</Table.HeaderCell>
                 <Table.HeaderCell>Reviews (click for details)</Table.HeaderCell>
               </Table.Row>
             </Table.Header>

             <Table.Body>
               {this.props.options.map(option => (
                  <TextDropdownItem option={option} store={this.props.store} key={option.key}/>
               ))}
             </Table.Body>

           </Table>
         </Dropdown.Menu>
      </Dropdown>
    );
  }
}
