import { getCartProductFromLS } from "./getCartProductFromLS";
import { showToast } from "./showToast";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart=(id)=>{
  
    let cardProducts=getCartProductFromLS();
    //means jo id equal hogi bahi return nahi krege then it automatically
    //Remove from LS, no need to do anything
    cardProducts=cardProducts.filter((curProd)=> curProd.id!==id)

    //update the localStorage after removing the items

    localStorage.setItem("cartProductLS",JSON.stringify(cardProducts));

    //after remove item delete from LS but it still display on the screen till
    //you refresh so we don't want this we want on the spot remove from screen 
    //too..

    //by using id we can do this --to-do list 

    let removeDiv=document.getElementById(`card${id}`);
    if(removeDiv){
        removeDiv.remove();
        showToast("delete",id);
    }

    //it updates cartValue display on the screen on top-right
    updateCartValue(cardProducts);
    updateCartProductTotal();

};