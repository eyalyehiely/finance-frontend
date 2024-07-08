import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import CreditCardLogo from '../component/CreditCardLogo';
import Rights from '../../components/Rights';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData';
import deleteCard from '../../functions/credit_cards/deleteCard';
import EditCard from './EditCard';
import AddCreditCard from './AddCreditCard';
import axios from '../../functions/axiosConfig';
import { Button } from 'react-bootstrap';

function CreditCards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    axios.post(`/expenses/fetch_user_expenses/`, {}, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      if (response.data.status === 200) {
        setExpenses(response.data.credit_card);
      } else {
        console.log('Error fetching expenses');
      }
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }, [token]);

  useEffect(() => {
    getCreditCardData(token, setCreditCards);
  }, [token]);

  const getExpensesForCard = (cardId) => {
    const cardExpenses = expenses.filter(expense => expense.card_id === cardId);
    const totalExpenses = cardExpenses.reduce((total, expense) => total + expense.amount, 0);
    return totalExpenses;
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">
                {/* Left: Title */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">הכרטיסים שלי ✨</h1>
                  <AddCreditCard />
                </div>
              </div>

              {/* Filters */}
              <div className="mb-5">
                <ul className="flex flex-wrap -m-1">
                  <li className="m-1">
                    <span className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">כל הכרטיסים {creditCards.length} </span>
                  </li>
                </ul>
              </div>

              {/* Credit cards */}
              {creditCards.map((card, index) => (
                <div className="space-y-2" key={card.id}>
                  {/* Cards */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" id="credit_card" name="radio-buttons" className="peer sr-only" value={card.id} defaultChecked />
                    
                    <div className="p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
                      <div className="grid grid-cols-12 items-center gap-x-2">
                        {/* Card decorate */}
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
                          <CreditCardLogo cardName={card.name} />

                          <div>
                            <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{card.name}</div>
                            <div className="text-xs">**{card.last_four_digits}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-6 order-1 sm:order-none sm:col-span-4 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-4">
                          <div className="text-sm">₪{getExpensesForCard(card.id)} / ₪{card.line_of_credit}</div>
                        </div>
                        {/* Card status */}
                        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                          <div className={`text-xs inline-flex font-medium ${card.status === 'Blocked' ? 'bg-red-100 dark:bg-red-400/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'} rounded-full text-center px-2.5 py-1`}>
                            {card.status}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true" />
                  </label>
                </div>
              ))}
            </div>

            {creditCards.length > 0 ? (
              creditCards.map((card, index) => (
                <div key={index}>
                  {/* Sidebar */}
                  <div>
                    <div className="lg:sticky lg:top-16 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 lg:w-[390px] lg:h-[calc(100dvh-64px)]">
                      <div className="py-8 px-4 lg:px-8">
                        <div className="max-w-sm mx-auto lg:max-w-none">
                          <div className="text-slate-800 dark:text-slate-100 font-semibold text-center mb-6">סיכום נתוני אשראי</div>

                          {/* Credit Card */}
                          <div className="relative aspect-[7/4] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden">
                            {/* Illustration on card */}
                            <div className="absolute inset-0 w-full h-full" aria-hidden="true">
                              <svg className="w-full h-full" width="326" height="190" viewBox="0 0 326 190" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  {/* SVG Filters here */}
                                </defs>
                                <g fill="none" fillRule="evenodd">
                                  {/* SVG Content here */}
                                </g>
                              </svg>
                            </div>
                            <div className="relative h-full flex flex-col justify-between">
                              {/* Logo on card */}
                              <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <defs>
                                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="icon1-b">
                                    <stop stopColor="#FFF" offset="0%" />
                                    <stop stopColor="#E0E0E0" offset="100%" />
                                  </linearGradient>
                                  <circle id="icon1-a" cx="16" cy="16" r="16" />
                                </defs>
                                <g transform="translate(0 .5)" fill="none" fillRule="evenodd">
                                  <use fill="#000" xlinkHref="#icon1-a" />
                                  <use fill="url(#icon1-b)" xlinkHref="#icon1-a" />
                                </g>
                              </svg>
                              {/* Number */}
                              <div className="text-lg font-semibold text-slate-100 tracking-widest mb-5">{card.last_four_digits}</div>
                              <div className="flex justify-between space-x-3">
                                {/* Name */}
                                <div className="text-xs uppercase font-semibold text-slate-100 tracking-widest">{card.name}</div>
                                {/* Expiry */}
                                <div className="text-xs uppercase font-semibold text-slate-100 tracking-widest">{card.expiry_date}</div>
                              </div>
                            </div>
                          </div>

                          {/* Expenses */}
                          <div className="mt-6">
                            <div className="text-xs font-semibold text-slate-400 uppercase mb-4">ההוצאות שלי:</div>
                            <ul className="mb-6">
                              {expenses.filter(expense => expense.card_id === card.id).map((expense, idx) => (
                                <li className="flex justify-between items-center py-3 border-b border-slate-200 dark:border-slate-700" key={idx}>
                                  <div className="text-sm">{expense.description}</div>
                                  <div className="text-sm font-medium text-slate-800 dark:text-slate-100">₪{expense.amount}</div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* Edit and delete */}
                          <div className="grid grid-flow-col sm:auto-cols-max justify-end sm:justify-start gap-2">
                            <Button onClick={() => deleteCard(card.id)}>מחק כרטיס</Button>
                            <EditCard cardId={card.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">לא נמצאו כרטיסי אשראי</div>
            )}
          </div>
        </main>

        <Rights />
      </div>
    </div>
  );
}

export default CreditCards;
