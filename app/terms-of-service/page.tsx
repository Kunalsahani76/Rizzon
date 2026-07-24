import SimpleHeroPage from "../components/SimpleHeroPage";

export default function TermsOfServicePage() {
    return (
        <SimpleHeroPage
            title="Terms of Service"
            subtitle="Guidelines for using the Rizonn website and its resources."
        >
            <div className="space-y-12 text-slate-600">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
                    <p className="leading-relaxed">
                        These Terms apply when you access the Rizonn website, download product information, submit an enquiry, or use resources made available by Rizonn. By continuing to use the website, you agree to use it lawfully and in accordance with these Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Product Information and Availability</h2>
                    <p className="leading-relaxed">
                        Product specifications, compatibility information, images, and availability are provided for general reference and may change as products evolve. A quotation, purchase order, or separate written agreement governs any commercial transaction with Rizonn. Please confirm current specifications with our team before making a deployment decision.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Responsible Use</h2>
                    <p className="mb-4">When using this website, you agree that you will not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Submit false, misleading, or incomplete contact or technical information.</li>
                        <li>Attempt to disrupt, probe, or gain unauthorised access to the website or its infrastructure.</li>
                        <li>Copy, republish, or use Rizonn content, product materials, or branding in a way that suggests affiliation without written permission.</li>
                        <li>Use automated tools that place an unreasonable load on the website.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
                    <p className="leading-relaxed">
                        The Rizonn name, logo, website design, product materials, text, images, and other website content are protected by applicable intellectual property laws. You may view and share links to our public materials for legitimate business evaluation, but ownership remains with Rizonn or the relevant rights holder.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Website Disclaimer</h2>
                    <p className="leading-relaxed">
                        We work to keep this website accurate and available, but it is provided on an as-is and as-available basis. Rizonn does not guarantee that the website will always be uninterrupted, error-free, or suitable for a particular network deployment. Use professional assessment and current product documentation when planning critical infrastructure.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                    <p className="leading-relaxed">
                        For questions about these Terms or use of the Rizonn website, contact:
                        <br />
                        <span className="font-semibold text-slate-900">Rizonn Legal</span>
                        <br />
                        Email: info@rizonn.in
                    </p>
                </section>
            </div>
        </SimpleHeroPage>
    );
}
