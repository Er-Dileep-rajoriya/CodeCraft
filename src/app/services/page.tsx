"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MessageCircle,
  Lock,
  Smartphone,
  Code,
  Shield,
  Users,
} from "lucide-react";
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

function ServicesPage() {
  const {loggedInUser} = useSelector((store : RootState) => store.userReducer);
  
  const services = [
    {
      icon: (
        <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Real-Time Messaging",
      description:
        "Chat in real-time with friends, family, or colleagues. No delays, just instant communication.",
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "End-to-End Encryption",
      description:
        "Your messages are secure with state-of-the-art encryption. Privacy is our priority.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Cross-Platform Support",
      description:
        "Use CodeCraft on any device—desktop, mobile, or tablet. Stay connected wherever you are.",
    },
    {
      icon: <Code className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Developer-Friendly APIs",
      description:
        "Integrate CodeCraft into your applications with our easy-to-use APIs and SDKs.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Advanced Security",
      description:
        "Protect your data with advanced security features like two-factor authentication and data backups.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Team Collaboration",
      description:
        "Collaborate seamlessly with your team using group chats, file sharing, and more.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 pt-16">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore the powerful features and services that make CodeCraft the
          best choice for modern communication and collaboration.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900 rounded-full mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}



    {
        loggedInUser !== null ? <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join CodeCraft today and experience the future of communication.
          </p>
          <Link href="/auth/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
              Sign Up Now
            </Button>
          </Link>
        </div> : null
      }
        
      </div>
    </div>
  );
}

export default ServicesPage;
