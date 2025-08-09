import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Trada NYC — Barter with locals',
  description:
    'Trade skills, goods, and services with NYC locals. No cash. Just connection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <div
            className="container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
            }}
          >
            <Link href="/" className="font-bold">
              Trada NYC
            </Link>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link href="/explore">Explore</Link>
              <Link href="/profile">Create Profile</Link>
              <a href="#waitlist">Waitlist</a>
            </div>
          </div>
        </nav>
        {children}
        <footer style={{ borderTop: '1px solid #eee', marginTop: 24 }}>
          <div className="container" style={{ padding: '24px 0', color: '#555', fontSize: 14 }}>
            © 2025 Trada NYC — barter@trada.city — @tradaNYC
          </div>
        </footer>
      </body>
    </html>
  );
}
