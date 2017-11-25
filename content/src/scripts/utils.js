

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
