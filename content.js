$(document).ready(function () {
  console.log("READY")
  function submitTimer() {
    let tab1Time = document.getElementById('tab1Time').value;
    let tab2Time = document.getElementById('tab2Time').value;

    console.log(`tab1Time is ${tab1Time}`);
    console.log(`tab2Time is ${tab2Time}`);

    chrome.runtime.sendMessage({greeting: "GetURL", tab1Time: tab1Time, tab2Time: tab2Time},
          function (response) {
              console.log("done", response)
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
    tab2Time
    console.log("timerSubmit", timerSubmit)
    timerSubmit.addEventListener('click', submitTimer);
  }

});
