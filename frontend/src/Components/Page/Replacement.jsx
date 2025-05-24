import React from 'react';

const Replacement = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Refund & Replacement Policy</h1>

      <section className="text-gray-800 space-y-4 text-lg">
        <p>
          <strong>Only if the books are damaged</strong> then our Return/Replacement/Refund policy will be applicable. It is valid for <strong>three days</strong>. We are unable to offer a refund or exchange after 3 days have passed since delivery.
        </p>
        <p>
          The consumer is required to record a brief <strong>video of the order being unpacked</strong>. This is mandatory for any return, replacement, or refund request. Without it, the request will be rejected.
        </p>

        <h2 className="text-xl font-semibold mt-6">Damages Covered:</h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Severe spine damages causing pages to come apart</li>
          <li>Transit damages (excluding corner bends/little dents/scratches)</li>
          <li>More than 2 pages misprinted/torn/missing</li>
          <li>Smudged pages (more than 2) making them unreadable</li>
        </ul>

        <p className="mt-4">
          <strong>Note:</strong> Boxes of book sets like Harry Potter or Lord of the Rings may get damaged in transit and are not covered. Book damage is covered. <strong>No return/replacement</strong> for Mystery Box items.
        </p>

        <p>
          In addition to the above, <strong>Missing Book</strong> or <strong>Wrong Book Delivered</strong> also qualify for refund/replacement — again, with an unpacking video.
        </p>

        <p><strong>Return/Replacement process takes 7–14 Days.</strong></p>

        <h2 className="text-xl font-semibold mt-6">Refund Details:</h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Online payment refunds will be processed via original payment method.</li>
          <li>COD orders will be refunded through UPI/Bank transfer (we may request UPI ID).</li>
        </ul>

        <p>
          Our courier will pick up returned books from your doorstep, and we will bear the return shipping cost.
        </p>

        <p>
          If a package is returned by courier or not delivered due to courier’s fault, a full refund is issued. However, if customers refuse delivery or provide wrong info (e.g., wrong contact or pin code), <strong>shipping charges will be deducted</strong> during refund.
        </p>

        <p className="mt-4">
          For return/refund/replacement claims, please email us at <a href="mailto:support@99bookstores.com" className="text-blue-600 underline">support@99bookstores.com</a>
        </p>

        <h2 className="text-xl font-semibold mt-6">Cancellation Policy:</h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Orders not processed will be fully refunded upon cancellation.</li>
          <li>Orders already shipped cannot be cancelled. You may request a replacement after receiving them.</li>
        </ul>

        <p>
          Refunds for prepaid orders will be returned via original payment method. COD cancellations are credited as store credit.
        </p>

        <h2 className="text-xl font-semibold mt-6">Cancellations by 99Bookstore:</h2>
        <ul className="list-disc list-inside space-y-1 pl-4">
          <li>Out-of-stock issues on the latest editions</li>
          <li>Products damaged before shipping</li>
          <li>Delivery issues in your location (e.g., lockdowns, strikes)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Wrongly Marked Deliveries:</h2>
        <p>
          If a courier service wrongly marks a shipment as "Delivered" but you haven't received it, contact us immediately — preferably the same day — so we can raise a POD (Proof of Delivery) dispute. We can only raise this within 3 days of marked delivery.
        </p>

        <h2 className="text-xl font-semibold mt-6">Missing Refunds:</h2>
        <ol className="list-decimal list-inside pl-4 space-y-1">
          <li>Check your bank statement again.</li>
          <li>Look for a confirmation email from Razorpay.</li>
          <li>If unresolved, please contact us for support.</li>
        </ol>
      </section>
    </div>
  );
};

export default Replacement;
