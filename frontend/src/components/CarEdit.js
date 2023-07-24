import React, { useState } from 'react';
import axios from 'axios';

const CarEdit = () => {
  const [carId, setCarId] = useState('');
  const [carData, setCarData] = useState({
    vin: '',
    plateNumber: '',
    state: '',
    make: '',
    model: '',
    year: 0,
    ownerName: '',
    ownerAddress: '',
    dlNumber: '',
    problemDescription: '',
    timeInShop: 0,
    workers: [""],
  });

  const handleSubmit = async (e) => {
    console.log("editing id:", carId.carId)
    e.preventDefault();
    try {
      await axios.put(`/cars/${carId.carId}`, carData);
      alert('Car data submitted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleIdChange = (e) => {
    setCarId({
      ...carId,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setCarData({
      ...carData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        {/* Car form fields */}
        <label>
          car_id:
          <input type="text" name="carId" onChange={handleIdChange} />
        </label>
        <br />
        <label>
          vin:
          <input type="text" name="vin" onChange={handleChange} />
        </label>
        <br />
        <label>
          plateNumber: 
          <input type="text" name="plateNumber" onChange={handleChange}/>
        </label>
        <br />
        <label>
          state:
          <input type="text" name="state" onChange={handleChange}/>
        </label>
        <br />
        <label> 
          make:
          <input type="text" name="make" onChange={handleChange}/>
        </label>
        <br />
        <label> 
          model:
          <input type="text" name="model" onChange={handleChange}/>
        </label>
        <br />
        <label> 
          year:
          <input type="text" name="year" onChange={handleChange}/>
        </label>
        <br />
        <label>
          ownerName:
          <input type="text" name="ownerName" onChange={handleChange}/>
        </label>
        <br />
        <label>
          ownerAddress: 
          <input type="text" name="ownerAddress" onChange={handleChange}/>
        </label>
        <br />
        <label>
          dlNumber: 
          <input type="text" name="dlNumber" onChange={handleChange}/>
        </label>
        <br />
        <label>
          problemDescription: 
          <input type="text" name="problemDescription" onChange={handleChange}/>
        </label>
        <br />
        <label>
          timeInShop:
          <input type="text" name="timeInShop" onChange={handleChange}/>
        </label>
        <br />
        <label>
          workers: 
          <input type="text" name="workers" onChange={handleChange}/>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarEdit;
