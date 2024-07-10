import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import sendResetPasswordMail from '../functions/users/sendResetPasswordMail'
import Rights from '../components/Rights';



function ResetPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const button = document.getElementById('submitButton');
    button.disabled = true;
    button.innerText = 'תודה';
    sendResetPasswordMail()
  }


  return (
    <main className="bg-white dark:bg-slate-900" dir="rtl">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            {/* Header */}
            <div className="flex-1">
                  <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                    <Link className="block" to="/signin">
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
              <h2 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">איפוס סיסמה ✨</h2>
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">כתובת מייל <span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" required />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                <Button id="submitButton" className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" type="submit">שלח קישור</Button>
                </div>
                <Button variant="info">
              <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 no-underline" to="/signin">
                חזור 
              </Link>
            </Button>
              </form>
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
        <Rights/>
      </div>
    </main>
  );
}

export default ResetPassword;
