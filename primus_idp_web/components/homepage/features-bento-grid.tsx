import { IconMessage, IconMicrophone, IconSearch, IconUsers } from "@tabler/icons-react";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeaturesBentoGrid() {
	return (
		<section className="py-20 md:py-28 bg-white dark:bg-black relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
			</div>

			<div className="max-w-6xl mx-auto px-6 relative z-10">
				<div className="text-center mb-16">
					<span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full border border-violet-200 dark:border-violet-500/20">
						<span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 animate-pulse" />
						Powerful Features
					</span>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="text-zinc-900 dark:text-white">Built for </span>
						<span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Research Excellence</span>
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
						Advanced AI-powered features designed to enhance your research workflow and knowledge management.
					</p>
				</div>
				<BentoGrid className="max-w-6xl mx-auto md:auto-rows-[20rem]">
					{items.map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							className={item.className}
							icon={item.icon}
						/>
					))}
				</BentoGrid>
			</div>
		</section>
	);
}

const CitationIllustration = () => (
	<div className="relative flex w-full h-full min-h-[6rem] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-violet-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-violet-950/30 p-4">
		<svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<title>Citation feature illustration showing clickable source reference</title>
			{/* Background chat message */}
			<g>
				{/* Chat bubble */}
				<rect
					x="20"
					y="30"
					width="200"
					height="60"
					rx="12"
					className="fill-white dark:fill-zinc-800"
					opacity="0.95"
				/>
				{/* Text lines */}
				<line
					x1="35"
					y1="50"
					x2="150"
					y2="50"
					className="stroke-zinc-300 dark:stroke-zinc-600"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<line
					x1="35"
					y1="65"
					x2="180"
					y2="65"
					className="stroke-zinc-300 dark:stroke-zinc-600"
					strokeWidth="3"
					strokeLinecap="round"
				/>

				{/* Citation badge with glow */}
				<defs>
					<filter id="glow">
						<feGaussianBlur stdDeviation="2" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				{/* Clickable citation */}
				<g className="cursor-pointer" filter="url(#glow)">
					<rect
						x="185"
						y="57"
						width="28"
						height="20"
						rx="6"
						className="fill-violet-500 dark:fill-violet-400"
					/>
					<text
						x="199"
						y="70"
						fontSize="12"
						fontWeight="bold"
						className="fill-white"
						textAnchor="middle"
					>
						[1]
					</text>
				</g>
			</g>

			{/* Connecting line with animation effect */}
			<g>
				<path
					d="M 199 77 Q 240 90, 260 110"
					className="stroke-violet-500 dark:stroke-violet-400"
					strokeWidth="2"
					strokeDasharray="4,4"
					fill="none"
					opacity="0.6"
				>
					<animate
						attributeName="stroke-dashoffset"
						from="8"
						to="0"
						dur="1s"
						repeatCount="indefinite"
					/>
				</path>

				{/* Arrow head */}
				<polygon
					points="258,113 262,110 260,106"
					className="fill-violet-500 dark:fill-violet-400"
					opacity="0.6"
				/>
			</g>

			{/* Citation popup card */}
			<g>
				{/* Card shadow */}
				<rect
					x="245"
					y="113"
					width="145"
					height="75"
					rx="10"
					className="fill-zinc-900"
					opacity="0.1"
					transform="translate(2, 2)"
				/>

				{/* Main card */}
				<rect
					x="245"
					y="113"
					width="145"
					height="75"
					rx="10"
					className="fill-white dark:fill-zinc-800 stroke-violet-500 dark:stroke-violet-400"
					strokeWidth="2"
				/>

				{/* Card header */}
				<rect
					x="245"
					y="113"
					width="145"
					height="25"
					rx="10"
					className="fill-violet-50 dark:fill-violet-950/50"
				/>
				<line
					x1="245"
					y1="138"
					x2="390"
					y2="138"
					className="stroke-violet-200 dark:stroke-violet-800"
					strokeWidth="1"
				/>

				{/* Header text */}
				<text
					x="317.5"
					y="128"
					fontSize="9"
					fontWeight="600"
					className="fill-violet-600 dark:fill-violet-400"
					textAnchor="middle"
				>
					Referenced Chunk
				</text>

				{/* Content lines */}
				<line
					x1="255"
					y1="150"
					x2="365"
					y2="150"
					className="stroke-zinc-400 dark:stroke-zinc-500"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<line
					x1="255"
					y1="162"
					x2="340"
					y2="162"
					className="stroke-zinc-300 dark:stroke-zinc-600"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
				<line
					x1="255"
					y1="174"
					x2="380"
					y2="174"
					className="stroke-zinc-200 dark:stroke-zinc-700"
					strokeWidth="2.5"
					strokeLinecap="round"
				/>
			</g>

			{/* Sparkle effects */}
			<g className="opacity-60">
				{/* Sparkle 1 */}
				<circle cx="195" cy="45" r="2" className="fill-violet-400">
					<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
				</circle>
				<circle cx="195" cy="45" r="1" className="fill-white">
					<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
				</circle>

				{/* Sparkle 2 */}
				<circle cx="370" cy="125" r="2" className="fill-purple-400">
					<animate
						attributeName="opacity"
						values="0;1;0"
						dur="2.5s"
						begin="0.5s"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="370" cy="125" r="1" className="fill-white">
					<animate
						attributeName="opacity"
						values="0;1;0"
						dur="2.5s"
						begin="0.5s"
						repeatCount="indefinite"
					/>
				</circle>

				{/* Sparkle 3 */}
				<circle cx="250" cy="95" r="1.5" className="fill-cyan-400">
					<animate
						attributeName="opacity"
						values="0;1;0"
						dur="3s"
						begin="1s"
						repeatCount="indefinite"
					/>
				</circle>
			</g>

			{/* AI Sparkle icon in corner */}
			<g transform="translate(25, 100)">
				<path
					d="M 0,0 L 3,-8 L 6,0 L 14,3 L 6,6 L 3,14 L 0,6 L -8,3 Z"
					className="fill-violet-500 dark:fill-violet-400"
					opacity="0.7"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 3 3"
						to="360 3 3"
						dur="8s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		</svg>
	</div>
);

