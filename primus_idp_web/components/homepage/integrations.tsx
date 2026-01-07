"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface Integration {
	name: string;
	icon: string;
}

const INTEGRATIONS: Integration[] = [
	// Search
	{ name: "Tavily", icon: "https://www.tavily.com/images/logo.svg" },
	{
		name: "LinkUp",
		icon: "https://framerusercontent.com/images/7zeIm6t3f1HaSltkw8upEvsD80.png?scale-down-to=512",
	},
	{ name: "Elasticsearch", icon: "https://cdn.simpleicons.org/elastic/00A9E5" },

	// Communication
	{ name: "Slack", icon: "https://cdn.simpleicons.org/slack/4A154B" },
	{ name: "Discord", icon: "https://cdn.simpleicons.org/discord/5865F2" },
	{ name: "Gmail", icon: "https://cdn.simpleicons.org/gmail/EA4335" },

	// Project Management
	{ name: "Linear", icon: "https://cdn.simpleicons.org/linear/5E6AD2" },
	{ name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
	{ name: "ClickUp", icon: "https://cdn.simpleicons.org/clickup/7B68EE" },
	{ name: "Airtable", icon: "https://cdn.simpleicons.org/airtable/18BFFF" },

	// Documentation & Knowledge
	{ name: "Confluence", icon: "https://cdn.simpleicons.org/confluence/172B4D" },
	{ name: "Notion", icon: "https://cdn.simpleicons.org/notion/000000/ffffff" },

	// Cloud Storage
	{ name: "Google Drive", icon: "https://cdn.simpleicons.org/googledrive/4285F4" },
	{ name: "Dropbox", icon: "https://cdn.simpleicons.org/dropbox/0061FF" },
	{
		name: "Amazon S3",
		icon: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg",
	},

	// Development
	{ name: "GitHub", icon: "https://cdn.simpleicons.org/github/181717/ffffff" },

	// Productivity
	{ name: "Google Calendar", icon: "https://cdn.simpleicons.org/googlecalendar/4285F4" },
	{ name: "Luma", icon: "https://images.lumacdn.com/social-images/default-social-202407.png" },

	// Media
	{ name: "YouTube", icon: "https://cdn.simpleicons.org/youtube/FF0000" },
];

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize, startIndex }: any) {
	return (
		<>
			{/* Semi-circle glow background */}
			<div className="absolute inset-0 flex justify-center items-start overflow-visible">
				<div
					className="
            w-[800px] h-[800px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]
            blur-3xl 
            pointer-events-none
          "
					style={{
						zIndex: 0,
						transform: "translateY(-20%)",
					}}
				/>
			</div>

			{/* Orbit icons */}
			{Array.from({ length: count }).map((_, index) => {
				const actualIndex = startIndex + index;
				// Skip if we've run out of integrations
				if (actualIndex >= INTEGRATIONS.length) return null;

				const angle = (index / (count - 1)) * 180;
				const x = radius * Math.cos((angle * Math.PI) / 180);
				const y = radius * Math.sin((angle * Math.PI) / 180);
				const integration = INTEGRATIONS[actualIndex];

				// Tooltip positioning — above or below based on angle
				const tooltipAbove = angle > 90;

				return (
					<motion.div
						key={index}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ delay: index * 0.05 }}
						viewport={{ once: true }}
						className="absolute flex flex-col items-center group"
						style={{
							left: `${centerX + x - iconSize / 2}px`,
							top: `${centerY - y - iconSize / 2}px`,
							zIndex: 5,
						}}
					>
						<div className="p-2.5 rounded-xl bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 shadow-lg shadow-black/20 hover:shadow-violet-500/20 hover:border-violet-500/50 transition-all duration-300 cursor-pointer hover:scale-110 group-hover:bg-zinc-700/80">
							<img
								src={integration.icon}
								alt={integration.name}
								width={iconSize}
								height={iconSize}
								className="object-contain"
								style={{ minWidth: iconSize, minHeight: iconSize }}
							/>
						</div>

						{/* Premium Tooltip */}
						<div
							className={`absolute ${
								tooltipAbove ? "bottom-[calc(100%+12px)]" : "top-[calc(100%+12px)]"
							} hidden group-hover:block w-auto min-w-max rounded-lg bg-zinc-900/95 backdrop-blur-sm px-3 py-1.5 text-xs text-white shadow-xl shadow-black/30 text-center whitespace-nowrap border border-zinc-700/50`}
						>
							{integration.name}
							<div
								className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-zinc-900/95 border-zinc-700/50 ${
									tooltipAbove ? "top-full -mt-1.5 border-r border-b" : "bottom-full -mb-1.5 border-l border-t"
								}`}
							></div>
						</div>
					</motion.div>
				);
			})}
		</>
	);
}

export default function ExternalIntegrations() {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const baseWidth = Math.min(size.width * 0.8, 700);
	const centerX = baseWidth / 2;
	const centerY = baseWidth * 0.5;

	const iconSize =
		size.width < 480
			? Math.max(24, baseWidth * 0.05)
			: size.width < 768
				? Math.max(28, baseWidth * 0.06)
				: Math.max(32, baseWidth * 0.07);

	return (
		<section className="py-20 md:py-28 relative min-h-screen w-full overflow-visible bg-transparent">
			<div className="relative flex flex-col items-center text-center z-10 px-6">
				<motion.span 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-violet-500/10 text-violet-400 rounded-full border border-violet-500/20 backdrop-blur-sm"
				>
					<span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
					Connect Everything
				</motion.span>
				<motion.h2 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					viewport={{ once: true }}
					className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
				>
					<span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
						15+ Integrations
					</span>
				</motion.h2>
				<motion.p 
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					viewport={{ once: true }}
					className="mb-12 max-w-2xl text-zinc-400 text-lg"
				>
					Connect your knowledge sources - Slack, Notion, GitHub, Gmail, and more. All indexed and searchable in one place.
				</motion.p>

				<div
					className="relative overflow-visible"
					style={{ width: baseWidth, height: baseWidth * 0.7, paddingBottom: "100px" }}
				>
					<SemiCircleOrbit
						radius={baseWidth * 0.22}
						centerX={centerX}
						centerY={centerY}
						count={5}
						iconSize={iconSize}
						startIndex={0}
					/>
					<SemiCircleOrbit
						radius={baseWidth * 0.36}
						centerX={centerX}
						centerY={centerY}
						count={6}
						iconSize={iconSize}
						startIndex={5}
					/>
					<SemiCircleOrbit
						radius={baseWidth * 0.5}
						centerX={centerX}
						centerY={centerY}
						count={8}
						iconSize={iconSize}
						startIndex={11}
					/>
				</div>
			</div>
		</section>
	);
}


