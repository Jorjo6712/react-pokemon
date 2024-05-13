import { NavLink } from 'react-router-dom'

export type navBarLinks = { title: string; route: string; }[]

interface NavBarProps {
  links: navBarLinks
}

const NavBar: React.FC<NavBarProps> = ({ links }) => {
  return (
    <ul className='flex flex-row justify-center items-center gap-5 mt-5'>
      {links.map((links) => (
        <NavLink to={links.route} key={links.title}>
            <p className='font-medium text-black-600 hover:underline'>{links.title}</p>
        </NavLink>
      ))}
    </ul>
  )
}

export default NavBar