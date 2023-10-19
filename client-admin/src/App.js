import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
// Thêm dòng này để sử dụng BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import Home from './components/HomeComponent';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
        <Login />
      </MyProvider>
    );
  }
}
export default App;
