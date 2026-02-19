const showCategory = () =>{
    fetch("https://fakestoreapi.com/products/categories")
    .then(res=>res.json())
    .then(data=>{
        const categoryContainer = document.getElementById("categoryContainer");
        data.forEach(category => {
            const li = document.createElement("li");
            li.className = "btn btn-outline category";
            li.textContent = category;
            li.addEventListener("click", ()=>{
                document.querySelectorAll(".category").forEach(category => category.classList.remove("active"));
                li.classList.add("active");
                showProducts(`${category}`);
            })
            categoryContainer.append(li);
        });
    })
};
const showProducts = (category)  =>{
    let api ="";
    category === "all" ? api = "https://fakestoreapi.com/products" : api =`https://fakestoreapi.com/products/category/${category}`;
    console.log(api);
    fetch(api).then(res=>res.json()).then(data=>{
        const productContainer = document.getElementById("productContainer");
        productContainer.innerHTML="";
        data.forEach(c =>{
            const card = document.createElement("div");
            card.innerHTML = `<div class="card bg-base-100 w-96 shadow-sm mx-auto">
                <figure>
                    <img src="${c.image}" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <p class="flex justify-between">
                        <span class="tag">${c.category}</span>
                        <span class="text-[#9ca2ac]"><i class="fa-solid fa-star text-[#fdc700]"></i>${c.rating.rate}(${c.rating.count})</span>
                    </p>
                    <h2 class="card-title h-14">${c.title.length <=50 ? c.title : c.title.slice(0,50).concat("...")}</h2>
                    <p class="font-bold text-lg badge badge-outline badge-primary">$${c.price}</p>
                    <div class="card-actions justify-around">
                        <button class="w-36 btn" onclick="p_${c.id}.showModal()"><i
                                class="fa-solid fa-eye"></i>Details</button>
                        <button class="w-36 btn btn-primary" onclick="addToCart(${c.id}, '${c.title.replace(/'/g, "\\'")}', ${c.price}, '${c.image}')"><i class="fa-solid fa-cart-plus"></i>Add</button>
                    </div>
                    <!-- card modal here -->
                    <dialog id="p_${c.id}" class="modal modal-bottom sm:modal-middle">
                        <div class="modal-box">
                                <form method="dialog">
                                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <figure>
                                    <img src="${c.image}"
                                        alt="Shoes" />
                                </figure>
                                <div class="card-body">
                                    <p class="flex justify-between">
                                        <span class="tag">${c.category}</span>
                                        <span class="text-[#9ca2ac]"><i class="fa-solid fa-star text-[#fdc700]"></i>${c.rating.rate}(${c.rating.count})</span>
                                        <span class="font-bold text-lg badge badge-outline badge-error">$${c.price}</span>
                                    </p>
                                    <h2 class="card-title h-14">${c.title}</h2>
                                    <p>${c.description}</p>
                                    <button class="btn btn-primary mx-auto w-full" onclick="addToCart(${c.id}, '${c.title.replace(/'/g, "\\'")}', ${c.price}, '${c.image}')"><i class="fa-solid fa-cart-plus"></i>Add</button>
                                </div>
                        </div>
                </div>
                </dialog>
            </div>`;
            productContainer.append(card);
        })
    })
};
showCategory();
showProducts("all");  
const handleAllCategoryClick = (element, category) => {
    document.querySelectorAll(".category").forEach(category => category.classList.remove("active"));
    element.classList.add("active");
    showProducts(category);
};