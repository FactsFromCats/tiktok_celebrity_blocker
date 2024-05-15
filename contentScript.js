console.log("im lock and loaded");

const CB_TIMER = 500;
const CL_TIMER = 500;
const COB_TIMER = 500;
const CBB_TIMER = 500;
const CoBB_Timer = 500;
const CDB_Timer = 500;

// check if user is logged in
async function checkLogin() {
  return new Promise((resolve, reject) => {
    const CL = setInterval(() => {
      let links = document.querySelectorAll("a");

      if (links[0]) {
        let logged = true;

        for (let link of links) {
          let linkHref = link.getAttribute("href");
          let linkText = link.textContent.trim().toLowerCase();

          let bool =
            `${linkHref}`.includes("accounts/login/") ||
            `${linkHref}`.includes("accounts/emailsignup/");

          if (bool) {
            if (linkText === "log in" || linkText === "sign up") {
              logged = false;
              break;
            }
          }
        }

        clearInterval(CL);
        resolve(logged);
      }
    }, CL_TIMER);
  });
}

//check if user is already block
async function checkBlocked() {
  return new Promise((resolve, reject) => {
    const CB = setInterval(() => {
      let url = window.location.href;

      if (url.includes("tiktok.com")) {
        let blockedBtn;
        blockedBtn = document.querySelector('button[data-e2e="follow-button"]')?.textContent === "Unblock";
        if (blockedBtn) {
          clearInterval(CB);
          resolve("blocked");
        } else {
          clearInterval(CB);
          resolve("not blocked");
        }
      } else if (url.includes("instagram.com")) {
        let div = document.querySelector(
          'div[class="x6s0dn4 x78zum5 x1q0g3np xs83m0k xeuugli x1n2onr6"]'
        );

        if (div) {
          const btns = div.querySelectorAll("button");
          let blockedBtn;
          for (let btn of btns) {
            if (btn.textContent.trim() === "Unblock") {
              blockedBtn = btn;
              break;
            }
          }

          if (blockedBtn) {
            clearInterval(CB);

            resolve("blocked");
          } else if (div && !blockedBtn) {
            clearInterval(CB);
            resolve("not blocked");
          }
        }
      }
    }, CB_TIMER);
  });
}

// click option button
async function clickOptionBtn() {
  return new Promise((resolve, reject) => {
    const COB = setInterval(() => {
      let url = window.location.href;
      if (url.includes("instagram.com")) {
        let optionsButton = document.querySelector(
          'div[class="x1i10hfl x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x1ypdohk x78zum5 xl56j7k x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xcdnw81"]'
        );
        if (optionsButton) {
          optionsButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          clearInterval(COB);
          resolve();
        }
      } else if (url.includes("tiktok.com")) {
        let optionsButton = document.querySelector(
          'div[class="css-usq6rj-DivMoreActions ee7zj8d10"]'
        );
        if (optionsButton) {
          optionsButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          clearInterval(COB);
          resolve();
        }
      }
    }, COB_TIMER);
  });
}

// click block button
async function clickBlockBtn() {
  return new Promise((resolve, reject) => {
    const CBB = setInterval(() => {
      let url = window.location.href;
      if (url.includes("instagram.com")) {

        let div = document.querySelector(
          `div[class="x7r02ix xf1ldfh x131esax xdajt7p xxfnqb6 xb88tzc xw2csxc x1odjw0f x5fp0pe"]`
        );
        if (div) {
          const btns = div.querySelectorAll("button");
          let firstButton;

          for (let btn of btns) {
            if (btn.textContent.trim() === "Block") {
              firstButton = btn;
              break;
            }
          }

          if (firstButton) {
            firstButton.click();
            clearInterval(CBB);
            resolve();
          }
        }
      } else if (url.includes("tiktok.com")) {
        console.log('TikTok block button');
        let div = document.querySelector(
          `div[aria-label="Block"]`
        );
        console.log(div);
        if (div) {
          console.log('clicking block button');
          div.click();
          clearInterval(CBB);
          resolve();          
        }
      }        
    }, CBB_TIMER);
  });
}

// click the second block button to confirm it
async function clickConfirmBlockBtn() {
  return new Promise((resolve, reject) => {
    const CoBB = setInterval(() => {

      let url = window.location.href;
      if (url.includes("instagram.com")) {
        let div = document.querySelector('div[class="x78zum5 xdt5ytf xl56j7k"]');

        if (div) {
          const btns = div.querySelectorAll("button");
          let confirmBlockButton;
          for (let btn of btns) {
            if (btn.textContent.trim() === "Block") {
              confirmBlockButton = btn;
              break;
            }
          }

          if (confirmBlockButton) {
            confirmBlockButton.click();
            clearInterval(CoBB);
            resolve();
          }
        }
      } else if (url.includes("tiktok.com")) {
        const confirmBlockButton = document.querySelector('button[data-e2e="block-popup-block-btn"]');
        if (confirmBlockButton) {
            console.log('clicking confirm block button');
            confirmBlockButton.click();
            clearInterval(CoBB);
            resolve();
          
        } else {
            console.error('Confirmation block button not found');
        }
        console.log('TikTok confirm block button done');      

      }
    }, CoBB_Timer);
  });
}

async function clickDismissBtn() {
  return new Promise((resolve, reject) => {
    const CDB = setInterval(() => {
      let url = window.location.href;
      if (url.includes("instagram.com")) {
        let div = document.querySelector('div[class="x78zum5 xdt5ytf xl56j7k"]');

        if (div) {
          const btns = div.querySelectorAll("button");
          let dismissBtn;
          for (let btn of btns) {
            if (btn.textContent.trim() === "Dismiss") {
              dismissBtn = btn;
              break;
            }
          }

          if (dismissBtn) {
            clearInterval(CDB);
            resolve("proceed");
          }
        }
      } else if (url.includes("tiktok.com")) {
        clearInterval(CDB);
        resolve("proceed");
      }
    }, CDB_Timer);
  });
}

//Send message to background script
async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: message }, () => {
      resolve();
    });
  });
}

async function waitASecond(sec = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
}

async function waitRandomSeconds(min = 1, max = 2) {
  const seconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

(async function () {
  try {
    
    let url = window.location.href;
    console.log(url);
    
    // await waitASecond(1);
    /* const logged = await checkLogin();
    console.log(logged);
    if (!logged) {
      sendMessage("abort");
      alert(
        "IG blocker: Please log in to your account in order to block users"
      );
      return;
    }
    */
    const blockedState = await checkBlocked();
    if (blockedState === "blocked") {
      await waitRandomSeconds(); 
      await sendMessage("proceed");
      return;
    }

    await clickOptionBtn();
    await waitRandomSeconds(); 
    await clickBlockBtn();
    await waitRandomSeconds(); 
    await clickConfirmBlockBtn();
    await waitRandomSeconds(); 
    const message = await clickDismissBtn();
    await waitRandomSeconds(); 
    await sendMessage(message);
   
  } catch (error) {
    console.error("Error in handling the block action:", error);
  }
})();
