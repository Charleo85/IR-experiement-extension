import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'semantic-ui-react';
import {get} from 'lodash';
// import fetchReview from '../../../../../event/src/action-creators/fetch-review.js';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {`Product ID: ${this.props.productID}`}
        {`Product Title: ${this.props.title}`}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productID: get(state, 'productInfo.productID'),
    title: get(state, 'productInfo.title')
  };
};

export default connect(mapStateToProps)(App);
//        <Button onClick={fetchReview}>fetchReview</Button>
