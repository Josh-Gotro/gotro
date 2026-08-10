import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="page-placeholder">
      <h1>404</h1>
      <p>Nothing here.</p>
      <Link to="/">Back to the map</Link>
    </main>
  );
}
