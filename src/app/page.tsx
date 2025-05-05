import Link from 'next/link'
import { FiSearch, FiBell, FiUsers, FiFileText } from 'react-icons/fi'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to NYSC App
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Your all-in-one platform for managing your NYSC experience. Find PPAs, track clearance, and connect with fellow corps members.
            </p>
            <div className="mt-10">
              <Link
                href="/auth/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Key Features
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-primary-500 mb-4">
                <FiSearch className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">PPA Search & Rating</h3>
              <p className="text-gray-600">
                Find and rate Primary Places of Assignment. Get insights from other corps members.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-primary-500 mb-4">
                <FiBell className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clearance Reminder</h3>
              <p className="text-gray-600">
                Never miss important clearance dates. Get timely notifications for all your NYSC activities.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-primary-500 mb-4">
                <FiUsers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Hub</h3>
              <p className="text-gray-600">
                Connect with fellow corps members. Share experiences and get support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Center Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Information Center
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-primary-500 mb-4">
                <FiFileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sample Letters</h3>
              <p className="text-gray-600 mb-4">
                Access templates for various NYSC-related letters and documents.
              </p>
              <Link
                href="/resources"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                View Templates →
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-primary-500 mb-4">
                <FiFileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tips & Resources</h3>
              <p className="text-gray-600 mb-4">
                Essential guides and tips for a successful NYSC experience.
              </p>
              <Link
                href="/resources"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
