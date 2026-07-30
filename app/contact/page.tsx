"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else setSubmitStatus('error');
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="pb-16 pt-24 sm:pt-28">
                <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden bg-[#020810] text-center sm:h-[380px]">
                    <div className="absolute inset-0 bg-[url('/contact%20sales%20image.png')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 px-4">
                        <h1 className="text-3xl font-nexa-bold sm:text-5xl">Contact Sales</h1>
                        <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-white/90 sm:text-sm">
                            Ready To Transform Your Business With Rizonn?<br />
                            Our Team Is Here To Help You Find The Perfect Solution For Your Needs.
                        </p>
                    </div>
                </section>

                <div className="mx-auto mt-8 grid max-w-[1120px] items-start gap-6 px-5 sm:px-7 md:grid-cols-[0.8fr_1.15fr]">
                    <div className="space-y-4">
                        <InfoCard icon={<Phone className="h-4 w-4" />} title="Phone"><p>+91 9667656203</p></InfoCard>
                        <InfoCard icon={<Mail className="h-4 w-4" />} title="Email"><p>info@rizonn.in</p></InfoCard>
                        <InfoCard icon={<MapPin className="h-4 w-4" />} title="Global Offices">
                            <h3 className="mt-4 text-xs font-nexa-bold">INDIA</h3>
                            <p className="mt-1">Office No. B1C, B-79, VDS Work Eutopia, Block B, Sector 63, Noida, Uttar Pradesh-201301</p>
                            <h3 className="mt-4 text-xs font-nexa-bold">USA</h3>
                            <p className="mt-1">616 West Monroe, Austin, TX 78704, USA</p>
                        </InfoCard>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-5 text-black shadow-sm sm:p-8">
                        <h2 className="mb-7 text-2xl font-bold font-nexa-bold">Send us a message</h2>
                        {submitStatus === 'success' && <div className="mb-5 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.</div>}
                        {submitStatus === 'error' && <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">Sorry, there was an error sending your message. Please try again.</div>}
                        <div className="space-y-5">
                            <Field label="Name">
                                <input name="name" type="text" value={formData.name} onChange={handleInputChange} required className="w-full rounded-md border border-[#cbd4e3] bg-[#f5f7fb] px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#0756cc]" placeholder="Your full name" />
                            </Field>
                            <Field label="Work Email">
                                <input name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full rounded-md border border-[#cbd4e3] bg-[#f5f7fb] px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#0756cc]" placeholder="example@company.com" />
                            </Field>
                            <Field label="Message">
                                <textarea name="message" rows={4} value={formData.message} onChange={handleInputChange} required className="w-full resize-none rounded-md border border-[#cbd4e3] bg-[#f5f7fb] px-4 py-3 text-sm text-black outline-none transition-colors focus:border-[#0756cc]" placeholder="How can we help you?" />
                            </Field>
                            <button type="submit" disabled={isSubmitting} className="w-full rounded-md bg-[#0756cc] py-3 text-sm font-nexa-bold text-white transition-colors hover:bg-[#0649ae] disabled:cursor-not-allowed disabled:bg-gray-500">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
    return <section className="rounded-lg bg-white p-5 text-black shadow-sm"><div className="flex items-start gap-3"><span className="rounded bg-[#e7edff] p-2 text-[#0756cc]">{icon}</span><div className="text-sm leading-snug"><h2 className="text-base font-bold font-nexa-bold">{title}</h2><div className="mt-1">{children}</div></div></div></section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return <div><label className="mb-2 block text-[10px] font-bold font-nexa-bold uppercase">{label}</label>{children}</div>;
}
