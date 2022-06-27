import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Landing from '../pages/Landing.jsx';
import Registration from '../pages/Registration.jsx';
import LogIn from '../pages/LogIn.jsx';
import PasswordRecovery from '../pages/PasswordRecovery.jsx';
import PasswordVerification from '../pages/PasswordVerification.jsx';
import PasswordReset from '../pages/PasswordReset.jsx';
import NotFound from '../pages/NotFound.jsx';
import ConversationPage from '../pages/ConversationPage.jsx';
import { SharedProvider } from '../contexts/SharedContext.jsx';
import AuthProvider from '../contexts/auth.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

const RoutesComponent = () => {
  return (
    <main>
      <AuthProvider>
        <SharedProvider>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/conversations" element={<PrivateRoute />}>
              <Route path="/conversations" element={<ConversationPage />} />
            </Route>
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route
              path="/password-verification"
              element={<PasswordVerification />}
            />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SharedProvider>
      </AuthProvider>
    </main>
  );
};

export default RoutesComponent;
