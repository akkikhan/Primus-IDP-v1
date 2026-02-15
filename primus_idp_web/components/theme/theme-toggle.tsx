"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeTogglerComponent() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		mounted && (
			<Button
				variant="ghost"
				onClick={() => {
					const isDark = resolvedTheme === "dark";
					setTheme(isDark ? "light" : "dark");
				}}
				className="w-8 h-8 flex hover:bg-gray-50 dark:hover:bg-white/[0.1] rounded-lg items-center cursor-pointer justify-center outline-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none overflow-hidden"
			>
				{resolvedTheme === "dark" && (
					<motion.div
						key="dark"
						initial={{
							x: 12,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						transition={{
							duration: 0.3,
							ease: "easeOut",
						}}
					>
						<SunIcon className="h-4 w-4 flex-shrink-0 text-zinc-300" />
					</motion.div>
				)}

				{resolvedTheme !== "dark" && (
					<motion.div
						key="light"
						initial={{
							x: 12,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
						}}
						transition={{
							ease: "easeOut",
							duration: 0.3,
						}}
					>
						<MoonIcon className="h-4 w-4 flex-shrink-0 text-zinc-700 dark:text-zinc-300" />
					</motion.div>
				)}

				<span className="sr-only">Toggle theme</span>
			</Button>
		)
	);
}


