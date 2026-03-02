import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewApplication from './pages/NewApplication';
import CompanyAnalysis from './pages/CompanyAnalysis';
import AIResearch from './pages/AIResearch';
import RiskScoring from './pages/RiskScoring';
import CAMReport from './pages/CAMReport';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-application" element={<NewApplication />} />
          <Route path="company-analysis" element={<CompanyAnalysis />} />
          <Route path="ai-research" element={<AIResearch />} />
          <Route path="risk-scoring" element={<RiskScoring />} />
          <Route path="cam-report" element={<CAMReport />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
