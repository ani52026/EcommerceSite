import { getCartProductFromLS } from "./getCartProductFromLS";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement=(event,id,stock,price)=>{
    //tells user ne kis items ko incre.. or dec.. kiya hai
    const currentCardElement=document.querySelector(`#card${id}`); 
    //now we want quantity and price so we update its values in realtime

    const productQuantity=currentCardElement.querySelector(".productQuantity");
    const productPrice=currentCardElement.querySelector(".productPrice");

    let quantity=1;
    let localStoragePrice=0;

    //Get the data from localStorage

    let localCartProducts=getCartProductFromLS();
    //it gives item on which we apply incre... & dec.. operation
    let existingProd=localCartProducts.find((curProd)=> curProd.id===id);

    if(existingProd){
        quantity=existingProd.quantity;
        localStoragePrice=existingProd.price;
    }else{
        localStoragePrice=price;
        price=price;
    }

    if(event.target.className==="cartIncrement"){
        if(quantity<stock){
            quantity+=1;
        }
        else if(quantity===stock){
            quantity=stock;
            localStoragePrice=price*stock;
        }
       }
   

    if(event.target.className==="cartDecrement"){
        if(quantity>1){
            quantity-=1;
        }
       }

    //finally we will update the price in localStorage

    localStoragePrice=price*quantity;
//code for update quantity & price of particular item without affecting other
    quantity=Number(quantity);
    price=Number(price*quantity);

     //it only return 2 digits after decimal but prob
     //it return ans in string so convert then in NUmber

    localStoragePrice=Number(localStoragePrice.toFixed(2));

    let updatedCart={id,quantity,price :localStoragePrice};
    updatedCart=localCartProducts.map((curProd)=>{
        return (curProd.id===id) ? updatedCart:curProd;
    });
  console.log(updatedCart);

  localStorage.setItem("cartProductLS",JSON.stringify(updatedCart));

  //everything is perfect price&qunatity updated in LS
  //now our task to reflect changes on screen
  //wehave already refernce of both on line 8&9 only change ny innerText
  
  productQuantity.innerText=quantity;
  productPrice.innerText=localStoragePrice;



  //multiple values se single value then  we use reduce() Method
  //it is used to find sum,avg of an array oky
  //now here we have to find bill of all items stored in LS
  //normally use reudce Method 
  
  //jb bhi icre..decre.. krege then bill ki value bhi update krni hai oky
  //krne ke liye hum udhr bhi kr skte hai but we call the function it traverse
  //all items in LS and update values in each inc.. and decre..
  updateCartProductTotal();

};