import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExpensesProvider } from './context/ExpensesContext.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'
import { IncomeProvider } from './context/IncomeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
  <ExpensesProvider>
    <IncomeProvider>
      <BudgetProvider>
        <App />
      </BudgetProvider>
    </IncomeProvider>
  </ExpensesProvider>
</AuthProvider>

  </StrictMode>,
)
