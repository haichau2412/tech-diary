"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "./transitionContext";

export const OverlayLoader = () => {
  const {
    show,
    location: { mouseX, mouseY },
    pageName,
  } = usePageTransition();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ clipPath: `circle(0% at ${mouseX}px ${mouseY}px)` }}
          animate={{ clipPath: `circle(150% at ${mouseX}px ${mouseY}px)` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          exit={{
            clipPath: `circle(0% at 50% 50%)`,
            transition: { duration: 1, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-50 flex grow items-center justify-center bg-neutral-950"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            exit={{
              scale: 8,
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
          >
            <p className="text-stone-100">{`Joining ${pageName}`}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayLoader;