const CollaborationIllustration = () => (
	<div className="relative flex w-full h-full min-h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-violet-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-violet-950/30 p-4">
		<svg viewBox="0 0 280 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<title>Research and Report Generation illustration</title>

			{/* Document stack - background */}
			<rect x="165" y="30" width="100" height="130" rx="8" className="fill-violet-200/50 dark:fill-violet-950/30" transform="rotate(6 215 95)" />
			<rect x="165" y="30" width="100" height="130" rx="8" className="fill-violet-100 dark:fill-zinc-700" transform="rotate(3 215 95)" />
			<rect x="165" y="30" width="100" height="130" rx="8" className="fill-white dark:fill-zinc-800 stroke-violet-300 dark:stroke-zinc-600" strokeWidth="1" />

			{/* Document content lines */}
			<line x1="175" y1="50" x2="245" y2="50" className="stroke-violet-400 dark:stroke-violet-400" strokeWidth="2" strokeLinecap="round" />
			<line x1="175" y1="62" x2="255" y2="62" className="stroke-violet-300 dark:stroke-violet-500/60" strokeWidth="2" strokeLinecap="round" />
			<line x1="175" y1="74" x2="235" y2="74" className="stroke-violet-200 dark:stroke-violet-600/40" strokeWidth="2" strokeLinecap="round" />

			{/* Mini chart in document */}
			<rect x="175" y="85" width="80" height="45" rx="4" className="fill-violet-50 dark:fill-zinc-700/50" />
			<polyline points="180,120 195,105 210,115 225,95 240,100 250,90" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

			{/* AI brain/processing icon */}
			<g transform="translate(20, 40)">
				<circle cx="50" cy="50" r="45" className="fill-violet-100 dark:fill-violet-950/30" />
				<circle cx="50" cy="50" r="35" className="fill-violet-200/50 dark:fill-violet-900/30" />

				{/* Brain network nodes */}
				<circle cx="50" cy="35" r="6" className="fill-violet-500 dark:fill-violet-400">
					<animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
				</circle>
				<circle cx="35" cy="55" r="5" className="fill-purple-500 dark:fill-purple-400">
					<animate attributeName="r" values="5;7;5" dur="2.3s" repeatCount="indefinite" />
				</circle>
				<circle cx="65" cy="55" r="5" className="fill-purple-500 dark:fill-purple-400">
					<animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
				</circle>
				<circle cx="50" cy="70" r="4" className="fill-cyan-500 dark:fill-cyan-400">
					<animate attributeName="r" values="4;6;4" dur="1.8s" repeatCount="indefinite" />
				</circle>

				{/* Connecting lines */}
				<line x1="50" y1="41" x2="38" y2="52" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="1.5" opacity="0.6" />
				<line x1="50" y1="41" x2="62" y2="52" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="1.5" opacity="0.6" />
				<line x1="38" y1="58" x2="50" y2="66" className="stroke-purple-500 dark:stroke-purple-400" strokeWidth="1.5" opacity="0.6" />
				<line x1="62" y1="58" x2="50" y2="66" className="stroke-purple-500 dark:stroke-purple-400" strokeWidth="1.5" opacity="0.6" />
			</g>

			{/* Connecting arrow from AI to document */}
			<path d="M 105 70 Q 130 60, 160 55" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="2" strokeDasharray="4,3" fill="none">
				<animate attributeName="stroke-dashoffset" from="7" to="0" dur="1s" repeatCount="indefinite" />
			</path>
			<polygon points="158,52 165,55 158,58" className="fill-violet-500 dark:fill-violet-400" />

			{/* Floating data points */}
			<circle cx="130" cy="130" r="3" className="fill-cyan-400">
				<animate attributeName="cy" values="130;125;130" dur="3s" repeatCount="indefinite" />
			</circle>
			<circle cx="145" cy="140" r="2" className="fill-purple-400">
				<animate attributeName="cy" values="140;135;140" dur="2.5s" repeatCount="indefinite" />
			</circle>
		</svg>
	</div>
);

