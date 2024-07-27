import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import CreditCardLogo from '../component/CreditCardLogo';
import Rights from '../../components/Rights';
import getCreditCardData from '../../functions/credit_cards/getCreditCardData';
import deleteCard from '../../functions/credit_cards/deleteCard';
import EditCard from './EditCard';
import AddCreditCard from './AddCreditCard';
import { Button } from 'react-bootstrap';
import getExpensesPerCreditCard from '../../functions/credit_cards/getExpensesPerCreditCard';
import checkToken from '../../functions/checkToken';

function CreditCards() {
  checkToken()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [cardExpenses, setCardExpenses] = useState([]);
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      getCreditCardData(token, setCreditCards);
      getExpensesPerCreditCard(token, setCardExpenses);
    }
  }, [token]);

  // Create a map for quick lookups of card expenses by card ID
  const cardExpensesMap = cardExpenses.reduce((acc, card) => {
    acc[card.id] = card.total_amount; // Map card ID to total amount
    return acc;
  }, {});

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
                    <span className="inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm bg-indigo-500 text-white duration-150 ease-in-out">
                      כל הכרטיסים {creditCards.length}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Credit cards */}
              {creditCards.map((card) => (
                <div className="space-y-2" key={card.id}>
                  {/* Cards */}
                  <label className="relative block cursor-pointer text-left w-full">
                    <input type="radio" id={`credit_card_${card.id}`} name="radio-buttons" className="peer sr-only" defaultChecked={card.id === creditCards[0]?.id} value={card.id} />

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
                          <div className="text-sm">₪{cardExpensesMap[card.id] || 0} / ₪{card.line_of_credit}</div>
                        </div>
                        {/* Card status */}
                        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
                          <div className={`text-xs inline-flex font-medium ${card.status === 'Blocked' ? 'bg-red-100 dark:bg-red-400/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'} rounded-full text-center px-2.5 py-1`}>
                            {card.status}
                          </div>
                        </div>

                      </div>
                    </div>
                    <div
                      className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none"
                      aria-hidden="true"
                    />
                  </label>
                </div>
              ))}

              {creditCards.length === 0 && (
                <div className="fixed bottom-10 w-full flex justify-center items-center py-80">
                  לא נמצאו כרטיסים
                </div>
              )}
            </div>

            {creditCards.length > 0 && (
              creditCards.map((card) => (
                <div key={card.id}>
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
                                  <mask id="icon1-d" fill="#fff">
                                    <use xlinkHref="#icon1-a" />
                                  </mask>
                                  <use fill="url(#icon1-b)" xlinkHref="#icon1-a" />
                                  <path fill="url(#icon1-c)" mask="url(#icon1-d)" d="M16-6h20v38H16z" />
                                </g>
                              </svg>
                            </div>
                            {/* Card content */}
                            <div className="relative flex flex-col h-full">
                              {/* Card number */}
                              <div className="flex justify-between text-lg font-bold text-slate-200 tracking-widest drop-shadow-sm">
                                <span>{card.last_four_digits}</span>
                                <span>****</span>
                                <span>****</span>
                                <span>****</span>
                              </div>
                              {/* Card footer */}
                              <div className="relative flex justify-between items-center z-10 mb-0.5">
                                {/* Card expiration */}
                                <div className="text-sm font-bold text-slate-200 tracking-widest drop-shadow-sm space-x-3">
                                </div>
                              </div>
                              <div>
                                <CreditCardLogo cardName={card.name} />
                              </div>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="mt-6">
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-1">פרטים</div>
                            <ul>
                              <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="text-sm">שם הכרטיס</div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{card.name}</div>
                              </li>
                              <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="text-sm">סוג הכרטיס</div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{card.credit_type}</div>
                              </li>
                              <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                                <div className="text-sm">סטטוס</div>
                                <div className="flex items-center whitespace-nowrap">
                                  <div className={`flex items-center space-x-1 ${card.status === 'פעיל' ? 'text-green-500' : 'text-red-500'}`}>
                                    <div className={`w-2 h-2 rounded-full ${card.status === 'פעיל' ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
                                    <span>{card.status === 'פעיל' ? 'פעיל' : 'מושבת'}</span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* Payment Limits */}
                          <div className="mt-6">
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">מסגרת אשראי</div>
                            <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
                              <div className="flex justify-between text-sm mb-2">
                                <div>הוצאות החודש בכרטיס זה</div>
                                <div className="italic">
                                  ₪{cardExpensesMap[card.id] || 0} <span className="text-slate-400 dark:text-slate-500">/</span> ₪{card.line_of_credit}
                                </div>
                              </div>
                              <div className="relative w-full h-2 bg-slate-300 dark:bg-slate-700">
                                <div className="absolute inset-0 bg-emerald-500" aria-hidden="true" style={{ width: `${((cardExpensesMap[card.id] || 0) / card.line_of_credit) * 100}%` }} />
                              </div>
                            </div>
                          </div>

                          {/* Edit / Delete */}
                          <div className="flex items-center space-x-8 mt-6">
                            <EditCard card={card} />

                            <div className="w-1/2 ml-3">
                              <Button id={card.id} variant="danger" onClick={() => deleteCard(token, card.id,setCreditCards)} className="d-flex align-items-center">
                                <span className="ml-2">מחיקה</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
            }
            </div>
          </main>
        </div>
      <Rights />
    </div>
  );
}

export default CreditCards;
