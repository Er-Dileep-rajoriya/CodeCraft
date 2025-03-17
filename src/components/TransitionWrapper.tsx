"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: -100 }} // Initial state: Slide in from the left
        animate={{ opacity: 1, x: 0 }} // Animate to: Slide to the center
        exit={{ opacity: 0, x: 100 }} // Exit state: Slide out to the right
        transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth transition
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
