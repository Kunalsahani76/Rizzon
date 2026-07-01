import SimpleHeroPage from "../components/SimpleHeroPage";

export default function PrivacyPolicyPage() {
    return (
        <SimpleHeroPage
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your data."
        >
            <div className="space-y-12 text-slate-600">
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                    <p className="leading-relaxed">
                        At Rizonn, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
                    <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
                    <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Create and manage your account.</li>
                        <li>Process your orders and deliver products.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
                        <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
                        <li>Increase the efficiency and operation of the Site.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
                    <p className="leading-relaxed">
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h2>
                    <p className="leading-relaxed">
                        If you have questions or comments about this Privacy Policy, please contact us at:
                        <br />
                        <span className="font-semibold text-slate-900">Rizonn Support</span>
                        <br />
                        Email: support@Rizonn.com
                    </p>
                </section>
            </div>
        </SimpleHeroPage>
    );
}
