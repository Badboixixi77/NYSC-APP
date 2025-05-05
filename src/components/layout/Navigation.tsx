'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { signOut } from 'firebase/auth'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(auth.currentUser)
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Failed to sign out')
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-primary-600 tracking-tight">NYSC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              href="/ppa-search"
              className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                isActive('/ppa-search')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              PPA Search
            </Link>
            <Link
              href="/reminders"
              className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                isActive('/reminders')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Reminders
            </Link>
            <Link
              href="/community"
              className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                isActive('/community')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Community
            </Link>
            <Link
              href="/resources"
              className={`px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                isActive('/resources')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Resources
            </Link>
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/ppa-search"
            className={`block px-4 py-3 text-base font-semibold ${
              isActive('/ppa-search')
                ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            PPA Search
          </Link>
          <Link
            href="/reminders"
            className={`block px-4 py-3 text-base font-semibold ${
              isActive('/reminders')
                ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Reminders
          </Link>
          <Link
            href="/community"
            className={`block px-4 py-3 text-base font-semibold ${
              isActive('/community')
                ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Community
          </Link>
          <Link
            href="/resources"
            className={`block px-4 py-3 text-base font-semibold ${
              isActive('/resources')
                ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Resources
          </Link>
        </div>

        {/* Mobile user menu */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          {user ? (
            <div className="space-y-3 px-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiUser className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.email}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  handleSignOut()
                  setIsOpen(false)
                }}
                className="w-full flex items-center px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <FiLogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3 px-4">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-3 text-base font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center px-4 py-3 text-base font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 