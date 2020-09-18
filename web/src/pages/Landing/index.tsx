import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';
import ladingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { useAuth } from '../../contexts/auth';

import api from '../../services/api';

import './style.css';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);
    const [userName, setUserName] = useState();

    const { user, signOut } = useAuth();

    function handleSignOut() {
        signOut();
    }

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })

        api.get('accounts/credentials', {params: {email: user?.email}}).then(response => {
            const { username } = response.data;

            setUserName(username);
            console.log(username);
        })
    }, []);


    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Your online study platform.</h2>
                </div>

                <img 
                    src={ladingImg} 
                    alt="Plataforma de estudos online." 
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Study"/>
                        Study
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Give Lessons"/>
                        Teach
                    </Link>
                </div>
                <span className="total-connections">
                    Total of {totalConnections} connections made  
                    <img src={purpleHeartIcon} alt="Purple Heart"/>
                </span>
                <span className="logged-as">
                    Logged as {userName||'Guest'} 
                    <img src={purpleHeartIcon} alt="Purple Heart"/>
                    <button onClick={handleSignOut}>sign out</button>
                </span>
            </div>
        </div>
    )
}

export default Landing;