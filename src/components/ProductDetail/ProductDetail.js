import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';


const ProductDetail = () => {
    
    
    const {productKey}=useParams();
    const [product, setProduct] =useState(null)

    useEffect(()=>{
        fetch('http://localhost:3001/product/' +productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    },[])

    return (
        <div>
            <h2 >coming soon.</h2>
            { product && <Product ShowAddToCard={false} product={product}></Product>
                }
            
        </div>
    );
};

export default ProductDetail;