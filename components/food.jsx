import React, { useState, useEffect } from 'react';
import axios from 'axios';


const RandomMeal = () => {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setMeal(res.data.meals[0]);
    }
    fetchData();
  }, []);

  return (
    <div>
      {meal && (
        <>
          <img className='comida' src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
          <p>{meal.strArea}</p>
          <p>{meal.strCategory}</p>
        </>
      )}
    </div>
  );
};

export default RandomMeal;
