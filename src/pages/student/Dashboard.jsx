```javascript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getApplicationStatus } from '../../api/applications';
import toast from 'react-hot-toast';

function StudentDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const data = await getApplicationStatus(userId);
      setApplications(data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <Link
          to="/student/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Complete Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">{applications.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Selected</h3>
          <p className="text-3xl font-bold text-green-600">
            {applications.filter(app => app.status === 'SELECTED').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {applications.filter(app => app.status === 'PENDING').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Internship
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.slice(0, 5).map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.internshipId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={\`px-2 py-1 text-sm rounded ${
                        application.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : application.status === 'SELECTED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
```