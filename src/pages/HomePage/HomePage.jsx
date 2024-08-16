import React from 'react'
import HomeHero from '../../components/HomeHero/HomeHero'
import SignUp from '../../components/SignUp/SignUp'
import { useLocation } from 'react-router-dom';
import Login from '../../components/Login/Login';

function HomePage() {
    const location = useLocation();
    if (location.pathname === '/signup') {
        return (
            <SignUp />
        )
    } else if (location.pathname === '/login') {
        return (
            <Login />
        )
    } else {
        return (
            <div>
                <HomeHero />
            </div>
        )
    }
}

export default HomePage
