'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setErrorMessage('');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/mqeelgbd', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setFormStatus('success');
                form.reset();
                // Reset success message after 5 seconds
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                const data = await response.json();
                setErrorMessage(data.error || 'Something went wrong. Please try again.');
                setFormStatus('error');
            }
        } catch (error) {
            setErrorMessage('Network error. Please check your connection and try again.');
            setFormStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-gray-700 mb-8">
                            Have a question, suggestion, or just want to say hello? We'd love to hear from you!
                            Fill out the form and we'll get back to you as soon as possible.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Mail className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Email</h3>
                                    <p className="text-gray-600">contact@theblogtide.com</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Location</h3>
                                    <p className="text-gray-600">United Kingdom</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Phone</h3>
                                    <p className="text-gray-600">+44 7506 839210</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        {formStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-green-900">Message sent successfully!</h4>
                                    <p className="text-sm text-green-700 mt-1">
                                        Thank you for contacting us. We'll get back to you soon.
                                    </p>
                                </div>
                            </div>
                        )}

                        {formStatus === 'error' && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                                <h4 className="font-semibold text-red-900">Error sending message</h4>
                                <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                    disabled={formStatus === 'submitting'}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                    disabled={formStatus === 'submitting'}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                    disabled={formStatus === 'submitting'}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                    disabled={formStatus === 'submitting'}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
