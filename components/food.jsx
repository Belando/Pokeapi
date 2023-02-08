import React, { useState, useEffect } from 'react';
import axios from 'axios';
import foodStyle from '../styles/Food.module.css'

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
    <div className={foodStyle.all}>
      {meal && (
        <>
          <h5>Nuestra recomendación es:</h5>
          <img className={foodStyle.photo} src={meal.strMealThumb} alt={meal.strMeal} />
          <h3>{meal.strMeal}</h3>
          <p>{meal.strArea}</p>
          <p>{meal.strCategory}</p>
        </>
      )}
    </div>
  );
};

export default RandomMeal;
