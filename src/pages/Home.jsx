import { useState, useEffect } from 'react';
import { getAllInternships, searchInternships } from '../api/internships';
import InternshipCard from '../components/InternshipCard';
import SearchBar from '../components/SearchBar';

function Home() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    try {
      const data = await getAllInternships();
      setInternships(data);
    } catch (error) {
      console.error('Error loading internships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      loadInternships();
      return;
    }
    
    try {
      setLoading(true);
      const data = await searchInternships(keyword);
      setInternships(data);
    } catch (error) {
      console.error('Error searching internships:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Available Internships</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {internships.map((internship) => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
      </div>
    </div>
  );
}

export default Home;