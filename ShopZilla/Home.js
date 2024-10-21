let products = [];

function fetchData() {
    fetch("https://dummyjson.com/products")
        .then((val) => val.json())
        .then((res) => {
            console.log(res);
            products = res.products;
            console.log(products);
            localStorage.setItem("products", JSON.stringify(products));
            fetchProduct(products);
        });
}

function fetchProduct(products) {
    let productHTML = "";
    products.forEach((data) => {
        let fullStar = Math.floor(data.rating);
        let emptyStar = 5 - fullStar;

        let stars = "";
        for (let i = 0; i < fullStar; i++) {
            stars += "★";
        }
        for (let i = 0; i < emptyStar; i++) {
            stars += "☆";
        }

        productHTML += `
        <div id="box">
            <img src="${data.thumbnail}" alt="${data.title}">
            
            <div id="details">
                <h3>${data.title}</h3>
                <h4>Brand - ${data.brand}</h4>
                <h5>Price - $${data.price}</h5>
                <h5>Rating - ${stars}</h5>
            </div>
            
            <div id="box-button">
                <button onclick="viewMore(${data.id})">View More</button>
                <button class="add-to-cart" data-product='${JSON.stringify(data)}'><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
        `;
    });

    document.getElementById("root").innerHTML = productHTML;


    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (event) => {
            let productData = JSON.parse(event.currentTarget.getAttribute('data-product'));
            addtocart(productData);
        });
    });
}

function SearchProduct(search) {
    let search_itm = search.target.value.toLowerCase();

    let FilteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search_itm) ||
        product.category.toLowerCase().includes(search_itm)
    );

    fetchProduct(FilteredProducts);
}

document.getElementById("search").addEventListener("input", SearchProduct);

function viewMore(productId) {
    localStorage.setItem("selectedProductId", productId);
    window.location.href = "./ViewMore.html";
}

function addtocart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added To Cart");
}

// Fetch initial data
fetchData();
