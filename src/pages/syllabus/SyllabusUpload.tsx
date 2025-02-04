import React, { useState } from 'react';
import './SyllabusUpload.css';

const SyllabusUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setFile(e.target.files[0]);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleUpload = async () => {
    if (file && dateRange.startDate && dateRange.endDate) {
      setStatus('uploading');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('startDate', dateRange.startDate);
      formData.append('endDate', dateRange.endDate);

      try {
        const result = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });

        const data = await result.json();
        console.log(data);
        setStatus('success');
      } catch (error) {
        console.error(error);
        setStatus('fail');
      }
    }
  };

  return (
    <div className="container">
      <div className="card syllabus-upload">
        <h1>Upload Your Syllabus</h1>
        
        <div className="upload-section">
          <div className="date-range">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="input-field"
                value={dateRange.startDate}
                onChange={handleDateChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="input-field"
                value={dateRange.endDate}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <div className="file-upload">
            <label className="file-label">
              <input 
                type="file" 
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
              <span className="btn">Choose File</span>
            </label>
          </div>

          {file && (
            <div className="file-details">
              <h3>File Details</h3>
              <ul>
                <li>Name: {file.name}</li>
                <li>Type: {file.type}</li>
                <li>Size: {(file.size / 1024).toFixed(2)} KB</li>
              </ul>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn upload-btn"
            disabled={!file || !dateRange.startDate || !dateRange.endDate}
          >
            Upload Syllabus
          </button>

          <div className="upload-status">
            <Result status={status} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Result = ({ status }: { status: string }) => {
  const messages = {
    success: '✅ File uploaded successfully!',
    fail: '❌ File upload failed!',
    uploading: '⏳ Uploading selected file...'
  };

  return status !== 'initial' ? (
    <div className={`status-message ${status}`}>
      {messages[status as keyof typeof messages]}
    </div>
  ) : null;
};

export default SyllabusUpload;