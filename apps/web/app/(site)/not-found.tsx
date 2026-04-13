export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-display font-bold text-brand-orange">404</h1>
      <p className="mt-4 text-xl text-brand-navy/70">This page could not be found.</p>
      <a href="/" className="mt-8 rounded-full bg-brand-teal px-6 py-3 text-white hover:bg-brand-teal/90 transition">
        Back to Home
      </a>
    </div>
  );
}
