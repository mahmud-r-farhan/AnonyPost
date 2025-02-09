import React from 'react';
import SEO from '../components/SEO';

function About() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <SEO 
        title="About AnonyPost"
        image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739118643/image-tQdxaIggR_v4-CcSXWBxq_jkykvf.webp"
        description="Discover AnonyPost - a secure and anonymous social media platform for sharing thoughts, images, and discussions."
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">About AnonyPost</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to <strong>AnonyPost</strong>, an anonymous social media platform where users can share their thoughts, ideas, and images—without the need for an account. 
        Our mission is to foster a secure and open space for free expression while ensuring user privacy and safety.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Why Choose AnonyPost?</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Unlike traditional social media, AnonyPost allows you to express yourself freely while keeping your identity private. 
        Whether it's sharing thoughts, discussing trending topics, or simply engaging in meaningful conversations, you're in control of your anonymity.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Key Features</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>🔹 100% Anonymous Posting</li>
        <li>🔹 Image Upload & Sharing</li>
        <li>🔹 Like & Comment System</li>
        <li>🔹 Auto-Generated Profile Avatars</li>
        <li>🔹 Advanced Post Search & Filtering</li>
        <li>🔹 Dark Mode Support</li>
        <li>🔹 Fully Responsive for All Devices</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Meet the Developer</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        AnonyPost is developed and maintained by <strong>Mahmudur Rahman</strong>, a passionate full-stack developer dedicated to building 
        modern, secure, and user-friendly web applications. Want to explore more of his work? Visit <a href="https://devplus.fun" className="text-primary hover:underline">devplus.fun</a>.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Community Guidelines</h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        By using AnonyPost, you agree to follow our platform’s guidelines:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>✅ Respect others and avoid hateful, harmful, or illegal content.</li>
        <li>✅ Do not exploit the anonymity for unethical purposes.</li>
        <li>✅ Violating these guidelines may result in content removal or a ban.</li>
      </ul>

      <p className="text-gray-700 dark:text-gray-300">
        Need more details? Visit our <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a> page or <a href="/support" className="text-primary hover:underline">Contact Us</a>.
      </p>
    </div>
  );
}

export default About;