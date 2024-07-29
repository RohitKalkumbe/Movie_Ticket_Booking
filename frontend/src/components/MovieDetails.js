import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieDetails.css"; // Import custom CSS

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [theater, setTheater] = useState("");
  const [timing, setTiming] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Retrieve the logged-in user ID from local storage
  console.log(id);
  console.log(userId);
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=${id}&apikey=45fde408`
        );
        console.log("API Response:", response.data); // Log the response for debugging
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details.");
      }
    };

    fetchMovie();
  }, [id]);

  const handleProceed = async () => {
    if (!state || !city || !theater || !timing || !date) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users/book", {
        userId,
        movieId: id,
        movieTitle: movie.Title,
        state,
        city,
        theater,
        timing,
        date
      });
      const dataToPass = btoa(JSON.stringify({
        movie,
        state,
        city,
        theater,
        timing,
        date,
      }));
      navigate(`/seats/${id}?dataToPass=${dataToPass}`);
    } catch (error) {
      console.error("Error saving booking:", error);
      setError("Failed to save booking. Please try again.");
    }
  };

  if (!movie) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container">
      <img
        src={movie.Poster}
        className="card-img-top movie-poster"
        alt={movie.Title}
      />
      <div className="movie-details-card">
        <div className="card-body">
          <h5 className="card-title">{movie.Title}</h5>
          <p className="card-text">{movie.Plot}</p>

          {error && <div className="text-danger mb-3">{error}</div>}

          <form>
            <div className="form-group">
              <label>State</label>
              <select
                className="form-control"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                <option value="" disabled>Select State</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
                {/* Add more states as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>City</label>
              <select
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="" disabled>Select City</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Houston">Houston</option>
                <option value="New York City">New York City</option>
                {/* Add more cities as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Theater</label>
              <select
                className="form-control"
                value={theater}
                onChange={(e) => setTheater(e.target.value)}
                required
              >
                <option value="" disabled>Select Theater</option>
                <option value="AMC">AMC</option>
                <option value="Regal">Regal</option>
                <option value="Cinemark">Cinemark</option>
                {/* Add more theaters as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Timing</label>
              <select
                className="form-control"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
                required
              >
                <option value="" disabled>Select Timing</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                {/* Add more timings as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={new Date().toISOString().split("T")[0]} // Ensure only future dates can be selected
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              style={{marginLeft:"0rem"}}
              onClick={handleProceed}
              
            >
              Proceed
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./MovieDetails.css"; // Import custom CSS

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [theater, setTheater] = useState("");
//   const [timing, setTiming] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId"); // Retrieve the logged-in user ID from local storage
//   console.log(id);
//   console.log(userId);
//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?i=${id}&apikey=45fde408`
//         );
//         console.log("API Response:", response.data); // Log the response for debugging
//         setMovie(response.data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//         setError("Failed to load movie details.");
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   const handleProceed = async () => {
//     if (!state || !city || !theater || !timing || !date) {
//       setError("Please fill in all the fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:5000/users/book", {
//         userId,
//         movieId: id,
//         movieTitle: movie.Title,
//         state,
//         city,
//         theater,
//         timing,
//         date
//       });
//       const dataToPass = encodeURIComponent(JSON.stringify({
//         movie,
//         state,
//         city,
//         theater,
//         timing,
//         date,
//       }));
//       navigate(
//         `/seats/${id}?dataToPass=${dataToPass}`
//       );
//     } catch (error) {
//       console.error("Error saving booking:", error);
//       setError("Failed to save booking. Please try again.");
//     }
//   };

//   if (!movie) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <img
//         src={movie.Poster}
//         className="card-img-top movie-poster"
//         alt={movie.Title}
//       />
//       <div className="movie-details-card">
//         <div className="card-body">
//           <h5 className="card-title">{movie.Title}</h5>
//           <p className="card-text">{movie.Plot}</p>

//           {error && <div className="text-danger mb-3">{error}</div>}

//           <form>
//             <div className="form-group">
//               <label>State</label>
//               <select
//                 className="form-control"
//                 value={state}
//                 onChange={(e) => setState(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select State
//                 </option>
//                 <option value="California">California</option>
//                 <option value="Texas">Texas</option>
//                 <option value="New York">New York</option>
//                 {/* Add more states as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>City</label>
//               <select
//                 className="form-control"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select City
//                 </option>
//                 <option value="Los Angeles">Los Angeles</option>
//                 <option value="Houston">Houston</option>
//                 <option value="New York City">New York City</option>
//                 {/* Add more cities as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Theater</label>
//               <select
//                 className="form-control"
//                 value={theater}
//                 onChange={(e) => setTheater(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select Theater
//                 </option>
//                 <option value="AMC">AMC</option>
//                 <option value="Regal">Regal</option>
//                 <option value="Cinemark">Cinemark</option>
//                 {/* Add more theaters as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Timing</label>
//               <select
//                 className="form-control"
//                 value={timing}
//                 onChange={(e) => setTiming(e.target.value)}
//                 required
//               >
//                 <option value="" disabled>
//                   Select Timing
//                 </option>
//                 <option value="10:00 AM">10:00 AM</option>
//                 <option value="1:00 PM">1:00 PM</option>
//                 <option value="4:00 PM">4:00 PM</option>
//                 <option value="7:00 PM">7:00 PM</option>
//                 {/* Add more timings as needed */}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 min={new Date().toISOString().split("T")[0]} // Ensure only future dates can be selected
//               />
//             </div>
//             <button
//               type="button"
//               className="btn btn-primary mt-3"
//               onClick={handleProceed}
//             >
//               Proceed
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './MovieDetails.css'; // Import custom CSS

// const MovieDetails = () => {
//   const { id } = useParams();
//   const [movie, setMovie] = useState(null);
//   const [state, setState] = useState('');
//   const [city, setCity] = useState('');
//   const [date, setDate] = useState('');
//   const [timing, setTiming] = useState('');

//   const [theater, setTheater] = useState('');
//   const navigate = useNavigate();
//   const userId = localStorage.getItem('userId'); // Retrieve the logged-in user ID from local storage

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=45fde408`);
//         console.log('API Response:', response.data); // Log the response for debugging
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//       }
//     };

//     fetchMovie();
//   }, [id]);

//   // const handleProceed = () => {

//   //   navigate('/seats/:id', { state: { movie, state, city, theater, timing, date } });
//   // };
//   const handleProceed = async () => {
//     try {
//       await axios.post('/book', {
//         userId,
//         movieId: id,
//         movieTitle: movie.Title,
//         state,
//         city,
//         theater,
//         timing,
//         date
//       });
//       navigate(`/seats/${id}`, { state: { movie, state, city, theater, timing, date } });
//     } catch (error) {
//       console.error('Error saving booking:', error);
//     }
//   };

//   if (!movie) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container">

//         <img src={movie.Poster} className="card-img-top movie-poster" alt={movie.Title} />
//       <div className=" movie-details-card">
//         <div className="card-body">
//           <h5 className="card-title">{movie.Title}</h5>
//           <p className="card-text">{movie.Plot}</p>

//           <form>
//   <div className="form-group">
//     <label>State</label>
//     <select
//       className="form-control"
//       value={state}
//       onChange={(e) => setState(e.target.value)}
//       required
//     >
//       <option value="" disabled>Select State</option>
//       <option value="California">California</option>
//       <option value="Texas">Texas</option>
//       <option value="New York">New York</option>
//       {/* Add more states as needed */}
//     </select>
//   </div>
//   <div className="form-group">
//     <label>City</label>
//     <select
//       className="form-control"
//       value={city}
//       onChange={(e) => setCity(e.target.value)}
//       required
//     >
//       <option value="" disabled>Select City</option>
//       <option value="Los Angeles">Los Angeles</option>
//       <option value="Houston">Houston</option>
//       <option value="New York City">New York City</option>
//       {/* Add more cities as needed */}
//     </select>
//   </div>
//   <div className="form-group">
//     <label>Theater</label>
//     <select
//       className="form-control"
//       value={theater}
//       onChange={(e) => setTheater(e.target.value)}
//       required
//     >
//       <option value="" disabled>Select Theater</option>
//       <option value="AMC">AMC</option>
//       <option value="Regal">Regal</option>
//       <option value="Cinemark">Cinemark</option>
//       {/* Add more theaters as needed */}
//     </select>
//   </div>
//   <div className="form-group">
//     <label>Timing</label>
//     <select
//       className="form-control"
//       value={timing}
//       onChange={(e) => setTiming(e.target.value)}
//       required
//     >
//       <option value="" disabled>Select Timing</option>
//       <option value="10:00 AM">10:00 AM</option>
//       <option value="1:00 PM">1:00 PM</option>
//       <option value="4:00 PM">4:00 PM</option>
//       <option value="7:00 PM">7:00 PM</option>
//       {/* Add more timings as needed */}
//     </select>
//   </div>
//   <div className="form-group">
//     <label>Date</label>
//     <input
//       type="date"
//       className="form-control"
//       value={date}
//       onChange={(e) => setDate(e.target.value)}
//       required
//       min={new Date().toISOString().split('T')[0]} // Ensure only future dates can be selected
//     />
//   </div>
//   <button type="button" className="btn btn-primary"  style={{marginLeft:"0rem"}} onClick={handleProceed}>
//     Proceed
//   </button>
// </form>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;


