import React, {Component} from 'react';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {parseURL} from '../../utils.js';

const parseTitle = () => {
  function clean_str(s) {
  		return s.replace(/(\t|\n|\r｜)/gm,"").trim();
  }

  var title = document.getElementById("productTitle");

  var plist = document.getElementById("feature-bullets").getElementsByTagName('span');
  var description = []
  for (var i = 0; i < plist.length; i++) {
  	if (plist[i].className == "a-list-item" && plist[i].childElementCount == 0) {
  		description.push(clean_str(plist[i].textContent))
      }
  }

  var detail = {}
  var table_1 = document.getElementById("productDetails_techSpec_section_1").getElementsByTagName('tr')
  var table_2 = document.getElementById("productDetails_techSpec_section_2").getElementsByTagName('tr')

  for (var i = 0; i < table_1.length; i++) {
  	detail[clean_str(table_1[i].getElementsByTagName("th")[0].textContent)] = clean_str(table_1[i].getElementsByTagName("td")[0].textContent)
  }

  for (var i = 0; i < table_2.length; i++) {
  	detail[clean_str(table_2[i].getElementsByTagName("th")[0].textContent)] = clean_str(table_2[i].getElementsByTagName("td")[0].textContent)
  }

  var arr = {
  	title: title ? clean_str(title.textContent) : 'Not found',
  	properties : description ? description : 'Not found',
  	detail : detail ? detail : {},
  }

  return arr;
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.pageType.type === 'product'){
      let productID = this.props.pageType.id;
      var info = parseTitle();
      this.props.dispatch({
        type: 'PRODUCT_INFO',
        payload: {productID, ...info}
      });
    }else{
      this.props.dispatch({
        type: 'RESTORE_STATES'
      });
    }
  }

  render() {
    return (
      <div></div>
    );
    //        {`injected!!! ${this.props.pageType.id}`}
  }
}

const mapStateToProps = (state) => {
  return {
    productID: get(state, 'productInfo.productID')
  };
};

export default connect(mapStateToProps)(App);
