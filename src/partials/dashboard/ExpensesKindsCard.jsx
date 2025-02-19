
import React, { useState, useEffect } from 'react';
import PieChart from '../../charts/PieChart';
import axios from '../../functions/axiosConfig'
import fetchCurrentMonthExpenses from '../../functions/expenses/fetchCurrentMonthExpenses';
import AddExpense from '../../pages/expenses/AddExpense';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


function ExpensesKindsCard() {
  const [creditCard, setCreditCard] = useState(null);
  const [debts, setDebts] = useState(null);
  const [cash, setCash] = useState(null);
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;


  function fetchData() {
    setLoading(true);
    axios.post('/expenses/fetch_user_expenses/',{},{
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
        setLoading(false);
        if (response.data.status === 200) {
          setCreditCard(response.data.credit_card);
          setDebts(response.data.debts);
          setCash(response.data.cash);
          setCheck(response.data.check);
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false);
        setError('An error occurred while fetching data.');
        console.error('There was an error!', error);
      });
  }



  
  // const total = creditCard + debts + cash + check
  const chartData = {
    labels: ['כרטיסי אשראי', 'חובות', 'מזומן','צ׳קים'],
    datasets: [
      {
        label: 'סכום:',
        data: [
          creditCard || 0, // Data for creditCard
          debts || 0,      // Data for debts
          cash  || 0,          // Placeholder data for the fourth dataset
          check || 0,

        ],
        backgroundColor: [
          tailwindConfig().theme.colors.emerald[400],
          tailwindConfig().theme.colors.amber[400],
          tailwindConfig().theme.colors.sky[400],
          tailwindConfig().theme.colors.indigo[500],

        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.emerald[500],
          tailwindConfig().theme.colors.amber[500],
          tailwindConfig().theme.colors.sky[500],
          tailwindConfig().theme.colors.indigo[600],

        ],
        borderWidth: 0,
      },
    ],
  };
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  useEffect(() => {
    if (token) {
        fetchCurrentMonthExpenses(token, setExpenses);
    }
}, [token]); 


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5 flex flex-col items-center">
        <AddExpense />
      </div>
      <div dir="rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2 text-center">
        הוצאות: {expenses} ₪ (חודשי)
        </div>
      
      {error && <div className="text-red-600 p-4 text-center">{error}</div>}
      {loading ? (
        <div className="text-center p-4">אין נתונים</div>
      ) : (
        <div className="flex justify-center">
          <PieChart data={chartData} width={389} height={220} />
        </div>
      )}
    </div>
  );
}

export default ExpensesKindsCard;
