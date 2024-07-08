
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../functions/axiosConfig';
import swal from 'sweetalert';
import AuthImage from '../images/finance.avif';
import AuthDecoration from '../images/auth-decoration.png';
import Button from 'react-bootstrap/Button';
import Rights from '../components/Rights';
import getAdress from '../functions/users/getAdress';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: 'זכר',
    life_status: 'רווק/ה',
    num_of_children: 0,
    email: '',
    password: '',
    birth_date: '',
    profession: '',
    phone_number: '',
    address: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [addressResults, setAddressResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const { first_name, last_name, gender, life_status, num_of_children, email, password, birth_date, profession, phone_number, address } = formData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === 'email' ? value.toLowerCase() : value });
  };

  const handleStatusChange = (e) => {
    setFormData({ ...formData, life_status: e.target.value, num_of_children: '' }); // Reset num_of_children when life_status changes
  };

  useEffect(() => {
    getAdress(setAddressResults);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredAddresses(
        addressResults.filter((address) =>
          address['שם_ישוב'].toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredAddresses(addressResults);
    }
  }, [searchQuery, addressResults]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  // function handleClick (){
  //   const button = document.getElementById('submitButton')
  //   button.disabled = true;
  //   button.innerText = 'תודה';
  // }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/auth/signup/', formData)
      .then((response) => {
        console.log(response.data);
        swal({
          title: "👤משתמש נוסף בהצלחה",
          icon: "success",
          timer: 1000,
          button: false,
        }).then(() => {
          window.location.href = '/signin';
        });
      }).catch((error) => {
        console.error(error);
        swal({
          title: "שגיאה",
          icon: "warning",
          button: "אישור",
        });
      });
  };

  const isMarriage = () => {
    if (life_status === 'marriage') {
      return (
        <div>
          <label className="block text-sm font-medium mb-1">מספר ילדים<span className="text-rose-500">*</span></label>
          <select id="num_of_children" className="form-select w-full" value={num_of_children} onChange={handleChange}>
            <option value=""></option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            {/* Add more options as needed */}
          </select>
        </div>
      );
    }
  };

  return (
    <main className="bg-white dark:bg-slate-900" dir="rtl">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link className="block">
                  {/* New SVG */}
                  <svg
                    height="32"
                    width="32"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 235.517 235.517"
                    xmlSpace="preserve"
                    fill="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        style={{ fill: '#010002' }}
                        d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473 c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549 c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251 c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843 c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021 c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029 c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12 c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549 c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
                      />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
            <Button variant="info">
              <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 no-underline" to="/signin">
                חזור 
              </Link>
            </Button>
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">צור חשבון ✨</h1>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="first_name">שם פרטי<span className="text-rose-500">*</span></label>
                    <input id="first_name" className="form-input w-full" type="text" value={first_name} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="last_name">שם משפחה <span className="text-rose-500">*</span></label>
                    <input id="last_name" className="form-input w-full" type="text" value={last_name} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="gender"> מגדר <span className="text-rose-500">*</span></label>
                    <select id="gender" className="form-select w-full" value={gender} onChange={handleChange} required>
                      <option value="זכר">זכר</option>
                      <option value="נקבה">נקבה</option>
                      <option value="אחר">אחר</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="life_status">סטטוס <span className="text-rose-500">*</span></label>
                    <select id="life_status" className="form-select w-full" value={life_status} onChange={handleStatusChange} required>
                      <option value="רווק/ה">רווק/ה</option>
                      <option value="נשוי/ה">נשוי/ה</option>
                      <option value="גרוש/ה">גרוש/ה</option>
                    </select>
                  </div>

                  {isMarriage()}

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">כתובת מייל <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" value={email} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">סיסמה <span className="text-rose-500">*</span></label>
                    <input id="password" className="form-input w-full" type={showPassword ? 'text' : 'password'} value={password} onChange={handleChange} required />
                    <div className="mt-2">
                      <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                      <label htmlFor="showPassword" className="text-sm font-medium mb-1"> הצג סיסמה  </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="birth_date">תאריך לידה <span className="text-rose-500">*</span></label>
                    <input id="birth_date" className="form-input w-full" type="date" value={birth_date} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="profession">מקצוע <span className="text-rose-500">*</span></label>
                    <input id="profession" className="form-input w-full" type="text" value={profession} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone_number">מספר טלפון <span className="text-rose-500">*</span></label>
                    <input id="phone_number" className="form-input w-full" type='tel' value={phone_number} onChange={handleChange} required minLength={10} maxLength={10} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="address">עיר מגורים <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      id="address"
                      className="form-input w-full"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="חפש עיר..."
                      required
                    />
                    <select
                      id="address"
                      className="form-select w-full mt-2"
                      value={address}
                      onChange={handleChange}
                      required
                    >
                      <option value="">בחר עיר</option>
                      {filteredAddresses.map((address, index) => (
                        <option key={index} value={address['שם_ישוב']}>{address['שם_ישוב']}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button id="submitButton" type="submit" variant="primary">הרשם כאן</Button>
                </div>
              </form>

              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  יש לך כבר חשבון? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signin">התחברות</Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2" aria-hidden="true">
          <img
            className="object-cover object-center w-full h-full"
            src='src/images/dollars.jpeg'
            width="760"
            height="1024"
            alt="dollars"
          />
        </div>

      </div>

      <Rights />

    </main>
  );
}

export default Signup;
