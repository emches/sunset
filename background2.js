const turkeyURL = "https://video.nest.com/live/CdolW540tc";
const corgiURL = "https://www.youtube.com/watch?v=b9lb-T9FrAg"
const textURL = "https://www.magaliduzant.com/eastlight";
let activeTab = {};
let counter = 1;
let timerFunc = null;

function waitUntilSwitch2(times) {
  console.log("CHECKING FOR SWITCH...");
  console.log(times)
  let d = new Date();
  let currentTime = formatTimeString(`${d.getHours()}:${d.getMinutes()}`);
  console.log(`the current time is: ${currentTime}`);
  let sunPresent = false;
  for (var i = 0; i < times.length; i++) {
    if ( times[i].timeStart <= currentTime && currentTime <= times[i].timeEnd ) {
      sunPresent = true;
      console.log(`We have a match! Winning time is ${currentTime}`)
      console.log(`found in ${JSON.stringify(times[i])}`)
      console.log(`activeTab is ${JSON.stringify(activeTab)}`)
      console.log(`!activeTab.timeEnd ${!activeTab.timeEnd}`)
      console.log(`currentTime >= activeTab.timeEnd is ${currentTime >= activeTab.timeEnd}`)

      if ( (!activeTab.timeEnd || currentTime !== activeTab.timeEnd) && times[i].url !== activeTab.url ) {
        console.log(`we are allowed to switch!`)
        console.log(`${currentTime} greater or eq than ${activeTab.timeEnd} is ${currentTime >= activeTab.timeEnd}`)
        console.log(`activeTab has timeEnd?: ${!activeTab.timeEnd}`)

        activeTab = times[i];
        console.log(`I have changed the activeTab to ${JSON.stringify(times[i])}`)
        switchToNew(times[i].url);
        break;
      }
    } else {

    }
  }
  if ( !sunPresent ) {
    //debugger;
    console.log("sunPresent was false!")
    switchToNew(textURL);
  }

}

function switchToNew(tabURL) {
  chrome.windows.getLastFocused( {populate: true}, function (window) {
    console.log(window);
    let tabID = getTabID(window.tabs, tabURL);
    if (tabID) {
      console.log(`updating ${tabURL} to active`);
      chrome.tabs.update(tabID, {active: true, selected: true }, function(tab) {
        console.log("finished  forward!", tabURL);
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

function switchForward(window){
  for (var i = 0; i < window.tabs.length; i++) {
// Finding the selected tab.
    if (window.tabs[i].active) {
      // Selecting the next tab.
      // chrome.tabs.update(window.tabs[i].id, {active: false});
      console.log(`updating ${i} to active`);
      wait(5)
      chrome.tabs.update(window.tabs[i+1].id, {active: true, selected: true }, function(tab ){
        console.log("finished forward!", tab);
        wait(5)
        return;
      });
    }
  }
}

function switchBackward(window){
  for (var i = 0; i < window.tabs.length; i++) {
// Finding the selected tab.
    console.log(`checking tab ${i}`)
    if (window.tabs[i].active) {
      // Selecting the prev tab.
      console.log(`going to tab ${i-1} `)
      wait(5)
      // chrome.tabs.update(window.tabs[i].id, {active: false});
      chrome.tabs.update(window.tabs[i-1].id, {active: true}, function(){
        console.log("finished backward!");
        wait(5)
        return;
      });
    }
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
