import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';  // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setUsernameError('');
    setPasswordError('');

    let isValid = true;

    if (!emailRegex.test(username)) {
      setUsernameError('Invalid email format.');
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
      isValid = false;
    }

    if (!isValid) return;

    // Retrieve user information from local storage
    // const users = JSON.parse(localStorage.getItem('users')) || [];
    // const user = users.find(user => user.email === username && user.password === password);

    // if (user) {
    //   navigate('/movies'); // Redirect to the movie page
    // } else {
    //   setError('Invalid credentials');
    // }

    try {
      const response = await axios.post('http://localhost:5000/users/login', { email: username, password });
      //localStorage.setItem('token', response.data.token); // Store JWT token
      const user = response.data; // Assuming the response contains userId and token
      localStorage.setItem('userId', user._id);
      //localStorage.setItem('token', token);
      navigate('/movies'); // Redirect to the movie page
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="formUsername" style={{color:"white"}}>Email</label>
            <input
              type="email"
              className="form-control"
              id="formUsername"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {usernameError && <div className="error-message">{usernameError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="formPassword" style={{color:"white"}}>Password</label>
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
          <button  style={{marginLeft:"0rem"}} type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
       
        <div className="signup-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css';  // Import the CSS file

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setUsernameError('');
//     setPasswordError('');
    
//     let isValid = true;

//     if (!emailRegex.test(username)) {
//       setUsernameError('Invalid email format.');
//       isValid = false;
//     }

//     if (!passwordRegex.test(password)) {
//       setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
//       isValid = false;
//     }

//     if (!isValid) return;

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
//       localStorage.setItem('token', response.data.token);
//       setSuccessMessage("Login successful!");
//       navigate('/movies');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login-form">
//         <h2>Login</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="form-group">
//             <label htmlFor="formUsername">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="formUsername"
//               placeholder="Enter email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             {usernameError && <div className="error-message">{usernameError}</div>}
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
//           <button type="submit" className="btn btn-primary">
//             Login
//           </button>
//         </form>
       
//         <div className="signup-link">
//           <p>Don't have an account? <a href="/register">Register</a></p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;




// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';  // Import the CSS file
// // import axios from 'axios';


// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const [usernameError, setUsernameError] = useState('');
// //   const [passwordError, setPasswordError] = useState('');
// //   //const [showModal, setShowModal] = useState(false);
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const navigate = useNavigate();

// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setUsernameError('');
// //     setPasswordError('');
    

// //     let isValid = true;

// //     if (!emailRegex.test(username)) {
// //       setUsernameError('Invalid email format.');
// //       isValid = false;
// //     }

// //     if (!passwordRegex.test(password)) {
// //       setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
// //       isValid = false;
// //     }

// //     if (!isValid) return;

// //     // Uncomment and replace with your actual API request
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //       localStorage.setItem('token', response.data.token);
// //       navigate('/movies');
// //      setSuccessMessage("Login sucessFul!....")
// //     } catch (err) {
// //       setError('Invalid credentials');
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <div className="login-form">
// //         <h2>Login</h2>
// //         {error && <div className="alert alert-danger">{error}</div>}
// //          {successMessage && <div className="alert alert-success">{successMessage}</div>}
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label htmlFor="formUsername">Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="formUsername"
// //               placeholder="Enter email"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //             />
// //             {usernameError && <div className="error-message">{usernameError}</div>}
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="formPassword">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="formPassword"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //             {passwordError && <div className="error-message">{passwordError}</div>}
// //           </div>
// //           <button type="submit" className="btn btn-primary">
// //             Login
// //           </button>
// //         </form>
       
// //         <div className="signup-link">
// //           <p>Don't have an account? <a href="/register">Register</a></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;





// // import React, { useState } from 'react';
// // //import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   //const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     // try {
// //     //   const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //     //   localStorage.setItem('token', response.data.token);
// //     //   navigate('/movies');
// //     // } catch (err) {
// //     //   setError('Invalid credentials');
// //     // }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2>Login</h2>
// //       {error && <div className="alert alert-danger">{error}</div>}
// //       <form onSubmit={handleLogin}>
// //         <div className="form-group">
// //           <label htmlFor="formUsername">Username</label>
// //           <input
// //             type="text"
// //             className="form-control"
// //             id="formUsername"
// //             placeholder="Enter username"
// //             value={username}
// //             onChange={(e) => setUsername(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="formPassword">Password</label>
// //           <input
// //             type="password"
// //             className="form-control"
// //             id="formPassword"
// //             placeholder="Password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />
// //         </div>
// //         <button type="submit" className="btn btn-primary">
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Login;
// // import React, { useState } from 'react';
// // //import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';  // Import the CSS file

// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   //const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     // try {
// //     //   const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //     //   localStorage.setItem('token', response.data.token);
// //     //   navigate('/movies');
// //     // } catch (err) {
// //     //   setError('Invalid credentials');
// //     // }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="login-form">
// //         <h2>Login</h2>
// //         {error && <div className="alert alert-danger">{error}</div>}
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label htmlFor="formUsername">Username</label>
// //             <input
// //               type="text"
// //               className="form-control"
// //               id="formUsername"
// //               placeholder="Enter username"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="formPassword">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="formPassword"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary">
// //             Login
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// // 

// // 
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';  // Import the CSS file

// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const [validationError, setValidationError] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const navigate = useNavigate();

// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setValidationError(null);
// //     setShowModal(false);

// //     if (!emailRegex.test(username)) {
// //       setValidationError('Invalid email format.');
// //       return;
// //     }

// //     if (!passwordRegex.test(password)) {
// //       setValidationError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
// //       return;
// //     }

// //     // Uncomment and replace with your actual API request
// //     // try {
// //     //   const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //     //   localStorage.setItem('token', response.data.token);
// //     //   navigate('/movies');
// //     // } catch (err) {
// //     //   setError('Invalid credentials');
// //     //   setShowModal(true);
// //     // }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="login-form">
// //         <h2>Login</h2>
// //         {error && <div className="alert alert-danger">{error}</div>}
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label htmlFor="formUsername">Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="formUsername"
// //               placeholder="Enter email"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="formPassword">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="formPassword"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary">
// //             Login
// //           </button>
// //         </form>
// //         {validationError && (
// //           <div className="sidebar">
// //             <p>{validationError}</p>
// //           </div>
// //         )}
// //         {showModal && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <span className="close" onClick={() => setShowModal(false)}>&times;</span>
// //               <p>{error}</p>
// //             </div>
// //           </div>
// //         )}
// //         <div className="signup-link">
// //           <p>Don't have an account? <a href="/signup">Sign up</a></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';  // Import the CSS file

// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const [validationError, setValidationError] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const navigate = useNavigate();

// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setValidationError(null);
// //     setShowModal(false);

// //     if (!emailRegex.test(username)) {
// //       setValidationError('Invalid email format.');
// //       return;
// //     }

// //     if (!passwordRegex.test(password)) {
// //       setValidationError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
// //       return;
// //     }

// //     // Uncomment and replace with your actual API request
// //     try {
// //       // const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //       // localStorage.setItem('token', response.data.token);
// //       // navigate('/movies');
// //       // Simulate an invalid credentials response for testing
// //       throw new Error('Invalid credentials');
// //     } catch (err) {
// //       setError('Invalid credentials');
// //       setShowModal(true);
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="login-form">
// //         <h2>Login</h2>
// //         {error && <div className="alert alert-danger">{error}</div>}
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label htmlFor="formUsername">Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="formUsername"
// //               placeholder="Enter email"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="formPassword">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="formPassword"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary">
// //             Login
// //           </button>
// //         </form>
// //         {validationError && (
// //           <div className="sidebar">
// //             <p>{validationError}</p>
// //           </div>
// //         )}
// //         {showModal && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <span className="close" onClick={() => setShowModal(false)}>&times;</span>
// //               <p>{error}</p>
// //             </div>
// //           </div>
// //         )}
// //         <div className="signup-link">
// //           <p>Don't have an account? <a href="/signup">Sign up</a></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Login.css';  // Import the CSS file

// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState(null);
// //   const [validationError, setValidationError] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const navigate = useNavigate();

// //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //   const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // At least one number, one lowercase letter, one uppercase letter, and at least 6 characters long

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError(null);
// //     setValidationError(null);

// //     if (!emailRegex.test(username)) {
// //       setValidationError('Invalid email format.');
// //       return;
// //     }

// //     if (!passwordRegex.test(password)) {
// //       setValidationError('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
// //       return;
// //     }

// //     // Uncomment and replace with your actual API request
// //     try {
// //       // Simulate an invalid credentials response for testing
// //       // const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
// //       // localStorage.setItem('token', response.data.token);
// //       // navigate('/movies');
// //       throw new Error('Invalid credentials'); // Simulate an error for testing
// //     } catch (err) {
// //       setError('Invalid credentials');
// //       setShowModal(true);
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <div className="login-form">
// //         <h2>Login</h2>
// //         {validationError && (
// //           <div className="validation-error">
// //             <p>{validationError}</p>
// //           </div>
// //         )}
// //         <form onSubmit={handleLogin}>
// //           <div className="form-group">
// //             <label htmlFor="formUsername">Email</label>
// //             <input
// //               type="email"
// //               className="form-control"
// //               id="formUsername"
// //               placeholder="Enter email"
// //               value={username}
// //               onChange={(e) => setUsername(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="formPassword">Password</label>
// //             <input
// //               type="password"
// //               className="form-control"
// //               id="formPassword"
// //               placeholder="Password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button type="submit" className="btn btn-primary">
// //             Login
// //           </button>
// //         </form>
// //         {showModal && (
// //           <div className="modal">
// //             <div className="modal-content">
// //               <span className="close" onClick={() => setShowModal(false)}>&times;</span>
// //               <p>{error}</p>
// //             </div>
// //           </div>
// //         )}
// //         <div className="signup-link">
// //           <p>Don't have an account? <a href="/signup">Sign up</a></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;
