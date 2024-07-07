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
      getActiveCreditCardData(token)
        .then(setCreditCards)
        .catch((error) => console.error('Error fetching credit card data:', error));
      getCurrentMonthCardExpenses(token)
        .then(setExpenses)
        .catch((error) => console.error('Error fetching expenses:', error));
    }
  }, [token]);

  useEffect(() => {
    if (creditCards.length > 0 && expenses.length > 0) {
      let hasExceededLimit = false;
      let cardName = '';
      let cardLastDigits = '';

      // Use a map to track expenses for each card
      const expensesByCard = new Map();

      for (const expense of expenses) {
        const cardId = expense.card_id;
        if (!expensesByCard.has(cardId)) {
          expensesByCard.set(cardId, 0);
        }
        expensesByCard.set(cardId, expensesByCard.get(cardId) + expense.amount);
      }

      // Check each card against its total expenses
      for (const card of creditCards) {
        const totalExpenses = expensesByCard.get(card.id) || 0;
        if (totalExpenses >= card.line_of_credit * 0.75) {
          cardName = card.name;
          cardLastDigits = card.last_four_digits;
          hasExceededLimit = true;
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
