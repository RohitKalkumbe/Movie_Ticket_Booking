import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './statusbooking.css'; // Add custom CSS

const StatusBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const handleBackToHome = () => {
    navigate('/movies');
  };

  const handleClearBookings = () => {
    localStorage.removeItem('bookings');
    setBookings([]);
  };

  return (
    <div className="container status-booking-container">
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="booking-details row">
            <div className="col-md-4 text-center">
              <img src={booking.movie.Poster} alt={booking.movie.Title} style={{ width: '250px', height: '250px' }} />
            </div>
            <div className="col-md-8" style={{marginLeft:'1rem'}}>
              <h3 style={{ color: 'black' }}>{booking.movie.Title}</h3>
              <h4 style={{ color: 'black' }}>Seats: {booking.seats.join(', ')}</h4>
              <h4 style={{ color: 'black' }}>Amount: ${booking.amount}</h4>
              <h4 style={{ color: 'black' }}>Timing: {booking.timing}</h4>
              <h4 style={{ color: 'black' }}>Date: {booking.date}</h4>
              <p style={{ color: 'green' }}>Your ticket is booked!</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: 'black' }}>No bookings found.</p>
      )}
      <div className="text-center">
        <button className="btn btn-danger m-2" onClick={handleClearBookings}>Clear Bookings</button>
        <button className="btn btn-primary m-2" onClick={handleBackToHome}>Movies</button>
      </div>
    </div>
  );
};

export default StatusBooking;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './statusbooking.css'; // Add custom CSS

// const StatusBooking = () => {
//   const navigate = useNavigate();
//   const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   return (
//     <div className="container status-booking-container">
//       {bookings.length > 0 ? (
//         bookings.map((booking, index) => (
//           <div key={index} className="booking-details column">
//             <div className="col-md-4 text-center">
//               <img src={booking.movie.Poster} alt={booking.movie.Title} style={{width:"250px", height:"250px"}} />
//             </div>
//             <div className="col-md-8">
//               <h3 style={{ color: "black" }}>{booking.movie.Title}</h3>
//               <h4 style={{ color: "black" }}>Seats: {booking.seats.join(', ')}</h4>
//               <h4 style={{ color: "black" }}>Amount: ${booking.amount}</h4>
//               <h4 style={{ color: "black" }}>Timing: {booking.timing}</h4>
//               <h4 style={{ color: "black" }}>Date: {booking.date}</h4>
//               <p style={{ color: "green" }}>Your ticket is booked!</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p style={{ color: "black" }}>No bookings found.</p>
//       )}
//       {/* <button className="btn btn-primary" onClick={handleBackToHome}>Back to Home</button> */}
//     </div>
//   );
// };

// export default StatusBooking;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './statusbooking.css'; // Add custom CSS if needed

// const StatusBooking = () => {
//   const navigate = useNavigate();
//   const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

//   const handleBackToHome = () => {
//     navigate('/');
//   };

//   return (
//     <div>
//       {bookings.length > 0 ? (
//         bookings.map((booking, index) => (
//           <div key={index} className="booking-details">
//             <div className>
//               <img src={booking.movie.Poster} alt={booking.movie.Title} className="movie-poster" />
//               <h3 style={{ color: "black" }}>{booking.movie.Title}</h3>
//             </div>
//             <h4 style={{ color: "black" }}>Seats: {booking.seats.join(', ')}</h4>
//             <h4 style={{ color: "black" }}>Amount: ${booking.amount}</h4>
//             <h4 style={{ color: "black" }}>Timing: {booking.timing}</h4>
//             <h4 style={{ color: "black" }}>Date: {booking.date}</h4>
          
//           </div>
//         ))
//       ) : (
//         <p style={{ color: "black" }}>No bookings found.</p>
//       )}
//       <button onClick={handleBackToHome}>TicketBooked</button>
//     </div>
//   );
// };

// export default StatusBooking;
