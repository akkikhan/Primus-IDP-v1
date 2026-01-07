import { Brain, Database, Lock, Search, Zap, Globe } from "lucide-react";
import type { ReactNode } from "react";

export function FeaturesCards() {
	const features = [
		{
			icon: Brain,
			title: "Advanced RAG Pipeline",
			description: "Hierarchical indices with hybrid search combining semantic + full-text search using Reciprocal Rank Fusion for superior accuracy.",
			gradient: "from-violet-500 to-purple-600",
			glowColor: "violet",
		},
		{
			icon: Lock,
			title: "Privacy-First & Self-Hosted",
			description: "Your data stays yours. Works flawlessly with Ollama local LLMs. Open source and easy to deploy on your own infrastructure.",
			gradient: "from-emerald-500 to-cyan-600",
			glowColor: "emerald",
		},
		{
			icon: Zap,
			title: "100+ LLMs Supported",
			description: "Connect to any LLM provider - OpenAI, Anthropic, Azure, Ollama, and more. 6000+ embedding models and all major rerankers supported.",
			gradient: "from-amber-500 to-orange-600",
			glowColor: "amber",
		},
		{
			icon: Database,
			title: "50+ File Formats",
			description: "Upload documents, images, videos, and more. Support for PDF, DOCX, spreadsheets, presentations, and code files.",
			gradient: "from-purple-500 to-pink-600",
			glowColor: "purple",
		},
		{
			icon: Search,
			title: "Cited Answers",
			description: "Get Perplexity-style cited answers with source references. Every response is grounded in your knowledge base.",
			gradient: "from-cyan-500 to-blue-600",
			glowColor: "cyan",
		},
		{
			icon: Globe,
			title: "15+ Integrations",
			description: "Connect Slack, Notion, GitHub, Gmail, Discord, Jira, Confluence, and more. All your knowledge in one place.",
			gradient: "from-rose-500 to-red-600",
			glowColor: "rose",
		},
	];

	return (
		<section className="py-20 md:py-28 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black relative overflow-hidden">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
			</div>

			<div className="mx-auto max-w-6xl px-6 relative z-10">
				{/* Section Header */}
				<div className="text-center mb-16">
					<span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full border border-violet-200 dark:border-violet-500/20">
						<span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse" />
						Why Primus IDP?
					</span>
					<h2 className="text-4xl md:text-5xl font-bold mb-4">
						<span className="text-zinc-900 dark:text-white">Your Personal </span>
						<span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">AI Research Assistant</span>
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
						Like NotebookLM and Perplexity, but connected to YOUR knowledge base and fully self-hosted.
					</p>
				</div>

				{/* Features Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="group relative p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50"
						>
							{/* Icon with gradient */}
							<div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
								<feature.icon className="w-7 h-7 text-white" />
								{/* Glow effect */}
								<div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
							</div>

							{/* Content */}
							<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
								{feature.title}
							</h3>
							<p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
								{feature.description}
							</p>

							{/* Hover Gradient Overlay */}
							<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}


