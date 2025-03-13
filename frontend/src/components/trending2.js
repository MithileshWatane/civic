import React from 'react'

export default function trending2() {
  return (
   <>
   <section id="benefits" className="py-20 bg-neutral-800">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16 animate__animated animate__fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Current <span className="text-[#FF9800]">Trending</span> Issues in{" "}
        <span className="text-[#1E88E5]">Communities</span>
      </h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        Stay informed about the most pressing concerns affecting neighborhoods
        across the platform.
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {/* Trending Issue 1 */}
      <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate__animated animate__fadeInUp">
        <div className="h-48 bg-neutral-800 relative overflow-hidden">
          <div className="absolute top-3 left-3 bg-[#FF9800] text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            HIGH PRIORITY
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Road pothole"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                Reported 3 days ago
              </span>
              <span className="text-white text-sm font-medium bg-[#1E88E5] bg-opacity-90 px-2 py-1 rounded">
                247 reports
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-1 bg-[#FF9800] bg-opacity-10 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#FF9800]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="text-[#FF9800] font-medium text-sm">
                Infrastructure
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-400 text-xs">Multiple Locations</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">
            Pothole Clusters on Main Roads
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Multiple deep potholes forming on major commuter routes after recent
            heavy rainfall, causing vehicle damage and traffic delays.
          </p>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Resolution Progress</span>
              <span>35%</span>
            </div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1E88E5] rounded-full"
                style={{ width: "35%" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/men/26.jpg"
                  alt="User"
                />
              </div>
              <span className="text-gray-500 text-xs ml-2">+244 more</span>
            </div>
            <button className="text-[#1E88E5] text-sm font-medium hover:underline">
              View Details
            </button>
          </div>
        </div>
      </div>
      {/* Trending Issue 2 */}
      <div
        className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate__animated animate__fadeInUp"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="h-48 bg-neutral-800 relative overflow-hidden">
          <div className="absolute top-3 left-3 bg-[#43A047] text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            MEDIUM PRIORITY
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1587573578271-56a2d8d4dd5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Street lighting"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                Reported 5 days ago
              </span>
              <span className="text-white text-sm font-medium bg-[#1E88E5] bg-opacity-90 px-2 py-1 rounded">
                183 reports
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-1 bg-[#43A047] bg-opacity-10 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#43A047]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-[#43A047] font-medium text-sm">
                Public Safety
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-400 text-xs">Westside District</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">
            Street Lighting Outages
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Multiple street lights non-functional in residential areas, creating
            safety concerns for pedestrians and increasing risk of property
            crime.
          </p>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Resolution Progress</span>
              <span>62%</span>
            </div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#43A047] rounded-full"
                style={{ width: "62%" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/women/67.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/women/22.jpg"
                  alt="User"
                />
              </div>
              <span className="text-gray-500 text-xs ml-2">+180 more</span>
            </div>
            <button className="text-[#1E88E5] text-sm font-medium hover:underline">
              View Details
            </button>
          </div>
        </div>
      </div>
      {/* Trending Issue 3 */}
      <div
        className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate__animated animate__fadeInUp"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="h-48 bg-neutral-800 relative overflow-hidden">
          <div className="absolute top-3 left-3 bg-[#1E88E5] text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            COMMUNITY PROJECT
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Park renovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium bg-black bg-opacity-50 px-2 py-1 rounded">
                Started 2 weeks ago
              </span>
              <span className="text-white text-sm font-medium bg-[#1E88E5] bg-opacity-90 px-2 py-1 rounded">
                156 supporters
              </span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-1 bg-[#1E88E5] bg-opacity-10 rounded-full mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#1E88E5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-[#1E88E5] font-medium text-sm">
                Community Project
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-400 text-xs">Oakridge Park</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">
            Community Garden Initiative
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Residents collaborating to transform unused space into a community
            garden with educational programs and fresh produce for local food
            banks.
          </p>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Funding Progress</span>
              <span>$8,750 / $12,000</span>
            </div>
            <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1E88E5] rounded-full"
                style={{ width: "73%" }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="User"
                />
                <img
                  className="w-6 h-6 rounded-full border border-neutral-900"
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="User"
                />
              </div>
              <span className="text-gray-500 text-xs ml-2">+153 more</span>
            </div>
            <button className="text-[#1E88E5] text-sm font-medium hover:underline">
              Support Project
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* Trending Issues Map */}
    <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-xl mb-16 animate__animated animate__fadeIn">
      <div className="grid md:grid-cols-5">
        <div className="p-6 md:col-span-2">
          <h3 className="text-2xl font-bold mb-4 text-white">Issue Hotspots</h3>
          <p className="text-gray-400 mb-6">
            Geographic distribution of trending community issues across the
            region. Darker areas indicate higher concentration of reported
            problems.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#FF9800] mr-2" />
                <span className="text-gray-300 text-sm">Infrastructure</span>
              </div>
              <span className="text-gray-400 text-sm">247 issues</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#43A047] mr-2" />
                <span className="text-gray-300 text-sm">Public Safety</span>
              </div>
              <span className="text-gray-400 text-sm">183 issues</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#1E88E5] mr-2" />
                <span className="text-gray-300 text-sm">
                  Community Projects
                </span>
              </div>
              <span className="text-gray-400 text-sm">156 issues</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#9C27B0] mr-2" />
                <span className="text-gray-300 text-sm">Environmental</span>
              </div>
              <span className="text-gray-400 text-sm">98 issues</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#F44336] mr-2" />
                <span className="text-gray-300 text-sm">Public Services</span>
              </div>
              <span className="text-gray-400 text-sm">76 issues</span>
            </div>
          </div>
          <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-[#1E88E5] bg-opacity-10 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#1E88E5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="text-white font-medium">
                Weekly Report Available
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">
              Download the detailed weekly report of trending issues and
              resolution progress across all communities.
            </p>
            <button className="w-full py-2 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Report
            </button>
          </div>
        </div>
        <div className="md:col-span-3 bg-neutral-800 relative min-h-[400px]">
          <div className="absolute inset-0 opacity-90">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="City map"
              className="w-full h-full object-cover opacity-40"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0) 20%), radial-gradient(circle at 30% 60%, rgba(67, 160, 71, 0.6) 0%, rgba(67, 160, 71, 0) 20%), radial-gradient(circle at 50% 40%, rgba(30, 136, 229, 0.6) 0%, rgba(30, 136, 229, 0) 25%)"
              }}
              contentEditable="false"
            />
          </div>
          <div className="absolute top-4 right-4 bg-neutral-900 bg-opacity-80 p-3 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <button className="p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 transition duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-neutral-900 bg-opacity-80 p-3 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div className="text-white text-sm font-medium">
                760 active issues across 42 communities
              </div>
              <button className="text-[#1E88E5] text-sm hover:underline">
                View Full Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Call to Action */}
    <div className="text-center animate__animated animate__fadeIn">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Ready to <span className="text-[#1E88E5]">Make a Difference</span> in
        Your Community?
      </h3>
      <p className="text-gray-300 mb-8 max-w-3xl mx-auto">
        Join thousands of engaged citizens who are transforming their
        neighborhoods through collaborative problem-solving and community
        action.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="px-8 py-3 bg-[#1E88E5] hover:bg-[#1976D2] text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Report an Issue
        </button>
        <button className="px-8 py-3 bg-transparent border border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:bg-opacity-10 font-medium rounded-lg transition duration-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          View Issue Map
        </button>
      </div>
    </div>
  </div>
</section>

   </>
  )
}
