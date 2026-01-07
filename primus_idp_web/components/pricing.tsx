"use client";

import NumberFlow from "@number-flow/react";
import confetti from "canvas-confetti";
import { Check, Star, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface PricingPlan {
	name: string;
	price: string;
	yearlyPrice: string;
	period: string;
	features: string[];
	description: string;
	buttonText: string;
	href: string;
	isPopular: boolean;
}

interface PricingProps {
	plans: PricingPlan[];
	title?: string;
	description?: string;
}

export function Pricing({
	plans,
	title = "Simple, Transparent Pricing",
	description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
	const [isMonthly, setIsMonthly] = useState(true);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const switchRef = useRef<HTMLButtonElement>(null);

	const handleToggle = (checked: boolean) => {
		setIsMonthly(!checked);
		if (checked && switchRef.current) {
			const rect = switchRef.current.getBoundingClientRect();
			const x = rect.left + rect.width / 2;
			const y = rect.top + rect.height / 2;

			confetti({
				particleCount: 50,
				spread: 60,
				origin: {
					x: x / window.innerWidth,
					y: y / window.innerHeight,
				},
				colors: [
					"#7C3AED",
					"#8B5CF6",
					"#06B6D4",
					"#22D3EE",
				],
				ticks: 200,
				gravity: 1.2,
				decay: 0.94,
				startVelocity: 30,
				shapes: ["circle"],
			});
		}
	};

	return (
		<div className="relative py-24 overflow-hidden">
			{/* Premium Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
			
			{/* Animated Mesh Grid */}
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0" style={{
					backgroundImage: `linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)`,
					backgroundSize: '50px 50px'
				}} />
			</div>
			
			<div className="container relative z-10">
				<div className="text-center space-y-6 mb-16">
					{/* Premium Badge */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm"
					>
						<Sparkles className="h-4 w-4 text-violet-400" />
						<span className="text-sm font-medium text-violet-300">Flexible Plans</span>
					</motion.div>
					
					<motion.h2 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent"
					>
						{title}
					</motion.h2>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="text-zinc-400 text-lg max-w-2xl mx-auto whitespace-pre-line"
					>
						{description}
					</motion.p>
				</div>

				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="flex justify-center mb-12"
				>
					<div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-sm">
						<label
							htmlFor="billing-toggle"
							className="relative inline-flex items-center cursor-pointer"
						>
							<Label>
								<Switch
									ref={switchRef as any}
									checked={!isMonthly}
									onCheckedChange={handleToggle}
									className="relative data-[state=checked]:bg-violet-600"
								/>
							</Label>
						</label>
						<span className="font-medium text-zinc-300">
							Annual billing <span className="text-violet-400 font-semibold">(Save 20%)</span>
						</span>
					</div>
				</motion.div>

				<div
					className={cn(
						"grid grid-cols-1 gap-6",
						plans.length === 2 ? "md:grid-cols-2 max-w-5xl mx-auto" : "md:grid-cols-3"
					)}
				>
				{plans.map((plan, index) => (
					<motion.div
						key={index}
						initial={{ y: 50, opacity: 0 }}
						whileInView={{
							y: isDesktop && plan.isPopular ? -16 : 0,
							opacity: 1,
							scale: isDesktop && plan.isPopular ? 1.02 : 1,
						}}
						viewport={{ once: true }}
						transition={{
							duration: 0.8,
							type: "spring",
							stiffness: 100,
							damping: 30,
							delay: 0.4 + index * 0.1,
						}}
						className={cn(
							`relative rounded-2xl p-8 text-center lg:flex lg:flex-col lg:justify-center overflow-hidden group`,
							plan.isPopular 
								? "bg-gradient-to-b from-violet-500/20 via-zinc-900/80 to-zinc-900/80 border-2 border-violet-500/50" 
								: "bg-zinc-900/60 border border-zinc-800/50",
							"backdrop-blur-xl",
							"flex flex-col",
							"transition-all duration-500",
							"hover:border-violet-500/30 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)]"
						)}
					>
						{/* Glow effect for popular */}
						{plan.isPopular && (
							<>
								<div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
							</>
						)}
						
						{plan.isPopular && (
							<div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-violet-500 py-1.5 px-4 rounded-bl-xl rounded-tr-xl flex items-center gap-1.5 shadow-lg">
								<Star className="text-white h-3.5 w-3.5 fill-current" />
								<span className="text-white text-sm font-semibold">
									Popular
								</span>
							</div>
						)}
						<div className="flex-1 flex flex-col relative z-10">
							<p className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">{plan.name}</p>
							<div className="mt-6 flex items-center justify-center gap-x-2">
								<span className="text-5xl font-bold tracking-tight text-white">
									{isNaN(Number(plan.price)) ? (
										<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{isMonthly ? plan.price : plan.yearlyPrice}</span>
									) : (
										<NumberFlow
											value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
											format={{
												style: "currency",
												currency: "USD",
												minimumFractionDigits: 0,
												maximumFractionDigits: 0,
											}}
											transformTiming={{
												duration: 500,
												easing: "ease-out",
											}}
											willChange
											className="font-variant-numeric: tabular-nums"
										/>
									)}
								</span>
								{plan.period && plan.period !== "Next 3 months" && (
									<span className="text-sm font-medium leading-6 tracking-wide text-zinc-500">
										/ {plan.period}
									</span>
								)}
							</div>

							<p className="text-xs leading-5 text-zinc-500 mt-1">
								{isNaN(Number(plan.price)) ? "" : isMonthly ? "billed monthly" : "billed annually"}
							</p>

							<ul className="mt-8 gap-3 flex flex-col">
								{plan.features.map((feature, idx) => (
									<li key={idx} className="flex items-start gap-3 text-left">
										<div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-violet-500/20 flex items-center justify-center">
											<Check className="h-3 w-3 text-violet-400" />
										</div>
										<span className="text-zinc-300 text-sm">{feature}</span>
									</li>
								))}
							</ul>

							<hr className="w-full my-6 border-zinc-800/50" />

							<Link
								href={plan.href}
								className={cn(
									"group/btn relative w-full py-3 px-6 rounded-xl text-base font-semibold tracking-tight",
									"transform-gpu transition-all duration-300 ease-out",
									plan.isPopular
										? "bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02]"
										: "bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-800 hover:border-violet-500/50 hover:text-white"
								)}
							>
								{plan.buttonText}
							</Link>
							<p className="mt-6 text-xs leading-5 text-zinc-500">{plan.description}</p>
						</div>
					</motion.div>
				))}
				</div>
			</div>
		</div>
	);
}


