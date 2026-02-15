import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Create the next-intl plugin
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Next.js output modes like "standalone" rely on output tracing that may require
// symlink creation. Only enable an output mode when explicitly requested.
const envOutput = process.env.NEXT_OUTPUT?.trim();
const output =
	envOutput === "standalone" || envOutput === "export"
		? (envOutput as NextConfig["output"])
		: undefined;

const nextConfig: NextConfig = {
	output,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
};

// Wrap the config with MDX and next-intl plugins
const withMDX = createMDX({});

export default withNextIntl(withMDX(nextConfig));

