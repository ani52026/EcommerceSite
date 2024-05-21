import { getCartProductFromLS } from "./getCartProductFromLS";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

    getCartProductFromLS();

    export const addToCart=(event,id,stock) =>{


    let arrLocalStorageProdduct=getCartProductFromLS();

    const currentProdElem=document.querySelector(`#card${id}`);
    //  console.log(currentProdElem);
    //innerText ka khel hai pura
    let quantity=currentProdElem.querySelector(".productQuantity").innerText;
    let price =currentProdElem.querySelector(".productPrice").innerText;

     console.log(quantity,price); //it display price and quantity
     price=price.replace("₹","");//

     let existingProd=arrLocalStorageProdduct.find((currProd)=> currProd.id===id);
    //  if(existingProd){
    //     return false;
    //  }

     console.log(existingProd);

     if(existingProd && quantity> 1){
        // quantity=Number(existingProd.quantity) + Number(quantity); it gives incorrect answer
        //due to this loophole  user can order items greater than stock
        //ex order =10+ increase 2 then add to cart so total quantity is 22
        //and value show to screen is 12 and showing 18 items still left in stock 
        //which is totally wrong so do this


        quantity=Number(quantity);
        price=Number(price*quantity);
        let updatedCart={id,quantity,price};
        updatedCart=arrLocalStorageProdduct.map((curProd)=>{
            return (curProd.id===id) ? updatedCart:curProd;
        });
      console.log(updatedCart);

      localStorage.setItem("cartProductLS",JSON.stringify(updatedCart));

     }
     if(existingProd){
        showToast("add",id);
        return false;
     }
     price=Number(price*quantity);
     quantity=Number(quantity);

      console.log(quantity);
    //adding new item in LS
    //  console.log(price);//total price accodoring to quantity of particular item

     let update={id,quantity,price};
     arrLocalStorageProdduct.push(update);
     
     //localStorage mai data must be in string format so JSON.stringify() method use
     localStorage.setItem("cartProductLS",JSON.stringify(arrLocalStorageProdduct));
     

   //how to update cart value
   //1>when we click on add to cart button update cart value
   //2> direct use array size of localStorage 

     updateCartValue(arrLocalStorageProdduct);
      showToast("add",id);
};