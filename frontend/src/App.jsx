import './App.css'
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Congrats from './pages/Congrats';
import { useState, useEffect } from 'react';
import api from "./lib/axios";
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function verifyAdmin(){
      try {
        const res = await api.get("/admin/verify");
        if(res.status == 200){
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch(error){
        console.log(`error: ${error}`);
        setIsAdmin(false);
      } finally {
        setIsChecking(false);
      }
    }
    verifyAdmin();
  }, []);

 if(isChecking) return (<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
}}>
  <div style={{
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '3px solid #e5e7eb',
    borderTopColor: '#111827',
    animation: 'spin 0.8s linear infinite',
  }} />

  <style>{`
    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
</div>)
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home setIsSuccess={setIsSuccess}/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='/terms-of-service' element={<TermsOfService/>}/>
        <Route path='/success' element={isSuccess ? <Congrats/> : <Navigate to="/"/>} />
        <Route path='/auth/login' element={<Login setIsAdmin={setIsAdmin}/>}/>
        <Route path='/admin/dashboard' element={isAdmin ? <AdminDashboard/> : <Navigate to="/auth/login"/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
