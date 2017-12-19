import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Table } from 'semantic-ui-react';
import {get} from 'lodash';
// import fetchReview from '../../../../../event/src/action-creators/fetch-review.js';


const renderObj = (obj) => {
  // console.log(obj);
  // return <Table.Row></Table.Row>
  const ret = (Object.entries(obj)).reduce(
    (renderBuffer, element)=>{
      return renderBuffer + `
      <Table.Row>
        <Table.Cell>
          ${elements[0]}
        </Table.Cell>
        <Table.Cell>
          ${elements[1]}
        </Table.Cell>
      </Table.Row>
      `
    })
  console.log(ret);
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
  }

  render() {
    return (
      <div>
      <Table basic='very' celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {'Product ID'}
            </Table.Cell>
            <Table.Cell>
                {this.props.productID}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {'Product Title'}
            </Table.Cell>
            <Table.Cell>
                {this.props.title}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {'Product Properties'}
            </Table.Cell>
            <Table.Cell>
                {this.props.properties}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {'Product Detail'}
            </Table.Cell>
            <Table.Cell>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button content='Get Reviews' icon='right arrow' labelPosition='right' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productID: get(state, 'productInfo.productID', ''),
    title: get(state, 'productInfo.title', ''),
    properties: get(state, 'productInfo.properties', ''),
    detail: get(state, 'productInfo.detail', {})
  };
};
// {renderObj(this.props.detail)}

export default connect(mapStateToProps)(App);
//        <Button onClick={fetchReview}>fetchReview</Button>
