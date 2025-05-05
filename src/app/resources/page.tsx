'use client'

import { useState } from 'react'
import { FaFileAlt, FaLightbulb, FaDownload } from 'react-icons/fa'

interface Resource {
  id: string
  title: string
  description: string
  type: 'letter' | 'tip'
  content: string
}

const sampleLetters: Resource[] = [
  {
    id: '1',
    title: 'PPA Request Letter',
    description: 'Template for requesting a Primary Place of Assignment',
    type: 'letter',
    content: `[Your Name]
[Your State Code]
[Your Batch]
[Date]

The Director,
[PPA Name],
[PPA Address],
[City, State].

Dear Sir/Ma,

REQUEST FOR PRIMARY PLACE OF ASSIGNMENT

I am writing to request for a Primary Place of Assignment (PPA) in your organization. I am a corps member currently serving in [State] and I am interested in contributing my skills and knowledge to your organization.

I have attached my credentials and I am available for an interview at your convenience.

Thank you for your consideration.

Yours faithfully,
[Your Name]
[Your State Code]`
  },
  {
    id: '2',
    title: 'Leave of Absence Letter',
    description: 'Template for requesting leave of absence',
    type: 'letter',
    content: `[Your Name]
[Your State Code]
[Your Batch]
[Date]

The State Coordinator,
NYSC [State] Secretariat,
[Address].

Dear Sir/Ma,

REQUEST FOR LEAVE OF ABSENCE

I am writing to request for a leave of absence from [Start Date] to [End Date] due to [Reason].

I have made necessary arrangements to ensure my duties are covered during this period.

Thank you for your consideration.

Yours faithfully,
[Your Name]
[Your State Code]`
  }
]

const tips: Resource[] = [
  {
    id: '1',
    title: 'Accommodation Tips',
    description: 'Essential tips for finding and securing accommodation during service',
    type: 'tip',
    content: `1. Start your search early, at least 2-3 weeks before resuming at your PPA
2. Consider security and proximity to your PPA
3. Negotiate rent prices and payment terms
4. Get a written agreement
5. Take photos of the property before moving in
6. Keep receipts of all payments
7. Consider sharing with other corps members to reduce costs
8. Check for basic amenities (water, electricity, security)
9. Verify the landlord's ownership of the property
10. Keep your state coordinator informed of your address`
  },
  {
    id: '2',
    title: 'Clearance Tips',
    description: 'Important tips for successful clearance',
    type: 'tip',
    content: `1. Keep all your documents organized
2. Make copies of important documents
3. Start clearance process early
4. Follow up regularly with relevant offices
5. Keep track of all signatures and stamps
6. Maintain a good relationship with your PPA supervisor
7. Attend all mandatory programs
8. Keep your call-up letter and other original documents safe
9. Take photos of all clearance documents
10. Stay in touch with your state coordinator`
  }
]

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'letters' | 'tips'>('letters')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const handleDownload = (content: string, title: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">NYSC Resources</h1>
          <p className="mt-2 text-gray-600">
            Access sample letters and helpful tips for your service year.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('letters')}
                className={`${
                  activeTab === 'letters'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaFileAlt className="inline-block mr-2" />
                Sample Letters
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`${
                  activeTab === 'tips'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaLightbulb className="inline-block mr-2" />
                Tips & Guidelines
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Resource List */}
          <div className="space-y-4">
            {(activeTab === 'letters' ? sampleLetters : tips).map((resource) => (
              <div
                key={resource.id}
                className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedResource(resource)}
              >
                <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{resource.description}</p>
              </div>
            ))}
          </div>

          {/* Resource Preview */}
          <div className="bg-white shadow rounded-lg p-6">
            {selectedResource ? (
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{selectedResource.title}</h3>
                  <button
                    onClick={() => handleDownload(selectedResource.content, selectedResource.title)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">{selectedResource.description}</p>
                <div className="mt-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-4 rounded-md">
                    {selectedResource.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No resource selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a resource from the list to view its content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 