
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../navbar.css";
import playerIcon from '../../assets/footballPlayer.svg';



function MainNav() {
	const [active, setActive] = useState("nav_menu");
	const [toggleIcon, setToggleIcon] = useState('nav_toggler');
  
	const navToggle = () => {
	  active === "nav_menu" 
	   ? setActive("nav_menu nav_active")
	  : setActive("nav_menu");
	
	  toggleIcon === 'nav_toggler'
	? setToggleIcon('nav_toggler toggle')
	: setToggleIcon('nav_toggler');
  };
  
	return (
	  <div>
		<nav className="nav">
		<Link to="/login" className="nav_login nav_link">
		<img className="playerIcon" src={playerIcon } alt="" />
		  Login
		</Link>
		<Link to="/" className="nav_brand nav_link"> 
		  Funk ToWn ReCorDs
		</Link>
		<ul className={active}>
		  <li className="nav_item">
			<Link to="showusers" className="nav_link">
			  Show Users
			</Link>
			</li>
			<li className="nav_item">
			<Link to="/profiles" className="nav_link">
			  User Profiles
			</Link>
		  </li>
		
		  <li className="nav_item">
			<Link to="/products/list" className="nav_link">
			  Display Products
			</Link>
		  </li>
		  <li className="nav_item">
			<Link to="createpost" className="nav_link">
			  Make Post
			</Link>
		  </li>
			<li className="nav_item">
			  < Link to="/register" className="nav_link">
				Sign Up
			  </Link>
			</li>
		   
			<li className="nav_item">
			  <Link to="/login" className="nav_link">
				Sign In
			  </Link>
			</li>
			<li className="nav_item">
			  <Link to="/account" className="nav_link">
				My Account
			  </Link>
			</li>
			<li className="nav_item">
			  <Link to="/contact" className="nav_link">
				Contact Us
			  </Link>
			</li>
		  </ul>
		  <div onClick={navToggle} className={toggleIcon}>
			<div className="line1"></div>
			<div className="line2"></div>
			<div className="line3"></div>
		  </div>
		</nav>
	  </div>
	);
  }
  
  export default MainNav;
  
