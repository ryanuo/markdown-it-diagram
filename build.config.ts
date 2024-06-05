import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      builder: 'mkdist',
      input: './src/dom',
      outDir: './dist/dom',
      format: 'cjs',
    },
    {
      builder: 'mkdist',
      input: './src/dom',
      outDir: './dist/dom',
      format: 'esm',
    },
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
