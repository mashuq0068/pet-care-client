/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const ContactUsPage = () => {
  return (
    <div className="max-w-5xl mx-auto py-16">
      <div className=" mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 theme-text md:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-gray-600 theme-text">We are here to answer any questions you have about pet care or our platform. Reach out to us and we'll respond as soon as we can.</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-12">
          {/* Contact Form */}
          <div className="md:w-7/12 lg:w-6/12 bg-white theme-bg theme bg rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-semibold text-gray-700 theme-text mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 theme-text mb-1">Your Name</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your name" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 theme-text mb-1">Your Email</label>
                <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 theme-text mb-1">Your Message</label>
                <textarea rows={4} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Write your message here"></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Send Message</button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="md:w-5/12 lg:w-6/12 flex flex-col space-y-6 mt-10 md:mt-0">
            {/* Contact Info */}
            <div className="bg-white theme-bg theme bg theme-bg rounded-lg shadow-md p-8 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-700 theme-text mb-4">Contact Details</h3>
              <div className="space-y-4">
                <p className="flex items-center justify-center md:justify-start text-gray-700 theme-text"><FaPhoneAlt className="text-green-500 mr-2" /> +1 123 456 7890</p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 theme-text"><FaEnvelope className="text-yellow-500 mr-2" /> support@petcarepro.com</p>
                <p className="flex items-center justify-center md:justify-start text-gray-700 theme-text"><FaMapMarkerAlt className="text-red-500 mr-2" /> 123 Pet Care St., City, Country</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white theme-bg theme bg rounded-lg shadow-md p-8 text-center md:text-left">
              <h3 className="text-xl font-semibold text-gray-700 theme-text mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="#" className="text-blue-600 hover:text-blue-800"><FaFacebookF /></a>
                <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
                <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram /></a>
                <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedinIn /></a>
              </div>
            </div>

            {/* Chat Button */}
            {/* <div className="text-center">
              <button className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                <BsFillChatLeftTextFill className="mr-2" /> Live Chat
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
