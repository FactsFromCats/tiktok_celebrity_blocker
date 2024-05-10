function fetchUserList() {
    const url = chrome.runtime.getURL('userList.json');  // Adjust if fetching from an external URL
    fetch(url)
        .then(response => response.json())
        .then(users => processUsersSequentially(users))
        .catch(error => console.error('Failed to fetch user list', error));
}

function processUsersSequentially(users) {
    const delayBetweenUsers = 100; // Delay in milliseconds

    users.reduce((promise, userUrl) => {
        return promise.then(() => {
            return openUserAndBlock(userUrl).then(() => {
                return new Promise(resolve => setTimeout(resolve, delayBetweenUsers));
            });
        });
    }, Promise.resolve());
}

function openUserAndBlock(userUrl) {
    return new Promise(resolve => {
        chrome.tabs.create({ url: userUrl }, tab => {
            setTimeout(() => {
                chrome.tabs.remove(tab.id, () => {
                    console.log(`Closed tab after blocking: ${userUrl}`);
                    resolve();
                });
            }, 5000); // Adjust based on necessary operation time
        });
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "startBlocking") {
        fetchUserList();
    }
});
