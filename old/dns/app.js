import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [zoneId, setZoneId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [dnsRecords, setDnsRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      setDnsRecords(response.data.result);
    } catch (error) {
      setError('Error fetching DNS records. Please check your Zone ID and API Key.');
    }
    setLoading(false);
  };

  const deleteSelectedRecords = async () => {
    setLoading(true);
    for (let recordId of selectedRecords) {
      try {
        await axios.delete(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${recordId}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        setDnsRecords(dnsRecords.filter(record => record.id !== recordId));
      } catch (error) {
        setError('Error deleting DNS record.');
      }
    }
    setSelectedRecords([]);
    setLoading(false);
  };

  const handleRecordSelection = (recordId) => {
    if (selectedRecords.includes(recordId)) {
      setSelectedRecords(selectedRecords.filter(id => id !== recordId));
    } else {
      setSelectedRecords([...selectedRecords, recordId]);
    }
  };

  return (
    <div className="App">
      <h1>Cloudflare DNS Manager</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Zone ID"
          value={zoneId}
          onChange={(e) => setZoneId(e.target.value)}
        />
        <input
          type="text"
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button onClick={fetchRecords} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Records'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <div>
        <h2>DNS Records</h2>
        <ul>
          {dnsRecords.map(record => (
            <li key={record.id}>
              <input
                type="checkbox"
                checked={selectedRecords.includes(record.id)}
                onChange={() => handleRecordSelection(record.id)}
              />
              {record.name} ({record.type}) - {record.content}
            </li>
          ))}
        </ul>
        <button onClick={deleteSelectedRecords} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete Selected Records'}
        </button>
      </div>
    </div>
  );
}

export default App;
