import React from 'react'
import HomeHero from '../../components/HomeHero/HomeHero'
import SignUp from '../../components/SignUp/SignUp'
import { useLocation } from 'react-router-dom';

function HomePage() {
    const location = useLocation();
    if (location.pathname === '/signup') {
        return (
            <SignUp />
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
