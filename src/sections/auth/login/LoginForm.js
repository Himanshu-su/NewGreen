import { useEffect, useState,
  // createContext, useContext 
} from 'react';
import { useNavigate } from 'react-router-dom';
// import  {useTokenContext} from 'src/pages/Tokenprovider';
import axios from 'axios';
// import TokenProvider from '../pages/TokenProvider';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useTokenContext } from '../../../pages/TokenProvider';










// ----------------------------------------------------------------------


export default function LoginForm () {
  const navigate = useNavigate();
// const {setToken}=useTokenContext()
// console.log(setToken)
// console.log(setToken)
  const [formData, setFormData] = useState({
   name:'',
   password:''
  });

  const [errors, setErrors] = useState({
   name:'',
   password:''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
    name:'',
password:''
  };

    if (!formData.name) {
      valid = false;
      newErrors.name = 'name is required';
    }

    if (!formData.password) {
      valid = false;
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return valid;
  };

  // useEffect(()=>{
  //   sessionStorage.removeItem("token")
  // },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload={
      name: formData.name,
        password: formData.password,
      }
      // console.log(payload)
    if (validateForm()) {
      try {
        // Make the API POST request here
        // const response = await axios.post('https://dev.techstreet.in/vmsglen/public/api/login', {
          // const response = await axios.post('https://dev.bizprocure.com/api/login', {
            const response = await axios.post('http://localhost:4040/users/login',payload );
// console.log(payload)
        // Handle the API response as needed
        // console.log('API login Response:', response.data);
        localStorage.setItem("token", response.data.token);
        navigate(('/dashboard/app'))
        // console.log('Login successful. Storing token in sessionStorage:', response.data.access_token);
       
      // localStorage.setItem("token", response.data.access_token);
      // sessionStorage.setItem("token", '52|jXkHYURMG2gKPzgNXsA5SUoHBocBceZUPQYFttVW');
      // localStorage.setItem("token", '52|jXkHYURMG2gKPzgNXsA5SUoHBocBceZUPQYFttVW');
        // console.log(`token:${response.data.access_token}`)
        //  setToken(response.data.access_token)
        
        // navigate('/companyselection')
        // navigate("/dashboard/app")
        // sessionStorage.removeItem("token")
// toast.success("success login")
        // Redirect to a new page or perform other actions after successful login
      } catch (error) {
        console.error('API Error:', error);
        toast.error(error.response.data.message)

        // Handle API error, e.g., display an error message to the user
      }
    } else {
      // Form validation failed, do nothing or show error messages
      navigate('/signup')
    }
  };


  return (
    <div>
      
      <div>
        {/* <h2>Login</h2> */}
       <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                {/* Left Image */}
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>

                {/* Right Form */}
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      {/* Logo */}
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      {/* name */}
                      <div className="form-outline mb-4">
                        <input
                          type="name"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="name"
                        />
                        <label className="form-label" htmlFor="name">
                          Name
                        </label>
                        <div className="error" style={{ color: "red" }}>
                          {errors.name}
                        </div>
                      </div>

                      {/* Password */}
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Enter your password"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <div className="error" style={{ color: "red" }}>
                          {errors.password}
                        </div>
                      </div>

                      {/* Login Button */}
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      {/* Links */}
                      <a className="small text-muted" href="#!">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="#!" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>{" "}
                      |{" "}
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>

                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        {/* <form onSubmit={handleSubmit}>
          <div>

            <div><p> Name:</p></div>
            <div className='inputbox'>
  <input
    type="text"
    id="name" 
    name="name"
    value={formData.name}
    onChange={handleChange}
    className='input inputbox'
    placeholder='Enter  Name'
    style={{
      width: '350px',
      height: '50px',
      border: '1px solid gray',
      borderRadius: "5px",
      marginTop: '5px',
      paddingLeft: "15px"
    }}
  />
</div>

            <div className="error" style={{color:'red'}}>{errors.name}</div>
          </div><br />
          <div>
            <div><p>Password:</p></div>
            <input 
              type="password"
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter Password'
              style={{
                width: '350px',
                height: '50px',
                border: '1px solid gray',
                borderRadius: "5px",
                marginTop: '5px',
                paddingLeft:'15px'
              }} 
              className='input'
              />
            <div className="error" style={{color:'red'}}>{errors.password}</div>
          </div><br />
          <div>
            <button type="submit"
              style={{
                width: '350px',
                height: '50px',
                border: '2px solid blue',
                borderRadius: "5px",
                marginTop: '5px',
                color: 'white',
                backgroundColor: 'blue'
                ,fontSize:'18px'
               
                
              }}
              className='btn'
            >Login</button>
            <ToastContainer/>
          </div>
        </form> */}
      </div>
    </div>
  );
}
//  export default LoginForm;
