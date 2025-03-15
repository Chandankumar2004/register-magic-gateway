
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pricing Plans</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Basic</h2>
            <p className="text-3xl font-bold mb-4">$0<span className="text-gray-500 text-base font-normal">/month</span></p>
            <p className="text-gray-600 mb-6">
              Perfect for getting started with your job search.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Up to 5 job applications</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Basic profile</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Email notifications</span>
              </li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-blue-200 relative">
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium">Popular</div>
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Pro</h2>
            <p className="text-3xl font-bold mb-4">$19<span className="text-gray-500 text-base font-normal">/month</span></p>
            <p className="text-gray-600 mb-6">
              For serious job seekers who want more opportunities.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Unlimited job applications</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Enhanced profile visibility</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Resume builder tools</span>
              </li>
            </ul>
            <Button className="w-full" variant="3d">Subscribe Now</Button>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-2">Enterprise</h2>
            <p className="text-3xl font-bold mb-4">$49<span className="text-gray-500 text-base font-normal">/month</span></p>
            <p className="text-gray-600 mb-6">
              For professionals seeking premium job opportunities.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>All Pro features</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Career coaching sessions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Personalized job matching</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span>Executive network access</span>
              </li>
            </ul>
            <Button className="w-full">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
