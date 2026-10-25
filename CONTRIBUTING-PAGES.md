# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Model: `ca-pass-mark.ts`. Every page exists in
English (`/en/<en.slug>/`) and Canadian French (`/fr/<fr.slug>/`); hreflang, menus, home lists and sitemap
follow by themselves.

## Fields

- `group`: `test` (the test itself), `chapters` (one chapter of Discover Canada) or `apply` (the application,
  from eligibility to the oath); `order`: position in its group.
- `tool`: the main tool, shown right under the H1 (first screen). Every page has one:
  - `{ kind: 'quiz', props: { mode: 'exam'|'practice', chapter?: <index 0-9>, timed?: true } }`
  - `{ kind: 'bank', props: { chapter: <index> } }` (questions with answers, one chapter at a time)
  - `{ kind: 'date' }` (first date the 1,095 days are met, trips day by day; `props: { before: 'no' }` opens
    without a pre-PR stay)
  - `{ kind: 'cost' }` (IRCC fees for a household)
  - `{ kind: 'timeline' }` (citizenship steps placed from the signing date, no processing time)
  - `{ kind: 'mini:<spec>' }`, specs in `src/lib/mini-specs.ts` (`SPEC_KINDS`).
- `mini`: a second tool under the citable block (optional, same kinds).
- In a body, `<!--tool:mini:cadays-->` places a tool between paragraphs.
- `related`: 4 to 6 page ids (`home` allowed).
- `sources`: keys of `src/data/params-2026.json` → `sources`.

## Text rules (checked by `npm run check`)

- `title` 50 to 60 characters, key term first ("Citizenship test pass mark: …"), never "How…", "What…" or
  "Calculator…" first.
- `description` 150 to 160 characters.
- `resume(h)`: ONE paragraph of at least 130 words answering the page's query with figures; shown folded after
  its first sentence.
- `faqs(h)`: 3 to 5 questions unique to the page across the whole site, each answer 40 to 90 words.
- `body(h)`: HTML with `<h2>` sections, at least 450 words. No `<h1>`.
- No em dash anywhere. Canadian English spelling (centre, licence, program, honour); Canadian French with
  « guillemets ».
- Pages must read differently (check-unique fails above 30 % shared sentences between two pages). The French
  text is written for French readers, not translated sentence by sentence.
- Links only to official sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a firm,
  consultant, app, forum, other practice site or affiliate.
- Never present the site as IRCC or a government body; no official logo.

## Figures

Never type a fee, a limit or a count: read them through `h` (`src/lib/helpers.ts`): `h.P` (params-2026.json),
`h.cad(n)`, `h.num`, `h.pc`, `h.date(iso)`, `h.need` (correct answers to pass), `h.n` (questions), `h.count`
(bank size), `h.chapters`, `h.inChapter(i)`, `h.q(id)`, `h.table(headers, rows, caption, align)`. A fact that is
not on an IRCC page, in the Citizenship Act or in Discover Canada is not written.

## Data

- `src/data/params-2026.json`: rules and fees read on canada.ca and ircc.canada.ca (date in `retrieved_at`),
  checked monthly by `scripts/update-data.py` (workflow `.github/workflows/update-data.yml`, exit code 2 when an
  amount differs).
- `src/data/questions/ca-en.json`, `ca-fr.json`: question banks written by Radif Partners from the facts of
  Discover Canada (Crown copyright, nothing reproduced). `npx vitest run` lints every bank.
