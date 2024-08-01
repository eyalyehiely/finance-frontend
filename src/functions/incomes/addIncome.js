// import axios from '../axiosConfig'
// import swal from 'sweetalert';
// import fetchIncomesData from './fetchIncomesData';

// export default function addIncome(token, setIncomes, data, handleClose) {
//   axios.post('/incomes/add_income/', data, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((response) => {
//     setIncomes((prevIncomes) => [...prevIncomes, response.data]);
//     swal({
//       title: " 💰!הכנסה נוספה בהצלחה",
//       icon: "success",
//       timer:2000,
//       button: false,
//     }).then(() => {
//       handleClose();
//       fetchIncomesData(token, setIncomes);
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

import axios from '../axiosConfig';
import swal from 'sweetalert';
import fetchIncomesData from './fetchIncomesData';

export default function addIncome(token, setIncomes, data, handleClose) {
  axios.post('/incomes/add_income/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.data.status === 200) {
      // Assuming response.data contains the new income object
      setIncomes((prevIncomes) => [...prevIncomes, response.data]);

      swal({
        title: "💰!הכנסה נוספה בהצלחה",
        icon: "success",
        timer: 2000,
        button: false,
      }).then(() => {
        handleClose();
        // Optionally re-fetch data if needed
        fetchIncomesData(token, setIncomes);
      });
    } else {
      throw new Error(response.data.message || "Error adding income");
    }
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!שגיאה",
      text: error.response?.data?.message || "שגיאת BACKEND",
      icon: "warning",
      button: "אישור",
    });
  });
}

