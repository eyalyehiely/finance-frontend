
// import axios from '../axiosConfig'
import swal from 'sweetalert';

// export default function fetchDebtData(token,setDebts) {
//     axios.post('/debts/get_all_debts/', {}, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       }
//     }).then(response => {
//       if (response.data.status === 200) {
//         setDebts(response.data.all_debts);

//       } else {
//         console.log('Error:', response.data.message);
//         swal({
//           title: "Ⅹ!שגיאה ",
//           text: response.data.message,
//           icon: "warning",
//           button: "אישור",
//         });
//       }
//     }).catch(error => {
//       console.error('There was an error!', error);
//       swal({
//         title: "Ⅹ!שגיאה ",
//         text: "An error occurred while fetching data.",
//         icon: "warning",
//         button: "אישור",
//       });
//     });
//   }



export default function fetchDebtData(token, setDebts) {
  fetch('/debts/get_all_debts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}) // Send empty object as the body
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 200) {
      setDebts(data.all_debts); // Set the debt data to the state
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
    console.error('There was an error!', error);
    swal({
      title: "Ⅹ!שגיאה ",
      text: "An error occurred while fetching data.",
      icon: "warning",
      button: "אישור",
    });
  });
}
