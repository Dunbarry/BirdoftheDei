console.log('Drone online.')

function postFinder(){
  var postImOn=location.href.length;
  var url1=postImOn.length-3;
  var url2=postImOn.length-2;
  console.log(url1+url2);
  return url1+url2;
}
