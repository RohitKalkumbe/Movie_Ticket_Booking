import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safely destructure state with fallback values
  const {
    movie = { Title: 'No Title', Poster: 'default-poster-url' },
    seats = [],
    amount = 0
  } = state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      alert('Please fill in all fields');
      return;
    }

    if (!/^\d{12}$/.test(cardNumber)) {
      alert('Card Number must be 12 digits');
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      alert('CVV must be 3 digits');
      return;
    }

    const bookingDetails = {
      movie,
      seats,
      amount,
      timing: state.timing,
      date: state.date,
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    existingBookings.unshift(bookingDetails);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    navigate('/statusbooking');
  };

  return (
    <div className="container">
      <div className="movie-info text-center">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" style={{height:'450px', width:'300px'}} />
        <h2 style={{ color: "black" }}>{movie.Title}</h2>
      </div>
      <div className="payment-info">
        <h4 style={{ color: "black", marginLeft: "8rem" }}>Selected Seats: {seats.join(', ')}</h4>
        <h4 style={{ color: "black", marginLeft: "8rem" }}>Total Amount: ${amount}</h4>
        <form style={{ marginLeft: "8rem" }}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              pattern="\d{12}"
              title="Card Number must be 12 digits"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
            <input
              type="month"
              className="form-control"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cvv" className="form-label">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              pattern="\d{3}"
              title="CVV must be 3 digits"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cardholderName" className="form-label">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              id="cardholderName"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handlePayment}
          >
            Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Payment = () => {
//   const { state } = useLocation();

//   // Safely destructure state with fallback values
//   const {
//     movie = { Title: 'No Title', Poster: 'default-poster-url' },
//     seats = [],
//     amount = 0
//   } = state || {};

//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [cardholderName, setCardholderName] = useState('');

//   const handlePayment = () => {
//     // Implement payment logic here
//     if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
//       alert('Please fill in all fields');
//       return;
//     }

//     // Additional validation
//     if (!/^\d{12}$/.test(cardNumber)) {
//       alert('Card Number must be 12 digits');
//       return;
//     }

//     if (!/^\d{3}$/.test(cvv)) {
//       alert('CVV must be 3 digits');
//       return;
//     }
//     const bookingDetails = {
//       movie,
//       seats,
//       amount,
//       timing: state.timing,
//       date: state.date,
//     };

//     const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
//     existingBookings.unshift(bookingDetails);
//     localStorage.setItem('bookings', JSON.stringify(existingBookings));

//     navigate('/statusbooking');

//     // For demonstration purposes
//     alert('Payment successful!');
//   };

//   return (
//     <div className="container">
//       <div className="movie-info text-center">
//         <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//         <h2 style={{ color: "black" }}>{movie.Title}</h2>
//       </div>
//       <div className="payment-info">
//         <h4 style={{ color: "black", marginLeft: "8rem" }}>Selected Seats: {seats.join(', ')}</h4>
//         <h4 style={{ color: "black", marginLeft: "8rem" }}>Total Amount: ${amount}</h4>
//         <form style={{ marginLeft: "8rem" }}>
//           <div className="mb-3">
//             <label htmlFor="cardNumber" className="form-label">Card Number</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cardNumber"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               pattern="\d{12}"
//               title="Card Number must be 12 digits"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
//             <input
//               type="month"
//               className="form-control"
//               id="expiryDate"
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="cvv" className="form-label">CVV</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cvv"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//               pattern="\d{3}"
//               title="CVV must be 3 digits"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="cardholderName" className="form-label">Cardholder Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cardholderName"
//               value={cardholderName}
//               onChange={(e) => setCardholderName(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={handlePayment}
//           >
//             Payment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Payment = () => {
//   const { state } = useLocation();

//   // Safely destructure state with fallback values
//   const {
//     movie = { Title: 'No Title', Poster: 'default-poster-url' },
//     seats = [],
//     amount = 0
//   } = state || {};

//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');
//   const [cardholderName, setCardholderName] = useState('');

//   const handlePayment = () => {
//     // Implement payment logic here
//     if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
//       alert('Please fill in all fields');
//       return;
//     }

//     // For demonstration purposes
//     alert('Payment successful!');
//   };

//   return (
//     <div className="container">
//       <div className="movie-info text-center">
//         <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//         <h2 style={{ color: "black" }}>{movie.Title}</h2>
//       </div>
//       <div className="payment-info">
//         <h4 style={{ color: "black" ,marginLeft:"8rem"}} >Selected Seats: {seats.join(', ')}</h4>
//         <h4 style={{ color: "black" ,marginLeft:"8rem" }}>Total Amount: ${amount}</h4>
//         <form style={{marginLeft:"8rem"}}>
//           <div className="mb-3">
//             <label htmlFor="cardNumber" className="form-label">Card Number</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cardNumber"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//             />
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
//             <input
//               type="text"
//               className="form-control"
//               id="expiryDate"
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//             />
//           </div> */}
//           <input
//   type="month"
//   className="form-control"
//   id="expiryDate"
//   value={expiryDate}
//   onChange={(e) => setExpiryDate(e.target.value)}
// />

//           <div className="mb-3">
//             <label htmlFor="cvv" className="form-label">CVV</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cvv"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="cardholderName" className="form-label">Cardholder Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="cardholderName"
//               value={cardholderName}
//               onChange={(e) => setCardholderName(e.target.value)}
//             />
//           </div>
//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={handlePayment}
//           >
//             Payment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;



// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Payment = () => {
//   const { state } = useLocation();

//   // Safely destructure state with fallback values
//   const {
//     movie = { Title: 'No Title', Poster: 'default-poster-url' },
//     seats = [],
//     amount = 0
//   } = state || {};

//   const handlePayment = () => {
//     // Implement payment logic here
//     alert('Payment successful!');
//   };

//   return (
//     <div className="container">
//       <div className="movie-info text-center">
//         <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//         <h2 style={{ color: "black" }}>{movie.Title}</h2>
//       </div>
//       <div className="payment-info">
//         <h4 style={{ color: "black" }}>Selected Seats: {seats.join(', ')}</h4>
//         <h4 style={{ color: "black" }}>Total Amount: ${amount}</h4>
//         <button className="btn btn-success" onClick={handlePayment}>Proceed to Pay</button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
