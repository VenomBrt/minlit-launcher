// Generates servidor/manifest.json from the files in servidor/mods and servidor/resourcepacks.
// Runs on GitHub Actions after every change; can also be run locally with `node scripts/gerar-manifest.mjs`.
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..', 'servidor')
const repo = process.env.GITHUB_REPOSITORY || 'VenomBrt/minlit-launcher'
// Commit-pinned URLs never serve a stale cached copy after a mod is replaced.
const ref = process.env.GITHUB_SHA || 'main'
const folders = ['mods', 'resourcepacks']

const files = folders.flatMap((folder) => {
  const dir = path.join(root, folder)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.startsWith('.'))
    .map((e) => {
      const data = fs.readFileSync(path.join(dir, e.name))
      const rel = `${folder}/${e.name}`
      return {
        path: rel,
        url: `https://raw.githubusercontent.com/${repo}/${ref}/servidor/${rel.split('/').map(encodeURIComponent).join('/')}`,
        sha1: crypto.createHash('sha1').update(data).digest('hex'),
        size: data.length
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
})

// Only "mods" is managed: mods that are not listed get removed from the player's PC.
const manifest = { managedFolders: ['mods'], files }
fs.writeFileSync(path.join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`manifest.json: ${files.length} arquivos`)
