import { Link } from 'react-router-dom';

function InternshipCard({ internship }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{internship.title}</h2>
      <p className="text-gray-600 mb-4">{internship.description.substring(0, 150)}...</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {internship.skillsRequired.split(',').map((skill, index) => (
          <span 
            key={index}
            className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
          >
            {skill.trim()}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <p>Location: {internship.location}</p>
        <p>Duration: {internship.duration}</p>
        <p>Stipend: {internship.stipend}</p>
      </div>
      <Link 
        to={`/internship/${internship.id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}

export default InternshipCard;