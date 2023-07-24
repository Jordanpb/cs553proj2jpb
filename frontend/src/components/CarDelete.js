import React, { useState } from 'react';
import axios from 'axios';

const CarDelete = () => {
  const [carData, setCarData] = useState({
    _id: ''
  });

  const handleSubmit = async (e) => {
    console.log("deleting id:", carData._id)
    e.preventDefault();
    try {
      const carId = carData._id;
      await axios.delete(`/cars/${carId}`, {data: carData});
      alert('Car data deleted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Delete Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car form fields */}
        <label>
          car id to delete:
          <input type="text" name="_id" onChange={handleChange} />
        </label>
        <br />
        <button type="delete">delete</button>
      </form>
    </div>
  );
};

export default CarDelete;
