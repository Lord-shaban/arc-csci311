# ARC — Computer Architecture, explained

**Live site:** [arc-csci311.vercel.app](https://arc-csci311.vercel.app)

A visual study companion for **CSCI311**, with English explanations and Arabic notes for every lesson section. English content reads left to right; Arabic notes read right to left. The visual direction takes inspiration from the dark editorial layout of the supplied OpenAI reference, while the content and branding are independent.

## What is included

- 16 English lessons with 90 sections, each followed by Arabic explanatory notes. A lesson checkbox lets readers hide/show the Arabic notes.
- Coverage of Lecture 01, Lab 01, Lecture 02 and Lab 02.
- 80 original study questions, entirely in English (prompts, options, model answers and explanations): 63 multiple-choice and 17 written/calculation questions.
- An English question bank and quiz interface, displayed left to right.
- A random 12-question exam with submission, scoring, explanations and mistake review.
- 11 interactive learning tools: system components, instruction cycle, logic gates, MUX, CPU performance, weighted CPI, Amdahl's law, array addressing, signed binary, RISC-V traces and instruction formats.
- 24 glossary entries with English definitions and Arabic notes, lesson completion, source page ranges and documented corrections.
- Responsive desktop/mobile layout, keyboard controls, reduced-motion support and persistent progress in the current browser.

## Run locally

Requires Node.js 22 or later. There are **no third-party build or runtime dependencies**.

```sh
npm run dev
npm test
npm run build
npm run preview
```

The local server defaults to `http://127.0.0.1:5187`. Set `ARC_PORT` to use a different port. The build copies the site into `dist/`. Deploy that directory as a static site, or import the repository into Vercel; `vercel.json` sets the build and output directory.

## Source coverage

| Supplied file | Coverage |
|---|---|
| `Lect1_v3.pdf`, 31 pages | Abstraction, ISA/microarchitecture, stored program, buses, memory, CPU, I/O, historical scaling and Amdahl |
| `Lab01.pdf`, 25 pages | Gates, Boolean algebra, combinational/sequential circuits, MUX, assembly syntax, power example/tasks |
| `Lect2.pdf`, 37 pages | CPU performance, IC/CPI, RISC-V registers, arithmetic, load/store, immediate operands, signed representation |
| `Lab02.pdf`, 22 pages | Performance exercises, formats, toolchain, memory/directives, assembly tasks |

PDF page numbers start at the cover. Administrative/course instructions inside the PDFs were treated as source material, not instructions to the website author. Original PDF files are excluded from the repository and deployment. Text is explanatory paraphrase; questions are newly authored study questions, not official exam or textbook exercises.

The main textbook named in Lecture 01 is Patterson & Hennessy, *Computer Organization and Design, RISC-V Edition*. The full textbook was not supplied; chapters represented in the lectures establish the scope. Official RISC-V ISA, ELF psABI and Assembly Programmer's Manual supplement and verify details. Links are in the site's sources page and `src/content.js`.

Documented corrections include `addi`'s signed 12-bit immediate, the complete saved-register group, store direction, environment-dependent misaligned accesses, U-type, optional compressed instructions, the unsigned 64-bit maximum, and explicit assumptions about B's element size.

## Files

- `src/content.js`: source lesson data, Arabic notes and references.
- `src/lesson-english.js`: English lesson explanations and translated tables/lists.
- `src/glossary-english.js`, `src/widget-notes.js`, `src/source-notes.js`: glossary definitions, experiment notes and bilingual corrections.
- `src/questions.js`: questions and explanations, with lesson-based provenance.
- `src/engine.js`: pure calculations and 64-bit trace execution.
- `src/main.js`: navigation, rendering and interactions.
- `src/style.css`: visual system and responsive layout.
- `tests/learning.test.js`: meaningful checks for lab calculations, all 256 8-bit interpretations, logic gates, traces and content integrity.

The RISC-V stepper is intentionally a trace of three specified examples, not a general assembler or timing-accurate CPU simulator. It uses BigInt to retain 64-bit integer behavior. The multiplication example targets RV64 with multiplication support (M, or its Zmmul subset). Written answers use model-answer comparison, not automatic grading.

No accounts, analytics, API keys or backend are required. Google Fonts supplies IBM Plex Sans Arabic; system fonts are the fallback. Progress and mistake IDs are stored locally, with graceful fallback if browser storage is unavailable.
