import React from 'react';
import Collapsible from 'react-collapsible';
export default class Faq extends React.Component {

  constructor() {
    super();
    this.state = {
    };
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <section id="maincontent">
        <div className="subpages-heading">
          <div className="container">
            <h1 className="text-center p-5">Frequently Asked Questions (FAQs)</h1>

          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 p-5">
            <Collapsible trigger="1. How to create an Account ?">
          <p>
          Go to this page https://app.digitalindiacorporation.in/v1/digi and click “create an account”, then just fill in all the needed information and click “create”.  After submitting the form, your account will be confirmed and you will be notified.
          </p>
          <p>
          <img src="https://app.digitalindiacorporation.in/v1/digi/wp-content/uploads/2021/02/CREATE-1024x458.jpg" className="img-fluid"/>
          </p>
        </Collapsible>

        <Collapsible trigger="2. How can I retrieve my password ?">
          <p>
          You can retrieve your password by clicking “Lost password?” Instruction on password retrieval will be send to your email.
          </p>
          
        </Collapsible>

        <Collapsible trigger="3. How do I change my personal details or email address ?">
          <p>
          You can easily change all your information on your account.  Go to login page (https://app.digitalindiacorporation.in/v1/digi ) and log in, then click “ account details” and edit. Here you can click “Save Changes” button for update to all your contact information.
          </p>
          
        </Collapsible>

        <Collapsible trigger="4.How can I order ?">
          <p>
          You can order easily using our online platform. When you find a product by search/ select you need, you can add it to cart, login/register and go through the ordering process. After the order is ready, you will receive order summary to your email. Order summary will also be stored to your account.
          </p>
          
        </Collapsible>

        <Collapsible trigger="5. Why should I buy online ?">
          <p>
          Speeding up the process. By ordering online you will you will get prices faster and you will be able to go through order confirmation and payment process much faster. This could save days of your time.Many option available for online booking order e.g. Cash on delivery, online (credit/debit and net banking) and paytm
          </p>
          
        </Collapsible>


        <Collapsible trigger="2. How can I retrieve my password ?">
          <p>
          You can retrieve your password by clicking “Lost password?” Instruction on password retrieval will be send to your email.
          </p>
          
        </Collapsible>


        <Collapsible trigger="6. How can I change password?">
          <p>
          Sign in to your account and go to “my account”. On “my account details” you can change  name, Email and password by click “Save Changes” button.
          </p>
          
        </Collapsible>


        <Collapsible trigger="7. How can I change address ?">
          <p>
          Sign in to your account and go to “my account”. On “my account addresses “Billing/ Shipping” you can change name, Email, Contact Number and Address by click “Save Changes” button.
          </p>
          
        </Collapsible>


        <Collapsible trigger="8. Can I cancel my order ?">
          <p>
          If you want to cancel your order, please do so as soon as possible. If we have already processed your order. Please go to refund process, select refund mode, select refund quantity, enter refund request reason and click submit button.
          </p>
          
        </Collapsible>


        <Collapsible trigger="9. Can I see product in stock ?">
          <p>
          If you search the product and want to add product in cart. It will not add product in cart.It will show product is out of stock.
          </p>
          
        </Collapsible>


        <Collapsible trigger="10. Can I return a product ?">
          <p>
          If you want to return/exchange product. This facilities available in eShilpmart.
          </p>
          
        </Collapsible>
            </div>
          </div>
        

      </div>
      </section>
    );
  }
}