'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { useAuth } from '@/lib/firebase'
import { FiUser, FiLogOut } from 'react-icons/fi'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut: authSignOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await authSignOut()
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-extrabold tracking-tight text-primary-500">
                NYSC App
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide ${
                  isActive('/dashboard')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/ppa-search"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide ${
                  isActive('/ppa-search')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                PPA Search
              </Link>
              <Link
                href="/reminders"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide ${
                  isActive('/reminders')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                Reminders
              </Link>
              <Link
                href="/community"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide ${
                  isActive('/community')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                Community
              </Link>
              <Link
                href="/resources"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold tracking-wide ${
                  isActive('/resources')
                    ? 'border-primary-500 text-gray-900'
                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiLogOut className="mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-primary-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiUser className="mr-2" />
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/ppa-search"
            className={`${
              isActive('/ppa-search')
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-semibold`}
          >
            PPA Search
          </Link>
          <Link
            href="/reminders"
            className={`${
              isActive('/reminders')
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-semibold`}
          >
            Reminders
          </Link>
          <Link
            href="/community"
            className={`${
              isActive('/community')
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-semibold`}
          >
            Community
          </Link>
          <Link
            href="/resources"
            className={`${
              isActive('/resources')
                ? 'bg-primary-50 border-primary-500 text-primary-700'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-semibold`}
          >
            Resources
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                href="/auth/login"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 