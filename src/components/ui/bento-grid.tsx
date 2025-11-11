import { ReactNode } from "react";
import React from 'react';
import styled from 'styled-components';

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

// Custom Document Button Component
const DocumentButton = ({ href, cta }: { href: string; cta: string }) => {
  return (
    <StyledWrapper>
      <a href={href} className="Documents-btn" target="_blank" rel="noopener noreferrer">
        <span className="folderContainer">
          <svg className="fileBack" width={146} height={113} viewBox="0 0 146 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z" fill="url(#paint0_linear_117_4)" />
            <defs>
              <linearGradient id="paint0_linear_117_4" x1={0} y1={0} x2="72.93" y2="95.4804" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8F88C2" />
                <stop offset={1} stopColor="#5C52A2" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="filePage" width={88} height={99} viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width={88} height={99} fill="url(#paint0_linear_117_6)" />
            <defs>
              <linearGradient id="paint0_linear_117_6" x1={0} y1={0} x2={81} y2="160.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="white" />
                <stop offset={1} stopColor="#686868" />
              </linearGradient>
            </defs>
          </svg>
          <svg className="fileFront" width={160} height={79} viewBox="0 0 160 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z" fill="url(#paint0_linear_117_5)" />
            <defs>
              <linearGradient id="paint0_linear_117_5" x1="38.7619" y1="8.71323" x2="66.9106" y2="82.8317" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C3BBFF" />
                <stop offset={1} stopColor="#51469A" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <p className="text">{cta}</p>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .Documents-btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: 45px;
    border: none;
    padding: 0px 15px;
    border-radius: 5px;
    background-color: rgb(172, 66, 255);
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
  }
  .folderContainer {
    width: 40px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    position: relative;
  }
  .fileBack {
    z-index: 1;
    width: 80%;
    height: auto;
  }
  .filePage {
    width: 50%;
    height: auto;
    position: absolute;
    z-index: 2;
    transition: all 0.3s ease-out;
  }
  .fileFront {
    width: 85%;
    height: auto;
    position: absolute;
    z-index: 3;
    opacity: 0.95;
    transform-origin: bottom;
    transition: all 0.3s ease-out;
  }
  .text {
    color: white;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .Documents-btn:hover .filePage {
    transform: translateY(-5px);
  }
  .Documents-btn:hover {
    background-color: rgb(172, 66, 255, 0.4);
  }
  .Documents-btn:active {
    transform: scale(0.95);
  }
  .Documents-btn:hover .fileFront {
    transform: rotateX(30deg);
  }
`;

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // unified styles
      "bg-white transform-gpu dark:bg-black",
      // requested border and shadow with gap to prevent connecting lines
      "[border:1px_solid_rgba(160,160,160,1)] [box-shadow:inset_0_8px_24px_rgba(25,185,0,1)] m-[1px]",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon
        className="h-8 w-8 origin-center transform-gpu 
                   text-gray-400 
                   drop-shadow-[0_0_10px_rgba(128,128,128,0.5)]
                   transition-all duration-300 ease-in-out
                   group-hover:text-amber-400
                   group-hover:scale-110
                   group-hover:drop-shadow-[0_0_16px_rgba(255,200,0,1)]"
      />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <div className="pointer-events-auto">
        <DocumentButton href={href} cta={cta} />
      </div>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

// You'll need to add this utility function if it's not already imported
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export { BentoCard, BentoGrid };