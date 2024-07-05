import React, { useState, useEffect } from 'react';
import getActiveCreditCardData from '../functions/credit_cards/getActiveCreditCards';
import getCurrentMonthCardExpenses from '../functions/credit_cards/getCurrentMonthCardExpenses';

function LineOfCreditAlert() {
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
  const [creditCards, setCreditCards] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [creditNotes, setCreditNotes] = useState(null);

  useEffect(() => {
    getActiveCreditCardData(token, setCreditCards);
    getCurrentMonthCardExpenses(token, setExpenses);
  }, [token]);

  useEffect(() => {
    if (creditCards.length > 0 && expenses.length > 0) {
      const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

      const hasExceededLimit = creditCards.some(card => totalExpenses >= card.line_of_credit * 0.75);

      if (hasExceededLimit) {
        setCreditNotes('הנך קרוב לחריגה בכרטיס האשראי');
      } else {
        setCreditNotes(null);
      }
    }
  }, [creditCards, expenses]);

  return (
    <div>
      {creditNotes}
    </div>
  );
}

export default LineOfCreditAlert;
