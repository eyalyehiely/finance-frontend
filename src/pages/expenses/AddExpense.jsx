import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import fetchExpensesData from '../../functions/expenses/fetchExpensesData';
import addExpensesData from '../../functions/expenses/addExpensesData';
import getActiveCreditCards from '../../functions/credit_cards/getActiveCreditCards';

function AddExpense() {
  const [show, setShow] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [data, setData] = useState({
    name: '',
    payment_method: '',
    expense_type: '',
    date_and_time: '',
    category: '',
    price: '',
    credit_card: '',
  });

  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      fetchExpensesData(token, setExpenses);
      getActiveCreditCards(token, setCreditCards);
    }
  }, [token]);

  const handleClose = () => {
    setShow(false);
    setData({
      name: '',
      payment_method: '',
      expense_type: '',
      date_and_time: '',
      category: '',
      price: '',
      credit_card: '',
    });
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpensesData(token, setExpenses, data, handleClose);
  };

  const isCreditCard = () => {
    if (data.payment_method === 'כרטיס אשראי' && creditCards.length>0) {
      return (
        <Form.Group controlId="formCreditCard">
          <Form.Label>שם הכרטיס</Form.Label>
          <Form.Control
            as="select"
            name="credit_card"
            value={data.credit_card}
            onChange={handleChange}
            required
          >
            {creditCards.length > 0 ? (
              creditCards.map((card, index) => (
                <option key={index} value={card.name}>
                  {card.name(card.last_four_digits)}
                </option>
              ))
            ) : (
              <option>אין כרטיסים זמינים</option>
            )}
          </Form.Control>
        </Form.Group>
      );
    }
    return null; // If payment_method is not 'credit_card', render nothing
  };
  

  return (
    <>
      <Button onClick={handleShow} variant="outline-primary" className="d-flex align-items-center">
            <span className="ml-2">הוסף הוצאה</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
          </svg>
        </Button>

      <Modal show={show} onHide={handleClose} centered dir="rtl">
        <Modal.Header>
          <Modal.Title>פרטי ההוצאה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formExpenseName">
              <Form.Label>שם ההוצאה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="input"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formExpenseType">
              <Form.Label>סוג ההוצאה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                as="select"
                name="expense_type"
                value={data.expense_type}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="הוצאה קבועה">הוצאה קבועה</option>
                <option value="הוצאה משתנה">הוצאה משתנה</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPaymentMethod">
              <Form.Label>דרך תשלום<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                as="select"
                name="payment_method"
                value={data.payment_method}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="כרטיס אשראי">כרטיס אשראי</option>
                <option value="הוראת קבע">הוראת קבע</option>
                <option value="העברה בנקאית">העברה בנקאית</option>
                <option value="מזומן">מזומן</option>
                <option value="צ׳ק">צ׳ק</option>
              </Form.Control>
            </Form.Group>

            {isCreditCard()}

            <Form.Group controlId="formCategory">
              <Form.Label>קטגוריה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={data.category}
                onChange={handleChange}
                required
              >
                <option value=""></option>
                <option value="סופר">סופר</option>
                <option value="מסעדה">מסעדה</option>
                <option value="טכנולוגיה">טכנולוגיה</option>
                <option value="dהלבשה והנעלהress_and_shoes">הלבשה והנעלה</option>
                <option value="דלק">דלק</option>
                <option value="הלוואה">הלוואה</option>
                <option value="חוב">חוב</option>
                <option value="מתנה">מתנה</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>סכום<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDateAndTime">
              <Form.Label>תאריך ההוצאה<span className="text-rose-500">*</span></Form.Label>
              <Form.Control
                type="datetime-local"
                name="date_and_time"
                value={data.date_and_time}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="mt-3">
              שמור
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddExpense;
