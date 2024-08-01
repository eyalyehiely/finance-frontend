// import axios from '../axiosConfig'
// import swal from 'sweetalert';
// import fetchExpensesData from '../expenses/fetchExpensesData';

// export default function saveEdit(token, editedExpense, editingExpenseId, setExpenses) {
//   if (!editedExpense || !token || !editingExpenseId) {
//     console.error('Invalid input to saveEdit:', { editedExpense, token, editingExpenseId });
//     return;
//   }

//   const editedData = {
//     payment_method: editedExpense.payment_method || '',
//     date_and_time: editedExpense.date_and_time || '',
//     name: editedExpense.name || '',
//     price: editedExpense.price ? String(editedExpense.price).replace(/,/g, '') : '',
//     credit_card_id: editedExpense.credit_card_id || '',
//     category: editedExpense.category || '',
//     expense_type: editedExpense.expense_type || '',
//   };

//   axios.put(`/expenses/edit_expense/${editingExpenseId}/`, editedData, {
//     headers: {
//       'content-type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     }
//   })
//     .then(response => {
//       if (response.data.status === 200) {
//         swal({
//           title: "Success!",
//           title: "הוצאה נשמרה בהצלחה !",
//           icon: "success",
//           timer:2000,
//           button: false,
//         });
//         setExpenses(expenses => expenses.map(expense => expense.id === editingExpenseId ? response.data.expense : expense));
//         fetchExpensesData(token, setExpenses);

//       } else {
//         console.log('Error:', response.data.message);
//         // Adjust error handling as needed
//       }
//     })
//     .catch(error => {
//       console.error('There was an error!', error);

//     });
// }

import axios from '../axiosConfig';
import swal from 'sweetalert';

export default async function saveEdit(token, editedExpense, editingExpenseId, setExpenses) {
  if (!editedExpense || !token || !editingExpenseId) {
    console.error('Invalid input to saveEdit:', { editedExpense, token, editingExpenseId });
    return;
  }

  const editedData = {
    payment_method: editedExpense.payment_method || '',
    date_and_time: editedExpense.date_and_time || '',
    name: editedExpense.name || '',
    price: editedExpense.price ? String(editedExpense.price).replace(/,/g, '') : '',
    credit_card_id: editedExpense.credit_card_id || '',
    category: editedExpense.category || '',
    expense_type: editedExpense.expense_type || '',
  };

  try {
    const response = await axios.put(`/expenses/edit_expense/${editingExpenseId}/`, editedData, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if (response.status === 200) {
      swal({
        title: "הוצאה נשמרה בהצלחה!",
        icon: "success",
        timer: 2000,
        button: false,
      });

      setExpenses(expenses => expenses.map(expense =>
        expense.id === editingExpenseId ? response.data.expense : expense
      ));
    } else {
      console.log('Error:', response.data.message);
    }
  } catch (error) {
    console.error('There was an error!', error);
    swal({
      title: "Ⅹ!שגיאה",
      text: error.response?.data?.message || "!שגיאת BACKEND",
      icon: "warning",
      button: "אישור",
    });
  }
}
