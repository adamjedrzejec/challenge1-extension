
function onrequest(req) {
  // This function will be called everytime the browser is about to send out an http or https request.
  // The req variable contains all information about the request.
  // If we return {}  the request will be performed, without any further changes
  // If we return {cancel:true} , the request will be cancelled.
  // If we return {requestHeaders:req.requestHeaders} , any modifications made to the requestHeaders (see below) are sent.

  // log what file we're going to fetch:
  console.log("Loading: " + req.method +" "+ req.url + " "+ req.type);

  // let's do something special if an image is loaded:
  if (req.type=="image") {
    getMeta(req.url, function(width, height) {
      console.log("Ooh, it's a picture!");
      console.log("Url: " + req.url);
      console.log("Width: " + width);
      console.log("Height:" + height);
      console.log("\n")
    });

  }

  // req also contains an array called requestHeaders containing the name and value of each header.
  // You can access the name and value of the i'th header as req.requestHeaders[i].name and req.requestHeaders[i].value ,
  // with i from 0 up to (but not including) req.requestHeaders.length .

  return {};
}


function getMeta(url, callback) {
  var img = new Image();
  img.src = url;
  img.onload = function() { callback(this.width, this.height); }
}


// no need to change the following, it just makes sure that the above function is called whenever the browser wants to fetch a file
browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

