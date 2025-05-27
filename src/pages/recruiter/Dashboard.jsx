```javascript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInternshipsByRecruiter } from '../../api/internships';
import toast from 'react-hot-toast';

function RecruiterDashboard() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    const recruiterId = localStorage.getItem('userId');
    if (!recruiterId) return;

    try {
      const data = await getInternshipsByRecruiter(recruiterId);
      setInternships(data);
    } catch (error) {
      toast.error('Failed to load internships');
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
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/recruiter/profile"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Complete Profile
          </Link>
          <Link
            to="/recruiter/post-internship"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post New Internship
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Internships</h3>
          <p className="text-3xl font-bold text-blue-600">{internships.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Applications</h3>
          <p className="text-3xl font-bold text-green-600">
            {internships.reduce((total, internship) => total + (internship.applications?.length || 0), 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Posted Internships</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {internships.map((internship) => (
                <tr key={internship.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {internship.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {internship.applications?.length || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(internship.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/internship/${internship.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </Link>
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

export default RecruiterDashboard;
```