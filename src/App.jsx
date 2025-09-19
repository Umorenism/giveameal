import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Auth/Login";
import ProtectedRoute from "./component/Dashboard/ProtectedRoute";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./pages/Home";

import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
       

        <Route
          path="/dashboard"
          element={
              //  <ProtectedRoute>
              <Dashboard />
                // </ProtectedRoute>
          }
        >
          <Route index element={<Home/>} />
          

          {/* ✅ Settings routes */}
          <Route
            path="settings"
            element={<Navigate to="settings/profile" replace />}
          />
          <Route path="settings/profile" element={<Settings />} />
         
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}
