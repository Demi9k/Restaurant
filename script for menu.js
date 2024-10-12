// Enable or disable quantity and soup selection based on checkbox selection
document.querySelectorAll('.menu-item input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', function() {
        const foodType = checkbox.id.split('-')[0];  // Get the food type (eba, fufu, etc.)
        const quantityInput = document.getElementById(`quantity-${foodType}`);
        const soupSelect = document.getElementById(`soup-${foodType}`);

        quantityInput.disabled = !checkbox.checked;
        soupSelect.disabled = !checkbox.checked;

        if (!checkbox.checked) {
            quantityInput.value = 1;  // Reset quantity when deselected
            soupSelect.value = "egusi";  // Reset soup to default
        }
    });
});

document.getElementById('proceed-to-checkout').addEventListener('click', function () {
    const order = [];

    // Helper function to add items if selected
    const addItem = (checkboxId, quantityId, soupId, price, name) => {
        const isChecked = document.getElementById(checkboxId).checked;
        if (isChecked) {
            const quantity = parseInt(document.getElementById(quantityId).value);
            const selectedSoup = document.getElementById(soupId).value;
            order.push({ name, quantity, price, soup: selectedSoup });
        }
    };

    // Add selected items from Continental Foods (no soups)
    addItem('jollof-checkbox', 'quantity-jollof', null, 1600, 'Jollof Rice');
    addItem('fried-rice-checkbox', 'quantity-fried-rice', null, 1800, 'Nigerian Fried Rice');
    addItem('spaghetti-checkbox', 'quantity-spaghetti', null, 1600, 'Spaghetti');
    addItem('beans-checkbox', 'quantity-beans', null, 1500, 'Beans Porridge');
    addItem('yam-checkbox', 'quantity-yam', null, 2000, 'Yam and Eggs');

    // Add selected items from Traditional Foods with soups
    addItem('eba-checkbox', 'quantity-eba', 'soup-eba', 300, 'Eba');
    addItem('fufu-checkbox', 'quantity-fufu', 'soup-fufu', 200, 'Fufu');
    addItem('semolina-checkbox', 'quantity-semolina', 'soup-semolina', 300, 'Semolina');
    addItem('amala-checkbox', 'quantity-amala', 'soup-amala', 300, 'Amala');
    addItem('iyan-checkbox', 'quantity-iyan', 'soup-iyan', 400, 'Iyan (Pounded Yam)');

    // Get add-ons
    const meatQuantity = parseInt(document.getElementById('add-on-meat').value);
    if (meatQuantity > 0) {
        order.push({ name: "Meat", quantity: meatQuantity, price: 500 });
    }

    const fishQuantity = parseInt(document.getElementById('add-on-fish').value);
    if (fishQuantity > 0) {
        order.push({ name: "Fish", quantity: fishQuantity, price: 800 });
    }

    const eggQuantity = parseInt(document.getElementById('add-on-egg').value);
    if (eggQuantity > 0) {
        order.push({ name: "Boiled Eggs", quantity: eggQuantity, price: 100 });
    }

    // Save order to localStorage
    localStorage.setItem('order', JSON.stringify(order));

    // Redirect to checkout page
    window.location.href = 'checkout.html';
});
