import { LuBadgeCheck } from "react-icons/lu";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: LuBadgeCheck,
    name: "Springer Conference",
    description:
      "Published Miror Project Work on Cryptography and Steganography. • 2025",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/minor_project_publication_certificate.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: LuBadgeCheck,
    name: "Google Cloud Developer",
    description:
      "Google Cloud — Application deployment environments on App Engine, Kubernetes Engine, and Compute Engine. • 2023",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/Deloitte_1749021733531_completion_certificate.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:row-start-2 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: LuBadgeCheck,
    name: "Deloitte Technology Job Simulation",
    description:
      "Deloitte — Learned how to handle code merging of different tasks and designed Software project planning. • 2025",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/Deloitte_1749021733531_completion_certificate.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: LuBadgeCheck,
    name: "IBM Cyber-Security Analyst",
    description:
      "IBM — Learned Dynamic cyber workforce and tools for Data protection and Endpoint protection. • 2024",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/IBM_cyber_security.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: LuBadgeCheck,
    name: "AIP Conference",
    description:
      "Published Major Project Work on Developing Realtime Phishing website Detection using AI & ML. • 2025",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/Major_project_publication.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: LuBadgeCheck,
    name: "AWS Cloud Technical Essentials",
    description:
      "Amazon Web Services — Understood AWS database and storage, RDS, DynamoDB, S3, EC2, AWS Lambda, and Amazon ECS. • 2023",
    href: "https://github.com/ESaiThoran/My-certificate/blob/main/AWS_Academy_Graduate___AWS_Academy_Cloud_Developing_Badge20230505-28-1mbmn0k.pdf",
    cta: "View Certificate",
    background: <img className="absolute -right-20 -top-20 opacity-60" />,
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { BentoDemo };


