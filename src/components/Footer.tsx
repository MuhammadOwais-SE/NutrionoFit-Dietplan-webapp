import Image from "next/image";
import Link from "next/link";
import LinkedinLogo from "../../public/assets/linkedin.png";
const Footer = () => {
  return (
    <footer className="bg-[#68AC31]  text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Made By Muhammad Owais. All rights reserved.</p>
        <p className="flex justify-center items-center">
            <span className="bg-blue-100 rounded-sm p-1 mr-1">

            <Image 
            src={LinkedinLogo}
            width={100}
            height={100}
            alt="Linkedin Logo"
            className="w-5 "
            /> 
            </span>
            <Link className="hover:text-blue-300 font-bold" target="_blank"  href={'https://www.linkedin.com/in/muhammadowais-se/'}>
             Click Here to View Linkedin 
            </Link>
            </p>
      </div>
    </footer>
  );
};

export default Footer;