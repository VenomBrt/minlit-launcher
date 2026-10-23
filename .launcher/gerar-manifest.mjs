// Generates .launcher/manifest.json from mods/, forcepack/, nomods/proibidos.txt and notexture/proibidas.txt.
// Runs on GitHub Actions after every change; can also be run locally with `node .launcher/gerar-manifest.mjs`.
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const repo = process.env.GITHUB_REPOSITORY || 'VenomBrt/minlit-launcher'
// Commit-pinned URLs never serve a stale cached copy after a file is replaced.
const ref = process.env.GITHUB_SHA || 'main'

/** Repo folder → folder in the player's game directory. */
const folders = [
  { repo: 'mods', game: 'mods', ext: '.jar' },
  { repo: 'forcepack', game: 'resourcepacks', ext: '.zip' }
]

const url = (rel) => `https://raw.githubusercontent.com/${repo}/${ref}/${rel.split('/').map(encodeURIComponent).join('/')}`

const files = folders.flatMap((f) => {
  const dir = path.join(root, f.repo)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(f.ext))
    .map((e) => {
      const data = fs.readFileSync(path.join(dir, e.name))
      return {
        path: `${f.game}/${e.name}`,
        url: url(`${f.repo}/${e.name}`),
        sha1: crypto.createHash('sha1').update(data).digest('hex'),
        size: data.length
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
})

const forcepacks = files.filter((f) => f.path.startsWith('resourcepacks/')).map((f) => f.path.slice('resourcepacks/'.length))

/** Non-empty, non-comment lines of a text list. */
const readList = (...parts) => {
  const file = path.join(root, ...parts)
  return fs.existsSync(file)
    ? fs
        .readFileSync(file, 'utf8')
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#'))
    : []
}

const forbidden = readList('nomods', 'proibidos.txt')
const forbiddenPacks = readList('notexture', 'proibidas.txt')

const manifest = { files, forcepacks, forbidden, forbiddenPacks }
fs.mkdirSync(path.join(root, '.launcher'), { recursive: true })
fs.writeFileSync(path.join(root, '.launcher', 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(
  `manifest.json: ${files.length} arquivos, ${forcepacks.length} forcepack(s), ${forbidden.length} mod(s) e ${forbiddenPacks.length} textura(s) proibidos`
)
