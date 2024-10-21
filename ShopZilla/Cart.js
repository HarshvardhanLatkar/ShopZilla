document.addEventListener("DOMContentLoaded", () => {
    let cartContent = document.getElementById("cartContent");
    let totalPrice = document.getElementById("totalPrice");
    let products = JSON.parse(localStorage.getItem("cart")) || [];

    let output = "";
    let total = 0;

    if (products.length > 0) {
        console.log(products);
        products.forEach((product, index) => {
            total += product.price; 
            output += `
            <div id="box">
                <div id="details">
                    <h3>${index + 1}</h3> <!-- Display index starting from 1 -->
                    <img src="${product.images[0]}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <h5>$${product.price}</h5>
                    <button onclick="deleteItem(${index})">Delete</button> 
                </div>
            </div>
            `;
        });

        
        totalPrice.innerHTML = `Total Price: $${total.toFixed(2)}`;
    } else {
        output += `
        <div id="startshop">
            <h1>Your Cart is Empty!</h1>
            <h2><a href="Home.html">Start Shopping</a></h2>
        </div>
        `;
        totalPrice.innerHTML = "";
    }

    cartContent.innerHTML = output;
});

function deleteItem(index) {
    const cartList = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Item at index " + index + " removed");
    
    cartList.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartList));

    
    document.dispatchEvent(new Event('DOMContentLoaded')); 
}
