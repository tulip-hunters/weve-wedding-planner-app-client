// function ReservationDetailsPage({ title, weddingDate, guestsNumber }) {
//     return (
//       <div
//         className='card  h-100 m-5'
//         style={{
//           width: "20rem",
//           borderRadius: "2rem ",
//           border: ".2rem solid white",
//         }}
//       >
//         <div
//           className='card-header bg-dark text-white fs-3'
//           style={{ borderRadius: "1.9rem 2rem 0rem 0rem" }}
//         >
//           {venue ? venue.name : <p>Deleted Venue</p>}
//         </div>
//         <div className='card-body'>
//           <div className='row'>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>Your Wedding Title:</p>
//             </div>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>{title}</p>
//             </div>
//           </div>
//           <div className='row'>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>CWedding Date:</p>
//             </div>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>{new Date(weddingDate).toDateString("lookup")}</p>
//             </div>
//           </div>
//           <div className='row'>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>Number of Guests:</p>
//             </div>
//             <div className='col-12 col-md-6 col-lg-6 mb-2'>
//               <p>{guestsNumber}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default ReservationDetailsPage;