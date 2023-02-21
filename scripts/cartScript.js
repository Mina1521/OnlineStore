let cartItemsArray = [];

/*
 pageLoad() function called when HTML body is loading to perform the following:
 - Get cart items if the cart exists
 - Populate cartItemsArray with cart items
 - Build HTML shopping cart table to display cart items
 - Attach click events to certain HTML elements using JQuery 
*/
function pageLoad() {
    
    // Check if "cartItems" exists in Local Storage
    if(localStorage.getItem("cartItems") === null) {

        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // set "cartItems" to the JSON converted cartItemsArray array.

    } else {

        cartItemsArray = JSON.parse(localStorage.getItem("cartItems")); // Get "cartItems" JSON object and populate the cartItemsArray array.

        // Check if cartItemsArray has any items
        if (cartItemsArray.length > 0) {

            // Call loadCartTable(array) function to build and display the HTML shopping cart
            loadCartTable(cartItemsArray);

            // Attach change event on HTML elements with btnEditCartItemQty class
            $(".btnEditCartItemQty").change(function(event){

                let selectedCartItemId = event.target.id.split('_').pop(); // Extract Cart item ID from the selected HTML object's id attribute
                let selectedCartItemQuantity = event.target.value; // Set selectedCartItemQuantity equal to the selected HTML object's value 
                
                // Call editCartItem(number, number) function to change the quantity of the chosen cart item
                editCartItem(selectedCartItemId, selectedCartItemQuantity); 

            });

            // Attach click event on HTML elements with btnRemoveCartItem class
            $(".btnRemoveCartItem").click(function(event){

                let selectedCartItemId = event.target.id.split('_').pop(); // Extract Cart item ID from the selected HTML object's id attribute

                // Call removeCartItem(number) function to remove the selected cart item from the shopping cart
                removeCartItem(selectedCartItemId);
            });

            // Attach click event on btnApplyCoupon HTML element
            $("#btnApplyCoupon").click(function(){

                let couponCode = $("#txtCouponCode").val(); // Get value from txtCouponCode HTML element and assign value to couponCode
                let netPrice; // Declare netPrice with no value
                let totalPurchasePrice; // Declare totalPurchasePrice with no value
                let vatAmount; // Declare vatAmount with no value

                // Check if couponCode has a value
                if (couponCode) {
                    netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                    vatAmount = ((netPrice - (netPrice * 0.1))*0.15); // Calculate VAT amount of items in cart
                    
                    $("#discountAmount").text("-R "+ (netPrice * 0.1).toFixed(2)); // Set discountAmount HTML element text

                    $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text

                    totalPurchasePrice = ((netPrice - (netPrice * 0.1)) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                    $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text

                } else {
                    netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                    vatAmount = ((netPrice)*0.15); // Calculate VAT amount of items in cart
                    
                    $("#discountAmount").text("-R 0.00"); // Set discountAmount HTML element text

                    $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text

                    totalPurchasePrice = ((netPrice) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                    $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                }
            });

            // Attach change event on radio button HTML element
            $('input[type=radio][name=optradio]').change(function() {
                let couponCode = $("#txtCouponCode").val(); // Get value from txtCouponCode HTML element and assign value to couponCode
                let netPrice; // Declare netPrice with no value
                let totalPurchasePrice; // Declare totalPurchasePrice with no value
                let vatAmount; // Declare vatAmount with no value

                // Check if selected value is "courier1"
                if (this.value == 'courier1') {
                    let courierAmount = 399; // Declare courierAmount and set value to 399

                    // Check if couponCode has a value
                    if (couponCode) {

                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = (((netPrice+courierAmount) - (netPrice * 0.1))*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R "+ (netPrice * 0.1).toFixed(2)); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = (((netPrice+courierAmount) - (netPrice * 0.1)) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    } else {
                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = ((netPrice+courierAmount)*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R 0.00"); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = ((netPrice+courierAmount) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    }
                }
                else if (this.value == 'courier2') // Check if selected value is "courier2"
                {
                    let courierAmount = 699; // Declare courierAmount and set value to 399

                    // Check if couponCode has a value
                    if (couponCode) {

                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = (((netPrice+courierAmount) - (netPrice * 0.1))*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R "+ (netPrice * 0.1).toFixed(2)); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = (((netPrice+courierAmount) - (netPrice * 0.1)) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    } else {
                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = ((netPrice+courierAmount)*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R 0.00"); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = ((netPrice+courierAmount) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    }
                }else {
                    let courierAmount = 0; // Declare courierAmount and set value to 0

                    // Check if couponCode has a value
                    if (couponCode) {
                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = (((netPrice+courierAmount) - (netPrice * 0.1))*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R "+ (netPrice * 0.1).toFixed(2)); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = (((netPrice+courierAmount) - (netPrice * 0.1)) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    } else {
                        netPrice = parseFloat($("#netPrice").text().split(' ').pop()); // Extract price from netPrice HTML element
                        vatAmount = ((netPrice+courierAmount)*0.15); // Calculate VAT amount of items in cart
                        
                        $("#discountAmount").text("-R 0.00"); // Set discountAmount HTML element text
    
                        $("#vatAmount").text("R " + vatAmount.toFixed(2)); // Set vatAmount HTML element text
    
                        totalPurchasePrice = ((netPrice+courierAmount) + vatAmount).toFixed(2); // Calculate total price of shopping cart items
                        $("#totalPurchasePrice").text("R " + totalPurchasePrice); // Set totalPurchasePrice HTML element text
                    }
                }
            });

            // Attach click event on btnConfirmOrder HTML element
            $("#btnConfirmOrder").click(function(){

                cartItemsArray = []; // Set cartItemsArray array to empty array
                localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // set "cartItems" to the JSON converted cartItemsArray array.

                alert("Your order was successful\nHere is your reference code " + generate(6)); // Alert user that their order was successful and display random 6 character reference code
                pageLoad(); // Call pageLoad() function to refresh contents of page
            });
        } else {
            $("#cartPageContent").hide(); // Hide cartPageContent HTML element
        }
    }
}

// Jquery function to animate logoImg image on page load
$(function(){
    $("#logoImg").animate({height: "100px"}).animate({height: "200px"}); // animate logoImg image changing height property to 100px then to 200px
});

// Jquery function to build an accordion type menu on page load
$(function(){
    
    // Build accordion menu and attach 'mouseenter' event to each menu item and trigger dropdown function
    let Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;
 
		let items = this.el.find('.item');
		items.on('mouseenter', {el: this.el, multiple: this.multiple}, this.dropdown)
	}
 
    // Define dropdown prototype function to slide menu item up or down depending on the current state of menu item
	Accordion.prototype.dropdown = function(e) {
		let $el = e.data.el;
			$this = $(this),
			$next = $this.next();
 
		$next.slideToggle();
		$this.parent().toggleClass('open');
 
		if (!e.data.multiple) {
			$el.find('.subItems').not($next).slideUp().parent().removeClass('open');
		};
	}	
    
    // Give #accordion HTML element the Accordion definition
	let accordion = new Accordion($('#accordion'), false);
});

// loadCartTable(array) function to Build HTML cart table to shopping cart items
function loadCartTable(itemArray) {
    
    $("#cartTableBody").empty(); // Clear the cartTableBody HTML element's content
    let cartTableBodyHTML = document.getElementById("cartTableBody"); // Get cartTableBody HTML element and assign it to cartTableBodyHTML
    let totalExVat = 0; // Declare totalExVat and set value to 0
    
    // Define HTML for table row with placeholders which will be replaced later on
    let cartItemHTML = "<tr>"
                     + "<td>"
                     + "<div class='product'>"
                     + "<img src='{#IMG_SRC#}' alt='{#PROD_NAME#}'>"
                     + "<p>{#PROD_NAME#}</p>"
                     + "</div>"
                     + "</td>"
                     + "<td><input id='btnEditCartItemQty_{#CART_ID#}' type='number' class='form-control btnEditCartItemQty' value='{#QTY#}'></td>"
                     + "<td><p>R {#UNIT_PRICE#}</p></td>"
                     + "<td><p>R {#TOTAL#}</p></td>"
                     + "<td><button id='btnRemoveCartItem_{#CART_ID#}' class='btn btn-danger btnRemoveCartItem'><span class='fa fa-trash'></span></button></td>"
                     + "</tr>";

    // For Loop to iterate through the itemArray array
    for (let i = 0; i < itemArray.length; i++) {

        let exVatUnitPrice = itemArray[i].unitPrice / 1.15; // Get current item's price and remove VAT then assign value to exVatUnitPrice
        totalExVat += exVatUnitPrice * itemArray[i].quantity; // Calculate total price excluding VAT and add value to totalExVat

        // Replace placeholders with values from current item in itemArray array and append cartItemHTML to cartTableBodyHTML
        cartTableBodyHTML.innerHTML += cartItemHTML.replace("{#IMG_SRC#}", itemArray[i].imgPath).replaceAll("{#PROD_NAME#}", itemArray[i].productName).replace("{#QTY#}", itemArray[i].quantity).replace("{#UNIT_PRICE#}", (exVatUnitPrice).toFixed(2)).replace("{#TOTAL#}", (itemArray[i].quantity*exVatUnitPrice).toFixed(2)).replaceAll("{#CART_ID#}", itemArray[i].id);
    
    }

    $("#netPrice").text("R "+totalExVat.toFixed(2)); // Set text of netPrice HTML element
    $("#vatAmount").text("R "+(totalExVat*0.15).toFixed(2)); // Set text of vatAmount HTML element
    $("#discountAmount").text("-R 0.00"); // Set text of discountAmount HTML element
    $("#totalPurchasePrice").text("R "+(totalExVat*1.15).toFixed(2)); // Set text of totalPurchasePrice HTML element
}

// editCartItem(number, number) function to edit selected cart item
function editCartItem(cartItemId, quantity) {

    
    cartItemsArray = JSON.parse(localStorage.getItem("cartItems")); // get and convert "cartItems" from Local Storage and assign to cartItemsArray

    // iterate through items in cartItemsArray array
    for (let i = 0; i < cartItemsArray.length; i++) {

        //Check if current item's id is equal to cartItemId
        if (cartItemsArray[i].id == cartItemId ) {
            cartItemsArray[i].quantity = quantity; // Modify item's quantity
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // Set "cartItems" in Local Storage to JSON converted cartItemsArray
            break; //break out of loop
        }
    }

    pageLoad(); // Call pageLoad() function to refresh contents of page
}

// removeCartItem(number) function to remove selected cart item from cart
function removeCartItem(cartItemId) {

    
    cartItemsArray = JSON.parse(localStorage.getItem("cartItems")); // get and convert "cartItems" from Local Storage and assign to cartItemsArray

    // iterate through items in cartItemsArray array
    for (let i = 0; i < cartItemsArray.length; i++) {

        //Check if current item's id is equal to cartItemId
        if (cartItemsArray[i].id == cartItemId ) {
            cartItemsArray.splice(i, 1); // Remove item from cartItemsArray array
            localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // Set "cartItems" in Local Storage to JSON converted cartItemsArray
            break; //break out of loop
        }
    }

    pageLoad(); // Call pageLoad() function to refresh contents of page
}

// generate(number) function to generate random alphanumeric string
function generate(length) {
    let result = ''; // Declare result and set value to empty string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Declare characters and set value to ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
    const charactersLength = characters.length; // Declare charactersLength and set value to the length of characters
    let counter = 0; // Declare counter and set value to 0

    // while loop iterating as long as counter is less than length
    while (counter < length) {

      result += characters.charAt(Math.floor(Math.random() * charactersLength)); // Get random character from characters and append to result
      counter += 1; // increment counter by 1
    }
    return result; 
}