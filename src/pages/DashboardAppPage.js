import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, Tabs, Tab } from '@mui/material';
import {GrLocation} from 'react-icons/gr'
import React, { useRef} from 'react';
import ReactPlayer from "react-player";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import './dashboard/style.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
// components
import Iconify from '../components/iconify';


import 'react-toastify/dist/ReactToastify.css';


// @mui

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import Navitem from './dashboard/Navitem';
import { Whislist } from './dashboard/Whislist';
import { Allfooter } from './dashboard/allfooter';
import { Gridcard } from './dashboard/Grid';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const [toastShown, setToastShown] = useState(false);
  const [value, setValue] = useState(0);
  const [swiperRef, setSwiperRef] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!sessionStorage.getItem('token')) {
  //     // Redirect to the login page if the token is not present
  //     navigate('/signup');
  //   } else if (!toastShown && !sessionStorage.getItem('toastShown')) {
  //     // Display the success message
  //     toast.success('logged in');
  //     // Set the flag in sessionStorage to indicate that the message has been shown
  //     sessionStorage.setItem('toastShown', 'true');
  //     // Set the flag in the component's state as well
  //     setToastShown(true);
  //   }
  // }, [navigate, toastShown]);


// nav item

const handleChange = (event, newValue) => {
  setValue(newValue);
};

// swipper css

const swiperStyle = {
  width: '100%',
  height: '100%',
  borderRadius:'1%'
};

const slideStyle = {
  textAlign: 'center',
  fontSize: '18px',
  background: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const imgStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const addToWishlist = (item) => {
  setWishlist([...wishlist, item]);
};

// video link
   const videoLinks = [
    "https://www.youtube.com/watch?v=AF6UONfp1Kw",
    "https://www.youtube.com/watch?v=BG03OgJoSEY",
    "https://www.youtube.com/watch?v=sHZohLm-wy4",
    "https://www.youtube.com/watch?v=DYtmc2JPIfM",
    "https://www.youtube.com/watch?v=pN0Pr8o5T6c",
    "https://www.youtube.com/watch?v=WvKSP1lxEgc",
    "https://www.youtube.com/watch?v=Cg9xauycKuE",
    "https://www.youtube.com/watch?v=_Fy9__IcAqk",
  ];

  // Convert watch links to embed links
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };


  return (
    <>
<ToastContainer/>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5}}>
          Hi, Welcome back
        </Typography> */}

        <div className='mb-5 rounded-5' 
        
        >
          
<Swiper navigation={true} modules={[Navigation]} className="mySwiper" style={swiperStyle}>
{/* 1 */}
<div className="position-relative">
<SwiperSlide style={slideStyle}>
  <div>
    <div className="row">
      <div className="col-12 col-md-6"></div>
    </div>
  </div>
  <img id='carouselimg' src="/assets/event_img/img3.jpeg" className="card-img-top" alt="" />
  {/* <Card className="card-text position-absolute"
  id='carouselcard'
  style={{ 
    width:'400px',height:'150px',marginRight:'50%',
    zIndex: 1 }}>
      <div className='p-5'>
      <h3 id='dummytextheading'>Sanatan Dharma Inter College Kanpur Event</h3></div></Card> */}
  

    </SwiperSlide></div>
{/* 2 */}
    <div className="position-relative">
<SwiperSlide style={slideStyle}>
  <div>
    <div className="row">
      <div className="col-12 col-md-6"></div>
    </div>
  </div>
  <img id='carouselimg' src="/assets/event_img/img2.jpeg" className="card-img-top" alt="" />
  {/* <Card className="card-text position-absolute"
  id='carouselcard'
  style={{ 
    width:'400px',height:'150px',marginRight:'50%',
    zIndex: 1 }}>
      <div className='p-5'>
      <h3 id='dummytextheading'>Dummy text for Slide 1.</h3></div>
      </Card> */}
    </SwiperSlide></div>

{/* 3 */}
<div className="position-relative">
<SwiperSlide style={slideStyle}>
  <div>
    <div className="row">
      <div className="col-12 col-md-6"></div>
    </div>
  </div>
  <img id='carouselimg' src="/assets/event_img/img1.jpeg" className="card-img-top" alt="" />
  {/* <Card className="card-text position-absolute"
  id='carouselcard'
  style={{ 
    width:'400px',height:'150px',marginRight:'50%',
    zIndex: 1 }}>
      <div className='p-5'>
      <h3 id='dummytextheading'>Dummy text for Slide 1.</h3></div></Card> */}
    </SwiperSlide></div>
{/* 4 */}
<div className="position-relative">
<SwiperSlide style={slideStyle}>
  <div>
    <div className="row">
      <div className="col-12 col-md-6"></div>
    </div>
  </div>
  <img id='carouselimg' src="/assets/event_img/img4.jpeg" className="card-img-top" alt="" />
  {/* <Card className="card-text position-absolute"
  id='carouselcard'
  style={{ 
    width:'400px',height:'150px',marginRight:'50%',
    zIndex: 1 }}>
      <div className='p-5'>
      <h3 id='dummytextheading'>Dummy text for Slide 1.</h3></div></Card> */}
    </SwiperSlide></div>
    {/* 5 */}
    
    <div className="position-relative">
<SwiperSlide style={slideStyle}>
  <div>
    <div className="row">
      <div className="col-12 col-md-6"></div>
    </div>
  </div>
  <img id='carouselimg' src="/assets/event_img/img5.jpeg" className="card-img-top" alt="" />
  {/* <Card className="card-text position-absolute"
  id='carouselcard'
  style={{ 
    width:'400px',height:'150px',marginRight:'50%',
    zIndex: 1 }}>
      <div className='p-5'>
      <h3 id='dummytextheading'>Dummy text for Slide 1.</h3></div></Card> */}
    </SwiperSlide></div>
    </Swiper>
    </div>

<Card className='mb-3'>
<Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Navigation tabs"
      >
        <Tab label="Home" id="pills-home-tab" aria-controls="pills-home" />
        <Tab label="Profile" id="pills-profile-tab" aria-controls="pills-profile" />
        <Tab label="Contact" id="pills-contact-tab" aria-controls="pills-contact" />
      </Tabs>
      <Typography component="div" role="tabpanel" hidden={value !== 0}>
      {/* navitem for home */}
      {/* <Whislist wishlist={wishlist} /> */}
      <Navitem addToWishlist={addToWishlist} />
   </Typography>
      <Typography component="div" role="tabpanel" hidden={value !== 1}>
      {/* navitem for profile */}
      <Navitem/>
      </Typography>

      {/* content nav item */}
      <Typography component="div" role="tabpanel" hidden={value !== 2}>
      <Navitem/>
      </Typography>
   </Card>

 
    <Gridcard/>

{/* video link */}
 <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 videos per row
        gap: "20px",
        padding: "20px",
      }}
    >
      {videoLinks.map((link, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9
            height: 0,
            overflow: "hidden",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <iframe
            src={getEmbedUrl(link)}
            title={`YouTube video ${index}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      ))}
    </div>


        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" 
            total={714000} 
           
             />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid> */}

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      
      </Container>
      {/* <Allfooter/> */}
    </>
  );
}
// i am struggling in  a part of my code 