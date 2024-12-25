import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [billAmount, setBillAmount] = useState(0);


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
  // https://script.google.com/macros/s/AKfycbyEuvXGEZTPf55RkwP5lFMLEdUmjze5AW37g3JGG6d8iBrqWc3HQEw9XiusA_WiGDGO/exec

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = " https://script.google.com/macros/s/AKfycbyEuvXGEZTPf55RkwP5lFMLEdUmjze5AW37g3JGG6d8iBrqWc3HQEw9XiusA_WiGDGO/exec";
    fetch(url,{
      method:"POST",
      headers:{"Content-Type" : "application/x-www-form-urlencoded"},
      body:(`name=${e.target.name.value}&email=${e.target.email.value}&phone=${e.target.phone.value}&adults=${e.target.adults.value}&children=${e.target.children.value}&billAmount=${e.target.billAmount.value}`)
    }).then(res => res.text()).then(data => {
      alert(data)
    }).catch(error=>console.log(error))

    // // Send data to backend for Google Sheets
    // try {
    //   await axios.post('http://localhost:5000/addData', {
    //     name,
    //     email,
    //     phone,
    //     adults,
    //     children,
    //     billAmount,
    //   });
    //   alert(`Booking Confirmed. Total Bill: ₹${billAmount}`);
    // } catch (error) {
    //   console.error('Error submitting data:', error);
    //   alert('There was an error submitting the form.');
    // }
    // console.log(name,email,phone, adults,children,billAmount);
    
    // Razorpay payment logic can be integrated here
  };

  return (
    <div className="container">
      <h1 className="heading">Booking Form</h1>
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
        <button
          type="submit"
          className="submit-button"
        >
          Confirm Booking and Payment
        </button>
      </form>
    </div>
  );
}

export default App;
