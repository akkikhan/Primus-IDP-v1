"use client";
import { IconBrandDiscord, IconBrandGithub, IconMenu2, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeTogglerComponent } from "@/components/theme/theme-toggle";
import { useGithubStars } from "@/hooks/use-github-stars";
import { cn } from "@/lib/utils";

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	const navItems = [
		{ name: "Home", link: "/" },
		{ name: "Pricing", link: "/pricing" },
		{ name: "Sign In", link: "/login" },
		{ name: "Docs", link: "/docs" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed top-4 left-0 right-0 z-[60] w-full px-4">
			<DesktopNav navItems={navItems} isScrolled={isScrolled} />
			<MobileNav navItems={navItems} isScrolled={isScrolled} />
		</div>
	);
};

const DesktopNav = ({ navItems, isScrolled }: any) => {
	const [hovered, setHovered] = useState<number | null>(null);
	const { compactFormat: githubStars, loading: loadingGithubStars } = useGithubStars();
	return (
		<motion.div
			onMouseLeave={() => {
				setHovered(null);
			}}
			className={cn(
				"mx-auto hidden w-full max-w-5xl flex-row items-center justify-between self-start rounded-2xl px-6 py-3 lg:flex transition-all duration-300",
				isScrolled
					? "glass shadow-xl shadow-violet-500/5 dark:shadow-violet-900/10"
					: "bg-transparent border border-transparent"
			)}
		>
			<Link href="/" className="flex flex-row items-center gap-2.5">
				<Logo className="h-8 w-8 rounded-lg" />
				<span className="text-zinc-900 dark:text-white text-lg font-bold">Primus IDP</span>
			</Link>
			<div className="hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex">
				{navItems.map((navItem: any, idx: number) => (
					<Link
						onMouseEnter={() => setHovered(idx)}
						onMouseLeave={() => setHovered(null)}
						className="relative px-4 py-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
						key={`link=${idx}`}
						href={navItem.link}
					>
						{hovered === idx && (
							<motion.div
								layoutId="hovered"
								className="absolute inset-0 h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-800"
							/>
						)}
						<span className="relative z-20">{navItem.name}</span>
					</Link>
				))}
			</div>
			<div className="flex items-center gap-2">
				<Link
					href="https://discord.gg/ejRNvftDp9"
					target="_blank"
					rel="noopener noreferrer"
					className="hidden rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors md:flex items-center justify-center"
				>
					<IconBrandDiscord className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
				</Link>
				<Link
					href="https://github.com/khanakkijpr-dot/Primus-IDP"
					target="_blank"
					rel="noopener noreferrer"
					className="hidden rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors md:flex items-center gap-1.5"
				>
					<IconBrandGithub className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
					{loadingGithubStars ? (
						<div className="w-6 h-5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
					) : (
						<span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
							{githubStars}
						</span>
					)}
				</Link>
				<ThemeTogglerComponent />
				<Link
					href="/register"
					className="hidden rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300 md:block"
				>
					Get Started
				</Link>
			</div>
		</motion.div>
	);
};

const MobileNav = ({ navItems, isScrolled }: any) => {
	const [open, setOpen] = useState(false);
	const { compactFormat: githubStars, loading: loadingGithubStars } = useGithubStars();

	return (
		<>
			<motion.div
				animate={{ borderRadius: open ? "16px" : "16px" }}
				key={String(open)}
				className={cn(
					"mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-3 lg:hidden transition-all duration-300 rounded-2xl",
					isScrolled
						? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg"
						: "bg-transparent border border-transparent"
				)}
			>
				<div className="flex w-full flex-row items-center justify-between">
					<Link href="/" className="flex flex-row items-center gap-2">
						<Logo className="h-8 w-8 rounded-lg" />
						<span className="text-zinc-900 dark:text-white text-lg font-bold">Primus IDP</span>
					</Link>
					<button
						type="button"
						onClick={() => setOpen(!open)}
						className="relative z-50 flex items-center justify-center p-2 -mr-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors touch-manipulation"
						aria-label={open ? "Close menu" : "Open menu"}
					>
						{open ? (
							<IconX className="h-6 w-6 text-zinc-700 dark:text-white" />
						) : (
							<IconMenu2 className="h-6 w-6 text-zinc-700 dark:text-white" />
						)}
					</button>
				</div>

				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className="absolute inset-x-4 top-20 z-20 flex w-auto flex-col items-start justify-start gap-3 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl px-4 py-6"
						>
							{navItems.map((navItem: any, idx: number) => (
								<Link
									key={`link=${idx}`}
									href={navItem.link}
									onClick={() => setOpen(false)}
									className="w-full py-2 px-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium"
								>
									{navItem.name}
								</Link>
							))}
							<div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
							<div className="flex w-full items-center gap-2">
								<Link
									href="https://discord.gg/ejRNvftDp9"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors touch-manipulation"
								>
									<IconBrandDiscord className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
								</Link>
								<Link
									href="https://github.com/khanakkijpr-dot/Primus-IDP"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-1.5 rounded-lg px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors touch-manipulation"
								>
									<IconBrandGithub className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
									{loadingGithubStars ? (
										<div className="w-6 h-5 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
									) : (
										<span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
											{githubStars}
										</span>
									)}
								</Link>
								<ThemeTogglerComponent />
							</div>
							<Link
								href="/register"
								onClick={() => setOpen(false)}
								className="w-full mt-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-500/25 text-center touch-manipulation transition-all duration-300"
							>
								Get Started
							</Link>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</>
	);
};
