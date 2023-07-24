import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarGet = () => {
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState('');
 
  const handleSubmit = async (e) => {
    console.log("getting id:", carId.carId)
    e.preventDefault();
    try {
      const fetchCars = async () => {
        try {
          const response = await axios.get(`/cars/${carId.carId}`);
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
    }catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCarId({
      ...carId,
      [e.target.name]: e.target.value,
    });
  };

  const CarDetails = ({ carData }) => {
    return (
      <ul>
        {Object.entries(carData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            {Array.isArray(value) ? value.join(", ") : value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Get single Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car form fields */}
        <label>
          car id to get:
          <input type="text" name="carId" onChange={handleChange} />
        </label>
        <br />
        <button type="get">get</button>
      </form>
      {/* <ul>
        {cars.map((car) => (
          <li key={car._id}>{car._id}: {car.make} - {car.model}</li>
        ))}
      </ul> */}
      <CarDetails carData={cars} />
    </div>
  );
};

export default CarGet;
