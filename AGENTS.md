# TVBOT Agent Notes

## Static Asset Mirrors

This project keeps duplicated frontend assets. When editing served frontend code, update all relevant mirrors:

- `static/xiaochiPlot/js/...`
- `src/static/xiaochiPlot/js/...`
- `static/xiaochiPlot/minJS/...`
- `src/static/xiaochiPlot/minJS/...`
- sometimes `src/js/...`

The app pages generally serve from `/static/...`, so changes only under `src/...` may not affect the running app.

## Metadata Refresh

Metadata refresh for layer data is keyed by stable `fileKey`, not replacement filename. Do not reintroduce filename equality checks for refresh.

Refresh must preserve existing layer styling: layer names, visibility, positions, widths, fonts, legends, custom colors, and selected columns. Rebind columns by header name when possible.

Category labels are data values, not SVG attribute names. Values such as `6-12` are valid metadata categories but invalid SVG attributes. Do not mark category-value controls as `isSvgAttr: true`, and keep the D3/SVG attr guard in place.

Inactive custom color controls often contain default grey values. Do not use those inactive controls as authoritative colors during metadata refresh.

## Reusing Layers/Params Across Trees

Annotation layers and style params (`layerList`, `layerDataDict`, per-layer
`controlData`) are set up once when the page's Vue app mounts and are not
tied to the currently loaded tree. Loading a different tree file mid-session
via the treefile "select file" control (`onLoadNewFile` in `mainTree.min.js`)
does not reset them — so the same layer configuration and metadata table can
be reused across trees with different leaf sets without rebuilding anything.

Leaf-name matching (`createLayerDataIndex` in `layer.js`) is a plain
string-key lookup that already tolerates mismatched leaf sets: a tree leaf
with no matching row renders blank, and unmatched extra rows are simply
never looked up. No rebinding step is needed on the tree side, unlike the
metadata-table side (see "Metadata Refresh" above).

`onLoadNewFile`'s mid-session ("local") branch resets
`styleData.rootNodeIndex` and `styleData.reverseChildrenList`, and now also
resets `styleData.collapseCladeList` and `styleData.deleteWholeCladeList`, so
clade collapse/delete edits made against the previous tree's node indices
don't leak into a newly loaded tree.

## Validation

Metadata refresh should reject:

- duplicate headers;
- duplicate first-column IDs after trimming;
- missing columns already used by existing layers.

Refresh failures should leave the current tree unchanged.

## Testing

After frontend edits:

- run `node --check` on touched JS files;
- run `git diff --check`;
- hard reload the browser after restarting the Python server, because ES module/static asset caching can keep stale JS loaded.

A plain static `python3 -m http.server` page load may hit local project-manager endpoint shape issues; those are not necessarily related to tree rendering or metadata refresh.
