// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
      'src/utils/deflate.ts',
    ],
  },
  {
    rules: {
      // overrides
    },
  },
)
