# projetei.com — Site (GitHub Pages)

Site estático multi-página (HTML + CSS + JS puro, sem dependências), pronto para hospedar no **GitHub Pages** com o domínio próprio **www.projetei.com**. Foco em **arquitetura e construção em Porto Alegre**: começar pelo anteprojeto 3D antes dos projetos técnicos, com construção civil executada pelo próprio escritório.

## Estrutura

```
├── index.html          ← home (landing de conversão + galeria)
├── sobre.html          ← escritório, equipe e tese
├── servicos.html       ← anteprojeto 3D, projetos técnicos, construção, regularização
├── projetos.html       ← portfólio com os 31 modelos (galeria + lightbox)
├── como-funciona.html  ← processo em 7 etapas
├── contato.html        ← formulário de orçamento
├── sitemap.xml         ← lista de URLs para o Google
├── robots.txt          ← libera indexação + aponta o sitemap
├── css/landing.css     ← estilos (home + páginas internas)
├── js/landing.js       ← interações (menu, galeria, lightbox, FAQ, formulário, tracking)
├── img/                ← logo, renders e favicon
├── materiais/          ← (opcional) PDFs para downloads pela página
├── CNAME               ← define www.projetei.com como domínio do Pages
└── .nojekyll           ← serve os arquivos direto, sem processamento Jekyll
```

## Passo a passo — publicar no GitHub Pages

### 1. Criar o repositório
1. Acesse [github.com/new](https://github.com/new)
2. Nome sugerido: `projetei.com` (ou qualquer nome)
3. Visibilidade: **Private** ou Public (Private funciona normalmente com Pages em contas pagas; em conta gratuita use Public)
4. Não marque "Add a README" (já temos um)

### 2. Enviar os arquivos
Pela interface web: arraste **todo o conteúdo desta pasta** para o repositório e faça o commit.

Ou por linha de comando:

```powershell
cd caminho\para\projetei.com_landing_page
git init
git add .
git commit -m "Landing page projetei.com"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/projetei.com.git
git push -u origin main
```

### 3. Ativar o GitHub Pages
1. No repositório: **Settings → Pages**
2. Em **Source**, escolha: `Deploy from a branch`
3. Branch: `main` / pasta: `/ (root)` → **Save**
4. Aguarde ~2 minutos. O site ficará em `https://seu-usuario.github.io/projetei.com/`

### 4. Conectar o domínio www.projetei.com
1. Ainda em **Settings → Pages**, campo **Custom domain**: digite `www.projetei.com` → **Save**
   (o arquivo `CNAME` já está no repositório com esse valor)
2. Marque **Enforce HTTPS** assim que o certificado ficar disponível (pode levar até 24h)

### 5. Configurar o DNS (no provedor onde o domínio está registrado)
Na gestão de DNS do domínio `projetei.com`, crie:

| Tipo  | Nome | Valor                          |
|-------|------|--------------------------------|
| CNAME | www  | SEU-USUARIO.github.io         |
| A     | @    | 185.199.108.153                |
| A     | @    | 185.199.109.153                |
| A     | @    | 185.199.110.153                |
| A     | @    | 185.199.111.153                |

> Substitua `SEU-USUARIO` pelo seu usuário do GitHub.
> Se o WIX gerencia o DNS hoje, essas entradas são configuradas lá mesmo (WIX → Domínios → DNS) ou transfira o domínio para outro registrador antes.
> Propagação típica: de minutos até 48h.

### 6. Encerrar o WIX
- Só cancele/remova o site do WIX **depois** de confirmar que `https://www.projetei.com` responde pelo GitHub Pages.
- O plano do WIX pode ser cancelado; mantenha apenas a gestão do DNS enquanto não migrar o registrador.

## Checklist pós-publicação

- [ ] `https://www.projetei.com` abre com cadeado (HTTPS)
- [ ] `https://projetei.com` (sem www) redireciona para o www
- [ ] WhatsApp `(51) 9 8992-3636` abre ao clicar nos botões
- [ ] Testador de cores da seção "Experimente agora" funciona no celular
- [ ] Galeria: clicar na imagem abre o lightbox, setas/ESC navegam e fecham
- [ ] Páginas internas (`sobre.html`, `servicos.html`, `projetos.html`, `como-funciona.html`, `contato.html`) abrem e com menu/footer funcionando
- [ ] Google Search Console: enviar `sitemap.xml` e solicitar reindexação do site novo

## Atualizar conteúdo no futuro

Basta editar os `.html` (textos), `css/landing.css` (cores/estilos) e enviar um novo commit — o Pages publica sozinho em ~1 minuto. Ao mudar CSS/JS, incremente o `?v=` dos links nas páginas para forçar refresh do cache.

## Personalizações rápidas

| O quê                    | Onde                                        |
|--------------------------|---------------------------------------------|
| Preços                   | `index.html`, seção `id="valores"`          |
| Número do WhatsApp       | constante `WHATSAPP_NUMBER` em `js/landing.js` |
| Cores da marca           | variáveis `--gold`, `--navy` etc. no topo de `css/landing.css` |
| Imagens dos renders      | pasta `img/` (hero e portfólio) · galeria interativa em `img/galeria/modelo-01.jpg` … `modelo-31.jpg` |
| Legendas da galeria      | `index.html` e `projetos.html`, busque `tester-caption`: troque o texto `<span>Projeto residencial</span>` de cada modelo pelo nome certo (ex.: "Sobrado com 3 suítes") |
