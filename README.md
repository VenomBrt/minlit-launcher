# Launcher Minlit

Launcher oficial do servidor de RP **Minlit** · Minecraft 1.21.1 · Fabric

## ⬇️ Download

| Sistema | Baixar |
|---|---|
| **Windows** 10/11 | [Launcher-Minlit-Setup.exe](https://github.com/VenomBrt/minlit-launcher/releases/latest/download/Launcher-Minlit-Setup.exe) |
| **Linux** (qualquer distro) | [Launcher-Minlit.AppImage](https://github.com/VenomBrt/minlit-launcher/releases/latest/download/Launcher-Minlit.AppImage) |
| **Linux** Ubuntu / Debian | [Launcher-Minlit.deb](https://github.com/VenomBrt/minlit-launcher/releases/latest/download/Launcher-Minlit.deb) |

Página de download para mandar aos jogadores: **https://venombrt.github.io/minlit-launcher/**

O launcher se atualiza sozinho quando sai uma versão nova.

---

## 🛠️ Para a staff: o que cada coisa faz

Tudo neste repositório é lido pelo launcher toda vez que ele abre. Mudou aqui, os jogadores recebem em alguns minutos.

| Pasta / arquivo | O que é |
|---|---|
| 📁 [`mods/`](mods) | **Mods do servidor.** Todo mundo baixa automaticamente |
| 📁 [`nomods/`](nomods) | **Mods proibidos.** Lista em `proibidos.txt`; o launcher tira esses mods do jogador |
| 📁 [`forcepack/`](forcepack) | **Textura forçada.** Todo `.zip` aqui é baixado e ativado por cima das outras texturas |
| 📁 [`notexture/`](notexture) | **Texturas proibidas.** Lista em `proibidas.txt`; o launcher tira essas texturas do jogador |
| 📄 [`servidor.json`](servidor.json) | **IP e porta** do servidor, link do mapa, Discord e site |
| 📄 [`jornal.json`](jornal.json) | **Jornal do estado** (notícias do Acampamento) |
| 📄 [`procurados.json`](procurados.json) | **Lista de procurados** |
| 📁 [`skins/`](skins) | Skins usadas nos cartazes de procurado |

> As pastas `.launcher`, `.github` e `docs` são do sistema. **Não precisa mexer nelas.**

### Como editar um arquivo (jornal, procurados, IP)

1. Clique no arquivo (ex.: `jornal.json`).
2. Clique no **lápis ✏️** no canto direito.
3. Faça a mudança e clique em **Commit changes** (botão verde) → **Commit changes** de novo.

### Como adicionar ou atualizar um mod

1. Abra a pasta [`mods/`](mods).
2. **Add file** → **Upload files** → arraste o `.jar` → **Commit changes**.
3. Para **atualizar**, apague a versão antiga (abra o arquivo → **⋯** → **Delete file**) e envie a nova.

Em 1 a 2 minutos a lista é atualizada sozinha (aparece um ✅ verde ao lado do commit) e todos os launchers passam a baixar.
Limite do GitHub: 100 MB por arquivo.

### Como proibir um mod

Edite [`nomods/proibidos.txt`](nomods/proibidos.txt) e escreva um mod por linha: o ID do mod (ex.: `freecam`) ou um pedaço do
nome do arquivo (ex.: `xray`). Se o jogador tiver esse mod, o launcher tira ele da pasta `mods` antes de abrir o jogo.
Mods que não estão proibidos (minimapa, por exemplo) continuam liberados.

### Como proibir uma textura

Edite [`notexture/proibidas.txt`](notexture/proibidas.txt) e escreva uma por linha: um pedaço do nome da textura (ex.: `xray`)
ou da descrição dela. O launcher confere o nome do arquivo **e** a descrição de dentro da textura, então renomear não adianta.
Se o jogador tiver uma textura dessas, ela é desativada e vai para a pasta `texturas-proibidas` antes do jogo abrir.
A textura do servidor (pasta `forcepack/`) nunca é bloqueada.

### Como trocar a textura forçada

Abra [`forcepack/`](forcepack), apague o `.zip` antigo e envie o novo. A textura é ativada no topo toda vez que o jogo abre;
se o jogador desativar, ela volta na próxima vez. Para não forçar nenhuma, deixe a pasta sem `.zip`.

### Trocar o IP do servidor

Em [`servidor.json`](servidor.json):

```json
"server": { "host": "play.minlit.com.br", "port": 25565, "autoJoin": true }
```

`autoJoin: true` = ao clicar em **Acorde**, o jogo já entra direto no servidor.

### Jornal

[`jornal.json`](jornal.json) é uma lista de notícias, da mais nova para a mais antiga (aparecem até 10):

```json
[
  { "title": "Título", "date": "12 de março de 1891", "tag": "Aviso", "body": "Texto da notícia." },
  { "title": "Outra notícia", "date": "10 de março de 1891", "tag": "Evento", "body": "..." }
]
```

### Procurados

[`procurados.json`](procurados.json) é uma lista; quem tem a maior recompensa fica em primeiro.

```json
{ "nick": "VenomGamerBrasil", "character": "Jack Morrison", "crimes": ["Roubo ao banco"], "reward": 500, "danger": 3 }
```

- `danger`: perigo de 1 a 5.
- `skinUrl` (opcional): link de uma skin `.png` (envie em `skins/` e use o link *Raw* do arquivo). Sem ele, usa a skin do nick.

> ⚠️ Cuidado com vírgulas e aspas nos `.json`. Se o arquivo ficar inválido, o launcher ignora e mostra o conteúdo padrão.
> Na dúvida, cole o texto em <https://jsonlint.com> antes de salvar.
