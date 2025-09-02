import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./Checkout.css"
import axios from "axios";

export const Checkout=()=>{
  const [addtocart,setaddtocart]=useState([])
  const [item,setitem]=useState([])
  const [discount,setdiscount]=useState(0)
  const [totalprice,settotalprice]=useState(0)
  const [orderid,setorderid]=useState('')
  const [totalitems,settotalitems]=useState(0)
  const token = localStorage.getItem('token');

    useEffect(() => {
      
      if (token) {
          // If token is present, fetch data from the API
          axios.get('http://localhost:4040/checkout', {
              headers: {
                  Authorization: token
              }
          })
          .then(response => {
              // Update addtocart array with data from the API response
              setaddtocart(response.data);
              setitem(response.data[0].items)
              setdiscount(response.data.isCouponApplied)
              settotalprice(response.data[0].totalPrice)
              setorderid(response.data[0].orderId)
              settotalitems(response.data[0].totalItems)
              console.log(response.data)
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

  return (
    <>
 <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="text-black">
                <MDBRow>
                  <MDBCol lg="7" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Your products
                    </MDBTypography>

                    {item.map((product, index) => (
                      <div key={index} className="d-flex align-items-center mb-5">
                        <div className="flex-shrink-0">
                          <MDBCardImage
                            src={product.img}
                            fluid
                            style={{ width: "150px" }}
                            alt={product.name}
                          />
                        </div>

                        <div className="flex-grow-1 ms-3">
                          <a href="#!" className="float-end text-black">
                            <MDBIcon fas icon="times" />
                          </a>
                          <MDBTypography tag="h5" className="text-primary">
                            {product.name}
                          </MDBTypography>
                          <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                            {`Description: ${product.heading}`}
                          </MDBTypography>

                          <div className="d-flex align-products-center">
                            <p className="fw-bold mb-0 me-5 pe-3">{`Rs.${product.price}`}</p>

                            <div className="def-number-input number-input safari_only">
                              {/* <button className="minus"></button> */}
                              <MDBTypography tag="h6" style={{ color: "#9e9e9e" }}>
                              Quantity
                              <input
                                className="quantity fw-bold text-black"
                                min={0}
                                defaultValue={product.quantity}
                                type="number"
                              /></MDBTypography>
                              {/* <button className="plus"></button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <hr
                      className="mb-4"
                      style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }}
                    />

                    <div className="d-flex justify-content-between px-x">
                      <p className="fw-bold">Discount:</p>
                      {discount===item.isCouponApplied===true?(<p className="fw-bold">Rs.100</p>):(0)}
                    </div>
                    <div
                      className="d-flex justify-content-between p-2 mb-2"
                      style={{ backgroundColor: "#e1f5fe" }}
                    >
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                        Total:
                      </MDBTypography>
                      <MDBTypography tag="h5" className="fw-bold mb-0">
                      RS.{totalprice}
                      </MDBTypography>
                    </div>
                  </MDBCol>
                  
                  <MDBCol lg="5" className="px-5 py-4">
                    <MDBTypography
                      tag="h3"
                      className="mb-5 pt-2 text-center fw-bold text-uppercase"
                    >
                      Payment
                    </MDBTypography>

                    <form className="mb-5">
                      <MDBInput
                        className="mb-5"
                        label="Card number"
                        type="text"
                        size="lg"
                        defaultValue="1234 5678 9012 3457"
                      />

                      <MDBInput
                        className="mb-5"
                        label="Name on card"
                        type="text"
                        size="lg"
                        defaultValue="John Smith"
                      />

                      <MDBRow>
                        <MDBCol md="6" className="mb-5">
                          <MDBInput
                            className="mb-4"
                            label="Expiration"
                            type="text"
                            size="lg"
                            minLength="7"
                            maxLength="7"
                            defaultValue="01/22"
                            placeholder="MM/YYYY"
                          />
                        </MDBCol>
                        <MDBCol md="6" className="mb-5">
                          <MDBInput
                            className="mb-4"
                            label="Cvv"
                            type="text"
                            size="lg"
                            minLength="3"
                            maxLength="3"
                            placeholder="&#9679;&#9679;&#9679;"
                            defaultValue="&#9679;&#9679;&#9679;"
                          />
                        </MDBCol>
                      </MDBRow>

                      <p className="mb-5">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit
                        <a href="#!"> obcaecati sapiente</a>.
                      </p>

                      <MDBBtn block size="lg">
                        Buy now
                      </MDBBtn>

                      <MDBTypography
                        tag="h5"
                        className="fw-bold mb-5"
                        style={{ position: "absolute", bottom: "0" }}
                      >
                        <a href="#!">
                          <MDBIcon fas icon="angle-left me-2" />
                          Back to shopping
                        </a>
                      </MDBTypography>
                    </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}