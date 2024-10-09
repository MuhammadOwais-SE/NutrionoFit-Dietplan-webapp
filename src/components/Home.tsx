"use client"
import React, { useState } from 'react';

export default function Home() {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    diet: {
      breakfast: [''],
      lunch: [''],
      dinner: ['']
    },
    goal: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      alert('User data submitted successfully!');
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDietChange = (meal: any, value: any) => {
    setUserData(prevState => ({
      ...prevState,
      diet: {
        ...prevState.diet,
        [meal]: value.split(',').map(item => item.trim())
      }
    }));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Diet Plan Application</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Age"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            name="height"
            value={userData.height}
            onChange={handleChange}
            placeholder="Height (cm)"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="number"
            name="weight"
            value={userData.weight}
            onChange={handleChange}
            placeholder="Weight (kg)"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <select
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="goal"
            value={userData.goal}
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Maintenance">Maintenance</option>
          </select>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Diet Plan</h2>
            <input
              type="text"
              name="breakfast"
              value={userData.diet.breakfast.join(', ')}
              onChange={(e) => handleDietChange('breakfast', e.target.value)}
              placeholder="Breakfast (comma-separated)"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="lunch"
              value={userData.diet.lunch.join(', ')}
              onChange={(e) => handleDietChange('lunch', e.target.value)}
              placeholder="Lunch (comma-separated)"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="dinner"
              value={userData.diet.dinner.join(', ')}
              onChange={(e) => handleDietChange('dinner', e.target.value)}
              placeholder="Dinner (comma-separated)"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    </div>
  );
}