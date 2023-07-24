import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // setSeconds(seconds => seconds + 1);
      const fetchCars = async () => {
        try {
          const response = await axios.get('/cars');
          // const data = await response.json()
          setCars(response.data);
          console.log("response.data: ",response.data);
        } catch (error) {
          console.error(error);
        }
      };
      console.log("running fetch cars")
      fetchCars().then((result) => { 
        console.log('useEffect()>fetchCars()')
        console.log("fetchCars() result:", result); 
      }).catch(error => {
        console.log(error); 
      }) 
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>{car._id}: {car.make} - {car.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
