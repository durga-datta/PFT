import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f0f0f",
            color: "#fff",
            border: "1px solid #9333ea",
          },
        }}
      />
    
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute/>}>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute/>}>

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Dashboard/>} />
          <Route path="profile" element={<Profile />} />
          <Route path="income" element={<Income />} />
          <Route path="budgets" element= {<Budgets/>}/>
          <Route path="expenses" element={<Expenses />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        </Route>

        {/* Catch-all route for 404s */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
