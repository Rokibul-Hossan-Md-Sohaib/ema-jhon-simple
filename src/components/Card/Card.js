import React from 'react';

const Card = (props) => {
    const card = props.card
    const total = card.reduce((total, pro) => total + pro.price, 0);//we can also do this by for-loop
    let shipping = 0
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.33;
    }
    else if (total > 0) {
        shipping = 12.3;
    }
    const tax = (total / 10).toFixed(2);

    const grandTotal = (total + shipping + Number(tax)).toFixed(2);
    return (
        <div>
            <h4>Order</h4>
            <p>Items Ordered :{card.length}</p>
            <p>Product price:{total}</p>
            <p><small>Shipping Cost :{shipping}</small></p>
            <p><small>Tax + Vat :{tax}</small></p>
            <p>total price: {grandTotal}</p>
        </div>
    );
};

export default Card;