import { cn } from "@/lib/utils";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
				className
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
	icon,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"group/bento relative row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-zinc-900/50 dark:hover:border-zinc-700 overflow-hidden",
				className
			)}
		>
			{/* Gradient overlay on hover */}
			<div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-300 pointer-events-none" />
			
			{header}
			<div className="relative transition duration-300 group-hover/bento:translate-x-2">
				{icon}
				<div className="mt-2 mb-2 font-sans font-bold text-zinc-900 dark:text-white">
					{title}
				</div>
				<div className="font-sans text-sm font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed">
					{description}
				</div>
			</div>
		</div>
	);
};


