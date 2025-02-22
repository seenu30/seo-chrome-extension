import React, { useState, useEffect } from 'react';

interface Suggestion {
  id: string;
  text: string;
}

const Popup: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0] && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    // Call your backend API to get suggestions
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });
      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ padding: '1rem', width: '300px' }}>
      <h2>SeoScribe</h2>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Enter target keyword"
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button onClick={handleGenerate} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Generating...' : 'Generate Suggestions'}
      </button>
      <ul style={{ marginTop: '1rem' }}>
        {suggestions.map(suggestion => (
          <li key={suggestion.id}>
            {suggestion.text}
            <button onClick={() => handleCopy(suggestion.text)} style={{ marginLeft: '0.5rem' }}>
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
