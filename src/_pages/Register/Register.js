import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../services/users';

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState({ value: '', error: ''});
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = val => val.length > 0 && val.length <= 4 && 'Minimo 4 caracteres';

  const handleChange = (event) => {
    const value = event.target.value;
    switch (event.target.name) {
      case 'email':
        setEmail({ value, error: validateEmail(value) });
        break;
      case 'password':
        setPassword(value);
        break;
      case 'repeat':
        setRepeatPassword(value);
        break;
      default:
        break;
    }
  };

  const validate = () => {
    if(password !== repeatPassword) {
      return 'Las contraseñas deben coincidir!';
    }

    return '';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validate();
    if(error) {
      setError(error);
      return;
    }

    const response = await register(email.value, password);
    if(response.status) {
      history.push('/');
      return;
    }
    if(response.data.length === 1 && response.data[0].code === 'DuplicateUserName') {
      setError("El nombre de usuario ya existe");
    }

    setError('Hubo un problema al registrarte. Intentalo nuevamente mas tarde!');

  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" value={email.value} className={email.error ? 'invalid' : ''} onChange={handleChange} placeholder="Email" />
        <span className="error">{email.error}</span>
        <input name="password" type="password" value={password} onChange={handleChange} placeholder="Password"/>
        <input name="repeat" type="password" value={repeatPassword} onChange={handleChange} placeholder="Repeat password" />
        <input type="submit" value="Enviar"/>
      </form>
      <span className="error">{error}</span>
    </Fragment>
  );
}

export default Register;