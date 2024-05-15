let STATE = "resolve";
let blockCount = 0;
let currentIndex = 0;

async function fetchUserList() {
  const url = await chrome.runtime.getURL("blockList.json"); // Adjust if fetching from an external URL
  const response = await fetch(url);
  const users = await response.json();
  processUsersSequentially(users);
}

async function processUsersSequentially(users) {
  for (let i = currentIndex; i < users.length; i++) {
    if (STATE === "resolve") {
      await openUserAndBlock(users[i]);
      blockCount++;
      currentIndex = i + 1;
      chrome.storage.local.set({ blockCount, currentIndex });
    } else {
      break;
    }
  }
}

async function openUserAndBlock(userUrl) {
  console.log("*******************************************");
  return new Promise((resolve, reject) => {
    chrome.tabs.create({ url: userUrl }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
        if (updatedTabId === tab.id && changeInfo.status === "complete") {
          // Once the tab is fully loaded, inject the content script
          chrome.tabs.onUpdated.removeListener(listener);

          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id, allFrames: true },
              files: ["contentScript.js"],
            },
            () => {
              console.log("Content script injected successfully!");
              resolve();
            }
          );
        }
      });

      chrome.tabs.onRemoved.addListener(function removeListener(closedTabId, removeInfo) {
        if (closedTabId === tab.id) {
          // If the tab is closed, stop further processing
          chrome.tabs.onRemoved.removeListener(removeListener);
          STATE = "reject";
          reject(new Error("Tab closed"));
        }
      });
    });
  });
}

chrome.runtime.onMessage.addListener(onMessage);
function onMessage(message, sender, sendResponse) {
  if (message.action === "proceed") {
    const tabId = sender.tab.id;
    STATE = "resolve";
    chrome.tabs.remove(tabId, () => {});
  } else if (message.action === "abort") {
    STATE = "reject";
  }
  return undefined;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startBlocking") {
    STATE = "resolve";
    chrome.storage.local.get(['blockCount', 'currentIndex'], (result) => {
      blockCount = result.blockCount || 0;
      currentIndex = result.currentIndex || 0;
      fetchUserList().catch((error) => console.error("Failed to fetch user list", error));
    });
  }
});

async function onInstalled(details) {
  if (details.reason === "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("welcome.html") });
    // Initialize state, index, and blockCount
    chrome.storage.local.set({ state: "resolve", blockCount: 0, currentIndex: 0 });
  }
}

// Show welcome page when the user installs for the first time
chrome.runtime.onInstalled.addListener(onInstalled);