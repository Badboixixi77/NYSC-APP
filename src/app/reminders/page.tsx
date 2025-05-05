'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { FaPlus, FaTrash, FaBell } from 'react-icons/fa'
import toast from 'react-hot-toast'

interface Reminder {
  id: string
  title: string
  date: string
  description: string
  userId: string
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
    fetchReminders()
  }, [])

  const fetchReminders = async () => {
    if (!auth.currentUser) return

    try {
      const q = query(
        collection(db, 'reminders'),
        where('userId', '==', auth.currentUser.uid)
      )
      const querySnapshot = await getDocs(q)
      const reminderList: Reminder[] = []
      querySnapshot.forEach((doc) => {
        reminderList.push({ id: doc.id, ...doc.data() } as Reminder)
      })
      setReminders(reminderList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    } catch (error) {
      console.error('Error fetching reminders:', error)
      toast.error('Failed to load reminders')
    } finally {
      setLoading(false)
    }
  }

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
      fetchReminders()
    } catch (error) {
      console.error('Error adding reminder:', error)
      toast.error('Failed to add reminder')
    }
  }

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reminders', id))
      toast.success('Reminder deleted successfully')
      fetchReminders()
    } catch (error) {
      console.error('Error deleting reminder:', error)
      toast.error('Failed to delete reminder')
    }
  }

  return (
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
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaPlus className="-ml-1 mr-2 h-5 w-5" />
            Add Reminder
          </button>
        </div>

        {/* Add Reminder Form */}
        {showForm && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            </div>
          ) : reminders.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {reminders.map((reminder) => (
                  <li key={reminder.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaBell className="h-5 w-5 text-green-500" />
                          <p className="ml-2 text-sm font-medium text-gray-900">{reminder.title}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteReminder(reminder.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {new Date(reminder.date).toLocaleString()}
                          </p>
                        </div>
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
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <FaBell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reminders</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new reminder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 