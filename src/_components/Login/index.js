import React from 'react';

const login = () => {
  //Valida credenciales

  const user = { id:1, name: 'Pepe', token: ''};

  localStorage.setItem('user', user);
}


const Login = () => {
  return (
    <h2>Login</h2>
  );
}

export default Login;