import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCard, removeFromDatabaseCard} from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Card from '../Card/Card';

import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const [card, setCard ]=useState([]);
     
     const auth =useAuth();
 
    const removeProduct = (productKey)=>{
           const newCard =card.filter(pd => pd.key !==productKey)
           setCard(newCard);
           removeFromDatabaseCard(productKey);

    }

    useEffect(()=>{
        const savedCard = getDatabaseCard();
        const productKeys= Object.keys(savedCard);
        fetch('https://ancient-hollows-50116.herokuapp.com/getProductKey',{
            method: 'post',
         headers: {
            'Content-Type': 'application/json'
            
          },
         body: JSON.stringify(productKeys)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data)
            const cardProduct = productKeys.map(key => {
                const product = data.find(pd=> pd.key ===key);
                product.quantity = savedCard[key];
                return product
            });
            setCard(cardProduct)
        })
       
    }, []);

    

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
               !card.length && <h1> Please Bye Some Product <a href="/shop">Enjoy Shopping</a></h1>
           }
        </div>
        <div className="card-container">
            <Card card={card}>
               <Link to ="/shipment">
                { auth.user ?
                    <button  className="main-btn"> Proceed Checkout</button>
                :
                <button  className="main-btn"> Log Proceed</button>
                }
                </Link>
            </Card>
        </div>
        </div>
    );
};

export default Review;