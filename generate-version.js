const fs = require('node:fs/promises');
const pkg = require('./package.json');


const outFile = 'src/version.ts';
const [major, minor, patch] = pkg.version.split('.');

const content =
`/** @generated */
import type { SpecVersion } from './manifest/spec-version';

export const version: SpecVersion = {
  major: ${major},
  minor: ${minor},
  patch: ${patch}
};
`;

fs.writeFile(outFile, content);
