import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md text-gray-800">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4">
        <strong>Bookstore </strong> is committed to ensuring that your privacy is protected. Should we ask you to provide certain
        information by which you can be identified when using this website, then you can be assured that it will only
        be used in accordance with this privacy statement. 99Bookstore may change this policy from time to time by
        updating this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What we collect:</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Name, contact information including email address</li>
        <li>Demographic information such as postcode, preferences, and interests</li>
        <li>Other information relevant to customer surveys and/or offers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">What we do with the information we gather:</h2>
      <p className="mb-4">We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>We may use the information to improve our products and services.</li>
        <li>We may periodically send promotional emails about new products, special offers, or other information using the email address you have provided.</li>
        <li>From time to time, we may use your information to contact you for market research purposes by email, phone, or mail.</li>
        <li>We may use the information to customize the website according to your interests.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Security:</h2>
      <p className="mb-4">
        We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure,
        we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the
        information we collect online.
      </p>
      <p className="mb-4">
        We do not sell, lease, or trade your personal information to third parties without your consent. We will disclose your
        personal information only if required by law or in good faith belief that such action is necessary to comply with
        legal obligations.
      </p>
    </div>
  );
};

export default Privacy;
