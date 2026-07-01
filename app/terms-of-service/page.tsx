import SimpleHeroPage from "../components/SimpleHeroPage";

export default function TermsOfServicePage() {
    return (
        <SimpleHeroPage
            title="Terms of Service"
            subtitle="The rules and regulations for using our services."
        >
            <div className="space-y-12 text-slate-600">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
                    <p className="leading-relaxed">
                        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Rizonn ("we," "us" or "our"), concerning your access to and use of the Rizonn website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Intellectual Property Rights</h2>
                    <p className="leading-relaxed">
                        Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Representations</h2>
                    <p className="mb-4">By using the Site, you represent and warrant that:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>All registration information you submit will be true, accurate, current, and complete.</li>
                        <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                        <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                        <li>You are not a minor in the jurisdiction in which you reside.</li>
                        <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Prohibited Activities</h2>
                    <p className="leading-relaxed">
                        You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
                    <p className="leading-relaxed">
                        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
                    <p className="leading-relaxed">
                        In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                        <br />
                        <span className="font-semibold text-slate-900">Rizonn Legal</span>
                        <br />
                        Email: legal@Rizonn.com
                    </p>
                </section>
            </div>
        </SimpleHeroPage>
    );
}
