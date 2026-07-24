import SimpleHeroPage from "../components/SimpleHeroPage";

export default function PrivacyPolicyPage() {
    return (
        <SimpleHeroPage
            title="Privacy Policy"
            subtitle="A clear explanation of the information shared with Rizonn."
        >
            <div className="space-y-12 text-slate-600">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Our Privacy Commitment</h2>
                    <p className="leading-relaxed">
                        Rizonn designs and supports business networking solutions. We collect only the information needed to respond to enquiries, deliver support, improve our website, and manage our business relationship with you. This policy describes how that information is handled when you visit rizonn.in, contact our team, or request information about our products.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information You Share</h2>
                    <p className="mb-4">The information we collect depends on how you interact with Rizonn. It may include:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Contact and business details:</strong> your name, company, work email, telephone number, location, and the details you submit in a sales or support enquiry.</li>
                        <li><strong>Product and support details:</strong> information about the Rizonn products, network environment, or services you ask us to discuss or support.</li>
                        <li><strong>Website activity:</strong> technical information such as device type, browser, IP address, pages viewed, and approximate visit time, collected through normal website operation and cookies.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Information</h2>
                    <p className="mb-4">We use information to make each interaction with Rizonn relevant, secure, and useful. This includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Replying to product, partnership, and support requests.</li>
                        <li>Preparing recommendations, quotations, product updates, and service communications you request.</li>
                        <li>Maintaining the security, performance, and reliability of our website and services.</li>
                        <li>Understanding which content and solutions are most useful to visitors.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Sharing and Safeguards</h2>
                    <p className="leading-relaxed">
                        Rizonn does not sell personal information. We may share limited information with service providers who help us run our website, communicate with customers, or fulfil a legitimate business request. Access is limited to what is necessary. We use reasonable administrative and technical measures to protect information, although no internet transmission or storage system can be guaranteed completely secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Choices and Contact</h2>
                    <p className="leading-relaxed">
                        You may ask us to update your contact information or stop non-essential communications. For privacy questions, contact us at:
                        <br />
                        <span className="font-semibold text-slate-900">Rizonn Privacy Team</span>
                        <br />
                        Email: info@rizonn.in
                    </p>
                </section>
            </div>
        </SimpleHeroPage>
    );
}
