import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealImage from '../../assets/Bakery.jpg';
import classes from './Header.module.css';

const Header = props => {
    return <Fragment>
        <header className={classes.header}>
            <h1>Bakers Feast</h1>
            <HeaderCartButton onClick={props.showCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealImage} alt="baked bread" />
        </div>
    </Fragment>
};

export default Header;