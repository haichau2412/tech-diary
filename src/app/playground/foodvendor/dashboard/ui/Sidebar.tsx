"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      animate={{ width: isOpen ? 100 : 50 }}
      className="flex h-screen flex-col bg-gray-800 text-white"
    >
      <button
        className="mb-4 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<<" : ">>"}
      </button>
      <nav className="basis-16 bg-gray-800 py-4 text-white">
        <ul className="flex flex-col justify-around">
          <li>
            <Link
              href="/playground/foodvendor/dashboard/menu"
              className="rounded px-4 py-2 hover:bg-gray-700"
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/playground/foodvendor/dashboard/menulayout"
              className="rounded px-4 py-2 hover:bg-gray-700"
            >
              Web layout
            </Link>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
}
