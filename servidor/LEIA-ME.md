# Pasta do servidor

Tudo aqui é lido pelo Launcher Minlit toda vez que ele abre. Para mudar algo, edite o arquivo direto no GitHub
(abra o arquivo → ícone de lápis → **Commit changes**). Os jogadores recebem a mudança na próxima vez que abrirem o launcher
(pode levar alguns minutos).

| Arquivo / pasta | Para que serve |
|---|---|
| `config.json` | IP e porta do servidor, versão do Minecraft/Fabric, textura forçada, link do mapa, Discord e site |
| `jornal.json` | Notícias do "Jornal" no Acampamento |
| `procurados.json` | Lista da aba Procurados |
| `mods/` | Mods do servidor. O launcher baixa os que faltam e **apaga** os que não estão aqui |
| `resourcepacks/` | Texturas que o launcher baixa |
| `skins/` | Skins usadas nos cartazes de procurado |
| `manifest.json` | **Não editar.** É gerado sozinho sempre que `mods/` ou `resourcepacks/` mudam |

## Trocar o IP do servidor

Em `config.json`, mude `"host"` e `"port"`:

```json
"server": { "host": "play.minlit.com.br", "port": 25565, "autoJoin": true }
```

`autoJoin: true` faz o jogo entrar direto no servidor ao clicar em **Acorde**.

## Adicionar, atualizar ou remover um mod

1. Abra a pasta `servidor/mods` no GitHub.
2. **Adicionar / atualizar:** *Add file* → *Upload files* → arraste o `.jar` → *Commit changes*.
   Para atualizar, apague a versão antiga (abra o arquivo → lixeira) e envie a nova.
3. **Remover:** abra o arquivo → ícone de lixeira → *Commit changes*.

Em 1 ou 2 minutos a aba **Actions** termina de gerar o `manifest.json` e todos os launchers passam a baixar a lista nova.
O limite do GitHub é 100 MB por arquivo.

## Textura forçada (forcepack)

`"forcepack": "Minlit_Global.zip"` em `config.json` é o nome do arquivo que está em `resourcepacks/`.
Toda vez que o jogo abre pelo launcher, essa textura é ativada e colocada acima das outras. Se o jogador desativar,
ela volta na próxima abertura. Para desligar, deixe `"forcepack": ""`.

Para trocar a textura: envie o novo `.zip` em `resourcepacks/` (com o **mesmo nome**, ou mude o nome em `config.json`).

> Para bloquear de vez quem entra sem a textura, também dá para ativar no `server.properties` do servidor:
> `require-resource-pack=true`, `resource-pack=<link direto do zip>` e `resource-pack-sha1=<sha1 do zip>`
> (o sha1 aparece no `manifest.json`).

## Jornal

`jornal.json` é uma lista de notícias, da mais nova para a mais antiga (aparecem até 10):

```json
[
  { "title": "Título", "date": "12 de março de 1891", "tag": "Aviso", "body": "Texto da notícia." }
]
```

## Procurados

`procurados.json` é uma lista; a ordem é sempre pela maior recompensa.

```json
{ "nick": "VenomGamerBrasil", "character": "Jack Morrison", "crimes": ["Roubo ao banco"], "reward": 500, "danger": 3 }
```

- `danger`: perigo de 1 a 5.
- `skinUrl` (opcional): link de uma skin `.png` (por exemplo, enviada na pasta `skins/`). Sem ele, usa a skin original do nick.

> Cuidado com vírgulas e aspas: se o JSON ficar inválido, o launcher ignora o arquivo e mostra o conteúdo padrão.
> Dá para conferir em <https://jsonlint.com> antes de salvar.
