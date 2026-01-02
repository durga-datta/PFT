import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncome = async () => {
    try {
      const res = await api.get("/income");
      setIncomes(res.data);
    } catch (err) {
      console.error("Fetch income failed", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchIncome();        
    } else {
      setIncomes([]);       
      setLoading(false);
    }
  }, [user]);

  const addIncome = async (income) => {
    await api.post("/income", income);
    await fetchIncome();
  };

  const updateIncome = async (income) => {
    await api.put(`/income/${income.id}`, income);
    await fetchIncome();
  };

  const deleteIncome = async (id) => {
    await api.delete(`/income/${id}`);
    setIncomes((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <IncomeContext.Provider
      value={{
        incomes,
        loading,
        addIncome,
        updateIncome,
        deleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncomes = () => useContext(IncomeContext);
