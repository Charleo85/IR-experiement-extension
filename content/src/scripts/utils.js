const positiveIcon = chrome.extension.getURL('/icons/thumbup.png'); //<Icon name='smile'/>
const negtiveIcon = chrome.extension.getURL('/icons/thumbdown.png');
const neutralIcon = chrome.extension.getURL('/icons/neutral.png');

export const selectIcon = (score) => {
  if (score > 0.3){
    return {content: 'Positive', color: 'orange'}//positiveIcon;
  }else if (score < -0.3){
    return {content: 'Negative', color: 'green'}//negtiveIcon;
  }else{
    return {content: 'Neutral', color: 'blue'}//neutralIcon;
  }
}

export const displaySentiment = (score) => {
  return (parseInt((score+1)*50)).toString() + '%';
}

export const parseURL = (url) => {
    if (url.startsWith('https://www.amazon.com/gp/customer-reviews/')){
      return {type: 'review', id: url.substring(43)};
    }
    let re = /^http[s?]:\/\/www\.amazon\.com\/[\w|\-|\/]+\/(\w{10})/;
    const myArray = url.match(re);
    if (myArray && myArray[1] != null){
      return {type: 'product', id:myArray[1]};
    }else{
      return {type: 'other', id:''};
    }
}

export const dropdownOption = (options) => {
  return ;
}
