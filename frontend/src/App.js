import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import './style.css';

const App = () => {
  const [doctorands, setDoctorands] = useState([]);
  const [formData, setFormData] = useState({
    "Full Name": '',
    "Mother's Name": '',
    "Father's Name": '',
    "Phone Number": '',
    "Dormitory": '',
    "Room Number": '',
    "Email": '',
    "Date of Birth": '',
    "Nationality": '',
    "Passport Number": '',
    "Date of Issue": '',
    "Date of Expiry": '',
    "Issuing Authority": '',
    "Validated As Student": ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    fetchDoctorands();
  }, []);

  const fetchDoctorands = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctorands');
      if (Array.isArray(response.data)) {
        setDoctorands(response.data);
      } else {
        setDoctorands([]);
      }
    } catch (error) {
      console.error('Error fetching doctorands:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/doctorands/${editIndex}`, formData);
      } else {
        await axios.post('http://localhost:5000/doctorands', formData);
      }
      setFormData({
        "Full Name": '',
        "Mother's Name": '',
        "Father's Name": '',
        "Phone Number": '',
        "Dormitory": '',
        "Room Number": '',
        "Email": '',
        "Date of Birth": '',
        "Nationality": '',
        "Passport Number": '',
        "Date of Issue": '',
        "Date of Expiry": '',
        "Issuing Authority": '',
        "Validated As Student": ''
      });
      setIsEditing(false);
      setEditIndex(null);
      fetchDoctorands();
      setActiveTab('table');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (index) => {
    setFormData(doctorands[index]);
    setIsEditing(true);
    setEditIndex(index);
    setActiveTab('form');
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this doctorand?')) return;
    try {
      await axios.delete(`http://localhost:5000/doctorands/${index}`);
      fetchDoctorands();
    } catch (error) {
      console.error('Error deleting doctorand:', error);
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (tab === 'form') {
      setIsEditing(false);
      setFormData({
        "Full Name": '',
        "Mother's Name": '',
        "Father's Name": '',
        "Phone Number": '',
        "Dormitory": '',
        "Room Number": '',
        "Email": '',
        "Date of Birth": '',
        "Nationality": '',
        "Passport Number": '',
        "Date of Issue": '',
        "Date of Expiry": '',
        "Issuing Authority": '',
        "Validated As Student": ''
      });
    } else if (tab === 'table') {
      fetchDoctorands();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedDoctorands = [...doctorands].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setDoctorands(sortedDoctorands);
  };

  const filteredDoctorands = doctorands.filter((doctorand) =>
    doctorand["Full Name"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-header">Doctorand Management</h1>

      <button className="toggle-dark-mode" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <div className="menu">
        <button
          className={`menu-button ${activeTab === 'table' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('table')}
        >
          View Doctorands
        </button>
        <button
          className={`menu-button ${activeTab === 'form' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('form')}
        >
          Add/Edit Doctorand
        </button>
      </div>

      {activeTab === 'table' && (
        <div className="table-container full-width">
          <div className="table-controls">
            <input
              type="text"
              placeholder="Search by Full Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <CSVLink
              data={doctorands}
              filename="doctorands.csv"
              className="download-button"
              target="_blank"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.9rem'
              }}
            >
              ⬇ Download Table
            </CSVLink>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                {Object.keys(formData).map((key) => (
                  <th key={key} onClick={() => handleSort(key)}>
                    {key} {sortConfig.key === key ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctorands.map((doctorand, index) => (
                <tr key={index}>
                  {Object.keys(formData).map((key) => (
                    <td key={key}>{doctorand[key] || ''}</td>
                  ))}
                  <td>
                    <button className="action-button edit" onClick={() => handleEdit(index)}>
                      ✏️ Edit
                    </button>
                    <button className="action-button delete" onClick={() => handleDelete(index)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'form' && (
        <form className="form-container" onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label>{key}</label>
              {key === "Validated As Student" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <input
                  type={key.includes("Date") ? "date" : key.includes("Email") ? "email" : key.includes("Phone") ? "tel" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
              )}
            </div>
          ))}
          <button type="submit" className="form-button">
            {isEditing ? 'Update' : 'Add'} Doctorand
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
