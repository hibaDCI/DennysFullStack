import { useState } from 'react'
import Navbar from './components/header/Navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Products from './components/body/Products.jsx';
import Home from './components/body/Home.jsx';
import Carousel from './components/body/small_components/Carousel.jsx';
import LoginForm from './components/body/auth/LoginForm.jsx';
import RegisterForm from './components/body/auth/RegisterForm.jsx';
import UserAccount from './components/body/auth/UserAccount.jsx';
import ShowUsers from './components/body/ShowUsers.jsx';
import Profiles from './components/body/Profiles.jsx';
import Contact from './components/body/Contact.jsx';
import CreatePost from './components/body/CreatePost.jsx';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Carousel />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/list" element={<Products />} />
        <Route path="/showusers" element={<ShowUsers />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
    </div>
  )
}

export default App
