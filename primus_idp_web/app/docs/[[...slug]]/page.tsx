import Link from "next/link";

export default async function Page() {
	// Fumadocs is currently disabled in `app/docs/layout.tsx`.
	// Do not redirect to an external domain (it can be misconfigured / NXDOMAIN).
	// Provide an internal, working placeholder instead.
	return (
		<div className="mx-auto max-w-4xl px-6 py-16">
			<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
				Documentation
			</h1>
			<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
				Docs are being refreshed. For now, use the repository docs and deployment guides.
			</p>

			<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
				<Link
					href="https://github.com/khanakkijpr-dot/Primus-IDP"
					target="_blank"
					rel="noopener noreferrer"
					className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700"
				>
					<div className="text-sm font-semibold text-zinc-900 dark:text-white">
						GitHub Repository
					</div>
					<div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
						Readme, releases, and issues.
					</div>
				</Link>
				<Link
					href="/contact"
					className="rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm backdrop-blur hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700"
				>
					<div className="text-sm font-semibold text-zinc-900 dark:text-white">Contact</div>
					<div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
						Need help deploying or customizing Primus IDP?
					</div>
				</Link>
			</div>
		</div>
	);
}

export const dynamic = 'force-dynamic';

/* Original Fumadocs implementation - disabled due to Zod v3/v4 incompatibility
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	const MDX = page.data.body;

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	);
}

export async function generateStaticParams() {
	return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
	const params = await props.params;
	const page = source.getPage(params.slug);
	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
*/
