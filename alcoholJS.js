    document.querySelectorAll('.productbtns button').forEach(button => {
        button.addEventListener('click', () => 
            {
            alert('Added to cart!');
            });
        });

        const products = [
            { name: "Heineken", category: "beer", price: "$12.99/6pk", imageUrl: "https://images.albertsons-media.com/is/image/ABS/960085410-C1N1?$ng-ecom-pdp-mobile$&defaultImage=Not_Available" },
            { name: "Bud Light", category: "beer", price: "$6.99/6pk", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C1-_o8BzdziEJKQws3E6HKa0CwrnrvvgOw&s" },
            { name: "Apothic Red", category: "wine", price: "$13.49/750ml", imageUrl: "https://i5.walmartimages.com/seo/Apothic-Red-Blend-Wine-California-750ml-Glass-Bottle-13-5-ABV_1420908f-13d1-4e19-ab6c-c08329415f97.77a3c70670c9971d677945869ab9cef9.jpeg" },
            { name: "Barefoot White", category: "wine", price: "$6.99/750ml", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqjsC9_oxFLBd7x43oK9GdNNSGmgzliX-Ylw&s" },
            { name: "Jack Daniel's Whiskey", category: "spirits", price: "$16.99/750ml", imageUrl: "https://cwspirits.com/cdn/shop/files/jack-daniel-s-whiskey-750-ml-country-wine-and-spirits.png?v=1718355493" },
            { name: "Stoli Vodka", category: "spirits", price: "$15.99/750ml", imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQERMQEhIWEw8QGRgTFhUVEBAQFhgXFRcYFhURFhYYHSggGBomGxUWITEhJSkrLi4uGB8/ODMsNygtLisBCgoKDg0OGxAQGismHyAtKy03Ly0tLS0tLS0tLS4tLS0tLS0uLS0tMC0tNzUrLS0tMS01LTUxLS0wLTctNy0rLf/AABEIAOEA4QMBIgACEQEDEQH..." }
    ];

    // Get the search input and button
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');

    // Function to display products based on filtered search
    function displayProducts(filteredProducts) {
        const container = document.querySelector('.container');
        container.innerHTML = ""; 

        filteredProducts.forEach(product => {
            const productHTML = `
                <div class="category">
                    <div class="product">
                        <div class="image-placeholder">
                            <img src="${product.imageUrl}" alt="${product.name}">
                        </div>
                        <h3>${product.name}</h3>
                        <p class="price">${product.price}</p>
                        <div class="qyt">
                            <label for="quantity_${product.name.replace(/\s+/g, '')}">
                                Quantity:
                            </label>
                            <input type="number" id="quantity_${product.name.replace(/\s+/g, '')}" value="1">
                        </div>
                        <div class="productbtns">
                            <button>Add to Cart</button>
                            <button>Buy Now</button>
                        </div>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Filter products based on search input
    function filterProducts() {
        const query = searchInput.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        displayProducts(filteredProducts);
    }

    // Trigger search when clicking the search button
    searchButton.addEventListener('click', filterProducts);

    // Optional: Trigger search when typing in the search input
    searchInput.addEventListener('input', filterProducts);



    function validateForm() {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    
        if (email === "") {
            alert("Email is required");
            return false;
        } 
        else if (!emailPattern.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
    
        if (password === "") {
            alert("Password is required");
            return false;
        } 
    
        // AJAX call to the server to check credentials
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Successfully logged in') {
                alert('Successfully logged in');
                // Redirect to another page or perform other actions here
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Server error');
        });
    
        return false; // Prevent form submission
    }


    document.addEventListener('DOMContentLoaded', () => {
        const cartContainer = document.getElementById('cart-container');
        const cartItemsContainer = document.getElementById('cart-items');
        const totalAmountSpan = document.getElementById('total-amount');
    
        // Simulated cart items (in a real application, this would come from a server or local storage)
        let cartItems = [
            { id: 1, name: 'Heineken', price: 12.99, quantity: 1 },
            { id: 2, name: 'Bud Light', price: 6.99, quantity: 2 },
            { id: 3, name: 'Apothic Red', price: 13.49, quantity: 1 }
        ];
    
        function renderCart() {
            cartItemsContainer.innerHTML = ''; // Clear previous cart items
    
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity">
                    <button data-id="${item.id}" class="remove-item">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
    
            updateTotal();
        }
    
        function updateTotal() {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            totalAmountSpan.textContent = total.toFixed(2);
        }
    
        function updateQuantity(id, newQuantity) {
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = newQuantity;
                renderCart();
            }
        }
    
        function removeItem(id) {
            cartItems = cartItems.filter(item => item.id !== id);
            renderCart();
        }
    
        cartContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('item-quantity')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    updateQuantity(id, newQuantity);
                }
            }
        });
    
        cartContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                removeItem(id);
            }
        });
    
        renderCart(); // Initial render
    });