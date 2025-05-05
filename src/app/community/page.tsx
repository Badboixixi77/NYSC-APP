'use client'

import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, addDoc, orderBy } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { FaUser, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import AuthWrapper from '@/components/auth/AuthWrapper'

interface Post {
  id: string
  content: string
  userId: string
  userEmail: string
  userStateCode: string
  userBatch: string
  createdAt: string
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    fetchPosts()
    if (auth.currentUser) {
      fetchUserData()
    }
  }, [])

  const fetchUserData = async () => {
    if (!auth.currentUser) return

    try {
      const userDoc = await getDocs(query(
        collection(db, 'users'),
        where('email', '==', auth.currentUser.email)
      ))
      if (!userDoc.empty) {
        setUserData(userDoc.docs[0].data())
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const postList: Post[] = []
      querySnapshot.forEach((doc) => {
        postList.push({ id: doc.id, ...doc.data() } as Post)
      })
      setPosts(postList)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!auth.currentUser || !userData) return

    try {
      await addDoc(collection(db, 'posts'), {
        content: newPost,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        userStateCode: userData.stateCode,
        userBatch: userData.batch,
        createdAt: new Date().toISOString(),
      })

      setNewPost('')
      toast.success('Post shared successfully')
      fetchPosts()
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to share post')
    }
  }

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">NYSC Community</h1>
            <p className="mt-2 text-gray-600">
              Connect with other corps members and share your experiences.
            </p>
          </div>

          {/* Create Post */}
          {auth.currentUser && (
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <form onSubmit={handleSubmitPost}>
                <div>
                  <label htmlFor="post" className="block text-sm font-medium text-gray-700">
                    Share your experience
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="post"
                      name="post"
                      rows={3}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="What's on your mind?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts Feed */}
          <div className="mt-8">
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <FaUser className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.userStateCode}
                        </p>
                        <div className="flex space-x-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-1 h-4 w-4" />
                            {post.userBatch}
                          </div>
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1 h-4 w-4" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-700">
                      {post.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No posts yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Be the first to share your experience!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthWrapper>
  )
} 