import axios from '../axiosConfig';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function fetchData(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const navigate = useNavigate(); // Ensure useNavigate is imported and used

  axios.post('/auth/reset_password/', { email })
    .then((response) => {
      if (response.status === 200) {
        swal({
          title: "קישור נשלח בהצלחה",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          navigate('/signin');
        });
      } else {
        swal({
          title: "משתמש לא נמצא",
          icon: "warning",
          button: "אישור",
        });
      }
    })
    .catch((error) => {
      console.error('Error occurred:', error);
      swal({
        title: "שגיאה",
        text: "משהו השתבש, אנא נסה שוב",
        icon: "warning",
        button: "אישור",
      });
    });
}
