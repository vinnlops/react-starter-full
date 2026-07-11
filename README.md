# React Starter — Full

Template inicial React + TypeScript + Vite, estruturado para escalar em projetos grandes. Essa versão (**full**) já vem com camada de comunicação com backend (Axios + React Query) integrada.

## Documentação

Além deste README, o projeto possui uma documentação completa com guias, exemplos e referências para as principais funcionalidades e padrões adotados.

**Acesse a documentação:** https://react-starter-docs.vercel.app/docs/introducao

## Stack

- **React 19** + **TypeScript**
- **Vite** — build e dev server
- **React Router DOM 7** — roteamento declarativo baseado em configuração
- **Zustand** — estado global local (sem boilerplate de Context)
- **TanStack React Query** — cache, sincronização e estado de servidor
- **Axios** — cliente HTTP
- **Tailwind CSS v4** — estilos utilitários
- **React Icons** — ícones

## Estrutura de pastas

```
src/
├── app/router/       # Configuração de rotas (baseada em array, não JSX solto)
├── config/           # Configurações globais (env, query, temas)
├── layouts/          # Layouts compartilhados entre páginas
├── pages/            # Uma pasta por página, com components/hooks locais
├── providers/        # Providers globais da aplicação (Query, etc.)
├── queries/          # Hooks de React Query (queries e mutations) por recurso
├── services/         # Comunicação HTTP com a API, por recurso
├── store/            # Estado global (Zustand), por domínio
└── utils/            # Funções utilitárias (ex: tema)
```

### Por que essa separação?

- **`services/` ≠ `queries/`**: `services` só faz a chamada HTTP e tipagem da resposta — não sabe que o React Query existe. `queries` usa os services e expõe hooks (`useExamples`, `useCreateExample`) prontos para os componentes. Isso permite trocar o React Query por outra lib de data-fetching sem tocar nos services.
- **Cada recurso é auto-contido**: `queries/example/`, `services/example/` seguem o padrão `nome.keys.ts`, `nome.queries.ts`, `nome.mutations.ts`, `nome.service.ts`, `nome.types.ts`. Ao adicionar um recurso novo, copie a pasta `example` e renomeie.
- **`pages/[Página]/components` e `hooks`**: componentes e hooks usados *só* naquela página ficam isolados ali. Se algo passar a ser reutilizado em mais de uma página, sobe para `src/components` ou `src/hooks`.

## Sistema de rotas

Rotas são declaradas como dados (`src/app/router/routes.tsx`), não como JSX solto:

```tsx
export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
        ],
    },
];
```

`createRoutes` converte essa árvore para o formato que o `react-router-dom` espera. Para adicionar uma rota nova, basta editar `routes.tsx` — nenhuma outra parte do sistema precisa mudar.

## Comunicação com API

### Client (`src/services/api/client.ts`)

Instância única do Axios com:
- `baseURL` e `timeout` vindos de `src/config/env.ts` (lidos de `VITE_API_URL` e `VITE_API_TIMEOUT`)
- Interceptor de **request**: injeta `Authorization: Bearer <token>` automaticamente se houver token no `localStorage`
- Interceptor de **response**: trata erros centralizadamente (401 → limpa sessão e redireciona; 500 → log; erro de rede → log)

### Services (`src/services/`)

Cada arquivo `*.service.ts` só faz chamadas HTTP e tipagem — sem lógica de componente, sem hooks, sem estado. Tudo exportado via `services.index.ts` para import único:

```ts
import { getExamples, createExample } from "@/services";
```

### Queries (`src/queries/`)

Hooks prontos para uso em componentes:

```ts
const { data, isLoading } = useExamples();
const { mutate } = useCreateExample();
```

Configuração global do React Query (`staleTime`, `gcTime`, `retry`, etc.) fica centralizada em `src/config/query.ts` — mude ali para afetar todas as queries do projeto.

### Variáveis de ambiente

Crie um `.env` na raiz baseado no `.env.example`:

```
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000
```

## Estado global (Zustand)

Cada domínio de estado fica em `store/[domínio]/`, com `*.store.ts` (lógica) e `*.types.ts` (tipos). Exemplos incluídos:

- **`store/example`** — store simples, sem persistência, só como referência de padrão.
- **`store/preferences`** — guarda o tema atual, **persistido** no `localStorage` via middleware `persist` do Zustand.

Import centralizado:

```ts
import { useExampleStore, usePreferencesStore } from "@/store";
```

## Sistema de temas

Tema dinâmico, orientado a configuração — **criar um tema novo não exige tocar em CSS nem em lógica**, só em `src/config/themes.ts`.

### Como funciona

1. **Schema de tokens** (`tokenSchema` em `themes.ts`) define quais variáveis de cor existem (`primary-500`, `muted-700`, `background`, etc). Só muda quando você quer adicionar uma **categoria** nova de cor.
2. **Temas** (`themes` em `themes.ts`) são objetos que preenchem o schema com valores. O TypeScript (`satisfies Record<string, ThemeTokens>`) garante que nenhum tema esqueça uma cor — erro de compilação se faltar.
3. **`applyTheme(theme)`** (em `src/utils/theme.ts`) itera sobre `themeTokenKeys` e injeta cada valor como variável CSS via `style.setProperty`. Nunca precisa ser editada ao criar tema ou token novo.
4. **`getTheme()`** lê o tema atualmente aplicado direto do DOM (`data-theme`), refletindo o estado real independente de qualquer store.
5. **`initTheme()`** é chamada uma vez em `main.tsx`, antes do primeiro render, para aplicar o tema salvo e evitar flash de tema errado.