const AnnotationIllustration = () => (
	<div className="relative flex w-full h-full min-h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-cyan-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-cyan-950/30 p-4">
		<svg viewBox="0 0 500 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<title>Context-Aware Conversations illustration</title>

			{/* Document chunks on the left */}
			<g transform="translate(20, 20)">
				{/* Document 1 */}
				<rect x="0" y="0" width="80" height="55" rx="6" className="fill-white dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-600" strokeWidth="1" />
				<line x1="10" y1="15" x2="60" y2="15" className="stroke-zinc-400" strokeWidth="2" strokeLinecap="round" />
				<line x1="10" y1="25" x2="70" y2="25" className="stroke-zinc-300" strokeWidth="2" strokeLinecap="round" />
				<line x1="10" y1="35" x2="50" y2="35" className="stroke-zinc-200" strokeWidth="2" strokeLinecap="round" />
				<circle cx="65" cy="42" r="8" className="fill-violet-500 dark:fill-violet-400" opacity="0.8">
					<animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
				</circle>

				{/* Document 2 */}
				<rect x="0" y="65" width="80" height="55" rx="6" className="fill-white dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-600" strokeWidth="1" />
				<line x1="10" y1="80" x2="55" y2="80" className="stroke-zinc-400" strokeWidth="2" strokeLinecap="round" />
				<line x1="10" y1="90" x2="70" y2="90" className="stroke-zinc-300" strokeWidth="2" strokeLinecap="round" />
				<line x1="10" y1="100" x2="45" y2="100" className="stroke-zinc-200" strokeWidth="2" strokeLinecap="round" />
				<circle cx="65" cy="107" r="8" className="fill-purple-500 dark:fill-purple-400" opacity="0.8">
					<animate attributeName="opacity" values="0.8;1;0.8" dur="2.3s" repeatCount="indefinite" />
				</circle>
			</g>

			{/* Connecting lines to AI */}
			<g>
				<path d="M 105 47 Q 140 50, 170 70" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.6">
					<animate attributeName="stroke-dashoffset" from="6" to="0" dur="1.2s" repeatCount="indefinite" />
				</path>
				<path d="M 105 112 Q 140 105, 170 85" className="stroke-purple-500 dark:stroke-purple-400" strokeWidth="1.5" strokeDasharray="3,3" fill="none" opacity="0.6">
					<animate attributeName="stroke-dashoffset" from="6" to="0" dur="1.5s" repeatCount="indefinite" />
				</path>
			</g>

			{/* Central AI processing hub */}
			<g transform="translate(170, 50)">
				<circle cx="30" cy="30" r="28" className="fill-violet-100 dark:fill-violet-950/30" />
				<circle cx="30" cy="30" r="20" className="fill-violet-500 dark:fill-zinc-700" />
				{/* AI sparkle icon */}
				<path d="M 30,18 L 32,26 L 40,28 L 32,30 L 30,38 L 28,30 L 20,28 L 28,26 Z" className="fill-white dark:fill-violet-400">
					<animateTransform attributeName="transform" type="rotate" from="0 30 28" to="360 30 28" dur="6s" repeatCount="indefinite" />
				</path>
			</g>

			{/* Output arrow */}
			<path d="M 230 80 L 270 80" className="stroke-violet-500 dark:stroke-violet-400" strokeWidth="2" fill="none" />
			<polygon points="268,75 278,80 268,85" className="fill-violet-500 dark:fill-violet-400" />

			{/* Chat interface */}
			<g transform="translate(285, 15)">
				<rect x="0" y="0" width="190" height="140" rx="10" className="fill-white dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-600" strokeWidth="1" />

				{/* Chat header */}
				<rect x="0" y="0" width="190" height="30" rx="10" className="fill-zinc-100 dark:fill-zinc-700" />
				<rect x="0" y="20" width="190" height="10" className="fill-zinc-100 dark:fill-zinc-700" />
				<circle cx="20" cy="15" r="5" className="fill-violet-500 dark:fill-violet-400" />
				<text x="35" y="19" fontSize="10" className="fill-zinc-700 dark:fill-zinc-200" fontWeight="500">Primus IDP</text>

				{/* User message */}
				<rect x="60" y="40" width="120" height="25" rx="12" className="fill-violet-500 dark:fill-violet-600" />
				<line x1="70" y1="50" x2="130" y2="50" className="stroke-white/80" strokeWidth="2" strokeLinecap="round" />
				<line x1="70" y1="58" x2="100" y2="58" className="stroke-white/60" strokeWidth="2" strokeLinecap="round" />

				{/* AI response */}
				<rect x="10" y="75" width="140" height="50" rx="12" className="fill-zinc-100 dark:fill-zinc-700/50" />
				<line x1="20" y1="88" x2="120" y2="88" className="stroke-zinc-500 dark:stroke-zinc-400" strokeWidth="2" strokeLinecap="round" />
				<line x1="20" y1="98" x2="140" y2="98" className="stroke-zinc-400 dark:stroke-zinc-500" strokeWidth="2" strokeLinecap="round" />
				<line x1="20" y1="108" x2="90" y2="108" className="stroke-zinc-300 dark:stroke-zinc-600" strokeWidth="2" strokeLinecap="round" />

				{/* Citation badge in response */}
				<rect x="100" y="103" width="22" height="14" rx="4" className="fill-violet-500 dark:fill-violet-400" />
				<text x="111" y="113" fontSize="8" className="fill-white" textAnchor="middle" fontWeight="bold">[1]</text>
			</g>
		</svg>
	</div>
);

