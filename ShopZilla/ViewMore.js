document.addEventListener("DOMContentLoaded",()=>{
    let products = JSON.parse(localStorage.getItem("products"))
    let productDetails = document.getElementById("productDetails")
    let selectedProductId = localStorage.getItem("selectedProductId")
    console.log(products);

    if(products && selectedProductId){
        let selectedProduct = products.find(
            (product) => product.id == selectedProductId
        );
        if (selectedProduct) {
            console.log(selectedProduct);

            //Discount
            let discount = Math.ceil((selectedProduct.price * selectedProduct.discountPercentage) / 100);
            //Rating
            let fullStar = Math.floor(selectedProduct.rating);
            let emptyStar = 5 - fullStar;
            
            let stars = "";
            for (let i = 0; i < fullStar; i++) {
                stars += '<i class="fa-solid fa-star star-color"></i>';
            }
            for (let i = 0; i < emptyStar; i++) {
                stars += '<i class="fa-regular fa-star star-color"></i>';
            }
            //Reviews
            let reviews = "";
            selectedProduct.reviews.forEach((review) => {
                // Format the date
                let formattedDate = new Date(review.date).toLocaleDateString(); 
                //review-ratings
                let fullStar = Math.floor(review.rating);
                let emptyStar = 5 - fullStar;
            
                let stars = "";
                for (let i = 0; i < fullStar; i++) {
                    stars += '<i class="fa-solid fa-star star-color"></i>';
                }
                for (let i = 0; i < emptyStar; i++) {
                    stars += '<i class="fa-regular fa-star star-color"></i>';
                }
                reviews += `
                    <div class="review">
                    <img src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png">
                        <h3>${review.reviewerName}</h3>
                        <p> ${stars} </p>
                        <p>${review.comment}</p>
                        <p><strong>Date:</strong> ${formattedDate}</p>
                    </div>
                `;
            });

            productDetails.innerHTML = `
            <main id="main">
                <div id="main_details">
                    <div id="prod_img">
                        <img src="${selectedProduct.images[0]}">
                    </div>
                    <div id="prod_details">
                        <h1>${selectedProduct.title}</h1>
                        <h2>Brand - ${selectedProduct.brand}</h2>
                        <h3>$${selectedProduct.price}</h3>
                        <p>Pay on RazorPay and get a Discount of <span style="color: red;">$${discount}</span></p>
                        <p>${selectedProduct.description}</p>
                        <h5>Rating - ${stars}</h5>
                        <h5>Availability Status - ${selectedProduct.availabilityStatus}, Only ${selectedProduct.stock} available</h5>
                        <h4>Minimum Order Quantity - ${selectedProduct.minimumOrderQuantity}</h4>
                        <h6>This Product has <span style="color: #FF4500;">${selectedProduct.warrantyInformation}</span> with <span style="color: #FF4500;">${selectedProduct.returnPolicy}</span></h6>
                        
                        <button id="Add_to_Cart">Add To Cart</button>
                        <h2>Reviews</h2>
                        <div id="main_reviews">
                            ${reviews}
                        </div>
                    </div>
                    
                </div>
                
            </main>
            `;

            document .getElementById("Add_to_Cart").addEventListener("click",()=>{
                addtocart(selectedProduct)
            })

           

           
            
        }else{
            productDetails.innerHTML="<h1>Product Not Found</h1>"}
        
    }else{
        productDetails.innerHTML="<h1> Not Product Selected</h1>"}



function addtocart(product) {
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
 
       cart.push(product)
       localStorage.setItem("cart",JSON.stringify(cart))
       alert("Added To Cart")

}

})



