import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import the Firebase auth instance
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc, getDocs, query, collection } from 'firebase/firestore';



const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
 
  

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        if (currentUser) {
          // Get the list of subscriptions associated with the current user
          const subscriptionsQuery = query(collection(db, "customers", currentUser.uid, "subscriptions"));
          const querySnapshot = await getDocs(subscriptionsQuery);

          // Iterate over each subscription and check their status
          querySnapshot.forEach((doc) => {
            const subscriptionData = doc.data();
            const { status } = subscriptionData;
            console.log("sub data", subscriptionData)

            // If any of the subscriptions is active, set subscription status to true
            if (status === 'active') {
              setSubscriptionStatus(true);
              return;
            }
          });
        } else {
          setSubscriptionStatus(false); // Reset to false when there is no user
        }
      } catch (error) {
        console.error("Error fetching subscription status:", error);
      }
    };

    fetchSubscriptionStatus();
  }, [currentUser]); // Add currentUser as a dependency so that the effect runs whenever currentUser changes

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    subscriptionStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

