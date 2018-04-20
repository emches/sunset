$(document).ready(function () {
  console.log("READY")

  function stopTimer(){
    chrome.runtime.sendMessage({greeting: "Stop"},
          function (response) {
              console.log("done", response)
          });
  }
  function submitTimer() {
    let nyc1Time = document.getElementById('nyc1Time').value;
    let nyc2Time = document.getElementById('nyc2Time').value;
    let turkey1Time = document.getElementById('turkey1Time').value;
    let turkey2Time = document.getElementById('turkey2Time').value;
    let tabTimes = [
      { timeStart: nyc1Time, timeEnd: nyc2Time, url: "https://home.nest.com/camera/e97d9aad69014fbe8fc15c74194d37f4" },
      { timeStart: turkey1Time, timeEnd: turkey2Time, url: "https://home.nest.com/camera/5a459c1c6b1b401c95e9aaaa18fa8cf6" }

    ];

    chrome.runtime.sendMessage({greeting: "GetURL", tabTimes: tabTimes},
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
    var timerStop = document.getElementById('timer-stop');

    console.log("timerSubmit", timerSubmit)
    timerSubmit.addEventListener('click', submitTimer);
    timerStop.addEventListener('click', stopTimer);

  }

});
