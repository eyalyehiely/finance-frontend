// import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetch from 'node-fetch';
import fetchDebtData from './fetchDebtData';

// export default function addDebtData(token, setDebts, data, handleClose) {
//   axios.post('/debts/add_debt/', data, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     setDebts((prevDebts) => [...prevDebts, response.data]);
//     swal({
//       title: " !חוב נוסף בהצלחה",
//       icon: "success",
//       timer:2000,
//       button: false,
//     }).then(() => {
//       handleClose();
//       handleClose
//       fetchDebtData(token,setDebts)
     
//     });
//   }).catch((error) => {
//     console.error('Error:', error.response?.data?.message || error.message);
//     swal({
//       title: "Ⅹ!שגיאה ",
//       icon: "warning",
//       button: "אישור",
//     });
//   });
// }



export default function addDebtData(token, setDebts, data, handleClose) {
  fetch('/debts/add_debt/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data) // Send the data object as JSON
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 201) { // Check if the response status is Created (201)
      setDebts(prevDebts => [...prevDebts, data]); // Add new debt to the state
      swal({
        title: " !חוב נוסף בהצלחה",
        icon: "success",
        timer: 2000,
        button: false,
      }).then(() => {
        handleClose(); // Close the modal
        fetchDebtData(token, setDebts); // Fetch latest debt data
      });
    } else {
      console.log('Error:', data.message || 'Unknown error');
      swal({
        title: "Ⅹ!שגיאה ",
        text: data.message || 'Unknown error occurred.',
        icon: "warning",
        button: "אישור",
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    swal({
      title: "Ⅹ!שגיאה ",
      text: "An error occurred while adding debt data.",
      icon: "warning",
      button: "אישור",
    });
  });
}
