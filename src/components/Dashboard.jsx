import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your firebase auth
import { signOut } from 'firebase/auth'; // Import signOut from firebase
import { useAuthState } from 'react-firebase-hooks/auth'; // Import for user auth state

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Get the current logged-in user
  
  useEffect(() => {
    if (!user) {
      // If no user is logged in, redirect to login page
      navigate('/login');
    }
  }, [user, navigate]);

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('You have logged out successfully');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
        alert('Failed to log out');
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-4/5 lg:w-1/2">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Dashboard</h2>

        {user ? (
          <>
            {/* Logout Button */}
            <button
              className="btn btn-danger mb-5"
              onClick={handleLogout}
            >
              Logout
            </button>

            {/* Dashboard Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Client Form Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/client-form')}
              >
                Client Form
              </button>

              {/* Product Form Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/product-form')}
              >
                Product Form
              </button>

              {/* Service Update Form Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/service-update')}
              >
                Service Update Form
              </button>

              {/* View Details Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/view-details')}
              >
                View Details
              </button>

              {/* Doc Upload/View Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/doc-upload-view')}
              >
                Doc Upload/View
              </button>

              {/* Scanner Button */}
              <button
                className="btn btn-primary"
                onClick={() => navigate('/scanner')}
              >
                Scanner
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-lg text-gray-800">You must be logged in to view the dashboard.</h3>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
