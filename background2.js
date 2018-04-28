const turkeyURL = "https://video.nest.com/live/CdolW540tc";
const corgiURL = "https://www.youtube.com/watch?v=b9lb-T9FrAg"
const textURL = "https://www.magaliduzant.com/eastlight";
let activeTab = {};
let counter = 1;
let timerFunc = null;
let textPresent = false;

function waitUntilSwitch2(times) {
  console.log("CHECKING FOR SWITCH...");
  console.log(times)
  let d = new Date();
  let currentTime = formatTimeString(`${d.getHours()}:${d.getMinutes()}`);
  console.log(`the current time is: ${currentTime}`);
  let sunPresent = false;
  for (var i = 0; i < times.length; i++) {
    if ( times[i].timeStart <= currentTime && currentTime < times[i].timeEnd ) {
      sunPresent = true;
      console.log(`We have a match! Winning time is ${currentTime}`)
      console.log(`found in ${JSON.stringify(times[i])}`)
      console.log(`activeTab is ${JSON.stringify(activeTab)}`)
      console.log(`!activeTab.timeEnd ${!activeTab.timeEnd}`)
      console.log(`currentTime >= activeTab.timeEnd is ${currentTime >= activeTab.timeEnd}`)

      if ( !activeTab.timeEnd || times[i].url !== activeTab.url ) {
        console.log(`we are allowed to switch!`)
        console.log(`${currentTime} greater or eq than ${activeTab.timeEnd} is ${currentTime >= activeTab.timeEnd}`)
        console.log(`activeTab has timeEnd?: ${!activeTab.timeEnd}`)

        activeTab = times[i];
        replaceHTML(times[i].location)
        // switchToNew(times[i].url, function(tab) {
        //   activeTab = times[i];
        //   console.log(`I have changed the activeTab to ${JSON.stringify(times[i])}`)
        // });
        break;
      }
    } else {
      console.log("Couldn't find a match with: ");
      console.log("timeStart: ", times[i].timeStart);
      console.log("timeEnd: ", times[i].timeEnd);
      console.log("currentTime: ", currentTime);
    }
  }
  if ( !sunPresent && !textPresent) {
    debugger;
    console.log("sunPresent was false!");
    // switchToNew(textURL, function(tab) {
    //   console.log(`I have changed the activeTab to the text page of ${tab}`)
    // });
    textPresent = true;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});

    });
  }

}

function replaceHTML(vidLocation){
  // document.getElementsByTagName('body')[0].innerHTML =
  // "<iframe allowfullscreen \
  // webkitallowfullscreen mozallowfullscreen \
  // src='https://video.nest.com/embedded/live/uWpIov7zE9' \
  // frameborder='0' \
  // width=" + `'${window.innerWidth}' `+
  // " height=" + `'${window.innerHeight}' `+ "></iframe>";
  console.log("REPLACITNG...")
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   console.log(tabs)
  //   let activeTab = tabs[0];
  //   console.log(`sending message to: ${JSON.stringify(activeTab.id)}`)
  //   chrome.tabs.sendMessage(activeTab.id, {message: "nyc"}, function(response){
  //     console.log("sent: ", response);
  //   });
  // });
  if (vidLocation === "NYC"){
    console.log("switching to NYC...")
    chrome.tabs.executeScript({
      file:'switchNYC.js'
    })
  } else {
    console.log("switching to Mardin...")
    chrome.tabs.executeScript({
      file:'switchMardin.js'
    })
  }

}

function switchToNew(tabURL, callback) {
  chrome.windows.getLastFocused( {populate: true}, function (window) {
    console.log(window);
    let tabID = getTabID(window.tabs, tabURL);
    if (tabID) {
      console.log(`updating ${tabURL} to active`);
      chrome.windows.update(window.id, { state: "fullscreen" }, function (window) {
        chrome.tabs.update(tabID, {active: true, selected: true }, function(tab) {
          console.log("finished  forward!", tabURL);
          callback(tab);
        })
      })

    }
  });
}

function wait(sec) {
  let tabStartTime = new Date();
  while (Math.abs( new Date() - tabStartTime ) <= sec * 1000){
    console.log(`waiting ${sec} seconds`);
  }
}

function formatTimeString(timeString){
  console.log(`init timeString: ${timeString}`);
  return parseInt(timeString.split(":").map(function(item, index){
    if (item.length < 2) {
      return `0${item}`;
    }
    return item;
  }).join(""))
}

function formatTimes(times) {
  console.log(times);
  for (var i = 0; i < times.length; i++) {
    console.log(times[i]);
    times[i].timeStart = formatTimeString(times[i].timeStart);
    times[i].timeEnd = formatTimeString(times[i].timeEnd);
  }
  console.log(`times updated to ${times}`)
  return times;
}

function getTabID(tabs, url) {
  for (var i = 0; i < tabs.length; i++) {
    //console.log(`comparing ${tabs[i].url} and ${url}`)
    if (tabs[i].url === url) {
      console.log(tabs[i]);
      return tabs[i].id;
    }
  }

  console.log("unable to locate that url in your tabs!");
  return null;
}

function handleTimer(times) {

  const sunsetTimes = formatTimes(times);

  timerFunc = setInterval(function() { waitUntilSwitch2(sunsetTimes); }, 5000);
  console.log(`timerFunc is now ${timerFunc}`);
  console.log(`type ${typeof timerFunc}`);
  console.log("past set int")


}


chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    counter= counter +1;
    console.log("COUNTER: ", counter);
    console.log(`request greeting: ${request.greeting}`)
    if( request.greeting === "GetURL" ) {
      chrome.windows.getLastFocused( {populate: true}, function (window) {
        console.log("WINDOW: ", window);
        chrome.windows.update(window.id, { state: "fullscreen" }, function (window) {
          console.log("updated: ", window)
        })
      });

      console.log("HERE")
      console.log(request.tabTimes)
      handleTimer(request.tabTimes);
      sendResponse("i worked!")
    } else if ( request.greeting === "Stop" ) {
      console.log(`i got the stop msg: ${timerFunc}`)
      if (timerFunc) {
        clearInterval(timerFunc);
      }
    }

})
