import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import VerifyOtp from "./pages/VerifyOtp";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute/>}>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
