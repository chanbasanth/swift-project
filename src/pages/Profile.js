import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/2');
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="profile-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h2>Welcome, {user.name}</h2>
        </div>

        <div className="profile-box">
          <div className="profile-left">
            <div className="profile-avatar">{user.name.split(' ')[0][0]}{user.name.split(' ')[1][0]}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <div className="profile-right">
            <div className="profile-grid">
              <div>
                <label>User ID</label>
                <div className="profile-field">{user.id}</div>
              </div>
              <div>
                <label>Name</label>
                <div className="profile-field">{user.name}</div>
              </div>
              <div>
                <label>Email ID</label>
                <div className="profile-field">{user.email}</div>
              </div>
              <div>
                <label>Address</label>
                <div className="profile-field">
                  {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
                </div>
              </div>
              <div>
                <label>Phone</label>
                <div className="profile-field">{user.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
