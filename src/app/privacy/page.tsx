import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | The Blogtide',
    description: 'Learn how The Blogtide collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                        <p>
                            Welcome to The Blogtide. We respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you about how we look after your personal data when you visit our website
                            and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                        <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier</li>
                            <li><strong>Contact Data:</strong> includes email address and telephone numbers</li>
                            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform</li>
                            <li><strong>Usage Data:</strong> includes information about how you use our website and services</li>
                            <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and your communication preferences</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Provide, operate, and maintain our website</li>
                            <li>Improve, personalize, and expand our website</li>
                            <li>Understand and analyze how you use our website</li>
                            <li>Develop new products, services, features, and functionality</li>
                            <li>Communicate with you for customer service, updates, and marketing purposes</li>
                            <li>Send you emails and newsletters (with your consent)</li>
                            <li>Find and prevent fraud</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to track activity on our website and hold certain information.
                            Cookies are files with small amounts of data which may include an anonymous unique identifier. You can instruct
                            your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Google AdSense</h2>
                        <p>
                            We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits
                            to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads
                            based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising
                            by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline">Ads Settings</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
                        <p>
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
                            used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those
                            employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:</p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>The right to access your personal data</li>
                            <li>The right to correct your personal data</li>
                            <li>The right to erase your personal data</li>
                            <li>The right to object to processing of your personal data</li>
                            <li>The right to data portability</li>
                            <li>The right to withdraw consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
                        <p>
                            Our website may include links to third-party websites, plug-ins and applications. Clicking on those links or
                            enabling those connections may allow third parties to collect or share data about you. We do not control these
                            third-party websites and are not responsible for their privacy statements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
                            Policy on this page and updating the "Last updated" date at the top of this policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <ul className="list-none space-y-2">
                            <li>Email: privacy@theblogtide.com</li>
                            <li>Website: theblogtide.com/contact</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
