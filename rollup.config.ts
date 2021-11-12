import typescript from '@rollup/plugin-typescript'
import ttypescript from 'ttypescript'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    sourcemap: true,
    format: 'es'
  },
  external: [
    'react',
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      typescript: ttypescript,
      exclude: [
        "**/__tests__",
        "**/*.test.ts",
      ],
    })
  ],
  onwarn: warning => {
    throw new Error(warning.message);
  },
};
