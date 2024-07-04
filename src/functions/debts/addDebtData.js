import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchDebtData from './fetchDebtData';

export default function addDebtData(token, setDebts, data, handleClose) {
  axios.post('/debts/add_debt/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setDebts((prevDebts) => [...prevDebts, response.data]);
    swal({
      title: " !חוב נוסף בהצלחה",
      icon: "success",
      timer:2000,
      button: false,
    }).then(() => {
      handleClose();
      handleClose
      fetchDebtData(token,setDebts)
     
    });
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "Ⅹ!שגיאה ",
      icon: "warning",
      button: "אישור",
    });
  });
}
