import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [billAmount, setBillAmount] = useState(0);
  const [paymentDone, setPaymentDone] = useState('No'); // State for payment status
  const [submitted, setSubmitted] = useState(false); // State for form submission

  // Function to calculate the bill and apply discount if applicable
  const calculateBill = (adults, children) => {
    let totalAmount = adults * 700 + children * 350;

    // Apply 10% discount if total people (adults + children) is 10 or more
    const totalPeople = adults + children;
    if (totalPeople >= 10) {
      totalAmount *= 0.9; // 10% discount
    }

    return totalAmount;
  };

  const handleAdultsChange = (e) => {
    const adultCount = parseInt(e.target.value) || 0;
    setAdults(adultCount);
    const newBillAmount = calculateBill(adultCount, children);
    setBillAmount(newBillAmount);
  };

  const handleChildrenChange = (e) => {
    const childrenCount = parseInt(e.target.value) || 0;
    setChildren(childrenCount);
    const newBillAmount = calculateBill(adults, childrenCount);
    setBillAmount(newBillAmount);
  };

  const handlePaymentDoneChange = (e) => {
    setPaymentDone(e.target.value); // Update payment status
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = "https://script.google.com/macros/s/AKfycbwPJqAPCNzLAZNk8JM0hB_ggslq5yHG9kZH3SwZcYHXK5M_gVc_sq97ym9WdyAsV1ih/exec";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: (
        `name=${e.target.name.value}&email=${e.target.email.value}&phone=${e.target.phone.value}&adults=${e.target.adults.value}&children=${e.target.children.value}&billAmount=${e.target.billAmount.value}&paymentDone=${e.target.paymentDone.value}`
      )
    }).then(res => res.text()).then(data => {
      setSubmitted(true); // Show submission message as modal
      setName('');
      setEmail('');
      setPhone('');
      setAdults(0);
      setChildren(0);
      setBillAmount(0);
      setPaymentDone('No');
    }).catch(error => console.log(error));
  };

  const handleCloseModal = () => {
    setSubmitted(false); // Close the modal when clicking 'Close'
  };

  return (
    <div className="container">
      <h1 className="heading">Registration Form</h1>
      <h2 className="heading-sec">New Year Celebration at Hotel Aaradhya</h2>
      <h2 className="heading-sec">2025</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="adults">Number of Adults</label>
          <input
            type="number"
            id="adults"
            className="input"
            value={adults}
            onChange={handleAdultsChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="children">Number of Children (Age 10 and below)</label>
          <input
            type="number"
            id="children"
            className="input"
            value={children}
            onChange={handleChildrenChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="billAmount">Total Bill</label>
          <input
            type="text"
            id="billAmount"
            className="input"
            value={`₹${billAmount}`}
            readOnly
          />
        </div>
        
        {/* UPI ID and QR Code */}
        <div className="input-group">
          <label htmlFor="upiId">UPI ID</label>
          <input
            type="text"
            id="upiId"
            className="input"
            value="8766556890@okbizaxis"
            readOnly
          />
        </div>
        <div className="input-group">
          <label htmlFor="upiQr">Scan QR Code</label>
          <img src="QR.jpg" alt="UPI QR" className="qr-image" />
        </div>
        
        {/* Payment Status Dropdown */}
        <div className="input-group">
          <label htmlFor="paymentDone">Payment Done</label>
          <select
            id="paymentDone"
            value={paymentDone}
            onChange={handlePaymentDoneChange}
            className="input"
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {paymentDone === 'No' && (
          <p className="warning-text"> You can pay on the event day. If payment is not done, table reservation is not guaranteed. </p>
        )}
        {paymentDone === 'Yes' && (
          <p className="warning-text" style={{color:'green'}}> Your Booking Confirmation will be sent by Email/Whatsapp Provided.</p>
        )}

        <button
          type="submit"
          className="submit-button"
        >
          Confirm 
        </button>
      </form>

      {/* Modal for Success Message */}
      {submitted && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <p>Your details have been recorded successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
