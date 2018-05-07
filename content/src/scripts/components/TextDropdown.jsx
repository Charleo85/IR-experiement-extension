import React, { Component, PureComponent } from "react";

import { connect } from "react-redux";
import { get } from "lodash";
import { Button, Dropdown, Table, Icon, Rating, Label } from "semantic-ui-react";
import { displaySentiment, selectIcon, displayRating } from "../utils";
import { ratingAction, clickAction } from "../../../../event/src/action-creators/feedback"

const openReviewLink = (id, text, sentiment, dispatch, feedbackID) => () => {
  dispatch({
    type: "REVIEW_INFO",
    payload: { id, text, sentiment }
  });
  // console.log(feedbackID)
  clickAction(feedbackID);
  // const viewTabUrl = chrome.runtime.getBackgroundPage(window=>{
  //   console.log(window)
  // });
  // const viewTabUrl = chrome.extension.getURL('background.html')
  // window.open(viewTabUrl);
  window.open("https://www.amazon.com/gp/customer-reviews/" + id);
};

const sentimentLabel = sentiment => {
  const { color, content } = selectIcon(sentiment);
  return (
    <Label ribbon color={color}>
      {content}
      <Label.Detail>{displaySentiment(sentiment)}</Label.Detail>
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
      ratingAction(this.props.option.ranking, rating);
    }
  }

  render() {
    const { option, dispatch } = this.props;
    return (
      <Table.Row>
        <Table.Cell width="2">{sentimentLabel(option.sentiment)}</Table.Cell>
        <Table.Cell width="3">
          {`${option.clicked}.${option.rating}`}
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
          onClick={openReviewLink(option.id, option.content, option.sentiment, dispatch, option.ranking)}
        >
          {option.content}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export class TextDropdown extends PureComponent {
  constructor(props) {
    super();
  }

  rank(){
    const {xpath} = this.props;
    this.props.dispatch({
      type: "SORT_REVIEW",
      payload: {xpath}
    });
  }

  // auto scrolling
  render() {
    return (
      <Dropdown text={this.props.text} style={{ width: "450%", zIndex: "999",  }}>
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
                  <Button primary onClick={this.rank.bind(this)} style={{float: 'right'}}>Rank</Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.options.map((option, idx) => (
                <TextDropdownItem
                  option={option}
                  dispatch={this.props.dispatch}
                  key={option.id}
                />
              ))}
            </Table.Body>
          </Table>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
