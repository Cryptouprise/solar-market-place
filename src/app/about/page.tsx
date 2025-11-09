import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">About Solar Market</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re on a mission to make solar energy accessible to everyone through our trusted
            marketplace connecting buyers with premium solar panel suppliers.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4">Our Story</h2>
          <p>
            Founded in 2024, Solar Market emerged from a simple observation: buying solar panels was
            unnecessarily complicated and expensive. We created a platform that brings transparency,
            competitive pricing, and quality assurance to the solar industry.
          </p>

          <h2 className="text-3xl font-bold mt-12 mb-4">What We Offer</h2>
          <ul className="space-y-3">
            <li>
              <strong>Premium Selection:</strong> Only certified solar panels from reputable
              manufacturers with proven track records
            </li>
            <li>
              <strong>Competitive Pricing:</strong> Compare prices from multiple verified sellers to
              get the best deal
            </li>
            <li>
              <strong>Warranty Protection:</strong> All products come with manufacturer warranty up
              to 25 years
            </li>
            <li>
              <strong>Expert Support:</strong> Our team is available to help you choose the right
              solar solution
            </li>
            <li>
              <strong>Secure Transactions:</strong> Your payments and personal information are
              always protected
            </li>
          </ul>

          <h2 className="text-3xl font-bold mt-12 mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-700">
                We&apos;re committed to accelerating the world&apos;s transition to renewable
                energy.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Trust</h3>
              <p className="text-gray-700">
                We verify every seller and product to ensure you get exactly what you expect.
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-700">
                We continuously improve our platform to make solar shopping easier and better.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">Join Our Community</h2>
          <p>
            Whether you&apos;re a homeowner looking to reduce your energy bills, a business aiming
            to meet sustainability goals, or a solar professional seeking quality products, Solar
            Market is your trusted partner in the renewable energy revolution.
          </p>

          <div className="bg-blue-600 text-white p-8 rounded-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">Ready to go solar?</h3>
            <p className="mb-6">
              Browse our extensive catalog of premium solar panels and find the perfect solution for
              your needs.
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
