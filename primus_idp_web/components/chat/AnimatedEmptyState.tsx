"use client";

import { motion, useInView } from "motion/react";
import { Sparkles } from "lucide-react";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { cn } from "@/lib/utils";

// Constants for timing - makes it easier to adjust and more maintainable
const TIMING = {
	SIDEBAR_TRANSITION: 300, // Wait for sidebar transition + buffer
	LAYOUT_SETTLE: 100, // Small delay to ensure layout is fully settled
} as const;

// Animation configuration
const ANIMATION_CONFIG = {
	HIGHLIGHT: {
		type: "highlight" as const,
		animationDuration: 2000,
		iterations: 3,
		color: "var(--primary)",
		multiline: true,
	},
	UNDERLINE: {
		type: "underline" as const,
		animationDuration: 2000,
		iterations: 3,
		color: "var(--accent)",
	},
} as const;

// State management with useReducer for better organization
interface HighlightState {
	shouldShowHighlight: boolean;
	layoutStable: boolean;
}

type HighlightAction =
	| { type: "SIDEBAR_CHANGED" }
	| { type: "LAYOUT_STABILIZED" }
	| { type: "SHOW_HIGHLIGHT" }
	| { type: "HIDE_HIGHLIGHT" };

const highlightReducer = (state: HighlightState, action: HighlightAction): HighlightState => {
	switch (action.type) {
		case "SIDEBAR_CHANGED":
			return {
				shouldShowHighlight: false,
				layoutStable: false,
			};
		case "LAYOUT_STABILIZED":
			return {
				...state,
				layoutStable: true,
			};
		case "SHOW_HIGHLIGHT":
			return {
				...state,
				shouldShowHighlight: true,
			};
		case "HIDE_HIGHLIGHT":
			return {
				...state,
				shouldShowHighlight: false,
			};
		default:
			return state;
	}
};

const initialState: HighlightState = {
	shouldShowHighlight: false,
	layoutStable: true,
};

export function AnimatedEmptyState() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref);
	const [{ shouldShowHighlight, layoutStable }, dispatch] = useReducer(
		highlightReducer,
		initialState
	);

	// Memoize class names to prevent unnecessary recalculations
	const headingClassName = useMemo(
		() =>
			cn(
				"text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-4"
			),
		[]
	);

	const paragraphClassName = useMemo(
		() => "text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed",
		[]
	);

	// Handle sidebar state changes
	useEffect(() => {
		dispatch({ type: "SIDEBAR_CHANGED" });

		const stabilizeTimer = setTimeout(() => {
			dispatch({ type: "LAYOUT_STABILIZED" });
		}, TIMING.SIDEBAR_TRANSITION);

		return () => clearTimeout(stabilizeTimer);
	}, []);

	// Handle highlight visibility based on layout stability and viewport visibility
	useEffect(() => {
		if (!layoutStable || !isInView) {
			dispatch({ type: "HIDE_HIGHLIGHT" });
			return;
		}

		const showTimer = setTimeout(() => {
			dispatch({ type: "SHOW_HIGHLIGHT" });
		}, TIMING.LAYOUT_SETTLE);

		return () => clearTimeout(showTimer);
	}, [layoutStable, isInView]);

	return (
		<div ref={ref} className="flex-1 flex items-center justify-center w-full min-h-[450px]">
			<motion.div 
				className="max-w-3xl mx-auto px-6 py-12 text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				{/* Icon/Logo Section */}
				<motion.div 
					className="mb-8 flex justify-center"
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.1 }}
				>
					<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg shadow-primary/10">
						<Sparkles className="w-8 h-8 text-primary" />
					</div>
				</motion.div>

				<RoughNotationGroup show={shouldShowHighlight}>
					<h1 className={headingClassName}>
						Welcome To{" "}
						<RoughNotation {...ANIMATION_CONFIG.HIGHLIGHT}>
							<span className="text-primary">Primus IDP</span>
						</RoughNotation>
					</h1>

					<p className={paragraphClassName}>
						Get started by asking a question and let AI explore{" "}
						<RoughNotation {...ANIMATION_CONFIG.UNDERLINE}>
							your knowledge base
						</RoughNotation>
						. Not sure where to start?
					</p>
				</RoughNotationGroup>
			</motion.div>
		</div>
	);
}


