import axios from '../axiosConfig'
import swal from 'sweetalert';
import fetchSavingsData from './fetchSavingsData';

export default function addSaving(token, setSavings, data, handleClose) {
  axios.post('/savings/add_saving/', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    setSavings((prevSavings) => [...prevSavings, response.data]);
    swal({
      title: " 💰!חסכון נוספה בהצלחה",
      icon: "success",
      timer:2000,
      button: false,
    }).then(() => {
      handleClose();
      window.location.reload()
      fetchSavingsData(token, setSavings);
    });
  }).catch((error) => {
    console.error('Error:', error.response?.data?.message || error.message);
    swal({
      title: "!שגיאה ",
      icon: "warning",
      button: "אישור",
    });
  });
}
