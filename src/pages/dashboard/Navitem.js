import React, { useEffect, useState } from 'react'
import { Grid, Container, Typography, Card, Tabs, Tab } from '@mui/material';
import {GrLocation} from 'react-icons/gr'
import  { useRef} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCurrencyRupee } from "react-icons/md";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '..'

// import required modules
import { Navigation } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navitem = ({addToWhishlist}) => {
    const [swiperRef, setSwiperRef] = useState(null);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [toastQueue, setToastQueue] = useState([]);
    const [formcardarray,setformcardarray]=useState([])
    const navigate=useNavigate()

    var token=localStorage.getItem('token')
    // console.log(token)

    
    useEffect(() => {
   
      const apiUrl = 'http://localhost:4040/item';
    
      axios.get(apiUrl,
      //    {
      //   headers: { Authorization: token }
      // }
      )
      .then(response => {
        // Handle the response data here
        console.log(response);
        setformcardarray(response.data)
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
      });
    }, []); 

    const addToCart = (item) => {
      const payload = {
          _id: item._id,
          name:item.name,
          quantity:item.quantity,
          price:item.price,
          img: item.img,
          heading: item.heading
      };
  
      // Check if the user is logged in
      if (token) {
          // User is logged in, make a POST request to add item to MongoDB cart
          axios.post('http://localhost:4040/cart/cartadd', payload)
              .then(response => {
                  alert('Cart item added to MongoDB cart');
                  navigate('/dashboard/addtocart');
              })
              .catch(error => {
                  // Handle errors
                  if (error.response && error.response.status === 400) {
                      // If item already exists in MongoDB cart
                      alert('Item is already in the Mongodb');
                  } else {
                      console.error('Error posting cart data:', error);
                  }
              });
      } else {
          // User is not logged in, check session storage for existing items
          const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
          const existingItem = cartItems.find(cartItem => cartItem._id === item._id);
          if (!existingItem) {
              // If item is not in session storage, add it and navigate
              cartItems.push(item);
              sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
              alert('Cart item added to session storage');
              navigate('/dashboard/addtocart');
          } else {
              // If item is already in session storage
              toast.warning('Item is already in the cart');
          }
      }
  };
  
  return (
    <div>
        <div className="container">
       <div className="row p-5"  >
          {/* <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={20}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[ Navigation]}
        className="mySwiper"
      >

    
           

{formcardarray.map((item)=>{
    return(
        <>
          <SwiperSlide id='navswiperslide' className="swiper-slide">
      <img id='navitemimg' src={item.img} alt="img" />
      <div className="card-body mt-3 mb-3 text-center">
     
        <div className=''>
        <div className="row">
          <div className="col-md-12">  <h5>{item.name}</h5>
        </div>
       
        </div>
        </div>
        <hr className="dropdown-divider"/>
    
        <div className="row ">
            <div className="col-md-7 mt-3  ">
      
            <button type="button" className="btn ms-1" id='navcardbtn' 
             onClick={() => addToCart(item)}
            >Blog</button>
     
            </div>
            <div className="col-md-4 mt-3 ms-1  hoverblue ">
    <FavoriteBorderIcon 
        id="FavoriteBorderIcon"
   
        style={{ backgroundColor: 'transparent' }} 
        className='hoverblue'
    />
</div>

        </div>
       
      </div>
    </SwiperSlide>
        </>
    )
})}
  </Swiper> */}
  <Swiper
  onSwiper={setSwiperRef}
  slidesPerView={1} // default for very small screens
  spaceBetween={20}
  navigation={true}
  modules={[Navigation]}
  className="mySwiper"
  breakpoints={{
    320: {   // mobile portrait
      slidesPerView: 1,
      spaceBetween: 10,
    },
    480: {   // mobile landscape
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {   // tablets
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {  // small laptops / desktops
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1440: {  // large screens
      slidesPerView: 5,
      spaceBetween: 30,
    },
  }}
>
  {formcardarray.map((item) => (
    <SwiperSlide key={item._id} id="navswiperslide" className="swiper-slide">
      <img id="navitemimg" src={item.img} alt="img" />
      <div className="card-body mt-3 mb-3 text-center">
        <h5>{item.name}</h5>
        <hr className="dropdown-divider" />
        <div className="row">
          <div className="col-md-7 mt-3">
            <button
              type="button"
              className="btn ms-1"
              id="navcardbtn"
              onClick={() => addToCart(item)}
            >
              Blog
            </button>
          </div>
          <div className="col-md-4 mt-3 ms-1 hoverblue">
            <FavoriteBorderIcon
              id="FavoriteBorderIcon"
              style={{ backgroundColor: 'transparent' }}
              className="hoverblue"
            />
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

  </div>
    </div>
   
            <ToastContainer /> 
    </div>
  )
}

export default Navitem
