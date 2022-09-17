import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './layout';
// import NoMatch from './pages/noMatch';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
