import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/logo.png';
import './navbarStyles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Image src={logo} alt="Logo esto es" width={50} height={25} />
      </div>
      <div className="navbar-bottom">
        <Link href="/" passHref>
          <h2>My projects</h2>
        </Link>
        <Link href="/projectForm/new" passHref>
          <button className="add-project-button">+ Add project</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
