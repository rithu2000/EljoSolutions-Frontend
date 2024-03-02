import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import { Toaster } from 'react-hot-toast';
import NewEmployee from './components/NewEmployee';
import Login from './components/Login';
import EmployeeProfile from './components/EmployeeProfile';
import PrivateRoute from './routes/PrivateRoute';
import EditEmployee from './components/EditEmployee';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position='top-center' />
      <Routes>

        <Route element={<PrivateRoute />}>
          <Route path='/employee-profile' element={<EmployeeProfile />} />
        </Route>

        <Route path='/*' element={<EmployeeList />} />
        <Route path="/new-employee" element={<NewEmployee />} />
        <Route path="/edit-employee" element={<EditEmployee />} />
        <Route path='/login' element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;