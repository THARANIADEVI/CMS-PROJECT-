import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ResourceListPage from "./pages/ResourceListPage";
import ResourceFormPage from "./pages/ResourceFormPage";
import MessagesPage from "./pages/MessagesPage";

export default function App() {
  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/:resource" element={<ResourceListPage />} />
              <Route path="/:resource/new" element={<ResourceFormPage />} />
              <Route path="/:resource/:id/edit" element={<ResourceFormPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
