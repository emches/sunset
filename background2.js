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

function handleTimer(tab1Time, tab2Time) {
  // console.log("element outside: ", document.getElementById("tab1Time"));
  console.log(`I was submitted with tab1Time of ${tab1Time}`);
  console.log(`I was submitted with tab2Time of ${tab2Time}`);

  // const timer1 = parseInt(document.getElementById("tab1Time").value) * 1000;
  // const timer2 = parseInt(document.getElementById("tab2Time").value) * 1000;
    // console.log("element: ", document.getElementById("tab1Time"));
    // console.log("document: ", document);

  // $('#tab1Time').val("fgg");
  // $('#tab2Time').val("fgg");


  chrome.windows.getLastFocused( {populate: true}, function (window)  {

      for (var i = 0; i < window.tabs.length; i++) {
      // Finding the selected tab.
        if (window.tabs[i].active) {
          // Selecting the next tab.
          // chrome.tabs.update(window.tabs[i].id, {active: false});
          console.log(`updating ${i+1} to active`);
          wait(tab1Time)
          chrome.tabs.update(window.tabs[i+1].id, {active: true, selected: true }, function(tab ){
            console.log("finished forward!", tab);
            chrome.windows.getLastFocused( {populate: true}, function (window)  {
              for (var i = 0; i < window.tabs.length; i++) {
              // Finding the selected tab.
                console.log(`checking tab ${i}`)
                if (window.tabs[i].active) {
                  // Selecting the prev tab.
                  console.log(`going to tab ${i-1} `)
                  wait(tab2Time)

                  // chrome.tabs.update(window.tabs[i].id, {active: false});
                  chrome.tabs.update(window.tabs[i-1].id, {active: true}, function(){
                    console.log("finished backward!");
                    return;
                  });

                }
              }

            });

          });
        }
      }


      const debug = new Date();
      while (Math.abs( new Date() - debug ) <= 8000){
        console.log(`waiting ${timer2}ms`);
      }

  });



}



chrome.runtime.onMessage.addListener( function(request,sender,sendResponse) {
    if( request.greeting === "GetURL" ) {
      handleTimer(request.tab1Time, request.tab2Time);
      sendResponse("i worked!")
    }

})
