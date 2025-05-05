'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import Link from 'next/link'
import { FiSearch, FiBell, FiUsers, FiFileText, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi'
import AuthWrapper from '@/components/auth/AuthWrapper'

interface UserData {
  email: string
  stateCode: string
  batch: string
  createdAt: string
  state?: string
  lga?: string
  ppa?: string
}

// Cache user data
let cachedUserData: UserData | null = null

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(cachedUserData)
  const [loading, setLoading] = useState(!cachedUserData)

  useEffect(() => {
    if (!auth.currentUser) return

    // If we have cached data, show it immediately
    if (cachedUserData) {
      setUserData(cachedUserData)
      setLoading(false)
    }

    // Set up real-time listener for user data
    const unsubscribe = onSnapshot(
      doc(db, 'users', auth.currentUser.uid),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data() as UserData
          setUserData(data)
          cachedUserData = data // Update cache
          setLoading(false)
        }
      },
      (error) => {
        console.error('Error fetching user data:', error)
        setLoading(false)
      }
    )

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  // Show skeleton loading state
  if (loading) {
    return (
      <AuthWrapper>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Welcome Section Skeleton */}
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="mt-8">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-5 animate-pulse">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-gray-200 rounded"></div>
                      <div className="ml-5 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userData?.stateCode}
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Batch {userData?.batch}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <FiMapPin className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">State</p>
                    <p className="text-sm text-gray-900">{userData?.state || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMapPin className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">LGA</p>
                    <p className="text-sm text-gray-900">{userData?.lga || 'Not set'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FiClock className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Member Since</p>
                    <p className="text-sm text-gray-900">
                      {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 px-4 sm:px-0 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/ppa-search"
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiSearch className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          PPA Search
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          Find PPAs
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/reminders"
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiBell className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Clearance Reminders
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          Set Reminders
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/community"
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiUsers className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Community
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          Connect
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/resources"
                className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiFileText className="h-6 w-6 text-primary-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Resources
                        </dt>
                        <dd className="text-lg font-semibold text-gray-900">
                          View Resources
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 px-4 sm:px-0 mb-4">Upcoming Events</h2>
            <div className="bg-white shadow-sm rounded-lg border border-gray-100">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiCalendar className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Monthly Clearance</h3>
                      <p className="text-sm text-gray-500">Due in 5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiCalendar className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">CDS Meeting</h3>
                      <p className="text-sm text-gray-500">Next week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 px-4 sm:px-0 mb-4">Recent Activity</h2>
            <div className="bg-white shadow-sm rounded-lg border border-gray-100">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiFileText className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Profile Updated</h3>
                      <p className="text-sm text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-primary-50 p-3 rounded-lg">
                      <FiSearch className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">PPA Search</h3>
                      <p className="text-sm text-gray-500">Last week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
} 