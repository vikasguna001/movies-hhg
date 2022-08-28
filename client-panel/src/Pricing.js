import React from 'react'
import Header from './header'
import './Pricing.css'
import {env} from "./Env"
import axios from "axios";
import { useState } from "react";

function Pricing() {
  const [book, setBook] = useState({
		name: "Movies",
		author: "HHG Softech Private Limited",
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEi6Lb7RPxp3dbTLN1tDVNsdAGo-p89n-_Sg&usqp=CAU",
		price: 500,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_ii0W1QDV7ASF82",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = env.apiURL +"verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
    debugger
		try {
			const orderUrl = env.apiURL +"orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};




  return (
    <div>
    <Header/>

    {/* <div className="App">
			<div className="book_container">
				<img src={book.img} alt="book_img" className="book_img" />
				<p className="book_name">{book.name}</p>
				<p className="book_author">By {book.author}</p>
				<p className="book_price">
					Price : <span>&#x20B9; {book.price}</span>
				</p>
				<button onClick={handlePayment} className="buy_btn">buy now</button>
			</div>
		</div>
                 */}


<section class="max-w-7xl px-4 pt-24 pb-12 mx-auto">
  <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
    <h1 class="block pb-2 mb-5 text-4xl font-extrabold leading-none tracking-normal text-transparent md:text-6xl md:tracking-tight bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">
      Simple, transparent pricing.
    </h1>
    <p class="px-0 mb-10 text-lg text-gray-500 md:text-xl lg:px-24">Pricing that works for companies of any size.</p>
  </div>
  <div class="w-full mx-auto xl:w-4/5">
    <div class="grid grid-cols-1 gap-16 lg:grid-cols-3 sm:gap-8">
      <div class="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div class="flex flex-col justify-between p-6 border-b border-gray-200">
          <p class="mb-1 text-lg font-semibold text-yellow-600">Take Flight</p>
          <p class="pb-0 my-2 font-mono text-4xl font-extrabold text-gray-900">$500</p>
          <p class="text-sm text-gray-500">Organization / month</p>
          <a href="#" class="w-full mt-6 btn btn-warning btn-lg"> 
            <button onClick={handlePayment} className="buy_btn"> Get Started</button>
          &rarr;</a>
        </div>
        <ul>
          <li>Unlimited feedback</li>
          <li>One manager</li>
          <li>Unlimited Private Boards</li>
          <li>Custom domains support</li>
          <li>Free iOS and Android apps</li>
          <li>3 Integrations</li>
          <li>New features every 14 days</li>
        </ul>
      </div>
      <div class="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div class="flex flex-col justify-between p-6 border-b border-gray-200">
          <div>
            <div class="flex items-center justify-between">
              <p class="mb-1 text-lg font-semibold text-purple-700">Fly High</p>
            </div>
            <p class="my-2 font-mono text-4xl font-extrabold text-gray-900">$100v0</p>
            <p class="text-sm text-gray-500">Organization / month</p>
          </div>
          <a href="#" class="w-full mt-6 btn btn-primary btn-lg">
            <button onClick={handlePayment} className="buy_btn"> Get Started</button>
             &rarr;</a>
        </div>
        <ul>
          <li>Unlimited feedback</li>
          <li>One manager</li>
          <li>Unlimited Private Boards</li>
          <li>Custom domains support</li>
          <li>Free iOS and Android apps</li>
          <li>3 Integrations</li>
          <li>New features every 14 days</li>
        </ul>
    </div>
      <div class="border-0 rounded-none shadow-none card sm:rounded-lg md:border">
        <div class="flex flex-col justify-between p-6 border-b border-gray-200">
          <div>
            <p class="mb-1 text-lg font-semibold text-pink-600">Enterprise</p>
            <p class="my-2 text-4xl font-bold text-gray-900">Custom</p>
            <p class="text-sm text-gray-500">Organization / month</p>
          </div>
          <a  class="w-full mt-6 btn btn-light btn-lg">
            
          <button onClick={handlePayment} className="buy_btn"> Get Started</button>
           &rarr;</a>
        </div>
        <ul>
          <li>Unlimited feedback</li>
          <li>One manager</li>
          <li>Unlimited Private Boards</li>
          <li>Custom domains support</li>
          <li>Free iOS and Android apps</li>
          <li>3 Integrations</li>
          <li>New features every 14 days</li>
        </ul>
      </div>
    </div>
  </div>
</section>



    </div>
  )
}

export default Pricing
