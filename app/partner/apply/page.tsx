"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Link from 'next/link';

export default function PartnerApplicationPage() {
    const [formData, setFormData] = useState({
        companyName: '',
        website: '',
        businessType: '',
        companySize: '',
        annualRevenue: '',
        contactName: '',
        title: '',
        email: '',
        phone: '',
        partnershipType: '',
        targetMarkets: '',
        experience: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            const response = await fetch('/api/partner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({
                    companyName: '',
                    website: '',
                    businessType: '',
                    companySize: '',
                    annualRevenue: '',
                    contactName: '',
                    title: '',
                    email: '',
                    phone: '',
                    partnershipType: '',
                    targetMarkets: '',
                    experience: '',
                    message: ''
                });
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
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-nexa-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Partner Application
                    </h1>
                    <p className="text-lg text-gray-300 font-nexa-light max-w-2xl mx-auto">
                        Join our partner ecosystem and unlock exclusive benefits, resources, and support to grow your business.
                    </p>
                </div>

                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400">
                            <h3 className="font-semibold mb-2">Application Submitted Successfully!</h3>
                            <p>Thank you for your interest in partnering with Rizonn. We'll review your application and get back to you within 2-3 business days.</p>
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400">
                            Sorry, there was an error submitting your application. Please try again.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Company Information */}
                        <div>
                            <h2 className="text-2xl font-nexa-bold mb-6 text-blue-400">Company Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Name *</label>
                                    <input
                                        name="companyName"
                                        type="text"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Enter company name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Website</label>
                                    <input
                                        name="website"
                                        type="url"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="https://www.example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Business Type *</label>
                                    <select
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select business type</option>
                                        <option value="reseller">Reseller</option>
                                        <option value="distributor">Distributor</option>
                                        <option value="system-integrator">System Integrator</option>
                                        <option value="consultant">Consultant</option>
                                        <option value="technology-partner">Technology Partner</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Company Size</label>
                                    <select
                                        name="companySize"
                                        value={formData.companySize}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-10">1-10 employees</option>
                                        <option value="11-50">11-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-nexa-bold mb-6 text-blue-400">Contact Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Contact Name *</label>
                                    <input
                                        name="contactName"
                                        type="text"
                                        value={formData.contactName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Enter contact name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                                    <input
                                        name="title"
                                        type="text"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Job title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Enter email address"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone *</label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Partnership Details */}
                        <div>
                            <h2 className="text-2xl font-nexa-bold mb-6 text-blue-400">Partnership Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Partnership Interest</label>
                                    <select
                                        name="partnershipType"
                                        value={formData.partnershipType}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="">Select partnership type</option>
                                        <option value="authorized">Authorized Partner</option>
                                        <option value="silver">Silver Partner</option>
                                        <option value="gold">Gold Partner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Target Markets</label>
                                    <input
                                        name="targetMarkets"
                                        type="text"
                                        value={formData.targetMarkets}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="e.g., Enterprise, SMB, Government, Healthcare"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Experience with Similar Products</label>
                                    <textarea
                                        name="experience"
                                        rows={3}
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Describe your experience with networking products or similar technologies..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Additional Message</label>
                                    <textarea
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="Tell us more about your business and partnership goals..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-nexa-bold py-4 rounded-full transition-all hover:shadow-lg hover:shadow-blue-600/20"
                            >
                                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                            </button>
                            <Link
                                href="/partner"
                                className="flex-1 sm:flex-none px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-nexa-bold text-center transition-all hover:shadow-lg border border-white/20 hover:border-white/30"
                            >
                                Back to Partner Portal
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}