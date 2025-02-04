import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SyllabusUpload.css';

interface UploadState {
  status: 'initial' | 'uploading' | 'processing' | 'success' | 'error';
  message?: string;
  progress?: number;
}

const SyllabusUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'initial' });
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (isValidFile(droppedFile)) {
      setFile(droppedFile);
      setUploadState({ status: 'initial' });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (isValidFile(selectedFile)) {
        setFile(selectedFile);
        setUploadState({ status: 'initial' });
      }
    }
  };

  const isValidFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setUploadState({
        status: 'error',
        message: 'Please upload a PDF or Word document'
      });
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadState({
        status: 'error',
        message: 'File size should be less than 10MB'
      });
      return false;
    }
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleUpload = async () => {
    if (!file || !dateRange.startDate || !dateRange.endDate) {
      setUploadState({
        status: 'error',
        message: 'Please select a file and specify the date range'
      });
      return;
    }

    setUploadState({ status: 'uploading', progress: 0 });

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => ({
        ...prev,
        progress: prev.progress && prev.progress < 90 ? prev.progress + 10 : prev.progress
      }));
    }, 500);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('startDate', dateRange.startDate);
      formData.append('endDate', dateRange.endDate);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setUploadState({ status: 'processing' });

      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      setUploadState({
        status: 'success',
        message: 'Your syllabus has been processed successfully!'
      });

      // Navigate to learning path after success
      setTimeout(() => {
        navigate('/learning-path');
      }, 2000);

    } catch (error) {
      clearInterval(progressInterval);
      setUploadState({
        status: 'error',
        message: 'An error occurred while uploading your syllabus. Please try again.'
      });
    }
  };

  return (
    <div className="syllabus-upload-container">
      <div className="upload-card">
        <h1>Upload Your Syllabus</h1>
        <p className="upload-description">
          Upload your syllabus to generate a personalized learning path. 
          We support PDF and Word documents up to 10MB.
        </p>

        <div className="date-range-section">
          <h2>Study Period</h2>
          <div className="date-inputs">
            <div className="date-field">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={dateRange.startDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="date-field">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={dateRange.endDate}
                onChange={handleDateChange}
                min={dateRange.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>

        <div 
          className="drop-zone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
          />
          <div className="drop-zone-content">
            {file ? (
              <>
                <i className="fas fa-file-alt file-icon"></i>
                <p className="file-name">{file.name}</p>
                <p className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                <p>Drag and drop your syllabus here or click to browse</p>
                <p className="file-hint">Supported formats: PDF, DOC, DOCX</p>
              </>
            )}
          </div>
        </div>

        {uploadState.status === 'error' && (
          <div className="error-message">
            {uploadState.message}
          </div>
        )}

        {uploadState.status === 'uploading' && (
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${uploadState.progress}%` }}
            ></div>
            <span className="progress-text">
              Uploading... {uploadState.progress}%
            </span>
          </div>
        )}

        {uploadState.status === 'processing' && (
          <div className="processing-message">
            <i className="fas fa-cog fa-spin"></i>
            Processing your syllabus...
          </div>
        )}

        {uploadState.status === 'success' && (
          <div className="success-message">
            {uploadState.message}
          </div>
        )}

        <button
          className="upload-button"
          onClick={handleUpload}
          disabled={!file || !dateRange.startDate || !dateRange.endDate || ['uploading', 'processing'].includes(uploadState.status)}
        >
          {uploadState.status === 'initial' && 'Generate Learning Path'}
          {uploadState.status === 'uploading' && 'Uploading...'}
          {uploadState.status === 'processing' && 'Processing...'}
          {uploadState.status === 'success' && 'Success!'}
          {uploadState.status === 'error' && 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default SyllabusUpload;