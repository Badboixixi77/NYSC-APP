'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import Link from 'next/link'
import { FaSearch, FaBell, FaUsers, FaFileAlt } from 'react-icons/fa'
import AuthWrapper from '@/components/auth/AuthWrapper'

interface UserData {
  email: string
  stateCode: string
  batch: string
  createdAt: string
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) return

      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="px-4 py-6 sm:px-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {userData?.stateCode}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Batch {userData?.batch}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 px-4 sm:px-0">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/ppa-search"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaSearch className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          PPA Search
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Find PPAs
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/reminders"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaBell className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Clearance Reminders
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Set Reminders
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/community"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaUsers className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Community
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Connect
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>

              <Link
                href="/resources"
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaFileAlt className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Resources
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          View Resources
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 px-4 sm:px-0">Recent Activity</h2>
            <div className="mt-4 bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <p className="text-gray-500 text-sm">
                  Your recent activities will appear here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
} 