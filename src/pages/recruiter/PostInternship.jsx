```javascript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postInternship } from '../../api/internships';
import toast from 'react-hot-toast';

function PostInternship() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skillsRequired: '',
    duration: '',
    stipend: '',
    deadline: '',
    batchStartDate: '',
    batchEndDate: '',
    internshipType: 'Remote',
    perks: '',
    isPartTimeAllowed: false,
    openings: 1,
    applicationProcess: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recruiterId = localStorage.getItem('userId');
    if (!recruiterId) {
      toast.error('Please login as a recruiter');
      return;
    }

    try {
      await postInternship(recruiterId, formData);
      toast.success('Internship posted successfully!');
      navigate('/recruiter/dashboard');
    } catch (error) {
      toast.error('Failed to post internship');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Post New Internship</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Stipend</label>
            <input
              type="text"
              value={formData.stipend}
              onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Batch Start Date</label>
            <input
              type="date"
              value={formData.batchStartDate}
              onChange={(e) => setFormData({ ...formData, batchStartDate: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Batch End Date</label>
            <input
              type="date"
              value={formData.batchEndDate}
              onChange={(e) => setFormData({ ...formData, batchEndDate: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Internship Type</label>
            <select
              value={formData.internshipType}
              onChange={(e) => setFormData({ ...formData, internshipType: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Number of Openings</label>
            <input
              type="number"
              value={formData.openings}
              onChange={(e) => setFormData({
                ...formData,
                openings: parseInt(e.target.value)
              })}
              className="w-full px-4 py-2 border rounded"
              required
              min="1"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Skills Required</label>
          <input
            type="text"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({ ...formData, skillsRequired: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
            placeholder="Separate skills with commas"
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            required
            rows="4"
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Perks</label>
          <input
            type="text"
            value={formData.perks}
            onChange={(e) => setFormData({ ...formData, perks: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            placeholder="Certificate, Letter of Recommendation, etc."
          />
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 mb-2">Application Process</label>
          <input
            type="text"
            value={formData.applicationProcess}
            onChange={(e) => setFormData({ ...formData, applicationProcess: e.target.value })}
            className="w-full px-4 py-2 border rounded"
            placeholder="Resume Screening > Interview"
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isPartTimeAllowed}
              onChange={(e) => setFormData({
                ...formData,
                isPartTimeAllowed: e.target.checked
              })}
              className="mr-2"
            />
            <span className="text-gray-700">Allow Part-time</span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Post Internship
        </button>
      </form>
    </div>
  );
}

export default PostInternship;
```