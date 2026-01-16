import {useState} from 'react'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "./ui/resizable-navbar";

export default function Header(){
  // const [isOpen, setIsOpen] = useState(false);

  const navItems = [];
  return(
    <>
    <div id="top" style={{}}></div>
    <Navbar>
      {/* Desktop Navbar */}
      <NavBody>
        <NavbarLogo />

        <NavItems items={navItems} />

        <div className="relative z-20 flex items-center gap-2">
          <NavbarButton href="./pages/profile">Profile</NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navbar */}
      {/* <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="text-neutral-700 dark:text-neutral-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <NavbarButton
            href="/create"
            className="mt-4 w-full text-center"
          >
            Create Meme
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav> */}
    </Navbar>
    </>
  )
}