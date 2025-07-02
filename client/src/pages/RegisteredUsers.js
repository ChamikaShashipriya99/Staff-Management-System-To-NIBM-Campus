import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RegisteredUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // TODO: Adjust endpoint if needed
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth?lecturers`)
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.lecturerId.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadCSV = () => {
    const csvRows = [
      ['Name', 'Email', 'Lecturer ID'],
      ...filteredUsers.map(u => [u.name, u.email, u.lecturerId])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registered_users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Registered Users', 105, 18, { align: 'center' });
    autoTable(doc, {
      head: [['Name', 'Email', 'Lecturer ID']],
      body: filteredUsers.map(u => [u.name, u.email, u.lecturerId]),
      startY: 28,
      styles: { fontSize: 11 },
      headStyles: { fillColor: [23, 105, 255] },
      margin: { left: 14, right: 14 },
    });
    doc.save('registered_users.pdf');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary mb-0">
          <i className="fas fa-users me-2"></i>Registered Users
        </h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={handleDownloadCSV}>
            <i className="fas fa-file-csv me-2"></i>Download CSV
          </button>
          <button className="btn btn-outline-danger" onClick={handleDownloadPDF}>
            <i className="fas fa-file-pdf me-2"></i>Download PDF
          </button>
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or lecturer ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Lecturer ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="3" className="text-center text-muted">No users found.</td></tr>
            ) : (
              filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.lecturerId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredUsers; 