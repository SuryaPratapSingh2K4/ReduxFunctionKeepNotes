import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav style={{ backgroundColor: '#f8f9fa', padding: '10px' }}>
            <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
            <Link to="/add-group">Add Group</Link>
        </nav>
    )
}

export default Navbar
