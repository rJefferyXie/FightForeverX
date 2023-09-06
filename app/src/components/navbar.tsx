// Styles
import '../styles/navbar.scss';

// React + Next

// MUI
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import DashboardIcon from '@mui/icons-material/Dashboard'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const Navbar = () => {
  const navLinks = [
    {
      name: "FIGHT FOREVER",
      href: "",
      icon: <AllInclusiveIcon></AllInclusiveIcon>
    },
    {
      name: "Dashboard",
      href: "dashboard",
      icon: <DashboardIcon></DashboardIcon>
    },
    {
      name: "Wrestlers",
      href: "wrestlers",
      icon: <SportsKabaddiIcon></SportsKabaddiIcon>
    },
    // {
    //   name: "News",
    //   href: "news",
    // },
    // {
    //   name: "Events",
    //   href: "events",
    // }
  ]

  return (
    <nav className="nav z-50">
      {navLinks.map((link, idx) => {
        return (
          <a 
            key={idx}
            href={link.href}
            className="nav-link"
          >
            <p className="nav-link-icon">{link.icon}</p>
            <p className="nav-link-text">{link.name}</p>
          </a>
        )
      })}
    </nav>
  )
}

export default Navbar;