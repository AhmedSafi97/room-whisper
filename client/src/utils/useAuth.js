import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useAuth = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/checkToken');
        if (data === 'un-auth') {
          setLoading(false);
        } else {
          if (data.role === 'admin') setRole('admin');
          setUsername(data.username);
          setAuth(true);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    })();
  }, [auth]);

  const removeCurrentUser = () => {
    setAuth(false);
    setUsername('');
    setRole('user');
  };

  return { auth, setAuth, username, role, loading, removeCurrentUser };
};

export default useAuth;
