import React from 'react';
import './css/Profile.css' 
import Button from '../components/Elements/Button';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  return (
    <div className="page">
      <Header/>
      <Link to = "/user-memes">  <Button func={null} text="Your Memes"/> </Link>
    </div>
  );
}