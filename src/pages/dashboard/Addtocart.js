import { toast } from 'react-toastify';
import { Button, Card, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaBagShopping } from "react-icons/fa6";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SwiperSlide } from 'swiper/react';
import "./AddCart.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
  } from "mdb-react-ui-kit";



export const Addtocart = () => {

    const [addtocart,setaddtocart]=useState([])
     const [isSubmitting, setIsSubmitting] = useState(false); 



    // const [code, setCode] = useState('');
    // const [discount,setdiscount]=useState(null)
    // const [updateCop,setupdatecop]=useState('APPLIED100')
  const [form,setform]=useState({
    orderId:'', 
    code:'',
    discount:null,
    updatecop:"APPLIED100",
    isSubmitting:false,
  })
    const navigate=useNavigate()

    const token = localStorage.getItem('token');

    useEffect(() => {
      
      if (token) {
          // If token is present, fetch data from the API
          axios.get('http://localhost:4040/cart/cart', {
              headers: {
                  Authorization: token
              }
          })
          .then(response => {
              // Update addtocart array with data from the API response
              setaddtocart(response.data);
              // setFilteredData(response.data);
              // alert('data come from database')
              
              // console.log(response.data)
          })
          .catch(error => {
              console.error('Error fetching cart data:', error);
              toast.error("Error fetching cart data");
          });
      } else {
          // If token is not present, retrieve data from sessionStorage
          const cartItem = JSON.parse(sessionStorage.getItem('cartItems')) || [];

          // console.log(cartItem)

          setaddtocart(cartItem);
          // setFilteredData(cartItem);
          // alert('Cart come from Session Storage')
      }
  }, []);
//  delete 

const handleDelete = (e, id) => {
  e.preventDefault();

  // Check if the data comes from MongoDB
  const isMongoDBData = addtocart.some(item => item._id === id);
  
  if (token) {
      // If data comes from MongoDB, send a DELETE request to the API endpoint
      axios.delete(`http://localhost:4040/cart/delete/${id}`)
          .then(response => {
              // Refresh the data after deletion
              axios.get('http://localhost:4040/cart/cart')
                  .then(response => {
                    console.log(response.data)
                      setaddtocart(response.data);
                      // setFilteredData(response.data);
                      // toast.success('Item deleted successfully');
                  })
                  .catch(error => {
                      console.error('Error fetching data:', error);
                      toast.error(error.message);
                  });
          })
          .catch(error => {
              console.error('Error deleting item:', error);
              toast.error('Failed to delete item');
          });
  } else {
      const updatedCart = addtocart.filter(item => item._id !== id);
      console.log(updatedCart);
      sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setaddtocart(updatedCart);
      // setFilteredData(updatedCart);
     
      // toast.success('Item deleted successfully');
  }
};


// total item
const totalItems = addtocart.reduce((total, item) => total + item.quantity, 0);

  const handleIncrement= (itemId) => {
    const updatedCart = addtocart.map((item) => {
        if (item._id === itemId) {
            const newQuantity = item.quantity + 1;
            if (newQuantity > 5) {
              toast.warning('You can only add up to 5 items.');
              return item;
          }
            const updatedItem = { ...item, quantity: newQuantity };
            // Update the price based on the new quantity
           
            return updatedItem;
        }
        return item;
    });

    setaddtocart(updatedCart);
};


  
  
  const handleDecrement = (itemId) => {
    const updatedCart = addtocart.map((item) => {
      if (item._id === itemId) {
          const newQuantity = item.quantity - 1;
          const updatedItem = { ...item, quantity: newQuantity };
          // Update the price based on the new quantity
         
          return updatedItem;
      }
      return item;
  });

  setaddtocart(updatedCart);
  };
  
// coupan
const handleApplyCode = () => {
  if (form.updatecop === 'APPLIED100') {
    
    // setCode('APPLIED100');
    setform({
      ...form,
      code:"APPLIED100",
      discount:-100,
      updatecop:"REMOVE"
    })
    // setdiscount(-100);
    // setgrandprice(totalprice - appliedDiscount);
    // setupdatecop('REMOVE');
  } else {
    // setCode('');
    // setdiscount(0);
    setform({
      ...form,
      code:"",
      discount:0,
      updatecop:"APPLIED100"
    })
    // setupdatecop('APPLIED100');
  }
};
      
  
      
    // total price
     const totalprice=addtocart.reduce((total,item)=>total+(item.price*item.quantity),0)

// uuid function
const generateOrderId = () => {
  // Generate a random 8-digit number
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `#${randomNumber}`;
};

     const handleRegister = (e) => {
      e.preventDefault();
      if (isSubmitting) return;
    
      setIsSubmitting(true);
    
      try {
        const updatedCart = addtocart.map(item => ({
          ...item,
          coupan: item.coupan || false
        }));
    
        const totalItems = updatedCart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0) + form.discount + 5;
    
        const existingOrderId = localStorage.getItem('orderId');
        const orderId = existingOrderId || generateOrderId();
    
        const orderData = {
          orderId,
          items: updatedCart,
          totalItems,
          totalPrice,
          isCouponApplied: form.updatecop === 'REMOVE'
        };
    
        console.log('Order Data:', orderData);
    
        if (token) {
          axios.post("http://localhost:4040/checkout/submit", orderData, {
            headers: {
              Authorization: token,
            }
          })
          .then((response) => {
            toast.success('Order submitted successfully');
            navigate('/dashboard/checkout', { state: { orderId: orderData.orderId } });
            setaddtocart([]);
            localStorage.setItem('orderId', orderData.orderId);
            setIsSubmitting(false);
          })
          .catch(error => {
            console.error('Error submitting order:', error.response ? error.response.data : error.message);
            toast.error('Failed to submit order');
            setIsSubmitting(false);
          });
        } else {
          sessionStorage.setItem('orderData', JSON.stringify(orderData));
          toast.info('Order data saved to session storage');
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error('Error in handleRegister:', error);
        toast.error('An unexpected error occurred');
        setIsSubmitting(false);
      }
    };

    //  
   
    
  return (
    <div>
      <div className="container">
      <div className="row mb-3 ">
        <div className="col-4">
        <div className="display-flex" style={{
                // border: '1px solid red',
                display: 'flex',
                alignItems: 'center' // Align items vertically

            }}>
                  <IconButton aria-label="cart" className='mb-2'>
      {/* <StyledBadge badgeContent={totalItems} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge> */}
    </IconButton>
                <Typography variant="h4" gutterBottom 
                className='ms-2'
                style={{ color: 'black' }}>
                    Cart Items
                </Typography>
            </div>
        </div>
      
        {/* <button
       onClick={(e)=>navigate('/dashboard/checkout')}
         className="col-2 pt-1  mb-3 custom-button">
                <Typography variant="h6" gutterBottom 
                className='ms-2 '>
                    Checkout Items
                </Typography>
            </button> */}
      </div>
     




      {/* <div className="row">
                             {addtocart.map((item, index) => (
                    <div key={index} className="col-md-3 mb-5">
                        <SwiperSlide id='navswiperslide' className="swiper-slide">
                            <img id='navitemimg' src={item.img} alt="img" />
                            <div className="card-body mt-3 mb-3 text-center">
                                <h6 className="card-text">{item.heading}</h6>
                                <hr className="dropdown-divider"/>
                                <div class="row gx-2 mt-3 ">
    <div class="col mb-2">
     <button id='addtocartbtn' class="p-2" onClick={(e)=>handleCheck(e,item)}>Checkout</button>
    </div>
    <div class="col">
      <button id='addtocartbtn'  class="p-2" onClick={(e)=>updateDeleteCard(e,item._id)}>Delete</button>
    </div>
  </div>
                            </div>
                        </SwiperSlide>
                    </div>
                ))}
            </div> */}

            {/* cart */}
            <div className="">
      <section className="h-100 h-custom" style={{ backgroundColor: "#D1C9FF",
      borderRadius:"15px"
       }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol size="12">
        <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
          <MDBCardBody className="p-0">
            <MDBRow className="g-0">
              <MDBCol lg="8">
                <div className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                      Shopping Cart
                    </MDBTypography>
                    <MDBTypography className="mb-0 text-muted">
                      {totalItems} items
                    </MDBTypography>
                  </div>

                  <hr className="my-4" />

                  {addtocart.map((item, index) => (
        <MDBRow key={index} className="mb-4 d-flex justify-content-between align-items-center">
          <MDBCol md="2" lg="2" xl="2">
            <MDBCardImage src={item.img} fluid className="rounded-3" alt={item.name} />
          </MDBCol>
          <MDBCol md="3" lg="3" xl="4">
          <MDBTypography tag="h5" className="text-muted mb-1">{item.name}</MDBTypography>
            <MDBTypography tag="h6" className="text-black">{item.heading}</MDBTypography>
          
          </MDBCol>
          <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
  
  <Button
    size="sm"
    color="primary"
    onClick={(e)=>handleDecrement(item._id)}
    disabled={item.quantity <= 1}
    style={{ minWidth: '30px',
    backgroundColor:"#5624D0",
    color:"white"
     }} // Set a fixed width to maintain button size
  >
    -
  </Button>
  <MDBInput
    type="number"
    min="0"
    value={item.quantity} // Use item's quantity here
    size="sm"
    onChange={(e) => handleDecrement(e, item._id)}
    style={{ width: '60px' }} // Adjust the width of the input field
  />
  <Button
    size="sm"
    color="primary"
    onClick={(e)=>handleIncrement(item._id)}
    style={{ minWidth: '30px',  backgroundColor:"#5624D0",
    color:"white" }} // Set a fixed width to maintain button size
  >
    +
  </Button>
  <MDBBtn color="link" className="px-2" style={{ minWidth: '30px' }}><MDBIcon fas icon="plus" /></MDBBtn>
</MDBCol>
          <MDBCol md="3" lg="2" xl='2'  className="d-flex mt-3" >
            <MDBTypography tag="h6" className="me-4">Rs.{item.price*item.quantity}</MDBTypography>
            <DeleteIcon style={{
              cursor:'pointer',
              color:'red'
            }}  
            onClick={(e) => handleDelete(e, item._id)}
              
            />
          </MDBCol>
          <MDBCol md="3" lg="2" xl="2" className="text-end">
          
          </MDBCol>
          <MDBCol md="1" lg="1" xl="1" className="text-end">
            <a href="#!" className="text-muted"><MDBIcon fas icon="times" /></a>
          </MDBCol>
        </MDBRow>
      ))}
                  <hr className="my-4" />

                  <div className="pt-5">
                    <MDBTypography tag="h6" className="mb-0">
                      <MDBCardText tag="a" href="/dashboard/app" className="text-body">
                        <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                        to shop
                      </MDBCardText>
                    </MDBTypography>
                  </div>
                </div>
              </MDBCol>
              <MDBCol lg="4" className="bg-grey">
                <div className="p-5">
                  <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                    Summary
                  </MDBTypography>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-between mb-4">
                    <MDBTypography tag="h5" className="text-uppercase">
                      items {totalItems}
                    </MDBTypography>
                    <MDBTypography tag="h5">Rs. {totalprice}.00</MDBTypography>
                  </div>

                  <MDBTypography tag="h5" className="text-uppercase mb-3">
                    Shipping
                  </MDBTypography>

                  <div className="mb-4 pb-2">
                    <select className="select p-2 rounded bg-grey" style={{ width: "100%" }}>
                      <option value="1">Standard-Delivery- Rs.5.00</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>
<div className='d-flex'>
                  <MDBTypography tag="h5" className="text-uppercase mb-3 mt-1">
            
                    Give code
                  </MDBTypography>
                  <Button variant="contained" color="success" className='ms-2 mb-3'
                  onClick={handleApplyCode}
                  >
{form.updatecop}
</Button></div>

                  <div className="mb-5">
                  <MDBInput
          size="lg"
          value={form.code}
          onChange={(e) => setform({
            ...form,
            code:e.target.value
          })}
          disabled={form.updatecop === 'REMOVE'}
        />
                  </div>

                  <hr className="my-4" />

                  <div className="d-flex justify-content-between mb-5">
                    <MDBTypography tag="h5" className="text-uppercase">
                      Total price
                    </MDBTypography>
                    <MDBTypography tag="h5">Rs. {totalprice+form.discount+5}.00</MDBTypography>
                  </div>

                  {/* <button className='custom-button'
                  onClick={(e)=>handleRegister(e)}
                  >
                    Register
                  </button> */}
                  <MDBBtn block size="lg" onClick={handleRegister} disabled={isSubmitting}>
                        Register
                      </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</section>
      </div>
   
      </div>
    </div>
  )
}


