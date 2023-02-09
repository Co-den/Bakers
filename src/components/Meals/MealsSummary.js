import classes from './MealsSummary.module.css';

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
        <h2>Delivery Food, Delivered To You</h2>
        <p>Choose your favourite meal from our broad selection of available meals
            and enjoy a delicious breakfast, lunch and dinner at home.
        </p>
        <p>All our meals are cooked and baked with high-quality ingredients, just-in-time
            and of course by experienced chefs </p>
    </section>
    );
};

export default MealsSummary;