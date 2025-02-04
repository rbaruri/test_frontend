import React from 'react'

const Account = () => {
    const user = {
        username: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin'
    }
  return (
    <div>
      <h1>Account</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  )
}

export default Account
