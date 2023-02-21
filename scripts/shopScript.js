let cartItemsArray = []; //array to temporarily store cart items
let productArray = []; //array to store product details
let cartItemIds = []; //array to store only cart item IDs
let maxCartItemId = 0; //maxCartItemId to store the ID of the last item in the cart

/*
 pageLoad() function called when HTML body is loading to perform the following:
 - Populate productArray with products and their detail
 - Build HTML product table to display product images and detail
 - Get cart items if the cart exists
 - Attach click events to certain HTML elements using JQuery 
*/
function pageLoad() {
    
    populateProductsArray(); // Call Populate populateProductsArray() to populate productArray with products.
    loadProductTable(productArray); // Call loadProductTable() with productArray as a parameter to Build HTML product table to display product images and detail.

    // Check if "cartItems" exists in Local Storage
    if(localStorage.getItem("cartItems") === null) {

        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // set "cartItems" to the JSON converted cartItemsArray array.

    } else {
        // The below code is executed f "cartItems" exists in Local Storage
        cartItemsArray = JSON.parse(localStorage.getItem("cartItems")); // Get "cartItems" JSON object and populate the cartItemsArray array.
    }

    // Attach click event to HTML objects with productContainer class to show product detail modal
    $(".productContainer").click(function(event) {
        
        let selectedProductId = $(this).attr('id').split('_').pop(); // Extract Product ID from the selected HTML object's id attribute
        showProductDetailModal(selectedProductId); // Call showProductDetailModal() function and pass selectedProductId in order to build and show the productDetailModal modal

    });

    // Attach click event to HTML objects with btnAddToCart class to add selected product to cart
    $(".btnAddToCart").click(function(event){

        let selectedProductId = event.target.id.split('_').pop(); // Extract Product ID from the selected HTML object's id attribute
        addItemToCart(selectedProductId); // Call addItemToCart() function and pass selectedProductId in order to add product to the cart

    });

    // Attach click event to HTML object with btnProductDetailAddToCart id to add selected product to cart with specific quantity
    $("#btnProductDetailAddToCart").click(function(){

        let selectedProductId = $('#productModalProductId').text(); // Get Product ID from the hidden HTML object within modal
        let chosenQuantity = $("#txtEditCartItemQty").val(); // Get user's selected product quantity 
        
        addItemToCart(selectedProductId, parseInt(chosenQuantity)); // Call addItemToCart() function and pass selectedProductId and chosenQuantity in order to add product to the cart with a specific quantity
        $("#txtEditCartItemQty").val("1"); // Reset txtEditCartItemQty value to 1
        $('#productDetailModal').modal('toggle'); // Hide productDetailModal modal 
    });
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

// populateProductsArray() function to populate productArray with products
function populateProductsArray() {

    // Define new Product with necessary product detail and populate the productArray array
    productArray = [new Product(
        1,
        "Nike Men's shoe",
        "Some cool Description",
        "999",
        "Sneakers",
        "images/productImages/sneaker1.png"
    ),
    new Product(
        2,
        "Adidas Retropy",
        "Some cool Description",
        "1099",
        "Sneakers",
        "images/productImages/sneaker2.webp"
    ),
    new Product(
        3,
        "Puma Tech Mens",
        "Some cool Description",
        "1299",
        "Sneakers",
        "images/productImages/sneaker3.webp"
    ),
    new Product(
        4,
        "Black Heels",
        "Some cool Description",
        "699",
        "Heels",
        "images/productImages/heel1.jpg"
    ),
    new Product(
        5,
        "Low Block Heels",
        "Some cool Description",
        "999",
        "Heels",
        "images/productImages/heel2.jfif"
    ),
    new Product(
        6,
        "Closed Heels",
        "Some cool Description",
        "499",
        "Heels",
        "images/productImages/heel3.jpg"
    ),
    new Product(
        7,
        "Black Boots",
        "Some cool Description",
        "899",
        "Boots",
        "images/productImages/boot1.webp"
    ),
    new Product(
        8,
        "Ankle Boots",
        "Some cool Description",
        "659",
        "Boots",
        "images/productImages/boot2.webp"
    ),
    new Product(
        9,
        "Mens Boots",
        "Some cool Description",
        "779",
        "Boots",
        "images/productImages/boot3.webp"
    ),
    new Product(
        10,
        "Nike sneakers",
        "Some cool Description",
        "579",
        "Kids",
        "images/productImages/kids1.webp"
    ),
    new Product(
        11,
        "Chuck Taylor",
        "Some cool Description",
        "879",
        "Kids",
        "images/productImages/kids2.jpg"
    ),
    new Product(
        12,
        "Le Coq Sportif",
        "Some cool Description",
        "979",
        "Kids",
        "images/productImages/kids3.jpg"
    )];
}

// loadProductTable(array) function to Build HTML product table to display product images and detail
function loadProductTable(itemArray) {
    let sneakerCategoryHTML = document.getElementById("sneakerCategory"); // Get sneakerCategory HTML element
    let heelsCategoryHTML = document.getElementById("heelsCategory"); // Get heelsCategory HTML element
    let bootsCategoryHTML = document.getElementById("bootsCategory"); // Get bootsCategory HTML element
    let kidsCategoryHTML = document.getElementById("kidsCategory"); // Get kidsCategory HTML element

    // Define HTML for table definition with placeholders which will be replaced later on
    let productHTML = "<td>"
                    +"<div id='productContainer_{#PROD_ID#}' class='card productContainer'>"
                    +"<img class='img-fluid img-globalsize img-responsive mainProdImage' src='{#IMG_SRC#}' alt='{#PROD_NAME#}'>"
                    +"<h5>{#PROD_NAME#}</h5>"
                    +"<p class='price'>R {#UNIT_PRICE#}</p>"
                    +"</div>"
                    +"<button id='btnAddToCart_{#PROD_ID#}' class='btnAddToCart'>Add to Cart</button>"
                    +"</td>";

    // For Loop to iterate through the itemArray array
    for (let i = 0; i < itemArray.length; i++) {
        
        if (itemArray[i].category == "Sneakers") // check if category of current item in itemArray is equal to "Sneakers" 
        {
            // Replace placeholders with values from current item in itemArray array and append productHTML to sneakerCategoryHTML
            sneakerCategoryHTML.innerHTML += productHTML.replace("{#IMG_SRC#}", itemArray[i].imgPath).replaceAll("{#PROD_NAME#}", itemArray[i].productName).replace("{#UNIT_PRICE#}", itemArray[i].unitPrice).replaceAll("{#PROD_ID#}", itemArray[i].id);

        } 
        else if (itemArray[i].category == "Heels") // check if category of current item in itemArray is equal to "Heels"
        { 
            // Replace placeholders with values from current item in itemArray array and append productHTML to sneakerCategoryHTML
            heelsCategoryHTML.innerHTML += productHTML.replace("{#IMG_SRC#}", itemArray[i].imgPath).replaceAll("{#PROD_NAME#}", itemArray[i].productName).replace("{#UNIT_PRICE#}", itemArray[i].unitPrice).replaceAll("{#PROD_ID#}", itemArray[i].id);

        } 
        else if (itemArray[i].category == "Boots") // check if category of current item in itemArray is equal to "Boots"
        {
            // Replace placeholders with values from current item in itemArray array and append productHTML to sneakerCategoryHTML
            bootsCategoryHTML.innerHTML += productHTML.replace("{#IMG_SRC#}", itemArray[i].imgPath).replaceAll("{#PROD_NAME#}", itemArray[i].productName).replace("{#UNIT_PRICE#}", itemArray[i].unitPrice).replaceAll("{#PROD_ID#}", itemArray[i].id);

        } 
        else if (itemArray[i].category == "Kids") // check if category of current item in itemArray is equal to "Kids"
        {
            // Replace placeholders with values from current item in itemArray array and append productHTML to sneakerCategoryHTML
            kidsCategoryHTML.innerHTML += productHTML.replace("{#IMG_SRC#}", itemArray[i].imgPath).replaceAll("{#PROD_NAME#}", itemArray[i].productName).replace("{#UNIT_PRICE#}", itemArray[i].unitPrice).replaceAll("{#PROD_ID#}", itemArray[i].id);
        }
        
    }
    
}

// showProductDetailModal(number) function to Build HTML modal to display product image and detail
function showProductDetailModal(productId) {
    
    // For Loop to iterate through the productArray array
    for (let i = 0; i < productArray.length; i++) {
        // check if current item's id is equal to productId
        if (productArray[i].id == productId ) {
            $('#productModalProductId').text(productArray[i].id); // set text of productModalProductId HTML element to current item's id
            $('#productModalProductImage').attr('src', productArray[i].imgPath);// set src attribute of productModalProductImage HTML element to current item's imgPath
            $('#productModalProductName').text(productArray[i].productName);// set text of productModalProductName HTML element to current item's product name
            $('#productModalProductDescription').text(productArray[i].productDescription);// set text of productModalProductDescription HTML element to current item's product description
            $('#productModalProductPrice').text('R '+productArray[i].unitPrice);// set text of productModalProductPrice HTML element to current item's unit price
            $('#productDetailModal').modal('show'); // show HTML modal
            break; //break out of loop
        }
    }
}

// addItemToCart(number, number) function to add item to cart
function addItemToCart(productId, quantity = 1) {

    cartItemIds = []; // Set cartItemIds to empty array
    cartItemsArray = JSON.parse(localStorage.getItem("cartItems")); // get and convert "cartItems" from Local Storage and assign to cartItemsArray
    let itemExists = false; // Declare itemExists as false
    let currentTotal = 0; // Declare currentTotal as 0
    let itemToEdit = -1; // Declare itemToEdit as -1

    // Check if cartItemsArray array has any items in it
    if (cartItemsArray.length > 0) {

        // iterate through items in cartItemsArray array
        cartItemsArray.forEach(function(t) {
            cartItemIds.push(t.id); // Populate cartItemsIds array with id values from cartItemsArray array
        });
    }

    // Check if cartItemIds array has any items in it
    if (cartItemIds.length > 0) {
        maxCartItemId = Math.max(...cartItemIds); // Get maximum value from cartItemIds array and assign value to maxCartItemId
    }

    // iterate through items in cartItemsArray array
    for (let i = 0; i < cartItemsArray.length; i++) {

        //Check if current item's productId is equal to productId
        if (cartItemsArray[i].productId == productId ) {
            itemExists = true; // Set itemExists to true
            itemToEdit = i;
            break; //break out of loop
        }
    }

    // Check if itemExists is true
    if (itemExists == true) {

        cartItemsArray[itemToEdit].quantity += quantity; // Modify item's quantity
        localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // Set "cartItems" in Local Storage to JSON converted cartItemsArray        
    }

    else {

        // iterate through items in productArray array
        for (let i = 0; i < productArray.length; i++) {

            //Check if current item's id is equal to productId
            if (productArray[i].id == productId) {
                
                // Create new CartItems with relevant detail from productArray array
                let newCartItem = new CartItems(
                    id = maxCartItemId+1,
                    productId = productArray[i].id,
                    productName = productArray[i].productName,
                    quantity = quantity,
                    unitPrice = productArray[i].unitPrice,
                    imgPath = productArray[i].imgPath
                );

                cartItemsArray.push(newCartItem); // Add newCartItem to cartItemsArray array
                localStorage.setItem("cartItems", JSON.stringify(cartItemsArray)); // Set "cartItems" in Local Storage to JSON converted cartItemsArray
                break; //break out of loop
            }
        }
    }

    // iterate through items in cartItemsArray array
    for (let i = 0; i < cartItemsArray.length; i++) {
        currentTotal += cartItemsArray[i].quantity*cartItemsArray[i].unitPrice; // Multiply each cart item's quantity and unitprice and add it to currentTotal
    }

    alert("Your cart's current total is: R "+currentTotal); // Alert user to their cart's new total amount
    
}

// Constructor function for Products
function Product(id, productName, productDescription, unitPrice, category, imgPath) {
    this.id = id; // unique id for each product
    this.productName = productName; // name of product
    this.productDescription = productDescription; // description of product
    this.unitPrice = unitPrice; // price of product
    this.category = category; // product's category
    this.imgPath = imgPath; // file path to image of product
}

// Constructor function for Cart Items
function CartItems(id, productId, productName, quantity, unitPrice, imgPath) {
    this.id = id; // unique id for each cart item
    this.productId = productId; // id of product relating back to Product.id
    this.productName = productName; // name of product
    this.quantity = quantity; // quantity of product
    this.unitPrice = unitPrice; // price of product
    this.imgPath = imgPath; // file path to image of product
}