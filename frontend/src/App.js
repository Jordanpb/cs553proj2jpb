import React from 'react';
import CarDelete from './components/CarDelete';
import CarEdit from './components/CarEdit';
import CarGet from './components/CarGet';
import CarForm from './components/CarForm';
import CarList from './components/CarList';

function App() {
  return (
    <div>
      <h1>Car ManagementSystem</h1>
      <CarForm />
      <CarList />
      <CarDelete />
      <CarEdit />
      <CarGet />
    </div>
  );
}

export default App;
