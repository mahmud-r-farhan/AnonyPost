import React from 'react';
import SEO from '../components/SEO';

function Terms() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <SEO 
        title="Terms & Conditions - AnonyPost"
        image="https://res.cloudinary.com/dydnhyxfh/image/upload/v1739117774/image-nNTzBiInUaanXZbg3Hsit_tzttgs.webp"
        description="Read the terms and conditions for using AnonyPost, our anonymous social media platform."
      />

      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Terms & Conditions</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to <strong>AnonyPost</strong>. By accessing or using our platform, you agree to comply with the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        By using AnonyPost, you confirm that you understand and accept these terms. If you do not agree, please do not use our services.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">2. User Responsibilities</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>✅ Respect others—no hate speech, harassment, or illegal content.</li>
        <li>✅ Do not exploit anonymity for harmful activities.</li>
        <li>✅ Avoid sharing personal or sensitive information.</li>
        <li>✅ Any violation may result in content removal or a permanent ban.</li>
      </ul>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">3. Content Ownership & Moderation</h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        While AnonyPost allows free expression, we reserve the right to remove content that violates our policies, including:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>🔹 Hate speech, threats, or bullying</li>
        <li>🔹 Explicit or illegal content</li>
        <li>🔹 Spamming or fraudulent activities</li>
      </ul>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        By posting on AnonyPost, you grant us the right to moderate and remove content that breaches these guidelines.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">4. Privacy & Data Protection</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We prioritize user privacy. AnonyPost does not store personal user data, and all posts remain anonymous. However, we may collect minimal technical data for platform improvements.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">5. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        AnonyPost is provided "as is" without warranties. We are not liable for any damages resulting from misuse of the platform.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">6. Changes to Terms</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We reserve the right to update these terms at any time. Users will be notified of significant changes.
      </p>

      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">7. Contact & Support</h2>
      <p className="text-gray-700 dark:text-gray-300">
        For any questions or concerns, please visit our <a href="/support" className="text-primary hover:underline">Contact Page.</a>
      </p>
    </div>
  );
}

export default Terms;