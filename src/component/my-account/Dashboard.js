import React from 'react';
export default class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <><p> Hello Aishwarya Singh (not Aishwarya Singh? Log out)</p>

                <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                <div className="my-account-links">
                    <div className="orders"><a href="#">Orders</a></div>
                    <div className="address"><a href="#">Address</a></div>
                    <div className="account-details"><a href="#">Account Details</a></div>
                    <div className="followings"><a href="#">followings</a></div>
                    <div className="support"><a href="#">Support Tickets</a></div>
                    <div className="inquiry"><a href="#">Inquiries</a></div>
                    <div className="wishlist"><a href="#">Wishlist</a></div>
                    <div className="logout"><a href="#">Loout</a></div>
                </div>
            </>
        );
    }
}