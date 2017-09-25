

export const parseURL = (url) => {
    let re = /^http[s?]:\/\/www\.amazon\.com\/[\w|\-|\/]+\/(\w{10})/;
    const myArray = url.match(re);
    if (myArray && myArray[1] != null){
      return myArray[1];
    }else{
      return '';
    }
}
