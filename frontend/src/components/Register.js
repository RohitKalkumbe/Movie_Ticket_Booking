import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';  // Import the CSS file

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setFullNameError('');
    setEmailError('');
    setPasswordError('');
    setSuccessMessage('');

    let isValid = true;

    if (!fullName) {
      setFullNameError('Full Name is required.');
      isValid = false;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      isValid = false;
    }

    if (!isValid) return;

    try {
      await axios.post('http://localhost:5000/users/register', { fullName, email, password });
      setSuccessMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="register-form">
        <h2 style={{color:"white"}}>Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="formFullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="formFullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            {fullNameError && <div className="error-message">{fullNameError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="formEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="formEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="formPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="formPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="formConfirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="formConfirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginLeft: "0rem" }}>
            Register
          </button>
        </form>
        <div className="login-link">
          <p style={{ color: "white" }}>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Register.css';  // Import the CSS file

// function Register() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [fullNameError, setFullNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setFullNameError('');
//     setEmailError('');
//     setPasswordError('');
//     setSuccessMessage('');

//     let isValid = true;

//     if (!fullName) {
//       setFullNameError('Full Name is required.');
//       isValid = false;
//     }

//     if (!emailRegex.test(email)) {
//       setEmailError('Invalid email format.');
//       isValid = false;
//     }

//     if (!passwordRegex.test(password)) {
//       setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
//       isValid = false;
//     }

//     if (password !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       isValid = false;
//     }

//     if (!isValid) return;

//     // Store user information in local storage
//     // const users = JSON.parse(localStorage.getItem('users')) || [];
//     // users.push({ fullName, email, password });
//     // localStorage.setItem('users', JSON.stringify(users));

//     // setSuccessMessage('Registration successful! Redirecting to login page...');
//     // setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds

//     try {
//       await axios.post('http://localhost:5000/users/register', { fullName, email, password });
//       setSuccessMessage('Registration successful! Redirecting to login page...');
//       setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
//     } catch (error) {
//       setError('Registration failed. Please try again.');
//   };

//   return (
//     <div className="container">
//       <div className="register-form">
//         <h2>Register</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//         <form onSubmit={handleRegister}>
//           <div className="form-group">
//             <label htmlFor="formFullName">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="formFullName"
//               placeholder="Enter full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             {fullNameError && <div className="error-message">{fullNameError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formEmail">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="formEmail"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {emailError && <div className="error-message">{emailError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formPassword">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="formPassword"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {passwordError && <div className="error-message">{passwordError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formConfirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="formConfirmPassword"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary" style={{marginLeft:"0rem"}}>
//             Register
//           </button>
//         </form>
//         <div className="login-link">
//           <p style={{color:"white"}}>Already have an account? <a href="/login">Login</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }
// }
// export default Register;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';  // Import the CSS file
// import axios from 'axios';

// function Register() {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [fullNameError, setFullNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setFullNameError('');
//     setEmailError('');
//     setPasswordError('');
//     setSuccessMessage('');

//     let isValid = true;

//     if (!fullName) {
//       setFullNameError('Full Name is required.');
//       isValid = false;
//     }

//     if (!emailRegex.test(email)) {
//       setEmailError('Invalid email format.');
//       isValid = false;
//     }

//     if (!passwordRegex.test(password)) {
//       setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
//       isValid = false;
//     }

//     if (password !== confirmPassword) {
//       setPasswordError('Passwords do not match.');
//       isValid = false;
//     }

//     if (!isValid) return;

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', { fullName, email, password });
//       setSuccessMessage('Registration successful! Redirecting to login page...', response.data.token);
//       setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
//     } catch (err) {
//       setError('Registration failed');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="register-form">
//         <h2>Register</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//         <form onSubmit={handleRegister}>
//           <div className="form-group">
//             <label htmlFor="formFullName">Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="formFullName"
//               placeholder="Enter full name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             {fullNameError && <div className="error-message">{fullNameError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formEmail">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="formEmail"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {emailError && <div className="error-message">{emailError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formPassword">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="formPassword"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {passwordError && <div className="error-message">{passwordError}</div>}
//           </div>
//           <div className="form-group">
//             <label htmlFor="formConfirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="formConfirmPassword"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">
//             Register
//           </button>
//         </form>
//         <div className="login-link">
//           <p>Already have an account? <a href="/login">Login</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
