import React from 'react';
import { MarketingApp } from '../components/marketing-app';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';

export default () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <h1>Shell here!!</h1>
                <hr />
                <MarketingApp />
            </div>
        </BrowserRouter>);
}