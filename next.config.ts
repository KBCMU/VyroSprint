import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin Turbopack root to this package. Without this, Next may walk up to a
  // parent directory that also has a lockfile (common in local dev), which
  // breaks resolution and can OOM builds (including some CI layouts).
  turbopack: {
    root: path.join(process.cwd()),
  },
};

export default nextConfig;
