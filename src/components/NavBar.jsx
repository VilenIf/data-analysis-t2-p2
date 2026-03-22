// src/components/Navbar.js (Minimalist Version)
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const navLinkStyle = ({ isActive }) => ({
        padding: '8px 24px',
        color: isActive ? '#f35800' : '#6c757d',
        textDecoration: 'none',
        fontWeight: isActive ? '600' : '500',
        borderBottom: isActive ? '2px solid #f35800' : '2px solid transparent',
        transition: 'all 0.2s',
    });

    return (
        <nav
            style={{
                background: '#ffffff',
                padding: '1rem 2rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#f35800' }}>
                    Delivery Dashboard
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <NavLink to="/" style={navLinkStyle}>Dashboard</NavLink>
                    <NavLink to="/raw" style={navLinkStyle}>Raw Data</NavLink>
                </div>
            </div>
        </nav>
    );
}