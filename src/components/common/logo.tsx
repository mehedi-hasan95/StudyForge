import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image src="/logo.svg" alt="Logo" height={30} width={30} />
      <h2 className="text-2xl font-bold text-blue-700">StudyForge</h2>
    </Link>
  );
};

export default Logo;
