window.onload = () => {
    try {
        // Simulate mouse hover
        const hoverButton = document.querySelector('div[data-e2e="user-more"]');
        hoverButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

        // Wait for the menu to appear
        setTimeout(() => {
            // Now click the actual block button
            const actualBlockButton = document.querySelector('div[aria-label="Block"]');
            if (actualBlockButton) {
                actualBlockButton.click();

                 // Wait for the confirmation modal to appear
                 setTimeout(() => {
                    const confirmBlockButton = document.querySelector('button[data-e2e="block-popup-block-btn"]');
                    if (confirmBlockButton) {
                        confirmBlockButton.click();
                        location.reload();
                    } else {
                        console.error('Confirmation block button not found');
                    }
                }, 500); // Adjust this timeout based on how quickly the modal appears
            } else {
                //console.error('Actual block button not found');
            }
        }, 500); // Adjust timeout as needed based on how quickly the menu appears
    } catch (error) {
        console.error('Error in handling the block action:', error);
    }
};
