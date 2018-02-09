import React, { Component, PureComponent } from "react";

import { connect } from "react-redux";
import { get } from "lodash";
import { Dropdown, Table, Icon, Rating, Label } from "semantic-ui-react";
import { displaySentiment, selectIcon, displayRating } from "../utils";
import { ratingAction, clickAction } from "../../../../event/src/action-creators/feedback"

const openReviewLink = (id, text, score, dispatch, feedbackID) => () => {
  dispatch({
    type: "REVIEW_INFO",
    payload: { id, text, score }
  });
  clickAction(feedbackID)
  window.open("https://www.amazon.com/gp/customer-reviews/" + id);
};

const sentimentLabel = score => {
  const { color, content } = selectIcon(score);
  return (
    <Label ribbon color={color}>
      {content}
      <Label.Detail>{displaySentiment(score)}</Label.Detail>
    </Label>
  );
};

class TextDropdownItem extends Component {
  constructor(props) {
    super();
    this.state = { rating: -1 };
  }

  handleRate(event, { rating, maxRating }) {
    // console.log(this.props.option.feedbackID, rating);
    this.setState({ rating });
    if (rating != 0){ // do not feedback on no opinion
      ratingAction(this.props.option.feedbackID, rating);
    }
  }

  render() {
    const { option, dispatch } = this.props;
    return (
      <Table.Row>
        <Table.Cell width="2">{sentimentLabel(option.score)}</Table.Cell>
        <Table.Cell width="3">
          <Rating
            icon="star"
            clearable
            maxRating={5}
            onRate={this.handleRate.bind(this)}
          />
          <br />
          {displayRating(this.state.rating)}
        </Table.Cell>
        <Table.Cell
          style={{ cursor: "pointer" }}
          onClick={openReviewLink(option.key, option.text, option.score, dispatch, option.feedbackID)}
        >
          {option.text}
        </Table.Cell>
      </Table.Row>
    );
  }
}
//pagination {{displayRating()}}
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
  // auto scrolling
  render() {
    // console.log(this.props)
    return (
      <Dropdown text={this.props.text} style={{ width: "450%", zIndex: "999" }}>
        <Dropdown.Menu scrolling>
          <Table celled padded onClick={e => e.stopPropagation()}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width="2">
                  Review <br />Sentiment
                </Table.HeaderCell>
                <Table.HeaderCell width="3">
                  Attribute Matching Relavance
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Reviews (click for entire review)
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.options.map(option => (
                <TextDropdownItem
                  option={option}
                  dispatch={this.props.dispatch}
                  key={option.key}
                />
              ))}
            </Table.Body>
          </Table>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
