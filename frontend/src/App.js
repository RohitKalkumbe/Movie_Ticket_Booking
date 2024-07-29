  import React from 'react';
  import { Routes, Route, Link } from 'react-router-dom';
  import Login from './components/Login';
  import Register from './components/Register';
  import Movies from './components/Movies';
  import MovieDetails from './components/MovieDetails';
  import Seats from './components/Seats';
  import Payment from './components/Payment';
  import StatusBooking from './components/StatusBooking';

  function App() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" style={{ width: '100%', position: 'fixed' }}>
          <Link className="navbar-brand" to="/movies">Movie Booking</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movies">Movies</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moviedetails/:id">MovieDetails</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/seats/:id">Seats</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/payment/:id">Payment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/statusbooking/:id">Status</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/moviedetails/:id" element={<MovieDetails />} />
          <Route path="/seats/:id" element={<Seats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/statusbooking" element={<StatusBooking />} />
        </Routes>
      </div>
    );
  }

  export default App;



// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
//  import Login from './components/Login';
//  import Register from './components/Register';
//  import Movies from './components/Movies';
// import MovieDetails from './components/MovieDetails';
//  import Seats from './components/Seats';
// import Payment from './components/Payment';
// import StatusBooking from './components/StatusBooking';
// function App() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5" style={{width : "100%", position:"fixed"}}>
//         <Link className="navbar-brand" to="/login">Movie Booking</Link>
//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/register">Register</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/movies">Movies</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/moviedetails/:id">MovieDetails</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/login">Logout</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/admin">Admin</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/seats/:id">Seats</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/payment/:id">Payment</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/statusbooking/:id">Status</Link>
//             </li>
//           </ul>
//         </div>
//       </nav>
//       <Routes>
//         {/* <Route path="/" element={<Login />} /> */}
//          <Route path="/login" element={<Login />} /> 
//         <Route path="/register" element={<Register />} />
//         <Route path="/movies" element={<Movies/>} />
//         <Route path="/moviedetails/:id" element={<MovieDetails/>}></Route>
//          <Route path="/seats/:id" element={<Seats />} />
//         <Route path="/payment" element={<Payment />} />
//          <Route path="/statusbooking"element={<StatusBooking />} /> 
//       </Routes>
//     </div>
//   );
// }

// export default App;
