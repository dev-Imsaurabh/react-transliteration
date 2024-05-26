import { defineConfig } from 'tsup';

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/index.tsx'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
    target: 'esnext',
    esbuildOptions: (options) => {
        options.loader = {
            '.js': 'jsx',
            '.ts': 'ts',
            '.tsx': 'tsx',
        };
    },
});
