import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect( () => {
    const fetchMeals = async () => {
      const response =  await fetch('https://react-curso-1fc5b-default-rtdb.firebaseio.com/meals.json');
      
      if(!response.ok) {
        throw new Error('Deu biziu');
      }

      const data = await response.json();
      
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
      setLoading(false);
    };

      fetchMeals().catch(err => {
        setLoading(false)
        setHttpError(err.message);
      });  


  },[]);

  if(loading) {
    return (
    <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
    )
  };

  if (httpError){
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
      )
  }

  const mealsList = meals.map(meal => 
  <MealItem 
    key={meal.id} 
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price} 
    /> 
    );

  return <section className={classes.meals}>
    <Card>
    <ul>{mealsList}</ul>
    </Card>
  </section>
};

export default AvailableMeals;