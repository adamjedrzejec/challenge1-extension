// AUTHORS //

// Adam Jędrzejec, S2478951
// Berend Visser, S1499270



// config
const PRINT_HTTP_HEADERS = false;
const PRINT_SECURITY_INFO = false;

let trackers = 0;

function onrequest(req) {

  // when image is loaded, then we check it's size
  // if image size is 1px/1px, then it's a tracker, so we cancel its request
  if (req.type=="image") {
      let img = new Image();
      let imgChecked = false;
      img.onload = function() {
        if(this.width == 1 && this.height == 1) {
        ++trackers;
        console.log("TRACKER! #" + trackers);
        return {cancel:true}
      }
       imgChecked = true;
     };
     img.src = req.url;
  }

  if (blackhosts.indexOf(req.requestHeaders[0].value) >= 0) {
    return {cancel:true}
  }

  for (i=0; i<req.requestHeaders.length; i++) {

    if (req.requestHeaders[i].name == "User-Agent") {      
      req.requestHeaders[i].value = "";
      if (PRINT_SECURITY_INFO)
       console.log("Private data removed!");
    }
    if (PRINT_HTTP_HEADERS)
     console.log("At position "+ i +" we find: Name:'"+ req.requestHeaders[i].name + "' Value: '" + req.requestHeaders[i].value + "'");      // print a line for each element
  }
  return {requestHeaders:req.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  onrequest,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

// blacklisted list of hostnames containing unwanted ads, javascripts and trackers
var blackhosts = [
  "sb.scorecardresearch.com",
]
