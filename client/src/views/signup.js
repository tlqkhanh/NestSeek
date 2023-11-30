import React, { useState } from 'react';
import { register } from '../action/userAction';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullname: '',
    phonenumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(formData);

      console.log(response.data); // Handle the server response as needed

      // Optionally, you can redirect the user to a different page after successful signup.
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle errors and provide feedback to the user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Full Name:
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="tel"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
