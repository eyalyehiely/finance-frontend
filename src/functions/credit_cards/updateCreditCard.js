import axios from '../axiosConfig'
import getCreditCardData from './getCreditCardData';

export default function updateCreditCard(token, setCreditCards, editingCardId, data, handleClose) {
  axios.put(`cards/edit_card/${editingCardId}/`, data, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      if (response.data.status === 200) {
        swal({
          title: 'כרטיס התעדכן בהצלחה!',
          icon: 'success',
          timer:2000,
          button: false,
        }).then(()=>{
          getCreditCardData(token, setCreditCards);
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
        title: 'שגיאה בעדכון כרטיס האשראי!',
        icon: 'warning',
        button: 'אישור',
      });
    });
}
