import React, { useState, useEffect } from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import fetchCurrentMonthExpenses from '../../functions/expenses/fetchCurrentMonthExpenses';
import fetchCurrentMonthIncomes from '../../functions/incomes/fetchCurrentMonthIncomes';
import AddIncome from '../../pages/incomes/AddIncome';

function IncomesAndExpensesCard() {
  const [expenses, setExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);
  const [loading, setLoading] = useState(true);  // Start with loading set to true
  const [error, setError] = useState(null);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  // Fetch expenses data
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        await fetchCurrentMonthExpenses(token, setExpenses);
      } catch (error) {
        setError('Failed to fetch expenses.');
      }
    };

    fetchExpenses();
  }, [token]);  // Added token as dependency

  // Fetch incomes data
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        await fetchCurrentMonthIncomes(token, setLoading, setIncomes, setError);
      } catch (error) {
        setError('Failed to fetch incomes.');
      }
    };

    fetchIncomes();
  }, [token]);  // Added token as dependency

  // Calculate the difference between incomes and expenses
  const difference = (incomes || 0) - (expenses || 0);

  // Define the chart data
  const chartData = {
    labels: ['הוצאות', 'הכנסות', 'הפרש'],
    datasets: [
      {
        data: [
          expenses || 0, // Data for expenses
          incomes || 0,  // Data for incomes
          difference,    // Data for difference
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',  // Color for expenses
          'rgb(75, 192, 192)',  // Color for incomes
          'rgb(255, 255, 0)',   // Color for difference
        ],
        hoverBackgroundColor: [
          'rgb(255, 99, 132)',  // Color for expenses
          'rgb(75, 192, 192)',  // Color for incomes
          'rgb(255, 255, 0)',   // Color for difference
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <AddIncome />
        <h2 dir="rtl" className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          הוצאות vs הכנסות (חודשי)
        </h2>
      </header>
      {error && <div className="text-red-600 p-4">{error}</div>}
      {loading ? (
        <div className="text-center p-4">טוען נתונים...</div>
      ) : (
        <DoughnutChart data={chartData} width={389} height={260} />
      )}
    </div>
  );
}

export default IncomesAndExpensesCard;
