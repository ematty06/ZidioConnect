```javascript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInternshipById } from '../api/internships';
import { applyForInternship } from '../api/applications';
import toast from 'react-hot-toast';

function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    education: '',
    graduationYear: '',
    resume: null
  });

  useEffect(() => {
    loadInternship();
  }, [id]);

  const loadInternship = async () => {
    try {
      const data = await getInternshipById(id);
      setInternship(data);
    } catch (error) {
      toast.error('Failed to load internship details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }

    try {
      setApplying(true);
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        form.append(key, formData[key]);
      });

      await applyForInternship(userId, id, form);
      toast.success('Application submitted successfully!');
      navigate('/applications');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!internship) {
    return <div className="text-center">Internship not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">{internship.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Internship Details</h2>
            <div className="space-y-2">
              <p><strong>Location:</strong> {internship.location}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Stipend:</strong> {internship.stipend}</p>
              <p><strong>Type:</strong> {internship.internshipType}</p>
              <p><strong>Openings:</strong> {internship.openings}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {internship.skillsRequired.split(',').map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="whitespace-pre-line">{internship.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Perks</h2>
          <p>{internship.perks}</p>
        </div>

        <form onSubmit={handleApply} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Apply Now</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Education</label>
            <input
              type="text"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Graduation Year</label>
            <input
              type="number"
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Resume</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
              className="w-full"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <button
            type="submit"
            disabled={applying}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {applying ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default InternshipDetails;
```