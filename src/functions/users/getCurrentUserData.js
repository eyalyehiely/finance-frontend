
import axios from '../axiosConfig'

export default function getCurrentUserData(token,setUser) {

    axios.post('/auth/fetch_current_user_data/', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if (response.data.status === 200) {
        setUser(response.data.user);
        
      } else {
        console.log('Error:', response.data.message);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
  }