import React, { useState, useEffect } from 'react';
import getActiveCreditCardData from '../functions/credit_cards/getActiveCreditCards';
import getCurrentMonthCardExpenses from '../functions/credit_cards/getCurrentMonthCardExpenses';

function LineOfCreditAlert() {
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;
  const [creditCards, setCreditCards] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [creditNotes, setCreditNotes] = useState(null);

  useEffect(() => {
    if (token) {
      getActiveCreditCardData(token, setCreditCards);
      getCurrentMonthCardExpenses(token, setExpenses);
    }
  }, [token]);

  useEffect(() => {
    if (creditCards.length > 0 && expenses.length > 0) {
      let hasExceededLimit = false;
      let cardName = '';
      let cardLastDigits = '';

      // Outer loop iterates over credit cards
      for (let i = 0; i < creditCards.length; i++) {
        const cardLineOfCredit = creditCards[i].line_of_credit;
        let totalExpenses = 0;

        // Inner loop iterates over expenses
        for (let j = 0; j < expenses.length; j++) {
          totalExpenses += expenses[j].amount;

          if (totalExpenses >= cardLineOfCredit * 0.75) {
            cardName = creditCards[i].name;
            cardLastDigits = creditCards[i].last_four_digits;
            hasExceededLimit = true;
            break;
          }
        }

        // If limit exceeded for any card, no need to check further
        if (hasExceededLimit) {
          break;
        }
      }

      setCreditNotes(
        hasExceededLimit ? `הנך קרוב לחריגה בכרטיס האשראי בכרטיס ${cardName} (${cardLastDigits})` : null
      );
    }
  }, [creditCards, expenses]);

  return (
    <div>
      {creditNotes}
    </div>
  );
}

export default LineOfCreditAlert;
