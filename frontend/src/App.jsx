import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ViewItems from './pages/ViewItems';
import AddItem from './pages/AddItem';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
