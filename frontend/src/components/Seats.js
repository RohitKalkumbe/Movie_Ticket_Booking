import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Seats.css"; // Add custom CSS if needed

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Seats = () => {
  const navigate = useNavigate();
  const query = useQuery();
  
  // Fetch specific query parameters
  const dataToPass = query.get("dataToPass");

  let movie = { Title: "", Poster: "" };
  let state = "";
  let city = "";
  let theater = "";
  let timing = "";
  let date = "";

  
     try {
  //   // if (dataToPass) {
  //   //   const decodedData = decodeURIComponent(dataToPass);
  //   //   const parsedData = JSON.parse(decodedData);
  //   //   ({ movie, state, city, theater, timing, date } = parsedData);
  //   // }
    if (dataToPass) {
      const decodedData = atob(dataToPass);
      const parsedData = JSON.parse(decodedData);
      movie = {  Title: parsedData.movie.Title, Poster: parsedData.movie.Poster };
      state = parsedData.state;
      city = parsedData.city;
      theater = parsedData.theater;
      timing = parsedData.timing;
      date = parsedData.date;
    }
  } catch (error) {
    console.error("Error decoding data:", error);
  }

  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatPrice = 10; // Price per seat

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter((seat) => seat !== seatNumber);
      }
      return [...prevSeats, seatNumber];
    });
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        movie,
        state: state,
        city,
        theater,
        timing,
        date,
        seats: selectedSeats,
        amount: selectedSeats.length * seatPrice,
      },
    });
  };

  const totalAmount = selectedSeats.length * seatPrice;

  return (
    <div className="container">
      <div className="movie-info text-center">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" style={{width:"320px", height:"400px"}} />
        <h2 style={{ color: "black" }}>{movie.Title}</h2>
      </div>
      <div className="seat-selection">
        <div className="seats">
          {Array.from({ length: 70 }).map((_, index) => (
            <button
              key={index}
              className={`seat ${selectedSeats.includes(index + 1) ? "selected" : ""}`}
              onClick={() => handleSeatClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="summary">
          <h1 style={{ color: "black", marginLeft: "5rem" }}>------Screen------</h1>
          <h4 style={{ color: "black", marginLeft: "5rem" }}>Total Seats: {selectedSeats.length}</h4>
          <h4 style={{ color: "black", marginLeft: "5rem" }}>Total Amount: ${totalAmount}</h4>
          <button className="btn btn-primary" onClick={handleProceed}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Seats;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Seats.css"; // Add custom CSS if needed
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };
// const Seats = () => {
//   const navigate = useNavigate();
//   const query = useQuery();



//   // Fetch specific query parameters
//   const dataToPass=query.get("dataToPass")
//   //const data = decodeURIComponent(dataToPass);

  
//   //console.log(data);
//   //const { movie, state, city, theater, timing, date } = JSON.parse(data);
//   //console.log(movie, state, city, theater, timing, date);
//   // const {
//   //   movie = { Title: "No Title", Poster: "default-poster-url" },
//   //   state: selectedState = "",
//   //   city = "",
//   //   theater = "",
//   //   timing = "",
//   //   date = "",
//   // } = state || {};

//   let movie = "";
//   let state = "";
//   let city = "";
//   let theater = "";
//   let timing = "";
//   let date = "";

//   try {
//     if(dataToPass)
//     {
//       const decodedData = decodeURIComponent(dataToPass);
//       const parsedData = JSON.parse(decodedData);
//       ({movie, state, city, theater, timing, date}=parsedData);
//     }
//   } catch (error) {
//     console.error("Error decoding data:", error);

//   }

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const seatPrice = 10; // Price per seat

//   const handleSeatClick = (seatNumber) => {
//     setSelectedSeats((prevSeats) => {
//       if (prevSeats.includes(seatNumber)) {
//         return prevSeats.filter((seat) => seat !== seatNumber);
//       }
//       return [...prevSeats, seatNumber];
//     });
//   };

//   const handleProceed = () => {
//     navigate("/payment", {
//       state: {
//         movie,
//         state: state,
//         city,
//         theater,
//         timing,
//         date,
//         seats: selectedSeats,
//         amount: selectedSeats.length * seatPrice,
//       },
//     });
//   };

//   const totalAmount = selectedSeats.length * seatPrice;

//   return (
//     <div className="container">
//       <div className="movie-info text-center">
//         <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//         <h2 style={{ color: "black" }}>{movie.Title}</h2>
//       </div>
//       <div className="seat-selection">
//         <div className="seats">
//           {Array.from({ length: 70 }).map((_, index) => (
//             <button
//               key={index}
//               className={`seat ${
//                 selectedSeats.includes(index + 1) ? "selected" : ""
//               }`}
//               onClick={() => handleSeatClick(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <div className="summary">
//           <h1 style={{ color: "black", marginLeft: "5rem" }}>
//             ------Screen------
//           </h1>
//           <h4 style={{ color: "black", marginLeft: "5rem" }}>
//             Total Seats: {selectedSeats.length}
//           </h4>
//           <h4 style={{ color: "black", marginLeft: "5rem" }}>
//             Total Amount: ${totalAmount}
//           </h4>
//           <button className="btn btn-primary" onClick={handleProceed}>
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Seats;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Seats.css'; // Add custom CSS if needed

// const Seats = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   // Safely destructure state with fallback values
//   const {
//     movie = { Title: 'No Title', Poster: 'default-poster-url' },
//     state: selectedState = '',
//     city = '',
//     theater = '',
//     timing = '',
//     date = ''
//   } = state || {};

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [seatCount, setSeatCount] = useState(0);
//   const seatPrice = 10; // Price per seat

//   const handleSeatClick = (seatNumber) => {
//     setSelectedSeats(prevSeats => {
//       if (prevSeats.includes(seatNumber)) {
//         return prevSeats.filter(seat => seat !== seatNumber);
//       }
//       return [...prevSeats, seatNumber];
//     });
//   };

//   const handleProceed = () => {
//     navigate('/payment', {
//       state: {
//         movie,
//         state: selectedState,
//         city,
//         theater,
//         timing,
//         date,
//         seats: selectedSeats,
//         amount: selectedSeats.length * seatPrice
//       }
//     });
//   };

//   const totalAmount = selectedSeats.length * seatPrice;

//   return (
//     <div className="container">
//       <div className="movie-info text-center">
//         <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
//         <h2 style={{color:"black"}}>{movie.Title}</h2>
//       </div>
//       {/* <h3 style={{color:"black"}}>Select Seats</h3> */}
//       <div className="seat-selection">
//         <div className="seats">
//           {Array.from({ length: 70 }).map((_, index) => (
//             <button
//               key={index}
//               className={`seat ${selectedSeats.includes(index + 1) ? 'selected' : ''}`}
//               onClick={() => handleSeatClick(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//         <div className="summary">
//         <h1 style={{color:"black", marginLeft:"5rem"}}>------Screen------</h1>
//           <h4 style={{color:"black", marginLeft:"5rem"}}>Total Seats: {selectedSeats.length}</h4>
//           <h4 style={{color:"black",  marginLeft:"5rem"}}>Total Amount: ${totalAmount}</h4>
//           <button className="btn btn-primary" onClick={handleProceed}>Proceed to Payment</button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Seats;
