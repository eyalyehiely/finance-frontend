import axios from '../axiosConfig'
import getCurrentUserData from './getCurrentUserData';

export default function updateUser(token, setUser, data, handleClose) {
  axios.put(`/auth/edit_user/`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: '👤 משתמש עודכן בהצלחה!',
          icon: 'success',
          timer:2000,
          button: false,
        }).then(()=>{
          getCurrentUserData(token, setUser);
          window.location.reload()
          handleClose();
        })
       
      } else {
        console.log('Error:', response.data.message);

      }
    })
    .catch(error => {
      console.error('שגיאה!', error);
      swal({
        title: 'שגיאה!',
        text: 'שגיאה בעדכון משתמש !',
        icon: 'warning',
        button: 'אישור',
      });
    });
}
