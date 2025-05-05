'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, orderBy } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { FiPlus, FiTrash2, FiBell, FiCalendar } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AuthWrapper from '@/components/auth/AuthWrapper'

interface Reminder {
  id: string
  title: string
  date: string
  description: string
  userId: string
  createdAt: string
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: '',
    date: '',
    description: '',
  })

  useEffect(() => {
    if (!auth.currentUser) return

    // Set up real-time listener for reminders
    const q = query(
      collection(db, 'reminders'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('date', 'asc')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reminderList: Reminder[] = []
      querySnapshot.forEach((doc) => {
        reminderList.push({ id: doc.id, ...doc.data() } as Reminder)
      })
      setReminders(reminderList)
      setLoading(false)
    }, (error) => {
      console.error('Error fetching reminders:', error)
      toast.error('Failed to load reminders')
      setLoading(false)
    })

    // Cleanup subscription
    return () => unsubscribe()
  }, [])

  const handleAddReminder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser) return

    try {
      await addDoc(collection(db, 'reminders'), {
        ...newReminder,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      })

      setNewReminder({ title: '', date: '', description: '' })
      setShowForm(false)
      toast.success('Reminder added successfully')
    } catch (error) {
      console.error('Error adding reminder:', error)
      toast.error('Failed to add reminder')
    }
  }

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reminders', id))
      toast.success('Reminder deleted successfully')
    } catch (error) {
      console.error('Error deleting reminder:', error)
      toast.error('Failed to delete reminder')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return 'Past due'
    } else if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Tomorrow'
    } else {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Clearance Reminders</h1>
              <p className="mt-2 text-gray-600">
                Keep track of important NYSC clearance dates and activities.
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FiPlus className="-ml-1 mr-2 h-5 w-5" />
              Add Reminder
            </button>
          </div>

          {/* Add Reminder Form */}
          {showForm && (
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <form onSubmit={handleAddReminder} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                    placeholder="e.g., Monthly Clearance"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                    placeholder="Add any additional details..."
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Save Reminder
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reminders List */}
          <div className="mt-8">
            {loading ? (
              <div className="bg-white shadow-sm rounded-lg border border-gray-100 p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : reminders.length > 0 ? (
              <div className="bg-white shadow-sm rounded-lg border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {reminders.map((reminder) => (
                    <li key={reminder.id} className="hover:bg-gray-50 transition-colors">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 bg-primary-50 p-2 rounded-lg">
                              <FiBell className="h-5 w-5 text-primary-500" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{reminder.title}</p>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <FiCalendar className="mr-1.5 h-4 w-4" />
                                {formatDate(reminder.date)}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteReminder(reminder.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                        {reminder.description && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">{reminder.description}</p>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="mx-auto h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
                  <FiBell className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new reminder.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Add Reminder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
} 