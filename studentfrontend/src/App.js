import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/students");
      setStudents(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load students. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async () => {
    if (!name || !email) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/students", { name, email });
      setName("");
      setEmail("");
      setError("");
      loadStudents();
    } catch (err) {
      setError("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setEditingId(student.id);
    setError("");
  };

  const updateStudent = async () => {
    if (!name || !email) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/students/${editingId}`, { name, email });
      setName("");
      setEmail("");
      setEditingId(null);
      setError("");
      loadStudents();
    } catch (err) {
      setError("Failed to update student");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setName("");
    setEmail("");
    setEditingId(null);
    setError("");
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:8080/students/${id}`);
        setError("");
        loadStudents();
      } catch (err) {
        setError("Failed to delete student");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-content">
          <h1 className="app-title">
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Student Management System
          </h1>
          <p className="app-subtitle">Manage your student records efficiently</p>
        </div>
      </div>

      <div className="main-content">
        <div className="form-card">
          <h2 className="card-title">
            {editingId ? "Edit Student" : "Add New Student"}
          </h2>
          
          {error && (
            <div className="error-message">
              <svg className="icon-small" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter student email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            {editingId ? (
              <>
                <button 
                  className="btn btn-primary" 
                  onClick={updateStudent}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Student"}
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={cancelEdit}
                  disabled={loading}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={addStudent}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Student"}
              </button>
            )}
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <h2 className="card-title">Student List ({filteredStudents.length})</h2>
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                className="search-input"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading && !students.length ? (
            <div className="loading">Loading students...</div>
          ) : filteredStudents.length === 0 ? (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p>No students found</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className={editingId === s.id ? "editing" : ""}>
                      <td>{s.id}</td>
                      <td>
                        <div className="student-name">{s.name}</div>
                      </td>
                      <td>{s.email}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-icon btn-edit" 
                            onClick={() => editStudent(s)}
                            disabled={loading}
                            title="Edit"
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => deleteStudent(s.id)}
                            disabled={loading}
                            title="Delete"
                          >
                            <svg viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
