'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import BackIcon from '@/icons/BackIcon';
import logo from '@/public/images/logo.png';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isRoot = pathname === '/';

  const handleBackClick = () => {
    router.back();
  };

  return (
    <nav className="flex flex-col border border-gray-300 bg-white">
      <div className="flex items-start p-2.5 sm:p-4 border-b border-gray-300">
        <Image src={logo} alt="Logo esto es" width={50} height={25} />
      </div>
      <div className="flex justify-between items-center p-2.5 sm:p-4 text-lg font-semibold">
        <div className="flex items-center">
          {!isRoot && (
            <button
              onClick={handleBackClick}
              className="text-gray-700 hover:text-gray-900 mr-4"
            >
              <BackIcon />
            </button>
          )}
          <Link href="/" passHref className="text-gray-900">
            My projects
          </Link>
        </div>
        <Link
          href="/projectForm/new"
          passHref
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          + Add project
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
