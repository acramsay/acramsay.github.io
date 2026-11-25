---
name: job-application
description: Tailor a resume and application materials to a specific job posting. Use when the user shares a job description or posting URL and wants a match assessment, an honest ATS-optimized resume update, a submission PDF, or help answering application-form prompts.
---

# Job application tailoring

Given a job posting, produce an honest, ATS-tuned resume PDF and application
answers, grounded in the experience bank. Work from this repo's root.

## Where things live

- Resume source: `data/resume.yaml`, with `basics`, `education`, `work`, and
  `skills`. Rendered by `layouts/resume.html` and `layouts/_partials/resume/*`.
- Only `basics.summary`, each `work[].highlights`, `skills[]`, and `education[]`
  reach the PDF. The `badges` field renders nowhere and never reaches the ATS.
- Experience bank: `docs/job-search/experience-bank.md`, a local, uncommitted
  symlink to the encrypted, synced Obsidian vault copy. **The only durable
  record.** It catalogs experience, skills, and perspectives a resume cannot
  carry, with notes on what each fact does and does not support. It is
  company-agnostic: it names real employers, never a company applied to. Never
  create a per-application file.
- Build: `task resume:pdf:onetime NAME="<company> <title>"` writes
  `pdfs/<slug>/Resume - Alex Ramsay.pdf`, where `<slug>` is the lowercased,
  hyphenated name. `pdfs/` is gitignored.
- Tooling: `jq` reads JSON, building the site (`hugo`) validates the YAML, and
  `pdftotext` / `pdfinfo` read the built PDF. `python` is denied, so reach for
  these instead.

## Procedure

1. Gather context.
   - Fetch the posting. Lever and most server-rendered ATS pages fetch cleanly
     with `webfetch`. Ashby renders in JavaScript, so read the raw HTML and pull
     the job text from the `<meta name="description">` tag or the
     `application/ld+json` block.
   - Read `data/resume.yaml` and `docs/job-search/experience-bank.md`. Mine the
     bank for the facets this posting rewards; that is what it is for.
   - Run `opencode session list` to find earlier resume or PDF sessions on this
     repo, and reuse what they established.

2. Assess the match.
   - Map every requirement to concrete evidence, tagging each as strong,
     adjacent, or gap. Cover the nice-to-haves too.
   - Pull detail from the experience bank and the site's project pages, not just
     the resume.
   - Lead with the verdict and state the hard gates plainly. This map is
     conversation-only; do not write it to disk.

3. Interview the user.
   - Ask about adjacent experience a resume under-represents: hobby work,
     unlisted tools, informal scope.
   - Fold new answers into the experience bank (step 9).

4. Tailor the resume.
   - Reposition `basics.summary` toward the role.
   - Reorder `work[].highlights` so the most relevant lead.
   - Reframe true work in the posting's vocabulary, such as renaming "K8s" to
     "Kubernetes" so the ATS matches the literal term.
   - Add truthful skill keywords, placed by relevance.

5. Keep every claim honest.
   - Rename true facts to match ATS terms. Add a keyword only when it is
     ownership-matched and defensible in an interview.
   - Add a platform, OS, or environment qualifier (Windows, Linux, Azure) only
     when the bank records it. Naming an environment to hit a keyword is
     fabrication, not a reframe.
   - Keep durations distinct. "N years of experience" and "N years in production
     operations" are different claims. Re-derive every number from the resume's
     work dates after repositioning, and reconcile it everywhere it appears.
   - Leave a missing hard requirement as a stated gap.
   - Keep source nouns precise: call a comparison site a comparison site, and
     reserve "benchmarking" for systems that measure.

6. Unslop every piece of prose, each artifact as you write it. Run the unslop
   skill over the summary, bullets, form answers, and any cover letter.

7. Build to two pages and verify.
   - Keep the rendered resume at or under two pages. Measure with `pdfinfo`
     after every build.
   - Start the dev server and confirm it serves before building. `task start`
     returns before Hugo is listening, so poll `curl http://localhost:1313/resume/`
     until it returns 200.
   - Run `task resume:pdf:onetime NAME="<company> <title>"`.
   - Verify by re-deriving each new or changed claim against the experience
     bank. Keyword presence alone proves nothing; a fabricated claim still
     contains its keywords. Read the result with `pdftotext`.

8. Answer application-form prompts.
   - Match the requested length exactly, such as three to five sentences.
   - Ground each claim in the experience bank, then unslop it.

9. Fold learnings into the experience bank.
   - Add new experience, skills, or perspectives to the experience bank
     (`docs/job-search/experience-bank.md`), keyed by facet, not by application.
   - Update an existing entry only when new detail corrects or sharpens it.
   - Propagate a correction to every copy: the bank and `data/resume.yaml` both
     carry facts, so fix all of them in the same pass.
   - Never create a per-application file, and never name a company applied to
     anywhere in the repo or the experience bank.
