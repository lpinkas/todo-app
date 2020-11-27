import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../context/UserContext/actions';
import { userContext } from '../../context/UserContext/context';
import { login } from '../../services/users';
import styles from './Login.module.css'

const Login = () => {

  const context = useContext(userContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser(email, password, context.dispatch, setErrorMessage, setSuccess);
  }

  const handleChange = (event) => {
    setEmail(event.target.value);
    if(event.target.value.length < 4) {
      setEmailError('El mail debe tener minimo de 4 letras');
    } else {
      setEmailError('');
    }
  }

  useEffect(() => {
    if(success) {
      history.push('/tasks');
    }
  }, [success, history]);

  return (
    <>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className={emailError ? 'invalid' : ''} type="email" value={email} onChange={handleChange} placeholder="Email" />
        <span>{emailError}</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="submit" value="Ingresar!"/>
        <span className="error">{errorMessage}</span>
      </form>
        <Link to={'/register'} >
          Registrate!
        </Link>
    </>
  );
}

export default Login;