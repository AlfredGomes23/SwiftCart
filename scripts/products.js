const showCategory = () =>{
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then(data=>{
        const categoryContainer = document.getElementById("categoryContainer");
        data.forEach(category => {
            const li = document.createElement("li");
            li.innerHTML = `<li class="btn btn-outline">${category}</li>`
            categoryContainer.append(li);
        });
    })
};
const showProducts = api =>{
    fetch(api).then(res=>res.json()).then(data=>{
        const productContainer = document.getElementById("productContainer");
        productContainer.innerHTML="";
        data.forEach(product =>{
            const card = document.createElement("div");
            card.innerHTML =`<div class="card bg-base-100 w-96 shadow-sm mx-auto">
                <figure>
                    <img src="./assets/Fjallraven - Foldsack No. 1 Backpack,.jpg" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <p class="flex justify-between">
                        <span class="tag">Men's Clothing</span>
                        <span class="text-[#9ca2ac]"><i class="fa-solid fa-star text-[#fdc700]"></i>3.9(120)</span>
                    </p>
                    <h2 class="card-title h-14">Fjallraven - Foldsack No. 1 Backpack</h2>
                    <p>$199.5</p>
                    <div class="card-actions justify-around">
                        <button class="w-36 btn"><i class="fa-solid fa-eye"></i>Details</button>
                        <button class="w-36 btn btn-primary"><i class="fa-solid fa-cart-plus"></i>Add</button>
                    </div>
                </div>
            </div>`;
            productContainer.append(card);
        })
    })
}
showCategory();
showProducts("https://fakestoreapi.com/products");      