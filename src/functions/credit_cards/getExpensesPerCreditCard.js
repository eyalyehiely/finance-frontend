import axios from '../axiosConfig';
import swal from 'sweetalert';

export default function getExpensesPerCreditCard(token, setCardExpenses) {
  axios.post('cards/get_expenses_per_credit_card/', {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(response => {
    if (response.data.status === 200) {
      setCardExpenses(response.data.credit_cards_expenses);
    } else {
      console.log('Error:', response.data.message);
      swal({
        title: "שגיאה",
        text: response.data.message,
        icon: "warning",
        button: "אישור",
      });
    }
  })
  .catch(error => {
    console.error('There was an error!', error);
    swal({
      title: "שגיאה",
      text: "שגיאה בשרת",
      icon: "warning",
      button: "אישור",
    });
  });
}
