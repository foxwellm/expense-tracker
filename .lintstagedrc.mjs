import path from 'path'

const buildEslintCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')
  return [
    'tsc --noEmit',
    `next lint --config ./eslint.config.mjs --fix --file ${files}`,
    `prettier --write ${filenames.join(' ')}`,
  ]
}

const lintStagedConfig = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '*.{json,md,mjs,html}': ['prettier --write'],
  '*.test.ts': ['jest'],
}

export default lintStagedConfig
