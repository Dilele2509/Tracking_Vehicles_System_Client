import React from 'react';
import './Contact.css';

export default function Contact() {
  return (
    <div className='contact-us-container'>
      <div className="container px-4 mx-auto">
        <div className="mx-auto">
          <div className="max-w-md mx-auto px-8 py-6 bg-dark-gray rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-light-beige mb-4">Contact Us</h2>
            <form>
              <div className="mb-4">
                <label className="block text-light-beige mb-1" htmlFor="name">Your Name</label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  placeholder="Enter your name"
                  type="text"
                />
              </div>
              <div className="mb-4">
                <label className="block text-light-beige mb-1" htmlFor="email">Your Email</label>
                <input
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  type="email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-light-beige mb-1" htmlFor="message">Your Message</label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  rows="4"
                  placeholder="Enter your message"
                  name="message"
                  id="message"
                ></textarea>
              </div>
              <button
                className="w-full bg-yellow-custom text-gray-custom py-2 px-4 rounded-lg transition duration-300"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
