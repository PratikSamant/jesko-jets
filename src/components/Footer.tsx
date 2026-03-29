export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">
        <div>
          <p className="font-cormorant text-white text-2xl tracking-[0.3em] font-light mb-4">
            THE JET MAFIA
          </p>
          <p className="text-white/30 text-xs font-dm-sans tracking-wider max-w-xs leading-relaxed">
            Private aviation for those who understand that the journey is as
            important as the destination.
          </p>
        </div>
        <div className="flex gap-16">
          {[
            {
              title: "Company",
              links: ["About", "Careers", "Press"],
            },
            {
              title: "Services",
              links: ["Charter", "Membership", "Corporate"],
            },
            {
              title: "Contact",
              links: ["+1 800 JET 001", "concierge@thejetmafia.com"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-dm-sans mb-6">
                {col.title}
              </p>
              {col.links.map((link) => (
                <p
                  key={link}
                  className="text-white/50 hover:text-white text-xs font-dm-sans mb-4 cursor-pointer transition-colors"
                >
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
        <p className="text-white/20 text-[10px] font-dm-sans tracking-wider">
          &copy; {new Date().getFullYear()} The Jet Mafia. All rights reserved.
        </p>
        <p className="text-white/20 text-[10px] font-dm-sans tracking-wider flex gap-6">
          <span className="cursor-pointer hover:text-white/40">Privacy</span>
          <span className="cursor-pointer hover:text-white/40">Terms</span>
          <span className="cursor-pointer hover:text-white/40">Cookies</span>
        </p>
      </div>
    </footer>
  );
}
