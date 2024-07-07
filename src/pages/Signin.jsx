
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../src/functions/axiosConfig';
import Button from 'react-bootstrap/Button';
import Rights from '/src/components/Rights';
import swal from 'sweetalert';

function Signin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Fetch data from the server on form submission
  const fetchData = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('/token/', {
        username,
        password
      });

      console.log('Response:', response.data);

      if (response.status === 200) {
        localStorage.setItem('authTokens', JSON.stringify(response.data));
        swal({
          title: "שלום",
          text: "התחברות בוצעה בהצלחה",
          icon: "success",
          timer: 2000,
          button: false,
        }).then(() => {
          navigate('/');
        });
      } else {
        console.log('Error:', response.data.message);
        swal({
          title: "Ⅹ!שגיאה",
          text: `!שגיאת frontend: ${response.data.message}`,
          icon: "warning",
          button: "אישור",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      swal({
        title: "!שגיאה",
        text: "שם משתמש או סיסמה לא תקינים",
        icon: "warning",
        button: "אישור",
      });
    }
  };

  // Initialize Google Sign-In on component mount
  useEffect(() => {
    const handleCredentialResponse = (response) => {
      const id_token = response.credential;
      fetch('/auth/auth-receiver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Google Sign-In Response:', data);
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/');
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
      });
    };

    // Initialize Google Sign-In
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: '840567078302-1u5a0gjgg32edocdgd36meu7vkmjbvna.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.querySelector('.g_id_signin'),
        { theme: 'outline', size: 'large', shape: 'pill', logo_alignment: 'left' } // customization options
      );
      google.accounts.id.prompt(); // Show the One Tap UI
    };

    // Load the Google Identity Services library
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <main className="bg-white dark:bg-slate-900" dir="rtl">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
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
            <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">CashControl</h1>
              <h2>התחבר או צור חשבון</h2>
              <form onSubmit={fetchData}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="username">
                      שם משתמש <span className="text-rose-500">*</span>
                    </label>
                    <input id="username" className="form-input w-full" type="email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                      סיסמה <span className="text-rose-500">*</span>
                    </label>
                    <input id="password" className="form-input w-full" type={showPassword ? 'text' : 'password'} required />
                    <div className="mt-2">
                      <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
                      <label htmlFor="showPassword" className="ml-2">הצג סיסמה</label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" to="/reset-password">
                      שכחתי סיסמה ?
                    </Link>
                  </div>
                  <Button type="submit" variant="primary"> התחבר</Button>
                </div>
              </form>
              
              {/* google sign */}

              {/* <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex text-sm justify-center">
                  <div
                    id="g_id_onload"
                    data-client_id="840567078302-1u5a0gjgg32edocdgd36meu7vkmjbvna.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-login_uri="/auth/auth-receiver"
                    data-itp_support="true">
                  </div>
                  <div
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                  </div>
                </div>
              </div> */}

              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  האם אין לך חשבון ?
                  
                  <Link className="font-medium text-indigo-500 mr-2 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signup">
                    צור חשבון 
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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

export default Signin;

