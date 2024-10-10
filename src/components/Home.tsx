  "use client"
  import React, { useState } from 'react';

  interface UserData {
    name: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
    diet: {
      breakfast: string[];
      lunch: string[];
      dinner: string[];
    };
    goal: string;
  }

  interface DietSuggestion {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
    tips: string[];
  }

  export default function Home() {
    const [userData, setUserData] = useState<UserData>({
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
    const [dietSuggestion, setDietSuggestion] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        const data = await res.json();
        console.log(data); // Check if the structure is correct

      
        if (res.ok) {
          setDietSuggestion(data.dietSuggestion);
        } else {
          throw new Error(data.message || 'An error occurred');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setUserData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleDietChange = (meal: keyof UserData['diet'], value: string) => {
      setUserData(prevState => ({
        ...prevState,
        diet: {
          ...prevState.diet,
          [meal]: value.split(',').map(item => item.trim())
        }
      }));
    };

    const inputStyle = {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%'
    };

    const buttonStyle = {
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };

    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Diet Plan Application</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Name"
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              placeholder="Age"
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="height"
              value={userData.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              style={inputStyle}
              required
            />
            <input
              type="number"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              style={inputStyle}
              required
            />
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              style={inputStyle}
              required
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
              style={inputStyle}
              required
            >
              <option value="">Select Goal</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <div>
              <h2 className="text-xl font-semibold mb-2">Current Diet Plan</h2>
              <input
                type="text"
                name="breakfast"
                value={userData.diet.breakfast.join(', ')}
                onChange={(e) => handleDietChange('breakfast', e.target.value)}
                placeholder="Breakfast (comma-separated)"
                style={inputStyle}
                className="mb-2"
              />
              <input
                type="text"
                name="lunch"
                value={userData.diet.lunch.join(', ')}
                onChange={(e) => handleDietChange('lunch', e.target.value)}
                placeholder="Lunch (comma-separated)"
                style={inputStyle}
                className="mb-2"
              />
              <input
                type="text"
                name="dinner"
                value={userData.diet.dinner.join(', ')}
                onChange={(e) => handleDietChange('dinner', e.target.value)}
                placeholder="Dinner (comma-separated)"
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle} disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
                   {dietSuggestion && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
                    <h2 className="text-xl font-semibold mb-2">Diet Suggestion</h2>
                    <p>{dietSuggestion}</p> {/* Render the suggestion directly */}
                </div>
            )}

      </div>
    );
  }