import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DB_URL } from '../../store/firebase';

function EditMovie() {
    const [formData, setFormData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`${DB_URL}/movies/${id}.json`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!formData) return <div>Loading...</div>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${DB_URL}/movies/${id}.json`, formData);
            alert("Movie updated successfully!");
        } catch (error) {
            console.error("Error updating movie:", error);
            alert("Error updating movie.");
        }
    };

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} required />
                <input type="text" name="posterURL" value={formData.posterURL} onChange={handleInputChange} required />
                {/* Add more input fields as necessary */}
                <button type="submit">Update Movie</button>
            </form>
        </div>
    );
}

export default EditMovie;
