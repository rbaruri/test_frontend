import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/syllabus-upload">Syllabus Upload</Link>
        </li>
        <li>
          <Link to="/learning-path">Learning Path</Link>
        </li>
        <li>
          <Link to="/progress">Progress</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
