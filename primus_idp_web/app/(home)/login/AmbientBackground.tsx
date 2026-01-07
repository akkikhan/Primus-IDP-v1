"use client";

export const AmbientBackground = () => {
	return (
		<div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
			{/* Main gradient background */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900" />
			
			{/* Animated gradient orbs */}
			<div
				className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20 animate-pulse"
				style={{
					background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)",
				}}
			/>
			<div
				className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-20"
				style={{
					background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(6, 182, 212, 0.1) 40%, transparent 70%)",
					animation: "pulse 4s ease-in-out infinite alternate",
				}}
			/>
			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 dark:opacity-10"
				style={{
					background: "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%)",
				}}
			/>
			
			{/* Subtle grid pattern */}
			<div 
				className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
				style={{
					backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>
			
			{/* Diagonal light beams */}
			<div
				style={{
					transform: "translateY(-350px) rotate(-45deg)",
					width: "560px",
					height: "1380px",
					background:
						"radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(139, 92, 246, 0) 100%)",
				}}
				className="absolute left-0 top-0"
			/>
			<div
				style={{
					transform: "rotate(-45deg) translate(5%, -50%)",
					transformOrigin: "top left",
					width: "240px",
					height: "1380px",
					background:
						"radial-gradient(50% 50% at 50% 50%, rgba(124, 58, 237, 0.06) 0%, rgba(124, 58, 237, 0.02) 80%, transparent 100%)",
				}}
				className="absolute left-0 top-0"
			/>
			<div
				style={{
					position: "absolute",
					borderRadius: "20px",
					transform: "rotate(-45deg) translate(-180%, -70%)",
					transformOrigin: "top left",
					width: "240px",
					height: "1380px",
					background:
						"radial-gradient(50% 50% at 50% 50%, rgba(6, 182, 212, 0.04) 0%, rgba(6, 182, 212, 0.02) 80%, transparent 100%)",
				}}
				className="absolute left-0 top-0"
			/>
		</div>
	);
};


