import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/users';
import styles from './Login.module.css'

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if(response.status) {
      history.push('/tasks');
    }
  }

  const handleChange = (event) => {
    setEmail(event.target.value);
    if(event.target.value.length < 4) {
      setEmailError('El mail debe tener minimo de 4 letras');
    } else {
      setEmailError('');
    }
  }

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className={emailError ? 'invalid' : ''} type="email" value={email} onChange={handleChange} placeholder="Email" />
        <span>{emailError}</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="submit" value="Ingresar!"/>
      </form>
        <Link to={'/register'} >
          Registrate!
        </Link>
    </>
  );
}

export default Login;