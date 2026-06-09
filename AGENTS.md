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
