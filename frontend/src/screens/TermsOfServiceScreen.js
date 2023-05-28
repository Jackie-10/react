import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../Store';

export default function TermsOfServiceScreen() {

    const { state } = useContext(Store);
    const { userInfo } = state;

    return (
        <div>
            <Helmet>
                <title>Terms Of Service</title>
            </Helmet>
            <h1 Style='text-align:center'>Terms Of Service</h1>
            {!userInfo && <Link to="/signup" Style="color:white;">
                <i className="fas fa-arrow-left" Style="color:white"></i>&nbsp;Return to sign up screen</Link>}
            {userInfo && <Link to="/" Style="color:white;">
                <i className="fas fa-arrow-left" Style="color:white"></i>&nbsp;Return to homepage</Link>}
            <br></br>
            <br></br>
            {/* הדבק תנאי שימוש כאן */}
        </div>
    )
}
