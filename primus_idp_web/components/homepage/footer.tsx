"use client";
import {
	IconBrandDiscord,
	IconBrandGithub,
	IconBrandX,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";

export function Footer() {
	const pages = [
		{
			title: "Documentation",
			href: "/docs",
		},
		{
			title: "Pricing",
			href: "/pricing",
		},
		{
			title: "Privacy",
			href: "/privacy",
		},
		{
			title: "Terms",
			href: "/terms",
		},
	];

	return (
		<footer className="relative border-t border-zinc-200/50 dark:border-zinc-800/50 px-6 py-20 w-full bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -top-40 left-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
				<div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
			</div>

			<div className="max-w-5xl mx-auto relative z-10">
				<div className="flex flex-col items-center justify-center w-full">
					{/* Logo & Description */}
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						viewport={{ once: true }}
						className="flex items-center gap-3 mb-4"
					>
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl blur-sm opacity-50" />
							<Image src="/logo.svg" alt="Primus IDP" width={40} height={40} className="rounded-xl relative" />
						</div>
						<span className="font-bold text-2xl bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">Primus IDP</span>
					</motion.div>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="text-center text-zinc-600 dark:text-zinc-400 max-w-md mb-10 leading-relaxed"
					>
						Your personal AI research assistant with RAG capabilities. Self-hosted, privacy-first, and fully customizable.
					</motion.p>

					{/* Navigation Links */}
					<motion.ul 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex flex-wrap justify-center gap-8 mb-10"
					>
						{pages.map((page) => (
							<li key={`pages-${page.title}`}>
								<Link 
									className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium relative group" 
									href={page.href}
								>
									{page.title}
									<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300" />
								</Link>
							</li>
						))}
					</motion.ul>

					{/* Divider */}
					<div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent mb-10" />
				</div>

				{/* Bottom Section */}
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					viewport={{ once: true }}
					className="flex sm:flex-row flex-col justify-between items-center w-full gap-6"
				>
					<p className="text-sm text-zinc-500 dark:text-zinc-500">
						&copy; {new Date().getFullYear()} Primus Knowledge Hub. Open Source under MIT License.
					</p>
					<div className="flex gap-3">
						<Link 
							href="https://github.com/khanakkijpr-dot/Primus-IDP" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="group w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:border-transparent hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
						>
							<IconBrandGithub className="h-5 w-5" />
						</Link>
						<Link 
							href="https://discord.gg/ejRNvftDp9" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="group w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:border-transparent hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
						>
							<IconBrandDiscord className="h-5 w-5" />
						</Link>
						<Link 
							href="https://twitter.com/primusidp" 
							target="_blank" 
							rel="noopener noreferrer" 
							className="group w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:border-transparent hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
						>
							<IconBrandX className="h-5 w-5" />
						</Link>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}


