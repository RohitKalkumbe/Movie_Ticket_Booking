// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Movies.css";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [defaultMovies, setDefaultMovies] = useState([]);

//   const navigate = useNavigate();

//   // Replace 'your_api_key' with your actual OMDb API key
//   const API_KEY = '45fde408';

//   useEffect(() => {
//     const fetchDefaultMovies = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
//         );
//         if (response.data.Response === "True") {
//           setDefaultMovies(response.data.Search || []);
//           setMovies(response.data.Search || []); // Initialize movies with default movies
//         } else {
//           setError(response.data.Error);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDefaultMovies();
//   }, []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (searchQuery) {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
//           );
//           console.log('Search Response:', response.data); // Debugging line
//           if (response.data.Response === "True") {
//             setMovies(response.data.Search || []);
//             setError(null);
//           } else {
//             setMovies([]);
//             setError(response.data.Error);
//           }
//           setLoading(false);
//           setSearchQuery("");
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//           setSearchQuery("");
//         }
//       } else {
//         setMovies(defaultMovies);
//       }
//     };

//     fetchMovies();
//   }, [searchQuery, defaultMovies]);

//   useEffect(() => {
//     if (error === "Movie not found!") {
//       setTimeout(() => {
//         navigate("/movies");
//       }, 2000); // Redirect after 2 seconds
//     }
//   }, [error, navigate]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container mt-6">
//       <div className="row" style={{ marginTop: "10rem" }}>
//         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search for movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={() => setSearchQuery(searchTerm)}>Search</button>
//         </div>
  
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//               <div>
//                 <img
//                   src={movie.Poster}
//                   className="card-img-top"
//                   alt={movie.Title}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.Title}</h5>
//                   <p className="card-text">{movie.Year}</p>
//                   <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center">
//             {error === "Movie not found!" ? 'No movies found' : 'No movies found'}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// export default Movies;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [noMoviesFound, setNoMoviesFound] = useState(false); // **New state for popup visibility**
  
  const API_KEY = '45fde408';

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
        );
        if (response.data.Response === "True") {
          setDefaultMovies(response.data.Search || []);
          setMovies(response.data.Search || []); // Initialize movies with default movies
        } else {
          setError(response.data.Error);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDefaultMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery) {
        setLoading(true);
        setNoMoviesFound(false); // **Reset noMoviesFound state before fetching**
        try {
          const response = await axios.get(
            `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
          );
          if (response.data.Response === "True") {
            setMovies(response.data.Search || []);
            setError(null);
          } else {
            setMovies(defaultMovies); // **Keep default movies**
            setError(response.data.Error);
            setNoMoviesFound(true); // **Show popup message**
          }
          setLoading(false);
          setSearchQuery("");
        } catch (error) {
          setError(error.message);
          setLoading(false);
          setNoMoviesFound(true); // **Show popup message**
        }
      }
    };

    fetchMovies();
  }, [searchQuery, defaultMovies]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mt-6">
      <div className="row" style={{ marginTop: "10rem" }}>
        <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchQuery(searchTerm)} className="btn-primary"  style={{marginLeft:"0rem"}}>Search</button>
          {noMoviesFound && (
            <div className="text-center text-danger mt-2">No movies found</div> // **Popup message**
          )}
        </div>
  
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div>
                <img
                  src={movie.Poster}
                  className="card-img-top"
                  alt={movie.Title}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">{movie.Year}</p>
                  <Link to={`/moviedetails/${movie.imdbID}`} className="btn btn-primary" style={{marginLeft:"1rem"}}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No movies available</div>
        )}
      </div>
    </div>
  );
}

export default Movies;


//? working2
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Movies.css";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [defaultMovies, setDefaultMovies] = useState([]);
//   const [noMoviesFound, setNoMoviesFound] = useState(false); // Correct state variable name

//   // Replace 'your_api_key' with your actual OMDb API key
//   const API_KEY = '45fde408';

//   useEffect(() => {
//     const fetchDefaultMovies = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
//         );
//         if (response.data.Response === "True") {
//           setDefaultMovies(response.data.Search || []);
//           setMovies(response.data.Search || []); // Initialize movies with default movies
//         } else {
//           setError(response.data.Error);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDefaultMovies();
//   }, []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (searchQuery) {
//         setLoading(true);
//         setNoMoviesFound(false); // Reset noMoviesFound state before fetching
//         try {
//           const response = await axios.get(
//             `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
//           );
//           console.log('Search Response:', response.data); // Debugging line
//           if (response.data.Response === "True") {
//             setMovies(response.data.Search || []);
//             setError(null);
//           } else {
//             setMovies([]);
//             setError(response.data.Error);
//             setNoMoviesFound(true); // Set noMoviesFound to true if no movies found
//           }
//           setLoading(false);
//           setSearchQuery("");
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//           setNoMoviesFound(true); // Handle errors and set noMoviesFound to true
//         }
//       } 
//     };

//     fetchMovies();
//   }, [searchQuery, defaultMovies]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container mt-6">
//       <div className="row" style={{ marginTop: "10rem" }}>
//         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search for movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={() => setSearchQuery(searchTerm)} className="btn btn-primary mt-2">Search</button>

//           {noMoviesFound && (
//             <div className="text-center text-danger mt-2">No movies found</div>
//           )}
//         </div>
  
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//               <div>
//                 <img
//                   src={movie.Poster}
//                   className="card-img-top"
//                   alt={movie.Title}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.Title}</h5>
//                   <p className="card-text">{movie.Year}</p>
//                   <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           !noMoviesFound && (
//             <div className="text-center">No movies available</div>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default Movies;



//! working1 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Movies.css";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [defaultMovies, setDefaultMovies] = useState([]);
//   const [noMovieFound, setNoMovieFound] = useState(false);

//   // Replace 'your_api_key' with your actual OMDb API key
//   const API_KEY = '45fde408';

//   useEffect(() => {
//     const fetchDefaultMovies = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
//         );
//         if (response.data.Response === "True") {
//           setDefaultMovies(response.data.Search || []);
//           setMovies(response.data.Search || []); // Initialize movies with default movies
//         } else {
//           setError(response.data.Error);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDefaultMovies();
//   }, []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (searchQuery) {
//         setLoading(true);
//         setNoMovieFound(false); // Resset noMoviesFound state before fetching
//         try {
//           const response = await axios.get(
//             `http://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`
//           );
//           console.log('Search Response:', response.data); // Debugging line
//           if (response.data.Response === "True") {
//             setMovies(response.data.Search || []);
//             setError(null);
//           } else {
//             setMovies([]);
//             setError(response.data.Error);
//             setNoMovieFound(true);//?Set noMovieFound to true if no movies found
//           }
//           setLoading(false);
//           setSearchQuery("");
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//           //setSearchQuery("");
//           setNoMovieFound(true);
//         }
//       } 
//     };

//     fetchMovies();
//   }, [searchQuery, defaultMovies]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }

//   return (
//     <div className="container mt-6">
//       <div className="row" style={{ marginTop: "10rem" }}>
//         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search for movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={()=>setSearchQuery(searchTerm)}>Search</button>

//           {noMovieFound && (
//             <div className="text-center text-danger mt-2">No movies found</div>
//           )}
//         </div>
  
//     {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//               <div>
//                 <img
//                   src={movie.Poster}
//                   className="card-img-top"
//                   alt={movie.Title}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.Title}</h5>
//                   <p className="card-text">{movie.Year}</p>
//                   <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center"> <p>No movies found</p></div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Movies;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Movies.css";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [defaultMovies, setDefaultMovies] = useState([]);

//   // Replace 'your_api_key' with your actual OMDb API key
//   const API_KEY = '45fde408';

//   useEffect(() => {
//     const fetchDefaultMovies = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
//         );
//         if (response.data.Response === "True") {
//           setDefaultMovies(response.data.Search || []);
//         } else {
//           setError(response.data.Error);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchDefaultMovies();
//   }, []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (searchTerm) {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
//           );
//           if (response.data.Response === "True") {
//             setMovies(response.data.Search || []);
//           } else {
//             setError(response.data.Error);
//             setMovies([]);
//           }
//           setLoading(false);
//         } catch (error) {
//           setError(error.message);
//           setLoading(false);
//         }
//       } else {
//         setMovies(defaultMovies);
//       }
//     };

//     fetchMovies();
//   }, [searchTerm, defaultMovies]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }

//   return (
//     <div className="container mt-6">
//       <div className="row" style={{ marginTop: "10rem" }}>
//         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search for movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//               <div>
//                 <img
//                   src={movie.Poster}
//                   className="card-img-top"
//                   alt={movie.Title}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{movie.Title}</h5>
//                   <p className="card-text">{movie.Year}</p>
//                   <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center">No movies found</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Movies;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Movies.css";

// function Movies() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Replace 'your_api_key' with your actual OMDb API key
//   const API_KEY = '45fde408';
  
//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(
//           `http://www.omdbapi.com/?s=family&apikey=${API_KEY}`
//         );
//         if (response.data.Response === "True") {
//           setMovies(response.data.Search || []); // Ensure movies is always an array
//         } else {
//           setError(response.data.Error);
//         }
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-danger">Error: {error}</div>;
//   }

//   return (
//     <div className="container mt-6 ">
//       <div className="row " style={{ marginTop: "10rem" }}>
//         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
//         {movies.map((movie) => (
//           <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
//             <div>
//               <img
//                 src={movie.Poster}
//                 className="card-img-top"
//                 alt={movie.Title}
//                 style={{ width: '100%', height: 'auto' }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{movie.Title}</h5>
//                 <p className="card-text">{movie.Year}</p>
//                 <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Movies;



// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./Movies.css";

// // function Movies() {
// //   const [movies, setMovies] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Replace 'your_api_key' with your actual OMDb API key
// //   const API_KEY = '45fde408';
  
// //   useEffect(() => {
// //     const fetchMovies = async () => {
// //       try {
// //         const response = await axios.get(
// //           ` http://www.omdbapi.com/?i=tt3896198&apikey=45fde408`
// //         );
// //         if (response.data.Response === "True") {
// //           setMovies(response.data.Search);
// //         } else {
// //           setError(response.data.Error);
// //         }
// //         setLoading(false);
// //       } catch (error) {
// //         setError(error.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchMovies();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-center text-danger">Error: {error}</div>;
// //   }

// //   return (
// //     <div className="container mt-6 ">
// //       <div className="row " style={{ marginTop: "10rem" }}>
// //         <h2 className="mb-4 text-center" style={{ color: "black" }}>Movies</h2>
// //         {movies.map((movie) => (
// //           <div key={movie.imdbID} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
// //             <div>
// //               <img
// //                 src={movie.Poster}
// //                 className="card-img-top"
// //                 alt={movie.Title}
// //                 style={{ width: '100%', height: 'auto' }}
// //               />
// //               <div className="card-body">
// //                 <h5 className="card-title">{movie.Title}</h5>
// //                 <p className="card-text">{movie.Year}</p>
// //                 <Link to={`movies/${movie.imdbID}`} className="btn btn-primary">
// //                   View Details
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Movies;



// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Link } from "react-router-dom";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import "./Movies.css";

// // // function Movies() {
// // //   const [movies, setMovies] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchMovies = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           "https://api.sampleapis.com/movies/family"
// // //         );
// // //         setMovies(response.data);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         setError(error.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchMovies();
// // //   }, []);

// // //   if (loading) {
// // //     return <div className="text-center">Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div className="text-center text-danger">Error: {error}</div>;
// // //   }

// // //   return (
// // //     <div className="container mt-6 ">
   
// // //       <div className="row " style={{marginTop:"10rem"}}>
// // //       <h2 className="mb-4 text-center" style={{color:"black"}}>Movies</h2>
// // //         {movies.map((movie) => (
// // //           <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
// // //             <div>
// // //               <img
// // //                 src={movie.posterURL}
// // //                 className="card-img-top"
// // //                 alt={movie.title}
// // //               />
// // //               <div className="card-body">
// // //                 <h5 className="card-title">{movie.title}</h5>
// // //                 <p className="card-text">{movie.description}</p>
// // //                 <Link to={`movies/${movie.id}`} className="btn btn-primary">
// // //                   View Details
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Movies;
