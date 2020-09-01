import React from 'react';
import UserList from '../components/UserList';
import { useSelector } from 'react-redux';
import HoaxSubmit from '../components/HoaxSubmit';
import HoaxFeed from '../components/HoaxFeed';
const HomePage = () => {
    const {isLoggedIn} = useSelector(store => ({isLoggedIn : store.isLoggedIn}));

    return (
        <div className="container">
            <div className="row">
            <div className="col"> 
            {isLoggedIn && (
                <div className="mb-1">
            <HoaxSubmit/>
                </div>
            )}
            <HoaxFeed/> 
            </div>
            <div className="col"><UserList/></div>
            </div>
        </div>
    );
};

export default HomePage;