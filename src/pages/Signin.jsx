// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from '../../src/functions/axiosConfig';
// import Button from 'react-bootstrap/Button';
// import Rights from '/src/components/Rights';
// import swal from 'sweetalert';

// function Signin() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   // Fetch data from the server on form submission
//   const fetchData = async (event) => {
//     event.preventDefault();
//     const username = document.getElementById('username').value.toLowerCase();
//     const password = document.getElementById('password').value;

//     try {
//       const response = await axios.post('/token/', {
//         username,
//         password
//       });

//       console.log('Response:', response.data);

//       if (response.status === 200) {
//         localStorage.setItem('authTokens', JSON.stringify(response.data));
//         swal({
//           title: "שלום",
//           text: "התחברות בוצעה בהצלחה",
//           icon: "success",
//           timer: 2000,
//           button: false,
//         }).then(() => {
//           navigate('/');
//         });
//       } else {
//         console.log('Error:', response.data.message);
//         swal({
//           title: "Ⅹ!שגיאה",
//           text: `!שגיאת frontend: ${response.data.message}`,
//           icon: "warning",
//           button: "אישור",
//         });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       swal({
//         title: "!שגיאה",
//         text: "שם משתמש או סיסמה לא תקינים",
//         icon: "warning",
//         button: "אישור",
//       });
//     }
//   };

//   return (
//     <main className="bg-white dark:bg-slate-900" dir="rtl">
//       <div className="relative md:flex">
//         <div className="md:w-1/2">
//           <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
//             <div className="flex-1">
//                   <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
//                     <div className="block">
//                       {/* New SVG */}
//                       <svg
//                         height="32"
//                         width="32"
//                         version="1.1"
//                         id="Capa_1"
//                         xmlns="http://www.w3.org/2000/svg"
//                         xmlnsXlink="http://www.w3.org/1999/xlink"
//                         viewBox="0 0 235.517 235.517"
//                         xmlSpace="preserve"
//                         fill="#000000"
//                       >
//                         <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                         <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
//                         <g id="SVGRepo_iconCarrier">
//                           <path
//                             style={{ fill: '#010002' }}
//                             d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473 c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549 c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251 c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843 c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021 c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029 c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12 c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549 c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
//                           />
//                         </g>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//             <div className="max-w-sm mx-auto w-full px-4 py-8">
//             <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">CashControl</h1>
//               <h2>התחבר או צור חשבון</h2>
//               <form onSubmit={fetchData}>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1" htmlFor="username">
//                        אימייל <span className="text-rose-500">*</span>
//                     </label>
//                     <input id="username" className="form-input w-full" type="email" required />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-1" htmlFor="password">
//                       סיסמה <span className="text-rose-500">*</span>
//                     </label>
//                     <input id="password" className="form-input w-full" type={showPassword ? 'text' : 'password'} required />
//                     <div className="mt-2">
//                       <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
//                       <label htmlFor="showPassword" className="mr-2">הצג סיסמה</label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between mt-6">
//                   <div className="mr-1">
//                     <Link className="text-sm underline hover:no-underline" to="/reset-password">
//                       שכחתי סיסמה
//                     </Link>
//                   </div>
//                   <Button type="submit" variant="primary"> התחבר</Button>
//                 </div>
//               </form>

//               <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
//                 <div className="text-sm">
//                    אין ברשותך חשבון ?

//                   <Link className="font-medium text-indigo-500 mr-2 hover:text-indigo-600 dark:hover:text-indigo-400" to="/signup">
//                     צור חשבון
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2" aria-hidden="true">
//           <img
//             className="object-cover object-center w-full h-full"
//             src='src/images/dollars.jpeg'
//             width="760"
//             height="1024"
//             alt="dollars"
//           />
//         </div>
//       </div>
//       <Rights />
//     </main>
//   );
// }

// export default Signin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../src/functions/axiosConfig";
import Button from "react-bootstrap/Button";
import Rights from "/src/components/Rights";
import swal from "sweetalert";
import OAuth2Login from "react-simple-oauth2-login";

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

  // Handle Google OAuth response
  const handleGoogleSuccess = (response) => {
    console.log("Google response:", response);
    // Send the response to your backend for verification and login
    axios.post("/token/google/", { id_token: response.tokenId })
      .then((res) => {
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        swal({
          title: "שלום",
          text: "התחברות עם Google בוצעה בהצלחה",
          icon: "success",
          timer: 2000,
          button: false,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal({
          title: "!שגיאה",
          text: "התחברות עם Google נכשלה",
          icon: "warning",
          button: "אישור",
      }).then(() => {
        navigate("/signin");
      });
      });
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    swal({
      title: "!שגיאה",
      text: "התחברות עם Google נכשלה",
      icon: "warning",
      button: "אישור",
    });
  };

  return (
    <main className="bg-white dark:bg-slate-900" dir="rtl">
      <div className="relative md:flex">
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <div className="block">
                  {/* New SVG */}
                  {/* SVG code here */}
                </div>
              </div>

              <div className="max-w-sm mx-auto w-full px-4 py-8">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  CashControl
                </h1>
                <h2>התחבר או צור חשבון</h2>
                <form onSubmit={fetchData}>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="username"
                      >
                        אימייל <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="username"
                        className="form-input w-full"
                        type="email"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        סיסמה <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="password"
                        className="form-input w-full"
                        type={showPassword ? "text" : "password"}
                        required
                      />
                      <div className="mt-2">
                        <input
                          type="checkbox"
                          id="showPassword"
                          checked={showPassword}
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="mr-2">
                          הצג סיסמה
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="mr-1">
                      <Link
                        className="text-sm underline hover:no-underline"
                        to="/reset-password"
                      >
                        שכחתי סיסמה
                      </Link>
                    </div>
                    <Button type="submit" variant="primary">
                      {" "}
                      התחבר
                    </Button>
                  </div>
                </form>

                {/* Google Sign-In button */}
                <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                  <button className="btn btn-primary flex items-center px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
                    {/* SVG Icon */}
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="-0.5 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                    >
                      <title>Google-color</title>
                      <desc>Created with Sketch.</desc>
                      <g
                        id="Icons"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          id="Color-"
                          transform="translate(-401.000000, -860.000000)"
                        >
                          <g
                            id="Google"
                            transform="translate(401.000000, 860.000000)"
                          >
                            <path
                              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                              fill="#FBBC05"
                            />
                            <path
                              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                              fill="#EB4335"
                            />
                            <path
                              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                              fill="#34A853"
                            />
                            <path
                              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                              fill="#4285F4"
                            />
                          </g>
                        </g>
                      </g>
                    </svg> */}
                    {/* Hidden OAuth2Login Button */}
                    <OAuth2Login
                      authorizationUrl="https://accounts.google.com/o/oauth2/auth"
                      clientId="250047389112-kc4o893e4qthl428cqd0cr29ogau0vcl.apps.googleusercontent.com"
                      redirectUri="https://finance-frontend-dev.up.railway.app"
                      responseType="token"
                      scope="profile email"
                      onSuccess={handleGoogleSuccess}
                      onFailure={handleGoogleFailure}
                      style={{ display: "none" }} // Hide the default button
                      buttonText="התחבר עם Google"
                    />
                    {/* Button Text */}
                  </button>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm">
                    אין ברשותך חשבון ?
                    <Link
                      className="font-medium text-indigo-500 mr-2 hover:text-indigo-600 dark:hover:text-indigo-400"
                      to="/signup"
                    >
                      צור חשבון
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden md:block absolute top-0 bottom-0 left-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src="src/images/dollars.jpeg"
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