const AudioCommentIllustration = () => (
	<div className="relative flex w-full h-full min-h-[6rem] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-cyan-50 dark:from-zinc-800 dark:via-zinc-900 dark:to-cyan-950/30 p-4">
		<svg viewBox="0 0 300 150" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<title>AI Podcast Generation illustration</title>

			{/* Podcast player card */}
			<rect x="30" y="25" width="240" height="100" rx="12" className="fill-white dark:fill-zinc-800" opacity="0.95" />

			{/* Play button circle */}
			<circle cx="80" cy="75" r="28" className="fill-violet-500 dark:fill-violet-400" />
			<polygon points="72,62 72,88 95,75" className="fill-white" />

			{/* Waveform visualization */}
			<g transform="translate(120, 50)">
				{[0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((x, i) => {
					const heights = [20, 35, 25, 45, 30, 50, 35, 40, 28, 38, 22];
					return (
						<rect
							key={i}
							x={x}
							y={25 - heights[i] / 2}
							width="6"
							height={heights[i]}
							rx="3"
							className="fill-cyan-400 dark:fill-cyan-400"
							opacity={0.6 + (i % 3) * 0.15}
						>
							<animate
								attributeName="height"
								values={`${heights[i]};${heights[(i + 3) % 11]};${heights[i]}`}
								dur={`${1 + i * 0.1}s`}
								repeatCount="indefinite"
							/>
							<animate
								attributeName="y"
								values={`${25 - heights[i] / 2};${25 - heights[(i + 3) % 11] / 2};${25 - heights[i] / 2}`}
								dur={`${1 + i * 0.1}s`}
								repeatCount="indefinite"
							/>
						</rect>
					);
				})}
			</g>

			{/* Progress dots */}
			<circle cx="120" cy="105" r="3" className="fill-violet-500 dark:fill-violet-400" />
			<circle cx="135" cy="105" r="3" className="fill-zinc-300 dark:fill-zinc-600" opacity="0.5" />
			<circle cx="150" cy="105" r="3" className="fill-zinc-300 dark:fill-zinc-600" opacity="0.5" />

			{/* Microphone icon */}
			<g transform="translate(25, 5)">
				<circle cx="12" cy="12" r="10" className="fill-cyan-400 dark:fill-cyan-400" opacity="0.3" />
				<path d="M12 4v8m-3 0a3 3 0 006 0m-3 4v2" className="stroke-cyan-600 dark:stroke-cyan-400" strokeWidth="1.5" strokeLinecap="round" fill="none" />
			</g>
		</svg>
	</div>
);

const items = [
	{
		title: "Cited Answers with Source Links",
		description:
			"Every AI response includes clickable citations linking back to the exact source chunk in your knowledge base.",
		header: <CitationIllustration />,
		className: "md:col-span-2",
		icon: <IconSearch className="h-4 w-4 text-zinc-500" />,
	},
	{
		title: "Research & Report Generation",
		description:
			"Generate comprehensive research reports with multiple rounds of AI research across your connected knowledge sources.",
		header: <CollaborationIllustration />,
		className: "md:col-span-1",
		icon: <IconUsers className="h-4 w-4 text-zinc-500" />,
	},
	{
		title: "AI Podcast Generation",
		description:
			"Transform any content into engaging AI-generated podcasts with natural voice synthesis.",
		header: <AudioCommentIllustration />,
		className: "md:col-span-1",
		icon: <IconMicrophone className="h-4 w-4 text-zinc-500" />,
	},
	{
		title: "Context-Aware Conversations",
		description: "Chat with your documents using advanced RAG that understands document structure and context.",
		header: <AnnotationIllustration />,
		className: "md:col-span-2",
		icon: <IconMessage className="h-4 w-4 text-zinc-500" />,
	},
];
