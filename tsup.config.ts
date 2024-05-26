import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.tsx'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    target: 'esnext', // Ensure targeting modern JS syntax
    esbuildOptions: (options) => {
        options.loader = {
            '.js': 'jsx', // Ensure JSX/JS files are correctly parsed
            '.ts': 'ts',
            '.tsx': 'tsx',
        };
    },
});
