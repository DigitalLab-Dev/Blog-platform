import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms & Conditions | The Blogtide',
    description: 'Terms and conditions for using The Blogtide website and services.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>

                <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
                    <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
                        <p>
                            By accessing and using The Blogtide website, you accept and agree to be bound by the terms and provision of
                            this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials on The Blogtide's website for personal,
                            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose or for any public display</li>
                            <li>Attempt to reverse engineer any software contained on The Blogtide's website</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on The Blogtide's website are provided on an 'as is' basis. The Blogtide makes no warranties,
                            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
                            of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
                        <p>
                            In no event shall The Blogtide or its suppliers be liable for any damages (including, without limitation,
                            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                            to use the materials on The Blogtide's website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Accuracy of Materials</h2>
                        <p>
                            The materials appearing on The Blogtide's website could include technical, typographical, or photographic errors.
                            The Blogtide does not warrant that any of the materials on its website are accurate, complete, or current.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Links</h2>
                        <p>
                            The Blogtide has not reviewed all of the sites linked to its website and is not responsible for the contents
                            of any such linked site. The inclusion of any link does not imply endorsement by The Blogtide. Use of any such
                            linked website is at the user's own risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. User Content</h2>
                        <p>
                            If you submit content to our website, you grant The Blogtide a non-exclusive, royalty-free, perpetual,
                            irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create
                            derivative works from, distribute, and display such content throughout the world in any media.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Prohibited Uses</h2>
                        <p>You may not use our website:</p>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>In any way that violates any applicable national or international law or regulation</li>
                            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                            <li>To impersonate or attempt to impersonate The Blogtide, a Blogtide employee, another user, or any other person or entity</li>
                            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
                        <p>
                            The Blogtide may revise these terms of service for its website at any time without notice. By using this website,
                            you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Governing Law</h2>
                        <p>
                            These terms and conditions are governed by and construed in accordance with the laws of the United States,
                            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms & Conditions, please contact us at:
                        </p>
                        <ul className="list-none space-y-2">
                            <li>Email: legal@theblogtide.com</li>
                            <li>Website: theblogtide.com/contact</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
}
