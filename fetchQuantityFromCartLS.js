import { getCartProductFromLS } from "./getCartProductFromLS";

export const fetchQuantityFromCartLS=(id,price)=>{
    let cardProducts= getCartProductFromLS();

    let existingProduct=cardProducts.find((curProd)=> curProd.id===id);
    let quantity=1;

    if(existingProduct){
        quantity=existingProduct.quantity;
        price=existingProduct.price;
    }

    // normally we can return single value
    //if u have to return one than one value then use object

    return {quantity,price};
};