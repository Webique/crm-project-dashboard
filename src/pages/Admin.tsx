import Navigation from '@/components/Navigation';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
        <p className="mt-4 text-muted-foreground">Admin functionality coming soon...</p>
      </div>
    </div>
  );
};

export default Admin;