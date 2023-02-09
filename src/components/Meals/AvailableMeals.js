import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading]= useState(true);
    const [httpError, setHttpError]= useState();


    useEffect(() => {   
        const fetchMeals = async () => {
            const response = await fetch(
                'https://e-commerce-d120c-default-rtdb.firebaseio.com/meals.json'
                );
                if(!response.ok){
                    throw new Error('something went wrong!');
                }

            const responseData = await response.json();
            const loadedMeals = [];
            for(const key in responseData){
                loadedMeals.push({
                    id:key,
                    name: responseData[key].name,
                    description:responseData[key].description,
                    price:responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };
            fetchMeals().catch((error)=> {
    setIsLoading(false);
    setHttpError(error.message);
           });     
    }, []);


    if(isLoading){
        return(
        <section className={classes.mealsLoading}>
            <p>loading...</p>
            </section>
        );
    }
    if(httpError){
        return(
         <section className={classes.mealsError}>
            <p>{httpError}</p>
            </section>
            
        )
    }
    const MealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{MealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;