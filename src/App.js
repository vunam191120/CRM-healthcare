import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './layout';
import ResetPassword from './pages/resetPassword';
// import NoMatch from './pages/noMatch';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
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
