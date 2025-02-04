import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SyllabusUpload = () => {
  const [startDate, setStartDate] = useState<Date | null>(null); // Track the selected start date
  const [endDate, setEndDate] = useState<Date | null>(null); // Track the selected end date
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'initial' | 'uploading' | 'success' | 'fail'>('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('initial');
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus('uploading');
      const formData = new FormData();
      formData.append('file', file);

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

  // Disable the upload button if no date is selected or no file is uploaded
  const isUploadDisabled = !startDate || !endDate || !file;

  return (
    <>
      <h1>Syllabus Upload</h1>

      <div className="input-group">
        <label>Select Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date: Date | null) => setStartDate(date)} // Update the selected start date
        />
      </div>

      <div className="input-group">
        <label>Select End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={(date: Date | null) => setEndDate(date)} // Update the selected end date
        />
      </div>

      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
      </div>

      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      <button
        onClick={handleUpload}
        className="submit"
        disabled={isUploadDisabled} // Disable button if date or file is not selected
      >
        Upload a file
      </button>

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === 'success') {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === 'fail') {
    return <p>❌ File upload failed!</p>;
  } else if (status === 'uploading') {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SyllabusUpload;
