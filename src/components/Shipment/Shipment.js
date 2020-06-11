import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
  
   const auth=useAuth();
  
    return (
     
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>


        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
        {
        errors.name && <span className="error">This field is required</span>
        }   

        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Input Your Mail"/>
        {

        errors.email && <span className="error">This field is required</span>
        }   

        <input name="address1" ref={register({ required: true })} placeholder="Address"/>
        {errors.address1 && <span className="error">This field is required</span>}  

        <input name="address2" ref={register} placeholder="Address"/>
        {errors.address2 && <span className="error">This field is required</span>} 

        <input name="city" ref={register({ required: true })} placeholder="city"/>
        {errors.city && <span className="error">This field is required</span>} 

        <input name="country" ref={register({ required: true })} placeholder="country"/>
        {errors.country && <span className="error">This field is required</span>}   

            <input name="zipcode" ref={register({ required: true })} placeholder="zip-code" />
        {errors.zipcode && <span className="error">This field is required</span>}   
            
       

        
        <input className="submit" type="submit" />
      </form>
    );
};

export default Shipment;