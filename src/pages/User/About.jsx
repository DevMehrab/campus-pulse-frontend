export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <section className="bg-blue-600 text-white py-16 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            About <span className="text-yellow-300">Campus Pulse</span>
          </h1>
          <p className="text-base md:text-lg text-blue-100 leading-relaxed">
            A student-powered platform designed to make campus life smoother,
            smarter, and more connected — where every voice matters.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Campus Pulse aims to bridge the gap between students and university
            authorities by creating a transparent, simple way to report issues,
            request features, and share feedback. From broken lights to Wi-Fi
            complaints — we make sure every concern gets heard and resolved
            faster.
          </p>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            What Makes Campus Pulse Different
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Issue Reporting",
                desc: "Quickly report problems around campus — from classroom issues to administrative delays.",
              },
              {
                title: "Real-Time Tracking",
                desc: "Get live updates on your reported issues and track progress until they’re resolved.",
              },
              {
                title: "Community Voting",
                desc: "Vote on popular issues to help university leaders prioritize the most impactful changes.",
              },
              {
                title: "Admin Dashboard",
                desc: "Smart insights for university authorities to analyze patterns and make data-driven improvements.",
              },
              {
                title: "Student Voice",
                desc: "A unified space for feedback, feature requests, and open campus communication.",
              },
              {
                title: "Transparency First",
                desc: "Built to create accountability and openness between students and administration.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold mb-2 text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 md:px-12 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Built by Students, for Students 🎓
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Campus Pulse is more than a web app — it’s a student movement to
            improve our university experience. We believe that when students are
            empowered to speak, great things happen. Together, we make our
            campus a better place.
          </p>

          <div className="flex justify-center gap-8 flex-wrap mt-8">
            {["Innovation", "Transparency", "Teamwork", "Empowerment"].map(
              (value, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg px-6 py-3 shadow-sm hover:shadow-md text-blue-600 font-semibold transition"
                >
                  {value}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-6 my-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-3">
          <p className="text-sm text-blue-100">
            © {new Date().getFullYear()} Campus Pulse. All rights reserved.
          </p>
          <p className="text-sm text-blue-100">
            Made with ❤️ by{" "}
            <a href="https://github.com/DevMehrab"> Mehrab Hossain</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
