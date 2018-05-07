import React, { Component, PureComponent } from "react";

import { connect } from "react-redux";
import { get, map } from "lodash";
import { Button, Dropdown, Table, Icon, Rating, Label, Accordion, Tab } from "semantic-ui-react";
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

export class TextDropdown extends Component {
  constructor(props) {
    super();
    this.state = { cluster: true, activeIndex: -1 };
  }

  handleClick = (index) => () => {
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    this.setState(prevstate => {
      prevstate.activeIndex = newIndex;
      return prevstate;
    })
  }

  rank(){
    const {xpath} = this.props;
    this.props.dispatch({
      type: "SORT_REVIEW",
      payload: {xpath}
    });
  }

  cluster = () => {
    this.setState(prevstate => {
      prevstate.cluster = !prevstate.cluster;
      return prevstate;
    });
  }

  // auto scrolling
  render() {
    const {activeIndex, cluster} = this.state;
    return (
      <Dropdown text={this.props.text} style={{ width: "450%", zIndex: "999",  }}>
        <Dropdown.Menu scrolling >
            <Button primary onClick={this.cluster.bind(this)} style={{float: 'right'}}>{cluster ? 'uncluster': 'cluster'}</Button>
            {this.state.cluster ?
              (
                <Accordion styled fluid onClick={e => e.stopPropagation()}>
                  {map(this.props.options.reduce((acc, option) => {
                    if (acc[option.subtopic] == null) acc[option.subtopic]= [];
                    acc[option.subtopic].push(option);
                    return acc;
                    }, {}),
                    (values, k)=>(
                      <div key={k}>
                        <Accordion.Title active={activeIndex === k} onClick={this.handleClick(k)}>
                          <Icon name='dropdown' />
                          {values[0].content}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === k}>
                          {values.map((val, idx)=>(
                            <TextDropdownItem
                              option={val}
                              dispatch={this.props.dispatch}
                              key={idx}
                            />
                          ))}
                        </Accordion.Content>
                      </div>
                    )
                  )}
                </Accordion>
            ):(
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
                    {this.props.options.map((option, idxs) => (
                      <TextDropdownItem
                        option={option}
                        dispatch={this.props.dispatch}
                        key={option.id}
                      />
                    ))}
                  </Table.Body>
                </Table>
              )
            }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
