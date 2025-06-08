import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

// 1. Wrap your config with bundle-analyzer, casting options to any to satisfy TS
const withBundleAnalyzer = bundleAnalyzer(({
    enabled: process.env.ANALYZE === 'true',
    analyzerMode: 'static',           // generate a static HTML report
    openAnalyzer: false,               // disable auto-opening
    defaultSizes: 'gzip',              // show gzipped sizes only
    generateStatsFile: true,           // output JSON stats
    statsFilename: 'bundle-stats.json',
    statsOptions: { modules: true },    // include per-module info
    reportDir: './.next/analyze',      // ensure relative path is correct
    reportFilename: 'client.html',     // fixed filename for client bundle
} as never));

// 2. Your existing Next.js config options
const nextConfig: NextConfig = {
    /* your other config options here */
};

// 3. Export the wrapped config
module.exports = withBundleAnalyzer(nextConfig);

/*
  Usage:
    1. Ensure .next/analyze folder is writable.
    2. Run:
       ANALYZE=true next build

    Outputs:
      • .next/analyze/client.html       (static treemap for client bundle)
      • .next/bundle-stats.json         (detailed module stats JSON)

    Then open:
      open .next/analyze/client.html
*/
