# TVBOT Local Offline Build

This repository is a modified local/offline-friendly version of the original
TVBOT project by Xie et al. The original project is available at:

- https://github.com/1996xjm/TVBOT
- https://www.chiplot.online/tvbot.html

The changes in this copy are focused on making the tree editor pages practical
to run from a local static file server. This is not an official upstream TVBOT
release.

## What Was Changed

- Added root-level HTML entry points so `python3 -m http.server` can serve the
  app directly from the repository root.
- Added local static copies of required JavaScript, CSS, fonts, icons, and
  example assets.
- Replaced CDN/runtime library references with local files under
  `/static/vendor`.
- Fixed missing `cuIcon-*` icon glyph mappings.
- Added local API stubs for endpoints used by the browser app.
- Replaced the original online `tvbot.html` page with a simple offline launcher.
- Disabled outbound analytics/help/video links that interfere with offline use.

## Run Locally

From the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/tvbot.html
```

The launcher links to:

- `http://localhost:8080/normalTree.html`
- `http://localhost:8080/circleTree.html`
- `http://localhost:8080/unrootedTree.html`

You can also open those editor pages directly.

## Current Scope

This build is intended for local interactive use of the TVBOT tree editors. The
cloud gallery, online documentation, account features, analytics, and remote
save/load behavior are intentionally not part of this local build.

Known limitation: the editor may log a non-blocking `TypeError: i is not
iterable` from the original app's tree data handling path. The sample trees
still render in local testing.

## Original Citation

If you use TVBOT in research, cite the original paper:

> Xie, J., Chen, Y., Cai, G., Cai, R., Hu, Z., & Wang, H. (2023). Tree
> Visualization By One Table (tvBOT): a web application for visualizing,
> modifying and annotating phylogenetic trees. Nucleic Acids Research, gkad359.
> https://doi.org/10.1093/nar/gkad359
