import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import styles from "./BottomNavigation.module.css"
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';

export default function LabelBottomNavigation() {
    const router = useRouter()
    const [state, setState] = useState('')

    const handleClick = async (path) => {
        await router.push(`${path}`)
    }

    useEffect(() => {
        if (router.pathname === '/') setState('home');
        if(router.pathname === '/products/shopping-bag') setState('shoppingbag')
        if(router.pathname === '/products/wish-list') setState('favorites')
        if(router.pathname === '/account/my-account') setState('person')
    }, [])

    return (
        <BottomNavigation
            value={state}
            className={styles.main}
        >
            <BottomNavigationAction
                label="Home"
                value="home"
                icon={
                    <HomeIcon className={styles.icon}/>
                }
                onClick={() => handleClick('/', 'home')}
            />

            <BottomNavigationAction
                label="Your Bag"
                value="shoppingbag"
                icon={
                    <ShoppingBagIcon className={styles.icon}/>
                }
                onClick={() => handleClick('/products/shopping-bag', 'shoppingbag')}
            />
            <BottomNavigationAction
                label="Wish List"
                value="favorites"
                icon={
                    <FavoriteIcon className={styles.icon}/>
                }
                onClick={() => handleClick('/products/wish-list', 'favorites')}
            />
            <BottomNavigationAction
                label="Account"
                value="person"
                icon={
                    <PersonIcon className={styles.icon}/>
                }
                onClick={() => handleClick('/account/my-account', 'person')}
            />
        </BottomNavigation>
    );
}
