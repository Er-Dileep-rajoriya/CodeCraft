"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import team_member_1 from "../../../public/team_member_1.avif";
import team_member_2 from "../../../public/team_member_2.avif";
import team_member_3 from "../../../public/team_member_3.avif";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 pt-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="text-blue-500">CodeCraft</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          CodeCraft is a modern, secure, and intuitive chat application designed
          to bring people closer. Whether you are collaborating with your team
          or connecting with friends, CodeCraft makes communication seamless and
          enjoyable.
        </p>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Why Choose CodeCraft?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time Messaging
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Chat in real-time with friends, family, or colleagues. No delays,
              just instant communication.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              End-to-End Encryption
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your messages are secure with state-of-the-art encryption. Privacy
              is our priority.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Cross-Platform Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use CodeCraft on any device—desktop, mobile, or tablet. Stay
              connected wherever you are.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={team_member_1}
              alt="Team Member"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              John Doe
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Founder & CEO
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={team_member_2}
              alt="Team Member"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Jane Smith
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Lead Developer
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={team_member_3}
              alt="Team Member"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              Alice Johnson
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              UI/UX Designer
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
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
      </div>
    </div>
  );
}

export default AboutUsPage;
