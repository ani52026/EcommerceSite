import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProductFromLS";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";
//api gives all items

//it gives the cards stored in localStorage
//selected by user to add to cart
let cardProducts=getCartProductFromLS();

//we will campare the id of localStorage items to api
//which one present in both then retrieve its all details from api 
//tp display on screen 
//bcoz local storage stores only id,stock and price
//we have to filter selected values then use filter(),map(),includes(),some()
// according to condition use it

let filterProducts=products.filter((curProd)=>{
      console.log(curProd.id); //gets all ids from api
      return cardProducts.some((curElem)=> curElem.id===curProd.id); 
});

console.log(filterProducts);

const cartElement=document.querySelector("#productCartContainer"); //wehave to push cards
//using template class
const templateContainer=document.querySelector("#productCartTemplate");


const showCartProduct=()=>{
    filterProducts.forEach((curProd)=>{
        const {category, id, image, name, price, stock } =curProd;
        let productClone=document.importNode(templateContainer.content,true);

   //method to get quantity &price from localStoage
        const lSActualData=fetchQuantityFromCartLS(id,price);

        productClone.querySelector("#cardValue").setAttribute("id",`card${id}`);
        productClone.querySelector(".category").textContent=category;

        productClone.querySelector(".productName").textContent=name;
        productClone.querySelector(".productImage").src=image;


        // it gives price A/Q to api but we want price and quantity from 
        //localStorage
        // productClone.querySelector(".productPrice").textContent=price;

        productClone.querySelector(".productQuantity").textContent=lSActualData.quantity;
        productClone.querySelector(".productPrice").textContent=lSActualData.price;




        //handle increment and decrement button
        productClone.querySelector(".stockElement").addEventListener(("click"),(event)=>{
            incrementDecrement(event,id,stock,price);
        })

        //Event for remove button
        productClone.querySelector(".remove-to-cart-button").addEventListener("click",()=>{
            removeProdFromCart(id);
        });


        cartElement.appendChild(productClone);
    });
};

showCartProduct();

updateCartProductTotal();
