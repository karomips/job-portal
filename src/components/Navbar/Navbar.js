import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const handleSignOut = () => {
    // Remove login info from localStorage on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    alert('Signed out!');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">JobFinder</div>
      <ul className="navbar-links">
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/jobs">Jobs</NavLink></li>
        <li><NavLink to="/post-job">Post a Job</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li>
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
