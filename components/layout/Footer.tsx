import Link from "next/link";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full h-16 bg-black shadow-md flex items-center px-4">
      <div className="text-black bg-blue-700 hover:bg-blue-600 hover:shadow-lg rounded-full m-3 p-2 h-9 w-9 flex justify-center items-center shadow font-bold">
        <Link href="https://github.com/aaronmitchellvt/nextjs-rollcall">
          {'</>'}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;