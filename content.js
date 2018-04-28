// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log("got request!")
//     console.log(request)
//     if( request.message === "nyc" ) {
//       console.log("NYC")
//       document.getElementsByTagName('body')[0].innerHTML =
//       "<iframe allowfullscreen \
//       webkitallowfullscreen mozallowfullscreen \
//       src='https://video.nest.com/embedded/live/uWpIov7zE9' \
//       frameborder='0' \
//       width=" + `'${window.innerWidth}' `+
//       " height=" + `'${window.innerHeight}' `+ "></iframe>";
//     }
//   }
// );

$(document).ready(function () {
  console.log("READY")

  function replaceHTML(){

    console.log("REPLACITNG...")
    document.getElementsByTagName('body')[0].innerHTML =
    "<iframe allowfullscreen \
    webkitallowfullscreen mozallowfullscreen \
    src='https://video.nest.com/embedded/live/uWpIov7zE9' \
    frameborder='0' \
    width=" + `'${window.innerWidth}' `+
    " height=" + `'${window.innerHeight}' `+ "></iframe>";

  }

  function stopTimer() {
    chrome.runtime.sendMessage({greeting: "Stop"},
          function (response) {
              console.log("done", response)
          });
  }

  function submitTimer() {
    console.log("submitted!")
    let nyc1Time = document.getElementById('nyc1Time').value;
    let nyc2Time = document.getElementById('nyc2Time').value;
    let turkey1Time = document.getElementById('turkey1Time').value;
    let turkey2Time = document.getElementById('turkey2Time').value;
    let tabTimes = [
      { location: "NYC", timeStart: nyc1Time, timeEnd: nyc2Time, url: "https://www.elastic.co/guide/en/elasticsearch/client/curator/current/filtertype_count.html" },
      { location: "Mardin", timeStart: turkey1Time, timeEnd: turkey2Time, url: "https://stackoverflow.com/questions/47901458/clearinterval-not-working-in-javascript-chrome-extension" }

    ];

    chrome.runtime.sendMessage({greeting: "GetURL", tabTimes: tabTimes},
          function (response) {
              console.log("done", response)
              debugger;
          });

  }
  console.log("waiting to add listener")

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
  } else {
    afterDOMLoaded();
  }

  function afterDOMLoaded() {
    console.log("added listener")
    var timerSubmit = document.getElementById('timer-submit');
    var timerStop = document.getElementById('timer-stop');

    console.log("timerSubmit", timerSubmit)
    timerSubmit.addEventListener('click', submitTimer);
    timerStop.addEventListener('click', stopTimer);

  }

});
