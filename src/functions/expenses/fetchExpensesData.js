import axios from '../axiosConfig';
import swal from 'sweetalert';

export default async function fetchExpensesData(token, setExpenses) {
  try {
    const response = await axios.post('/expenses/get_all_expenses/', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    // Check the status of the response
    if (response.data.status === 200) {
      setExpenses(response.data.all_expenses);
    } else {
      console.error('Frontend Error:', response.data.message);
      swal({
        title: "שגיאה!",
        text: `Frontend Error: ${response.data.message}`,
        icon: "warning",
        button: "אישור",
      });
    }
  } catch (error) {
    console.error('Backend Error:', error);
    swal({
      title: "Error!",
      text: `Backend Error: ${error.message}`,
      icon: "error",
      button: "OK",
    });
  }
}
