import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createExpenseId, summarizeExpenses } from '../utils/expense';
import { loadExpenses, saveExpenses, clearAllExpenses, restoreDemoExpenses } from '../utils/storage';

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => loadExpenses());

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const summary = useMemo(() => summarizeExpenses(expenses), [expenses]);

  const inboxExpenses = useMemo(
    () => expenses.filter((expense) => expense.status === 'inbox'),
    [expenses]
  );

  const categorizedExpenses = useMemo(
    () => expenses.filter((expense) => expense.status === 'categorized'),
    [expenses]
  );

  const addExpense = (payload) => {
    const expense = {
      id: createExpenseId(),
      name: payload.name,
      amount: Number(payload.amount),
      date: payload.date ?? new Date().toISOString().slice(0, 10),
      imageData: payload.imageData ?? null,
      status: payload.status ?? 'inbox',
      categoryId: payload.categoryId ?? null,
      businessRatio: payload.businessRatio ?? 100,
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [expense, ...prev]);
    return expense;
  };

  const categorizeExpense = (id, { categoryId, businessRatio, amount, name }) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              status: 'categorized',
              categoryId,
              businessRatio,
              amount: amount ?? expense.amount,
              name: name ?? expense.name,
            }
          : expense
      )
    );
  };

  const excludeExpense = (id) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id
          ? { ...expense, status: 'excluded', categoryId: null, businessRatio: 0 }
          : expense
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const clearAllData = () => {
    setExpenses(clearAllExpenses());
  };

  const restoreDemoData = () => {
    setExpenses(restoreDemoExpenses());
  };

  const restoreExpenses = (newExpenses) => {
    setExpenses(newExpenses);
  };

  const value = {
    expenses,
    inboxExpenses,
    categorizedExpenses,
    summary,
    addExpense,
    categorizeExpense,
    excludeExpense,
    deleteExpense,
    clearAllData,
    restoreDemoData,
    restoreExpenses,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return context;
}
