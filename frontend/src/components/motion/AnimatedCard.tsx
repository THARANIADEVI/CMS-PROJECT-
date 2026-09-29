"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function AnimatedCard({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
