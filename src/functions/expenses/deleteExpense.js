import axios from '../axiosConfig';
import swal from 'sweetalert';
import fetchExpensesData from './fetchExpensesData';

export default function deleteExpense(token, id, setExpenses) {
  swal({
    title: "האם אתה בטוח?",
    text: "ברגע שתלחץ על אישור לא יהיה ניתן לשחזר את המידע",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios.delete(`/expenses/delete_expense/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        swal({
          title: " 🗑️!הוצאה נמחק בהצלחה",
          icon: "success",
          timer: 2000,
          button: false,
        }).then(() => {
          // Refresh the data after deletion
          fetchExpensesData(token, setExpenses);
        });
      }).catch((error) => {
        console.error("Error deleting expense:", error);
        swal({
          title: "Ⅹ!שגיאה ",
          text: error.response?.data?.message || "שגיאת שרת!",
          icon: "warning",
          button: "אישור",
        });
      });
    } else {
      swal("הנתונים שלך בטוחים");
    }
  });
}
