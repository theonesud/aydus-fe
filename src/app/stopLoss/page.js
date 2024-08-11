'use client'
import React, { useState } from 'react';
import Layout from '@/components/Layout';

const StopLossCases = () => {
    const [cases, setCases] = useState([
        {
            id: 1,
            name: 'test',
            status: 'Running Custom',
            description: 'Views Greater Than 700 AND Website Revenue Less Than or Equal 0',
            lastUpdated: 'Aug 1, 2024',
            enabled: true
        }
        // Add more cases here if necessary
    ]);

    const toggleCase = (id) => {
        const updatedCases = cases.map((c) =>
            c.id === id ? { ...c, enabled: !c.enabled } : c
        );
        setCases(updatedCases);
    };

    return (
        <Layout>
            <h1
            style={{
                padding: 20,
                fontSize: 24,
                fontWeight: 'bold'
            }}
            >Enable Product Stop Loss</h1>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
                <button style={buttonStyle}>+ Add Rule</button>
                <button style={buttonStyle}>Exclude Products</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {cases.map((caseItem) => (
                    <div key={caseItem.id} style={cardStyle}>
                        <div>
                            <h2>{caseItem.name} - {caseItem.status}</h2>
                            <p>Last updated at {caseItem.lastUpdated}</p>
                            <p>{caseItem.description}</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={caseItem.enabled}
                                onChange={() => toggleCase(caseItem.id)}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

const cardStyle = {
    border: '1px solid #ccc',
    padding: '15px',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
};


export default StopLossCases;
