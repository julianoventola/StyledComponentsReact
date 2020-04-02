import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import LightTheme from '../themes/light';
import DarkTheme from '../themes/dark';

import Home from './pages/Home';
import Login from './pages/Login';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${props => props.bgcolor};
    min-height: 100vh;
    margin:0;
    padding:0;
    box-sizing:border-box;
    color: ${props => props.color}
  }
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);
  console.log(theme.background);
  return (
    <ThemeProvider
      theme={{
        ...theme,
        setTheme: () => {
          setTheme(state => (state.id === 'light' ? DarkTheme : LightTheme));
        },
      }}
    >
      <GlobalStyle bgcolor={theme.background} color={theme.color} />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
