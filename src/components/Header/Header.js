import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
    const auth =useAuth();
    return (
        <div className="Header">
           <img src={logo} alt=""/>
           <nav>
               <a href="/shop">Shop</a>
               <a href="review">Review</a>
               <a href="manage">Manage Inventory</a>
               {
                   auth.user && <span style={{color: 'yellow'}}>Welcome {auth.user.name}</span>
                   
               }
               {
                   auth.user?
                   <a href ="/login">Sign Out</a>
                   : <a href ="/login">Sign In</a>
               }
           </nav>
        </div>
    );
};

export default Header;