import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home, Inbox, Calculator, BarChart3 } from 'lucide-react';
import { ExpenseProvider } from './context/ExpenseContext';
import HomePage from './pages/Home';
import InboxPage from './pages/Inbox';
import CategorizePage from './pages/Categorize';
import AddExpensePage from './pages/AddExpense';
import SummaryPage from './pages/Summary';
import InstallGuide from './components/InstallGuide';

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-brand">
        <h1 className="text-primary font-black">かんたん経費ノート</h1>
        <p className="text-muted">配信者の経費メモ</p>
      </div>

      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
        <Home size={24} />
        <span>ホーム</span>
      </NavLink>
      <NavLink to="/inbox" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Inbox size={24} />
        <span>未分類</span>
      </NavLink>
      <NavLink to="/categorize" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <Calculator size={24} />
        <span>分類</span>
      </NavLink>
      <NavLink to="/summary" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <BarChart3 size={24} />
        <span>サマリー</span>
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/add" element={<AddExpensePage />} />
              <Route path="/categorize" element={<CategorizePage />} />
              <Route path="/categorize/:expenseId" element={<CategorizePage />} />
              <Route path="/summary" element={<SummaryPage />} />
            </Routes>
          </main>
          <InstallGuide />
        </div>
      </BrowserRouter>
    </ExpenseProvider>
  );
}

export default App;
