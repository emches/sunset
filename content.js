$(document).ready(function () {
  console.log("READY")
  function submitTimer() {
    chrome.runtime.sendMessage({greeting: "GetURL"},
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
    console.log("timerSubmit", timerSubmit)
    timerSubmit.addEventListener('click', submitTimer);
  }

});
