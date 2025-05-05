import Link from 'next/link'
import { FaSearch, FaBell, FaUsers, FaFileAlt, FaLightbulb, FaArrowRight } from 'react-icons/fa'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your NYSC Journey, <br />
              <span className="text-yellow-300">Simplified</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Join thousands of corps members who are making the most of their service year with our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/auth/signup"
                className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors text-center"
              >
                Get Started Free
              </Link>
              <Link 
                href="/features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">PPAs Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">36</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and resources you need to make your NYSC year successful and memorable.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PPA Search & Rating */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FaSearch className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">PPA Search & Rating</h3>
              <p className="text-gray-600 mb-6">
                Find and rate Primary Place of Assignment (PPA) locations. Get insights from other corps members.
              </p>
              <Link href="/ppa-search" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Explore PPAs <FaArrowRight />
              </Link>
            </div>

            {/* Clearance Reminder */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FaBell className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Clearance Reminder</h3>
              <p className="text-gray-600 mb-6">
                Never miss important clearance dates. Get timely notifications for all NYSC activities.
              </p>
              <Link href="/reminders" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Set Reminders <FaArrowRight />
              </Link>
            </div>

            {/* Community Section */}
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Hub</h3>
              <p className="text-gray-600 mb-6">
                Connect with corps members in your state or LGA. Share experiences and resources.
              </p>
              <Link href="/community" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Join Community <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info Center Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Resource Center</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Access essential resources and guides to help you navigate your service year smoothly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FaFileAlt className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sample Letters</h3>
              <p className="text-gray-600 mb-6">
                Access templates for various NYSC-related letters and documents. From PPA requests to leave applications.
              </p>
              <Link href="/resources/letters" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                View Templates <FaArrowRight />
              </Link>
            </div>
            <div className="p-8 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <FaLightbulb className="text-green-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tips & Resources</h3>
              <p className="text-gray-600 mb-6">
                Essential tips and resources for a successful service year. From accommodation guides to local insights.
              </p>
              <Link href="/resources/tips" className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Read Tips <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your NYSC Journey?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of corps members who are already using NYSC Hack to make their service year better.
          </p>
          <Link 
            href="/auth/signup"
            className="bg-white text-green-800 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </>
  )
}
