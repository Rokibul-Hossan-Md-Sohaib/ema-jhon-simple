import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCard, processOrder } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import { useState } from 'react';
const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipInfoAdded, setShipInfoAdded] =useState(null);
  const[orderId, setOrderId] =useState(null);
  const auth = useAuth();
  const stripePromise = loadStripe(	
  'pk_test_51Gug61Jg3ABo05XDCHmegVvckwbmE6ppSJYqTlYSNxz0XlvojmpWFUsvpAuU7bJsuzE0b8XLXM3jfEwwREkguoAf00w7eZ3Zdq');

  const onSubmit = data => {
    setShipInfoAdded(data);
    //move this after payment
    console.log(auth.user.email);
    
  }
  const handlePlaceOrder =(payment) =>{
    const saveCard = getDatabaseCard()
    const orderDetail = {
      email: auth.user.email,
      card: saveCard,
      shipment: shipInfoAdded,
      payment: payment
    };
    fetch('https://ancient-hollows-50116.herokuapp.com/placeOrder', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id);
        processOrder();
      
      })

  }

  return (

    <div className="container">
      <div  className="row">
        <div style={{display: shipInfoAdded && 'none'}} className="col-6">
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <h1>Submit Form</h1>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
            {
              errors.name && <span className="error">This field is required</span>
            }

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Input Your Mail" />
            {

              errors.email && <span className="error">This field is required</span>
            }

            <input name="address1" ref={register({ required: true })} placeholder="Address" />
            {errors.address1 && <span className="error">This field is required</span>}

            <input name="address2" ref={register} placeholder="Address" />
            {errors.address2 && <span className="error">This field is required</span>}

            <input name="city" ref={register({ required: true })} placeholder="city" />
            {errors.city && <span className="error">This field is required</span>}

            <input name="country" ref={register({ required: true })} placeholder="country" />
            {errors.country && <span className="error">This field is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="zip-code" />
            {errors.zipcode && <span className="error">This field is required</span>}




            <input className="submit" type="submit" />
          </form>

        </div>
        <div style={{display: shipInfoAdded ? 'block' : 'none'}} className="col-6 payment">
          <h1>Payment System</h1>
          
           <Elements stripe={stripePromise}>
                      <CheckOutForm handlePlaceOrder={handlePlaceOrder}></CheckOutForm>
           </Elements>
          <br/>
            {
              orderId && <div className="shipping">
                <h2 style={{color:'blue', backgroundColor: 'cadetblue'}}>Thank for shopping with us</h2>
            <p>your order id is: {orderId}</p>
              </div>
            }
        </div>
      </div>
    </div>
  )
};

export default Shipment;