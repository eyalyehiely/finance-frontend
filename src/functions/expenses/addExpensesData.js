import axios from '../axiosConfig';
import swal from 'sweetalert';
import fetchExpensesData from './fetchExpensesData';

export default function addExpensesData(token, setExpenses, data, handleClose) {
  axios.post('/expenses/add_expense/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    // Add the new expense to the state
    setExpenses((prevExpenses) => [...prevExpenses, response.data]);

    swal({
      title: " 💰!הוצאה נוספה בהצלחה",
      icon: "success",
      timer: 2000,
      button: false,
    }).then(() => {
      handleClose();
      fetchExpensesData(token, setExpenses);
    });
  })
  .catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!שגיאה ",
      text: "!שגיאת BACKEND",
      icon: "warning",
      button: "אישור",
    });
  });
}
