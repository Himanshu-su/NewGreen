import React, { useState } from 'react';
import { Button, Card, CardContent, TextField, Grid } from '@mui/material';
import { MdCurrencyRupee } from "react-icons/md";
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({
   name:"",
   quantity :0,
   price:0,
   img:"",
   heading:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload={
    name:formData.name,
    quantity:formData.quantity,
    price:formData.price,
    img:formData.img,
    heading:formData.heading
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission here
    try {
      const response = await axios.post(
        'http://localhost:4040/item/additem',
        payload // Send the payload directly
      );
      alert('Item has  added')
 console.log(response)
    }catch{
console.log('item has not added')
alert('item has not added')
    }
    // Reset form data
    setFormData({
      name:"",
      quantity:0,
      price:0,
      img: '',
      heading: '',
    });
  };

  return (
    <div>
      <h4>Admin Panel</h4>
      <div className='mt-4'>
       
        <Card className='mt-5' variant="outlined" sx={{ width: '40%', height: 'auto', margin: 'auto', textAlign: 'center' }}>
          <CardContent>
          <h5>Add Item</h5>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Enter Name"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  type='number'
                    margin="dense"
                    label="Enter Quantity"
                    fullWidth
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      type='number'
                    margin="dense"
                    label="Enter Price"
                    fullWidth
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    InputProps={{
      startAdornment: <MdCurrencyRupee />,
    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Enter Image Url"
                    fullWidth
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    label="Enter Description"
                    fullWidth
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                  />
                </Grid>
               
              </Grid>
              <Button className='mt-4' type="submit" variant="contained" color="primary">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
