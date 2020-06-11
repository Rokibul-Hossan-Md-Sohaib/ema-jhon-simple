import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
import { addToDatabaseCard, getDatabaseCard } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 =fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const[card, setCard]=useState([]);
    useEffect(() =>{
        const savedCard =getDatabaseCard();
        const productKeys= Object.keys(savedCard);
        const previousCard = productKeys.map(existingKey=>{
        const product = fakeData.find(pd=>pd.key === existingKey)
        product.quantity=savedCard[existingKey];
        return product;

        })
        setCard(previousCard);
    }, [] )
    const handleAddProduct =(product)=>{
        const toBeAdded =product.key;
        const sameProduct = card.find(pd=>pd.key === toBeAdded);
        let count =1;
        let newCard;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity=count;
            const others = card.find(pd=>pd.key !== toBeAdded);
            newCard =[...others,sameProduct];
         console.log(newCard);
        }
        else{
            product.quantity=1;
            newCard=[...card, product];
        }
        setCard(newCard);
        addToDatabaseCard(product.key, count);

    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                    products.map(pd =><Product
                        key={pd.key}
                        ShowAddToCard ={true}
                        handleAddProduct={handleAddProduct}
                        product ={pd}>

                        </Product>)
            }   
            </div>
            
            
            <div className="card-container">
               <Card card ={card}>
               <Link to="/review">
              <button className="main-btn">Review Order</button>
              </Link>
               </Card>
              
            </div>
            
        </div>
    );
};

export default Shop;