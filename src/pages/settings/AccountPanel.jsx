
import * as React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Rights from '../../components/Rights';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import axios from '../../functions/axiosConfig'
import getCurrentUserData from '../../functions/users/getCurrentUserData';
import EditUser from './EditUser';


function AccountPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

  useEffect(() => {
    if (token) {
      getCurrentUserData(token, setUser);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/auth/supporting_mail/', {
        email,
        subject,
        message,
      });

      if (response.status === 200) {
        setSuccess('המייל נשלח בהצלחה!'); 
        setEmail(user.email);
        setSubject('')
        setMessage('');
      } else {
        throw new Error('לא הצלחנו לשלוח את המייל. נסה שוב מאוחר יותר.');
      }
    } catch (error) {
      setError(error.message || 'שגיאה לא ידועה');
    }
  };

  return (
    <div className="flex h-[100vh] overflow-hidden" dir="rtl">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="p-6 space-y-6">
          {/* Account Info */}
          <section>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5">{user.first_name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {user.address}, {user.age}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <EditUser />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions>
                {/* <Button fullWidth variant="text">
                  העלאת תמונה
                </Button> */}
              </CardActions>
            </Card>
          </section>

          {/* Business Profile */}
          <section>
            <Card>
              <CardHeader title="פרטים אישיים" />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>שם פרטי:</strong> {user.first_name}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>שם משפחה:</strong> {user.last_name}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>מספר ילדים:</strong> {user.num_of_children}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>מגדר:</strong> {user.gender === 'male' ? 'זכר' : user.gender === 'female' ? 'נקבה' : 'אחר'}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>אימייל:</strong> {user.email}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>תאריך לידה:</strong> {user.birth_date}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>מקצוע:</strong> {user.profession}
                    </Typography>
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <Typography variant="body1">
                      <strong>עיר מגורים:</strong> {user.address}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </section>

          {/* Email */}
          <section className="contact-section">
            <Typography variant="h6" className="section-title">צור קשר</Typography>
            <div className="contact__container">
              <form onSubmit={handleSubmit} className="contact__form">
                
                <TextField
                  label="אימייל"
                  name="email"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  type="email"
                  fullWidth
                  margin="normal"
                  required
                />

                <TextField
                  label="נושא"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                  type="subject"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="הודעה"
                  name="message"
                  placeholder="כאן כותבים"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary" className="contact__button">שלח</Button>
              </form>
              {error && <p className="error-message">{error}</p>}
              {success && <p className="success-message">{success}</p>}
            </div>
          </section>
        </div>
        <Rights />
      </div>
    </div>
  );
}

export default AccountPanel;
