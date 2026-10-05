# Fact-check pass-2 labels

Saved on 2026-10-05 from the session scratchpad.

- `next100.json`: the 100 pairs that pass 2 reviewed, with the verifier output.
- `verd.json`: the pass-1 ranking with the verdict for each reviewed pair (`v`, `cat`) and the Jev scores (`sup`, `con`).

See `docs/facts/2026-10-05-fact-check-pass2.md` for the final verdicts.

## Pass 3

- `pass3.json`: the final pass-3 verdicts (after refutation) for all 712 pairs of `lab/holdout-pass3.json`, with category, evidence, fixes and added sources. `PASS3_REVIEWED` in `reviewed.ts` is built from it. See `docs/facts/2026-10-05-fact-check-pass3.md`.
