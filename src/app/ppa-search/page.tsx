'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { FaSearch, FaStar, FaMapMarkerAlt } from 'react-icons/fa'
import AuthWrapper from '@/components/auth/AuthWrapper'

interface PPA {
  id: string
  name: string
  location: string
  state: string
  rating: number
  reviews: number
  description: string
}

export default function PPASearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [state, setState] = useState('')
  const [ppas, setPPAs] = useState<PPA[]>([])
  const [loading, setLoading] = useState(false)

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto',
    'Taraba', 'Yobe', 'Zamfara'
  ]

  const handleSearch = async () => {
    setLoading(true)
    try {
      let q = query(collection(db, 'ppas'))
      
      if (searchTerm) {
        q = query(q, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'))
      }
      
      if (state) {
        q = query(q, where('state', '==', state))
      }

      const querySnapshot = await getDocs(q)
      const ppaList: PPA[] = []
      querySnapshot.forEach((doc) => {
        ppaList.push({ id: doc.id, ...doc.data() } as PPA)
      })
      setPPAs(ppaList)
    } catch (error) {
      console.error('Error searching PPAs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSearch()
  }, []) // Initial load

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Find Your PPA</h1>
            <p className="mt-2 text-gray-600">
              Search for Primary Place of Assignment (PPA) locations and read reviews from other corps members.
            </p>
          </div>

          {/* Search Form */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search PPA
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">All States</option>
                  {states.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSearch}
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              </div>
            ) : ppas.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ppas.map((ppa) => (
                  <div key={ppa.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900">{ppa.name}</h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="flex-shrink-0 mr-1.5 h-4 w-4" />
                        {ppa.location}, {ppa.state}
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(ppa.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          ({ppa.reviews} reviews)
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{ppa.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No PPAs found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
} 