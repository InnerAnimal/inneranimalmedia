export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple to-mint bg-clip-text text-transparent">
            🦁 InnerAnimal AI Toolbox
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Your team's AI-powered control center
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            No more teaching APIs. Just click, describe what you need, and let AI handle the technical work.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--nav-text)]">AI Magic Buttons</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Click a button, describe your need, and watch AI generate code, configure APIs, and deploy.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🔐</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--nav-text)]">Smart Auth</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Role-based access control. Admins, developers, and designers see different tools.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--nav-text)]">One-Click Deploy</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Auto-deploy to Vercel or Cloudflare with proper environment configuration.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="mt-20 glass rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--nav-text)]">
            Active Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-orange/10 to-orange-dark/10 rounded-xl">
              <div className="text-4xl font-black text-orange mb-2">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Live Projects</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-mint/10 to-teal/10 rounded-xl">
              <div className="text-4xl font-black text-mint mb-2">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Domains</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple/10 to-purple/20 rounded-xl">
              <div className="text-4xl font-black text-purple mb-2">12+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">API Integrations</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            👆 Click the toolbox button in the header to get started
          </p>
        </section>
      </div>
    </div>
  );
}
