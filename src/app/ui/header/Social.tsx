import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SocialLink = () => {
  return (
    <div className="flex shrink space-x-4">
      <a
        href="https://github.com/haichau2412"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Github"
        className="text-2xl text-gray-700 hover:text-gray-900"
      >
        <FaGithub />
      </a>
      <a
        href="https://www.linkedin.com/in/chau-luu-0a3378179/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Linkedin"
        className="text-2xl text-gray-700 hover:text-gray-900"
      >
        <FaLinkedin />
      </a>
    </div>
  );
};

export default SocialLink;
