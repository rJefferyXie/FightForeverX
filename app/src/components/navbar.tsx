// React + Next

const Navbar = () => {
  const navLinks = [
    {
      name: "Dashboard",
      href: "dashboard",
    },
    {
      name: "Wrestlers",
      href: "wrestlers",
    },
    {
      name: "News",
      href: "news",
    },
    {
      name: "Events",
      href: "events",
    }
  ]

  return (
    <div className="flex flex-col h-screen w-64 bg-white">
      {navLinks.map((link, idx) => {
        return (
          <a 
            key={idx}
            href={link.href}
            className="text-black"
          >
            {link.name}
          </a>
        )
      })}
    </div>
  )
}

export default Navbar;