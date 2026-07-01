"use client";

import React, { useState } from 'react';
import { Metadata } from 'next';
import Header from '../components/Header';

// Note: Since this is a client component, we'll handle metadata in a parent server component
// For now, we'll add the metadata logic here as a comment for reference

/*
export const metadata: Metadata = generateMetadata({
  title: "Contact Sales - Get Expert Networking Solutions",
  description: "Contact Rizonn's sales team for expert advice on WiFi 6 access points, network controllers, and enterprise wireless solutions. Get personalized recommendations for your business needs.",
  keywords: [
    "contact sales",
    "networking consultation",
    "WiFi solutions expert",
    "enterprise networking support",
    "network infrastructure consultation"
  ],
});
*/

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <main className="bg-black min-h-screen text-white">
            <Header />
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-nexa-bold mb-8 text-center">Contact Sales</h1>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-300 font-nexa-light">
                            Ready to transform your business with Rizonn? Our team is here to help you find the perfect solution for your needs.
                        </p>
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-2xl font-nexa-bold mb-4">Get in Touch</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>+91 9667656203</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span>info@rizonn.in</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>Office No. B1C, B-79, VDS Work Eutopia, Block B, Sector 63, Noida, Uttar Pradesh-201301</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>616 West Monroe, Austin, TX 78704, USA</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
                        {submitStatus === 'success' && (
                            <div className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400">
                                Thank you! Your message has been sent successfully. We'll get back to you soon.
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400">
                                Sorry, there was an error sending your message. Please try again.
                            </div>
                        )}
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input 
                                name="name" 
                                type="text" 
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="Enter your name" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Work Email</label>
                            <input 
                                name="email" 
                                type="email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="Enter your email" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea 
                                name="message" 
                                rows={4} 
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-nexa-bold py-4 rounded-full transition-all hover:shadow-lg hover:shadow-blue-600/20"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>

        </main>
    );
}
