"use client";
import { 
	IconBrandDiscord, 
	IconBrandGithub, 
	IconMenu2, 
	IconX,
	IconHome,
	IconCurrencyDollar,
	IconLogin,
	IconBook,
	IconArrowRight
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { ThemeTogglerComponent } from "@/components/theme/theme-toggle";
import { useGithubStars } from "@/hooks/use-github-stars";
import { cn } from "@/lib/utils";

export const SideNavigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const navItems = [
		{ name: "Home", link: "/", icon: IconHome },
		{ name: "Pricing", link: "/pricing", icon: IconCurrencyDollar },
		{ name: "Sign In", link: "/login", icon: IconLogin },
		{ name: "Docs", link: "/docs", icon: IconBook },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, []);

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<>
			{/* ═══════════════════════════════════════════════════════════════
			    FIXED HAMBURGER MENU BUTTON
			    ═══════════════════════════════════════════════════════════════ */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}
				onClick={() => setIsOpen(true)}
				className={cn(
					"fixed top-6 left-6 z-[100] flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300",
					"bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50",
					"shadow-[0_0_40px_rgba(124,58,237,0.15)] hover:shadow-[0_0_60px_rgba(124,58,237,0.25)]",
					"hover:border-violet-500/30 group",
					isOpen && "pointer-events-none opacity-0"
				)}
				aria-label="Open navigation menu"
			>
				<div className="relative">
					<IconMenu2 className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
					{/* Glow effect */}
					<div className="absolute inset-0 w-6 h-6 bg-violet-500/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>
			</motion.button>

			{/* ═══════════════════════════════════════════════════════════════
			    BACKDROP OVERLAY
			    ═══════════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setIsOpen(false)}
						className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
					/>
				)}
			</AnimatePresence>

			{/* ═══════════════════════════════════════════════════════════════
			    SIDE NAVIGATION PANEL
			    ═══════════════════════════════════════════════════════════════ */}
			<AnimatePresence>
				{isOpen && (
					<motion.nav
						initial={{ x: "-100%", opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: "-100%", opacity: 0 }}
						transition={{ 
							type: "spring", 
							damping: 30, 
							stiffness: 300,
							mass: 0.8
						}}
						className="fixed top-0 left-0 z-[120] h-full w-[320px] max-w-[85vw] flex flex-col"
					>
						{/* Premium Glass Panel */}
						<div className="relative h-full bg-zinc-950/95 backdrop-blur-2xl border-r border-zinc-800/50">
							{/* Gradient glow on left edge */}
							<div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500 opacity-60" />
							
							{/* Internal glow */}
							<div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />
							<div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

							{/* ═══════════════════════════════════════════════════════════════
							    HEADER
							    ═══════════════════════════════════════════════════════════════ */}
							<div className="relative flex items-center justify-between p-6 border-b border-zinc-800/50">
								<Link 
									href="/" 
									onClick={() => setIsOpen(false)}
									className="flex items-center gap-3 group"
								>
									<div className="relative">
										<Logo className="h-10 w-10 rounded-xl" />
										<div className="absolute inset-0 bg-violet-500/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
									</div>
									<div className="flex flex-col">
										<span className="text-lg font-bold text-white">Primus IDP</span>
										<span className="text-xs text-zinc-500">AI Research Agent</span>
									</div>
								</Link>
								<button
									onClick={() => setIsOpen(false)}
									className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 transition-all group"
									aria-label="Close navigation menu"
								>
									<IconX className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
								</button>
							</div>

							{/* ═══════════════════════════════════════════════════════════════
							    NAVIGATION LINKS
							    ═══════════════════════════════════════════════════════════════ */}
							<div className="relative flex-1 overflow-y-auto py-6 px-4">
								<div className="space-y-2">
									{navItems.map((item, idx) => (
										<NavItem 
											key={idx} 
											item={item} 
											index={idx} 
											onClose={() => setIsOpen(false)} 
										/>
									))}
								</div>

								{/* Decorative separator */}
								<div className="my-8 flex items-center gap-4">
									<div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
									<div className="w-2 h-2 rounded-full bg-violet-500/50" />
									<div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
								</div>

								{/* Quick Actions */}
								<div className="space-y-3">
									<p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-3">
										Quick Actions
									</p>
									<SocialLinks />
								</div>
							</div>

							{/* ═══════════════════════════════════════════════════════════════
							    FOOTER
							    ═══════════════════════════════════════════════════════════════ */}
							<div className="relative p-4 border-t border-zinc-800/50">
								<div className="flex items-center justify-between mb-4">
									<span className="text-sm text-zinc-500">Theme</span>
									<ThemeTogglerComponent />
								</div>
								<Link
									href="/register"
									onClick={() => setIsOpen(false)}
									className="group relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white overflow-hidden transition-all"
								>
									{/* Button gradient background */}
									<div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 bg-[length:200%_100%] animate-gradient" />
									<div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
									
									{/* Glow effect */}
									<div className="absolute inset-0 shadow-[0_0_40px_rgba(139,92,246,0.4)] opacity-0 group-hover:opacity-100 transition-opacity" />
									
									<span className="relative z-10">Get Started</span>
									<IconArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>
					</motion.nav>
				)}
			</AnimatePresence>
		</>
	);
};

/* ═══════════════════════════════════════════════════════════════
   NAV ITEM COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const NavItem = ({ 
	item, 
	index, 
	onClose 
}: { 
	item: { name: string; link: string; icon: any }; 
	index: number;
	onClose: () => void;
}) => {
	const Icon = item.icon;
	
	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
		>
			<Link
				href={item.link}
				onClick={onClose}
				className="group relative flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-zinc-800/50 transition-all"
			>
				{/* Icon container with glow */}
				<div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 group-hover:border-violet-500/30 group-hover:bg-violet-500/10 transition-all">
					<Icon className="w-5 h-5 text-zinc-400 group-hover:text-violet-400 transition-colors" />
					<div className="absolute inset-0 bg-violet-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
				</div>
				
				{/* Label */}
				<span className="text-zinc-300 group-hover:text-white font-medium transition-colors">
					{item.name}
				</span>
				
				{/* Arrow indicator */}
				<div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
					<IconArrowRight className="w-4 h-4 text-violet-400" />
				</div>
				
				{/* Hover highlight bar */}
				<div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-8 rounded-r-full bg-gradient-to-b from-violet-500 to-purple-500 transition-all duration-200" />
			</Link>
		</motion.div>
	);
};

/* ═══════════════════════════════════════════════════════════════
   SOCIAL LINKS COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const SocialLinks = () => {
	const { compactFormat: githubStars, loading: loadingGithubStars } = useGithubStars();

	return (
		<div className="flex gap-2">
			<Link
				href="https://discord.gg/ejRNvftDp9"
				target="_blank"
				rel="noopener noreferrer"
				className="flex-1 group relative flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-indigo-500/30 hover:bg-indigo-500/10 transition-all"
			>
				<IconBrandDiscord className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
				<span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Discord</span>
			</Link>
			<Link
				href="https://github.com/khanakkijpr-dot/Primus-IDP"
				target="_blank"
				rel="noopener noreferrer"
				className="flex-1 group relative flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-500/30 hover:bg-zinc-700/50 transition-all"
			>
				<IconBrandGithub className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
				{loadingGithubStars ? (
					<div className="w-8 h-4 bg-zinc-700 rounded animate-pulse" />
				) : (
					<span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
						{githubStars}
					</span>
				)}
			</Link>
		</div>
	);
};
