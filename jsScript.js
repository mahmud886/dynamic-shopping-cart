const incrementItemBtn1 = document.getElementById("incrementItem1");
incrementItemBtn1.addEventListener("click", function () {
    itemQuantityHandler("quantityOfItem1", "priceOfItem1", "increment");
})

const incrementItemBtn2 = document.getElementById("incrementItem2");
incrementItemBtn2.addEventListener("click", function () {
    itemQuantityHandler("quantityOfItem2", "priceOfItem2", "increment");
})

const decrementItemBtn1 = document.getElementById("decrementItem1");
decrementItemBtn1.addEventListener("click", function () {
    itemQuantityHandler("quantityOfItem1", "priceOfItem1", "decrement");
})

const decrementItemBtn2 = document.getElementById("decrementItem2");
decrementItemBtn2.addEventListener("click", function () {
    itemQuantityHandler("quantityOfItem2", "priceOfItem2", "decrement");
})

const itemDeleteBtn1 = document.getElementById("removeItem1");
itemDeleteBtn1.addEventListener("click", function () {
    RemoveItemFromCart("item1", "priceOfItem1")
})

const itemDeleteBtn2 = document.getElementById("removeItem2");
itemDeleteBtn2.addEventListener("click", function () {
    RemoveItemFromCart("item2", "priceOfItem2")
})

function itemQuantityHandler(itemQuantityId, itemPriceId, type) {
    const itemQuantity = document
        .getElementById(itemQuantityId)
        .value;
    const newItemQuantity = type == "increment"
        ? parseFloat(itemQuantity) + 1
        : parseFloat(itemQuantity) - 1;
    const itemPrice = document
        .getElementById(itemPriceId)
        .innerText;
    var itemPriceAmount = parseFloat(itemPrice);
    const itemOriginalPrice = itemPriceAmount / itemQuantity;

    if (newItemQuantity <= 1) {
        document
            .getElementById(itemQuantityId)
            .value = 1;
        document
            .getElementById(itemPriceId)
            .innerText = itemOriginalPrice;
    } else {
        document
            .getElementById(itemQuantityId)
            .value = newItemQuantity;
        const updatedPrice = itemOriginalPrice * newItemQuantity;
        document
            .getElementById(itemPriceId)
            .innerText = updatedPrice;

        if (itemQuantityId == "quantityOfItem1") {
            document
                .getElementById("invoice-item-price1")
                .innerText = itemOriginalPrice;
            document
                .getElementById("invoice-item-quantity1")
                .innerText = newItemQuantity;
            document
                .getElementById("invoice-item-total1")
                .innerText = updatedPrice;
        } else if (itemQuantityId == "quantityOfItem2") {
            document
                .getElementById("invoice-item-price2")
                .innerText = itemOriginalPrice;
            document
                .getElementById("invoice-item-quantity2")
                .innerText = newItemQuantity;
            document
                .getElementById("invoice-item-total2")
                .innerText = updatedPrice;
        }

    }
    updateTotal();
}

function updateTotal() {
    const priceOfItem1 = document
        .getElementById("priceOfItem1")
        .innerText;
    const priceOfItem2 = document
        .getElementById("priceOfItem2")
        .innerText;
    const getSubTotal = parseFloat(priceOfItem1) + parseFloat(priceOfItem2);
    document
        .getElementById('subtotal')
        .innerText = getSubTotal;
    const tax = getSubTotal * 2 / 100;

    document
        .getElementById('tax')
        .innerText = tax;
    document
        .getElementById('total')
        .innerText = getSubTotal + tax;
    document
        .getElementById("invoice-subtotal")
        .innerText = getSubTotal;
    document
        .getElementById("invoice-tax")
        .innerText = tax;
    document
        .getElementById("invoice-total")
        .innerText = getSubTotal + tax;

    if (getSubTotal < 1) {
        checkOutBtn.style.display = "none";
    }
}

function RemoveItemFromCart(itemId, ItemPriceId) {
    document
        .getElementById(itemId)
        .style
        .display = "none";
    document
        .getElementById(ItemPriceId)
        .innerText = 0;

    if (itemId == "item1") {
        document
            .getElementById("invoice-item1")
            .style
            .display = "none";
    } else if (itemId == "item2") {
        document
            .getElementById("invoice-item2")
            .style
            .display = "none";
    }
    updateTotal();
}

const checkOutBtn = document.getElementById('checkoutbtn');
checkOutBtn.addEventListener("click", function () {
    document
        .getElementById("deliverydetails")
        .classList
        .remove("d-none");
    document
        .getElementById("shoppingcart")
        .classList
        .add("d-none");
})

const deliveryDetailsForm = document.getElementById('deliveryDetailsForm');
deliveryDetailsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    document
        .getElementById("showCustomerName")
        .innerText = deliveryDetailsForm.customerName.value;
    document
        .getElementById("showCustomerPhone")
        .innerText = deliveryDetailsForm.customerPhone.value;
    document
        .getElementById("showCustomerEmail")
        .innerText = deliveryDetailsForm.customerEmail.value;
    document
        .getElementById("showCustomerAddress")
        .innerText = deliveryDetailsForm.customerAddress.value;

    document
        .getElementById("shoppingcart")
        .classList
        .add("d-none");
    document
        .getElementById("deliverydetails")
        .classList
        .add("d-none");
    document
        .getElementById("invoice")
        .classList
        .remove("d-none");
})
updateTotal();