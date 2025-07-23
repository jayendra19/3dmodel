import { useState, useEffect } from 'react';
import Experience from './components/Experience';

function NewsFeed() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    // Example: Replace with your real news API endpoint
    fetch('https://api.thenewsapi.com/v1/news/top?categories=ai,technology&api_token=demo')
      .then(res => res.json())
      .then(data => setNews(data.data || []));
  }, []);
  return (
    <div style={{ padding: '2rem', background: 'rgba(20,30,60,0.98)', borderRadius: '24px', color: '#fff', boxShadow: '0 0 32px #00eaff', minHeight: '480px', maxWidth: '520px', margin: '2rem auto' }}>
      <h2 style={{ color: '#00eaff', marginBottom: '1rem', textShadow: '0 0 8px #00eaff' }}>Latest AI News</h2>
      {news.length === 0 && <p>Loading news...</p>}
      {news.map((item, i) => (
        <div key={i} style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00eaff', paddingLeft: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
          <h4 style={{ color: '#00eaff', margin: 0 }}>{item.category || item.source}</h4>
          <strong>{item.title}</strong>
          <p style={{ margin: 0 }}>{item.description || item.summary}</p>
        </div>
      ))}
    </div>
  );
}

function Navigation({ setPage }) {
  return (
    <nav style={{ display: 'flex', gap: '2rem', padding: '1rem 2rem', background: 'rgba(20,30,60,0.95)', borderRadius: '0 0 16px 16px', color: '#fff', boxShadow: '0 2px 12px #2323ff' }}>
      <button onClick={() => setPage('home')} style={{ background: 'none', color: '#00eaff', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>Home</button>
      <button onClick={() => setPage('about')} style={{ background: 'none', color: '#00eaff', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>About</button>
      <button onClick={() => setPage('contact')} style={{ background: 'none', color: '#00eaff', border: 'none', fontSize: '1.2em', cursor: 'pointer' }}>Contact</button>
    </nav>
  );
}

function About() {
  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2 style={{ color: '#00eaff' }}>About Our AI Platform</h2>
      <p>We build next-gen AI assistants with real-time 3D avatars, voice, and text interaction. Our mission is to make AI accessible, ethical, and engaging for everyone.</p>
      <p>Powered by React, Three.js, and the latest AI APIs.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2 style={{ color: '#00eaff' }}>Contact & Support</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input type="text" placeholder="Your Name" style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #00eaff' }} />
        <input type="email" placeholder="Your Email" style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #00eaff' }} />
        <textarea placeholder="Your Message" rows={4} style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #00eaff' }} />
        <button type="submit" style={{ background: '#00eaff', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.75rem', fontWeight: 'bold' }}>Send</button>
      </form>
    </div>
  );
}

export default function App() {
  const [input, setInput] = useState('Hello, I am your avatar!');
  const [speakText, setSpeakText] = useState('');
  const [page, setPage] = useState('home');

  // Head turn for greetings
  const headTurn = /\b(hi|hey|hello)\b/i.test(input);

  const handleSpeak = () => {
    setSpeakText(input);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(90deg, #2323ff 0%, #0a0a23 100%)', color: '#fff', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <Navigation setPage={setPage} />
      {page === 'home' && (
        <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 80px)', gap: '2rem', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ flex: '1 1 0', marginTop: '2rem', maxWidth: '540px' }}>
            <NewsFeed />
          </div>
          <div style={{ flex: '0 0 420px', background: 'rgba(20,30,60,0.98)', borderRadius: '24px', boxShadow: '0 0 32px #2323ff', marginTop: '2rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '520px', justifyContent: 'flex-end' }}>
            <h2 style={{ color: '#00eaff', marginBottom: '1rem' }}>AI Avatar Assistant</h2>
            <div style={{ width: '360px', height: '240px', background: 'rgba(0,0,0,0.7)', borderRadius: '16px', boxShadow: '0 0 24px #00eaff', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              {/* Only show half-body avatar by cropping the canvas height */}
              <Experience speakText={speakText} headTurn={headTurn} />
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={2}
              cols={32}
              style={{ fontSize: '1.1em', padding: '8px', borderRadius: '6px', border: '1px solid #00eaff', marginBottom: '1rem', background: '#181830', color: '#fff' }}
            />
            <button onClick={handleSpeak} style={{ fontSize: '1.1em', padding: '8px 16px', borderRadius: '6px', background: '#00eaff', color: '#fff', border: 'none', fontWeight: 'bold', boxShadow: '0 2px 8px #2323ff' }}>
              Speak
            </button>
          </div>
        </div>
      )}
      {page === 'about' && <About />}
      {page === 'contact' && <Contact />}
    </div>
  );
}
