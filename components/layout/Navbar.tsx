import logo from "../../public/knights_snippet.png";
import Image from "next/image";
import Link from "next/link";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <div className="w-full h-24 bg-black shadow">
        <div className="flex items-center pt-2">
          <Image
            src={logo}
            alt="knights_logo"
            width={85}
            height={85}
            className="ml-2"
          />
          <Link href="/">
            <button>
              <h1 className="text-white text-3xl font-bold">Rollcall</h1>
            </button>
          </Link>
        </div>
      </div>
      <div className="h-2 w-full bg-blue-700"></div>
    </>
  );
};

export default Navbar;
