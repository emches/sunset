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
      chrome.tabs.update(window.tabs[i+1].id, {active: true});
      return
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
      chrome.tabs.update(window.tabs[i-1].id, {active: true});

    }
  }
}

function handleTimer() {
  console.log("I WAS SUBMITTED")
  // const timer1 = parseInt(document.getElementById("tab1Time").value) * 1000;
  // const timer2 = parseInt(document.getElementById("tab2Time").value) * 1000;
    // console.log("element: ", document.getElementById("tab1Time"));
    // console.log("document: ", document);

  // console.log("timer 1: ", timer1);
  // console.log("timer 2: ", timer2);
  // $('#tab1Time').val("fgg");
  // $('#tab2Time').val("fgg");
  let timer1 = 2000
  let tabStartTime = new Date();

  while (Math.abs( new Date() - tabStartTime ) <= timer1){
    console.log(`waiting ${timer1}ms`);
  }

  chrome.windows.getLastFocused( {populate: true}, function (window)  {
      switchForward(window);

      const tabStartTime2 = new Date();
      let timer2 = 2000

      while (Math.abs( new Date() - tabStartTime2 ) <= timer2){
        console.log(`waiting ${timer2}ms`);
      }

      switchBackward(window);

      const debug = new Date();
      while (Math.abs( new Date() - debug ) <= 8000){
        console.log(`waiting ${timer2}ms`);
      }

  });



}

chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    if( request.greeting === "GetURL" ) {
      handleTimer();
      sendResponse("i worked!")
    }

})
