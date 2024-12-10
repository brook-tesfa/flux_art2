import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import PublicNavbar from './components/PublicNavbar';
import AuthNavbar from './components/AuthNavbar';
import { Background3D } from './components/Background3D';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import ModelCategories from './components/ModelCategories';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { ModelTraining } from './pages/ModelTraining';
import { TrainingPending } from './pages/TrainingPending';
import { Studio } from './pages/Studio';
import { Demo } from './pages/Demo';
import { useAuthStore } from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Background3D />
        {user ? <AuthNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <ModelCategories />
              <Pricing />
              <FAQ />
            </>
          } />
          <Route path="/demo" element={<Demo />} />
          <Route path="/profile" element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          } />
          <Route path="/train" element={
            <AuthGuard>
              <ModelTraining />
            </AuthGuard>
          } />
          <Route path="/training-pending" element={
            <AuthGuard>
              <TrainingPending />
            </AuthGuard>
          } />
          <Route path="/studio" element={
            <AuthGuard>
              <Studio />
            </AuthGuard>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;