// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostPage from './components/PostPage';
import FindQuestionsPage from './components/FindQuestionsPage';
import PricingPlans from './components/PricingPlans';
import PaymentPage from './components/PaymentPage';
import PostEditor from './components/PostEditor';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <header className="App-header">
        <h1>DEV@Deakin Platform</h1>
        <nav>
          <Link to="/">Post</Link> | 
          <Link to="/find-questions">Find Questions</Link> | 
          <Link to="/plans">Pricing Plans</Link> | 
          <Link to="/editor">Post Editor</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostPage />} />
          <Route path="/find-questions" element={<FindQuestionsPage />} />
          <Route path="/plans" element={<PricingPlans />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/editor" element={<PostEditor />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
