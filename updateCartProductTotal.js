import { getCartProductFromLS } from "./getCartProductFromLS";

export const updateCartProductTotal=()=>{

    //now get the refernce of bill

    let productSubTotal=document.querySelector(".productSubTotal");
    let productFinalTotal=document.querySelector(".productFinalTotal");

    



    //Get the data from localStorage
    let initialValue=0;
    let localCartProducts=getCartProductFromLS();
    let totalProductPrice=localCartProducts.reduce((accum,curElem)=>{
       let productPrice=parseInt(curElem.price)|| 0;
       return accum+productPrice;
    },initialValue);
    console.log(totalProductPrice);

    //now update values on screen :just use TextContent

    productSubTotal.textContent=`₹${totalProductPrice}`;
    productFinalTotal.textContent=`₹${totalProductPrice+50}`;

    

};