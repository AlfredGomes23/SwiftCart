const showTrending = () => {
    fetch("https://fakestoreapi.com/products")
    .then(res=>res.json()).then(data => {
        const cardContainer = document.getElementById("cardContainer");
        cardContainer.innerHTML="";
        data.sort((a,b)=> b.rating.rate-a.rating.rate);
        data.slice(0,3).forEach(c => {
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
                     <h2 class="card-title h-14">${c.title.length <= 50 ? c.title : c.title.slice(0, 50).concat("...")}</h2>
                    <p class="font-bold text-lg badge badge-outline badge-primary">$${c.price}</p>
                    <div class="card-actions justify-around">
                        <button class="w-36 btn" onclick="p_${c.id}.showModal()"><i
                                class="fa-solid fa-eye"></i>Details</button>
                        <button class="w-36 btn btn-primary"onclick="addToCart(${c.id}, '${c.title.replace(/'/g, "\\'")}', ${c.price}, '${c.image}')"><i class="fa-solid fa-cart-plus"></i>Add</button>
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
            cardContainer.append(card);            
        });
    })
};
showTrending();

const addToCart = (id, title, price, image) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existing = cart.find(item => item.id == id);
    if (existing){
        existing.quantity += 1;
    }else{
        cart.push({id, price, title, image, quantity:1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    toast.classList.remove("hidden");
    toast.classList.add("bg-success");
    toast.innerHTML = `<span  class='text-xl font-bold'>${title} added.</span>`;
    setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("bg-success");
    }, 1500);
};
const updateCartBadge = () =>{
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((total, item)=> total + item.quantity, 0);
    const total = cart.reduce((total, item)=> total +=(item.quantity*item.price), 0);
    const cartBadge = document.getElementById("indicator");
    if(cartBadge){
        cartBadge.innerHTML = count;
    }
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = `<li class="text-primary px-3">Total: <span class="badge badge-primary ml-10">$ ${total}</span></li>`;
    cart.forEach(item=>{
        const li = document.createElement("li");
        li.innerHTML = `<li class="grid grid-cols-3">
                    <div class="avatar w-full">
                        <div class="w-16 rounded">
                            <img src="${item.image}"
                                alt="Tailwind-CSS-Avatar-component" />
                        </div>
                    </div>
                    <div class="flex flex-col col-span-2">
                        <h2 class="flex justify-between">${item.title.slice(0,10).concat("...")}<i onclick="deleteFromCart(${item.id})" class="fa-solid fa-trash-can hover:text-error"></i></h2>
                        <p class="font-bold">$${item.price} x ${item.quantity}</p>
                    </div>                    
                </li>`;
        cartItems.append(li);
    })
    };
updateCartBadge();

const deleteFromCart= id => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    const toast = document.getElementById("toast");
    updateCartBadge()
    toast.classList.remove("hidden");
    toast.classList.add("bg-error");
    toast.innerHTML = "<span class='text-xl font-bold'>Item Deleted.</span>";
    setTimeout(() => {
        toast.classList.add("hidden");
        toast.classList.remove("bg-error");
    }, 1000);
}