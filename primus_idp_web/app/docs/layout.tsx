// Temporarily simplified layout until Fumadocs/Zod compatibility is resolved
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	return <>{children}</>;
}

/* Original Fumadocs implementation - disabled due to Zod v3/v4 incompatibility
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<DocsLayout tree={source.pageTree} {...baseOptions}>
			{children}
		</DocsLayout>
	);
}
*/


