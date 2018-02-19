//var XMLHttpRequest = XMLHttpRequest;
//var xhr = new XMLHttpRequest();
//xhr.overrideMimeType("application/json");
beyonceGifs = [];
corgiGifs = [];
var gifType;

var xhr;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
  try {
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
  }
  catch (e) {
    try {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (e) {}
  }
}

function loadGifs(type) {
  gifType = type
  xhr.open('GET', "http://api.giphy.com/v1/gifs/search?q="+type+"&api_key=dc6zaTOxFJmzC&limit=400&offset=0&rating=pg", true);
  xhr.send();
  xhr.onload = processRequest;
}

function processRequest(e) {
  console.log("i ran")
  //myJson = xhr.responseText.replace(/({)([a-zA-Z0-9]+)(:)/,'$1"$2"$3')
  var response = JSON.parse(xhr.responseText)
  //console.log(response.data[0].images)
  data = response.data
  myArray = gifType === "beyonce" ? beyonceGifs : corgiGifs;
  for (i = 0 ; i < data.length; i++){
    myArray.push(data[i].images.fixed_height.url.replace("http:", "https:"))
  }
  console.log(myArray)
}
