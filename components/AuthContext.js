import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Import the Firebase auth instance
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc } from 'firebase/firestore';


const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);
 
  const subscriptionId = 'sub_1NC7weHtWj5EzN1VKGYi1LPG'

  useEffect(() => {
      const fetchSubscriptionStatus = async () => {
          try {
              if (currentUser) {
                  const docRef = doc(db, "customers", currentUser.uid, "subscriptions", subscriptionId);
                  const docSnap = await getDoc(docRef);

                  if (docSnap.exists()) {
                      const subscriptionData = docSnap.data();
                      const { status } = subscriptionData;
                      setSubscriptionStatus(status === 'active'); // Assuming 'active' is the status for an active subscription
                  } else {
                      setSubscriptionStatus(false); // Reset to false when there is no subscription
                  }
              } else {
                  setSubscriptionStatus(false); // Reset to false when there is no user
              }
          } catch (error) {
              console.error("Error fetching subscription status:", error);
          }
      };

      fetchSubscriptionStatus();
  }, [currentUser])

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

