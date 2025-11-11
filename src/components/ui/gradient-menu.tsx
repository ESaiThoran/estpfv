import React from 'react';
import { IoPersonOutline, IoCodeSlashOutline, IoLayersOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { FaHandshake } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const menuItems = [
  { title: 'Home', icon: <HiOutlineHome />, gradientFrom: '#a955ff', gradientTo: '#ea51ff', sectionId: 'home' },
  { title: 'Experience', icon: <IoPersonOutline />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED', sectionId: 'experience' },
  { title: 'My Stack', icon: <IoCodeSlashOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62', sectionId: 'stack' },
  { title: 'Projects', icon: <IoLayersOutline />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA', sectionId: 'projects' },
  { title: 'Certificate', icon: <IoDocumentTextOutline />, gradientFrom: '#ffa9c6', gradientTo: '#f434e2', sectionId: 'certifications' },
  { title: 'Hire Me', icon: <FaHandshake />, gradientFrom: '#FFD700', gradientTo: '#FFA500', sectionId: 'contact' }
];

export default function GradientMenu() {
  return (
    <ul className="flex gap-3 md:gap-4">
      {menuItems.map(({ title, icon, gradientFrom, gradientTo, sectionId }, idx) => (
        <li
          key={idx}
          onClick={() => scrollToSection(sectionId)}
          style={{ ['--gradient-from' as any]: gradientFrom, ['--gradient-to' as any]: gradientTo }}
          className="relative w-[44px] h-[44px] md:w-[60px] md:h-[60px] bg-white/90 dark:bg-black/20 
          border border-gray-700 shadow-lg rounded-full flex items-center justify-center 
          transition-all duration-500 hover:w-[140px] md:hover:w-[180px] hover:shadow-none 
          group cursor-pointer overflow-hidden hover:border-transparent
          before:absolute before:inset-0 before:rounded-full before:p-[2px] 
          before:bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] 
          before:opacity-0 group-hover:opacity-100 before:transition-all before:duration-500"
        >
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
          <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

          <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
            <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">{icon}</span>
          </span>

          <span className="absolute text-white uppercase tracking-wide text-[10px] md:text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
}
