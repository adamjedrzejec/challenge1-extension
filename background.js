const PRINT_HEADERS = false;
const PRINT_SECURITY_INFO = true;

//comment test

function onrequest(req) {
  // This function will be called everytime the browser is about to send out an http or https request.
  // The req variable contains all information about the request.
  // If we return {}  the request will be performed, without any further changes
  // If we return {cancel:true} , the request will be cancelled.
  // If we return {requestHeaders:req.requestHeaders} , any modifications made to the requestHeaders (see below) are sent.

  // log what file we're going to fetch:
  
  // console.log("Loading: " + req.method +" "+ req.url + " "+ req.type);

  // let's do something special if an image is loaded:
  if (req.type=="image") {
     console.log("Ooh, it's a picture!");

     let img = new Image();
     let imgChecked = false;
     img.onload = function(){
       if(this.width == 1 || this.height == 1) {
        console.log("TRACKER!");
        return {cancel:true}
      }
       imgChecked = true;
     };
     img.src = req.url;
   
     //while(!imgChecked) {}
  }

  if (blackhosts.indexOf(req.requestHeaders[0].value) >= 0) {
    console.log("Cancelled!");
    return {cancel:true}
  }
  console.log("Not cancelled!");



  // req also contains an array called requestHeaders containing the name and value of each header.
  // You can access the name and value of the i'th header as req.requestHeaders[i].name and req.requestHeaders[i].value ,
  // with i from 0 up to (but not including) req.requestHeaders.length .
  
  for (i=0; i<req.requestHeaders.length; i++) {

    if (req.requestHeaders[i].name == "User-Agent") {
      
      req.requestHeaders[i].value = "";
      if (PRINT_SECURITY_INFO)
        console.log("Private data removed!");
    }
    if (PRINT_HEADERS)
      console.log("At position "+ i +" we find: Name:'"+ req.requestHeaders[i].name + "' Value: '" + req.requestHeaders[i].value + "'");      // print a line for each element
  }

  return {requestHeaders:req.requestHeaders};
}

// no need to change the following, it just makes sure that the above function is called whenever the browser wants to fetch a file
browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

var blackhosts = [
  "sb.scorecardresearch.com",
]
