
export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="w-full h-16 bg-gray-900 shadow">
      <div className="flex items-center justify-between py-4 px-10">
        <div className="text-white font-bold text-xl flex items-center">
          Rollcall
        </div>
      </div>
      <div className="h-2 w-full bg-blue-600"></div>
    </div>
  );
};

export default Navbar;
