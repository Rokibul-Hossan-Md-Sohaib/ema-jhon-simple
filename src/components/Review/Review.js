import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCard, removeFromDatabaseCard, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Card/Card';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [card, setCard ]=useState([]);
     const [orderPlaced , setOrderPlaced]=  useState(false);
    const handlePlaceOrder = ()=>{
        setOrderPlaced(true);
        setCard([]);
        processOrder();
    }
    const removeProduct = (productKey)=>{
           const newCard =card.filter(pd => pd.key !==productKey)
           setCard(newCard);
           removeFromDatabaseCard(productKey);

    }

    useEffect(()=>{
        const savedCard = getDatabaseCard();
        const productKeys= Object.keys(savedCard);
        const cardProduct = productKeys.map(key => {
            const product = fakeData.find(pd=> pd.key ===key);
            product.quantity = savedCard[key];
            return product
        });
        setCard(cardProduct)
    }, []);

    let thankyou;
    if(orderPlaced){
        thankyou= <img src={happyImage} alt=""/>

    }

    return (
        <div className="twin-container">
           
           <div className="product-container">
           {
               card.map(pd => <ReviewItem
                 key={pd.key}
                 removeProduct={removeProduct}
                 product={pd}>

                 </ReviewItem>)
               
           }
           {
               thankyou
           }
        </div>
        <div className="card-container">
            <Card card={card}>
                <button onClick={handlePlaceOrder} className="main-btn"> Place Order</button>
            </Card>
        </div>
        </div>
    );
};

export default Review;