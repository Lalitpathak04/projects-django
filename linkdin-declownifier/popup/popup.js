function getClownCount(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            const clownedPosts = document.querySelectorAll('.clowned').length;
            const clownedProfiles = document.querySelectorAll('.clowned-profile').length;
            return clownedPosts + clownedProfiles;
          }
        },
        (results) => {
          const count = results[0].result;
          callback(count);
        }
      );
    });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const status = document.getElementById("status");
    const meter = document.getElementById("clown-meter");
  
    getClownCount((count) => {
      if (count === 0) {
        status.innerText = "Clean... for now.";
        meter.innerHTML = "Clown Meter: 0/5";
      } else {
        status.innerText = `Uh-oh, ${count} clown${count > 1 ? 's' : ''} spotted.`;
        meter.innerHTML = "Clown Meter: " + " clown ".repeat(count).trim();
      }
    });
  });

  