"use client";
import { IconArrowRight, IconBrandGithub, IconCheck, IconSparkles } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";

export function CTAHomepage() {
	const benefits = [
		"100% Open Source (MIT License)",
		"Self-hosted & Privacy-first",
		"Active community on Discord",
	];

	return (
		<section className="w-full my-20 md:my-28 relative z-20 max-w-6xl mx-auto px-6">
			<motion.div 
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				viewport={{ once: true }}
				className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800/50"
			>
				{/* Background decorative elements */}
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[100px]" />
				<div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px]" />
				
				{/* Grid pattern overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

				{/* Animated border glow */}
				<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500/20 via-transparent to-cyan-500/20 opacity-50" />

				<div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
					{/* Left content */}
					<div className="flex flex-col justify-center">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							viewport={{ once: true }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-6 w-fit"
						>
							<IconSparkles className="h-4 w-4" />
							<span>Open Source & Free</span>
						</motion.div>
						
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
							Ready to build your own{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
								AI-powered knowledge base?
							</span>
						</h2>
						<p className="text-zinc-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
							Primus IDP is open source and free to self-host. Get started in minutes with Docker 
							or deploy to your preferred cloud provider.
						</p>

						<div className="flex flex-col sm:flex-row gap-4">
							<Link href="/register">
								<motion.button
									type="button"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="group flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold shadow-lg shadow-violet-500/30 transition-all duration-300"
								>
									<span>Get Started Free</span>
									<IconArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</motion.button>
							</Link>
							<Link href="https://github.com/khanakkijpr-dot/Primus-IDP" target="_blank">
								<motion.button
									type="button"
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-zinc-700 hover:border-zinc-600 backdrop-blur-sm transition-all duration-300"
								>
									<IconBrandGithub className="h-5 w-5" />
									<span>Star on GitHub</span>
								</motion.button>
							</Link>
						</div>
					</div>

					{/* Right content - Benefits */}
					<div className="flex flex-col justify-center md:border-l border-zinc-800/50 md:pl-12">
						<div className="space-y-6">
							{benefits.map((benefit, index) => (
								<motion.div
									key={benefit}
									initial={{ opacity: 0, x: 20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.2 + index * 0.1 }}
									viewport={{ once: true }}
									className="flex items-center gap-4 group"
								>
									<div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:border-emerald-400/50 transition-colors">
										<IconCheck className="h-5 w-5 text-emerald-400" />
									</div>
									<span className="text-zinc-200 font-medium text-lg">{benefit}</span>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}


