import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const res = await api.get("/budgets");
      setBudgets(res.data);
    } catch {
      console.error("Fetch budgets failed");
    }
  };

 
  useEffect(() => {
    if (user) {
      fetchBudgets();    
    } else {
      setBudgets([]);      
    }
  }, [user]);

  const setBudget = async (budget) => {
    const res = await api.post("/budgets", budget);

    setBudgets((prev) => {
      const exists = prev.find(
        (b) =>
          b.category === res.data.category &&
          b.month === res.data.month
      );

      if (exists) {
        return prev.map((b) =>
          b.id === exists.id ? res.data : b
        );
      }

      return [...prev, res.data];
    });
  };

  const deleteBudget = async (id) => {
    await api.delete(`/budgets/${id}`);
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        setBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudgets = () => useContext(BudgetContext);