### Criando um tema novo

Só edite `src/config/themes.ts`:

```ts
export const themes = {
    light: { /* ... */ },
    dark: { /* ... */ },
    solarized: {
        background: "#fdf6e3",
        foreground: "#073642",
        // ... resto do schema
    },
} as const satisfies Record<string, ThemeTokens>;
```

Nenhuma outra parte do projeto precisa ser tocada. `themeNames` já reflete o novo tema automaticamente, útil para montar seletores:

```tsx
import { themeNames } from "@/config/themes";
import { usePreferencesStore } from "@/store";

function ThemeSelector() {
    const { theme, setTheme } = usePreferencesStore();
    return (
        <select value={theme} onChange={(e) => setTheme(e.target.value as typeof theme)}>
            {themeNames.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
    );
}
```

### Limite técnico do Tailwind

O bloco `@theme` no `src/index.css` precisa listar os nomes das variáveis, pois é isso que gera as classes utilitárias (`bg-primary-500`, `text-muted-700`) em tempo de build. Isso só precisa ser editado ao criar uma **categoria de token nova** (ex: `success`, `danger`) — nunca ao criar um tema novo.

## SEO

O projeto inclui uma camada de SEO baseada em **react-helmet-async**, permitindo configurar metadados por página de forma declarativa.

O provider já está configurado dentro dos providers globais da aplicação, portanto nenhuma configuração adicional é necessária.

### Estrutura

```text
src/
└── seo/
    ├── SEO.tsx
    ├── defaultSeo.ts
    ├── index.ts
    └── types.ts
```

### Configuração padrão

O arquivo `src/seo/defaultSeo.ts` centraliza os valores padrão utilizados pela aplicação:

```ts
export const defaultSeo = {
    title: "React Starter",
    description: "Projeto base React com TypeScript, React Query e Zustand.",
    keywords: "react, typescript, vite, react query, zustand",
    siteName: "React Starter",
    image: "/og-image.png",
    robots: "index,follow",
};
```

Ao iniciar um novo projeto, recomenda-se atualizar esses valores para refletir a identidade da aplicação.

### Uso básico

Em qualquer página:

```tsx
import { SEO } from "@/seo";

export function HomePage() {
    return (
        <>
            <SEO
                title="Home"
                description="Página inicial da aplicação"
            />

            <h1>Home</h1>
        </>
    );
}
```

Isso gera automaticamente:

- `<title>`
- `<meta name="description">`
- `<meta name="keywords">`
- `<meta name="robots">`
- Open Graph (`og:*`)
- Twitter Cards (`twitter:*`)

### Canonical URL

Para evitar conteúdo duplicado em mecanismos de busca:

```tsx
<SEO
    title="Produtos"
    canonical="https://meusite.com/produtos"
/>
```

### Open Graph

O componente já gera automaticamente as tags Open Graph usando os valores informados:

```tsx
<SEO
    title="Produto X"
    description="Descrição do produto"
    image="https://meusite.com/imagens/produto-x.png"
/>
```

Isso melhora a exibição ao compartilhar links em:

- WhatsApp
- LinkedIn
- Facebook
- Discord
- Telegram

### Dados estruturados (JSON-LD)

Também é possível fornecer dados estruturados para mecanismos de busca:

```tsx
<SEO
    title="Empresa XYZ"
    description="Consultoria em tecnologia"
    structuredData={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Empresa XYZ",
        url: "https://empresa.com",
    }}
/>
```

O objeto será convertido automaticamente para um bloco:

```html
<script type="application/ld+json">
```

permitindo integração com recursos avançados do Google Search.

### Tipagem disponível

```ts
interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    robots?: string;

    structuredData?: Record<string, unknown>;
}
```

### Boas práticas

- Toda página pública deve possuir `title` e `description`.
- Utilize `canonical` em páginas indexáveis.
- Utilize `structuredData` para páginas institucionais, produtos, artigos ou organizações.
- Evite títulos genéricos repetidos em múltiplas páginas.
- Prefira descrições entre 120 e 160 caracteres para melhor exibição nos resultados de busca.

### Limitação

Este template utiliza **React SPA (Client-Side Rendering)**. Os mecanismos de busca modernos conseguem indexar esse formato, porém aplicações com SSR (Server-Side Rendering) ou SSG (Static Site Generation) possuem vantagem para SEO extremamente competitivo.

Para a maioria dos sites institucionais, dashboards públicos, landing pages e sistemas SaaS, a implementação incluída é suficiente e segue as práticas modernas recomendadas.

## Scripts

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção (checagem de tipos + build)
npm run lint      # eslint
npm run preview   # preview do build de produção
```

## Convenções gerais

- Alias `@/` aponta para `src/` (configurado no `tsconfig` e `vite.config`).
- Um recurso novo (ex: "users") deve seguir o padrão de `example`: `services/users/`, `queries/users/`, com os mesmos sufixos de arquivo.
- Pastas vazias (`components/`, `hooks/`, `constants/`, `types/`, `utils/`, `styles/`) existem propositalmente — são pontos de extensão já estruturados para o projeto crescer sem reorganização.