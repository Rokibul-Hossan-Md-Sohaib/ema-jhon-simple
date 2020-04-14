import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';


const ProductDetail = () => {
    
    const {productKey}=useParams();
    const product =  fakeData.find(pd =>pd.Key===productKey);
    return (
        <div>
            <h2 >{productKey}coming soon</h2>
             {product &&<Product showAddToCard={false} product={product}></Product>}
            
            
        </div>
    );
};

export default ProductDetail;