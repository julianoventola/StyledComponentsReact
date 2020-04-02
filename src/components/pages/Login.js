import React, { useState, useEffect } from 'react';

import PageLayout from '../common/PageLayout';
import PasswordInput from '../common/PasswordInput';

import styled from 'styled-components';
import { Input, Button, Spinner } from '../common/Styles';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;

  .alt-text {
    text-align: center;
    margin: 10px auto;
  }
`;

let timeout;

export default function Login() {
  const [formFields, setFormFields] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    e.persist();
    setFormFields(state => ({ ...state, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <PageLayout>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Input
              name='username'
              placeholder='Username'
              onChange={handleInputChange}
              type='text'
              value={formFields.username}
            />
            <PasswordInput
              name='password'
              onChange={handleInputChange}
              value={formFields.password}
            />
          </>
        )}
        <Button large type='submit' disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
        {!loading && (
          <>
            <div className='alt-text'>or</div>
            <Button secondary type='button'>
              Register
            </Button>
          </>
        )}
      </Form>
    </PageLayout>
  );
}
