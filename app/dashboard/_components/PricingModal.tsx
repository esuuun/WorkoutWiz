
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Check, LoaderCircle, Unlock, X } from 'lucide-react';
import React, { useState } from 'react';

function PricingModal({ isOpen, onClose }) {
  const [loading,setLoading] = useState(false)
  if (!isOpen) return null;

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/stripe')
      window.location.href = response.data.url
    } catch (error) {
      console.log(error,'STRIPE_CLIENT_ERROR')
    }
    finally {
      setLoading(false)
    }
  }

  const features = [
    'Personalized workout plans',
    'Unlimited workout plans',
    'Progress tracking',
    'Perfect Workout based of your goals and circumstances',
  ]

  return (
    <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80'>
      <div className="bg-background ring-2 ring-ring rounded-3xl p-8 xl:p-10 relative">
        
      <button
          className="absolute top-3 right-3 "
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
       
        <div className="flex items-baseline justify-between gap-x-4">
          <p className="flex items-baseline gap-x-1">
            <span className="text-4xl font-bold tracking-tight text-white">
              $14.99 <span className="text-base font-normal">/ month</span>
            </span>
            <span className="text-sm font-semibold leading-6 text-gray-300"></span>
          </p>
          <p className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold leading-5 text-white">
            Most popular
          </p>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-300">
        Join our most popular plan and unlock your full fitness potential.
        </p>

        <ul
              role="list"
              className="mt-8 space-y-3 text-base leading-6  xl:mt-10"
            >
              {features.map((feature, index) => (
                <li className="flex gap-x-3" key={index}>
                <Check/>
                <span>{feature}</span>
              </li>
              ))}
            </ul>
        {loading ? <Button
          onClick={onSubscribe}
          aria-describedby="product2"
          className="bg-primary w-full text-white shadow-sm hover:bg-muted focus-visible:outline-indigo-500 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <LoaderCircle className='animate-spin w-full text-center'/>
        </Button> : <Button
          onClick={onSubscribe}
          aria-describedby="product2"
          className="mt-10 w-full flex text-lg font-semibold hover:bg-muted hover:text-foreground"
        >
            Unlock Your Personalized Fitness Plan!
        </Button>}
        
      </div>
    </div>
  );
}

export default PricingModal;
