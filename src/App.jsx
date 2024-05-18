import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import HomePage from "./HomePage";
import Secret  from "./pages/Secret";

import "./App.css";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/secret"
          element={
            <ProtectedRoute>
              <Secret />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;