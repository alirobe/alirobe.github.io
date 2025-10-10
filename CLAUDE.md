# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo-based personal website for Ali Robertson (https://www.ali.id.au), focused on technical resources for Microsoft 365, Dynamics 365, and Power Platform. The site is deployed to GitHub Pages from the `gh-pages` branch.

## Development Commands

### Local Development

```bash
hugo server
```

The site runs at `http://localhost:1313` with live reload enabled.

### Build Commands

```bash
# Production build (used by CI/CD)
hugo --gc --minify

# Standard build with garbage collection
hugo --gc
```

### Hugo Installation

Requires Hugo extended version. Install from https://gohugo.io/installation/

## Architecture

### Site Structure

- **Working Branch**: `gh-pages` (deployments trigger on push to this branch)
- **Main Branch**: `master` (use for PRs)
- **Hugo Version**: 0.140.2 (specified in `.github/workflows/hugo.yml`)
- **Timezone**: Australia/Melbourne (used in build environment)

### Content Organization

Content uses a hierarchical structure with custom front matter:

1. **Resource Type System**: Pages use `restype` parameter to group related content
   - `restype: power` - D365/Power Platform resources
   - `restype: m365` - M365/SharePoint resources
   - Other types as defined in content

2. **Front Matter Schema** (for resource pages):
   - `type: resources` - Sets layout template
   - `restype: <type>` - Category for grouping
   - `order: <number>` - Controls sort order in lists
   - `link: <text>` - Required for inclusion in resource lists
   - `title: <text>` - Page title
   - `subtitle: <text>` - Optional subtitle displayed below title

3. **Section Index Pages** (`_index.md`):
   - Must have `link` parameter to appear in parent resource list
   - Use `resource-list` shortcode to display child pages: `{{< resource-list restype="power" >}}`
   - Filtered by matching `restype` values

### Layout System

The site uses Hugo's template hierarchy with custom layouts for resources:

1. **Base Layout** (`layouts/_default/baseof.html`):
   - Two-column layout: sidebar + main content
   - Partials: `head.html`, `sidebar.html`, `header.html`, `footer.html`

2. **Resource Layouts** (`layouts/resources/`):
   - `section.html` - For resource category pages (e.g., `/resources/d365-power-platform/`)
     - Special logic for `/resources/` index to list all subsections
     - Sorts subsections by `Params.order`
   - `single.html` - For individual resource pages

3. **Resource List Shortcode** (`layouts/shortcodes/resource-list.html`):
   - Filters pages by `restype` parameter
   - Requires `link` parameter to be included
   - Excludes current page from list
   - Sorts by `Params.order`
   - Outputs as `<dl>` with title as link and optional subtitle

### Hugo Configuration Notes

- **Permalinks**: `page = "/:sections[last]/"` - uses only the last section in URL path
- **Markup**: Goldmark renderer with `unsafe = true` (allows raw HTML in markdown)
- **Code Highlighting**: `codeFences = false` - disabled
- **Taxonomies**: Disabled (`disableKinds = ["taxonomy", "term"]`)

### Deployment

GitHub Actions workflow (`.github/workflows/hugo.yml`):

- Triggers on push to `gh-pages` branch or manual dispatch
- Builds with Hugo extended v0.140.2
- Uses `--gc --minify` flags for production
- Sets `HUGO_ENVIRONMENT=production` and `TZ=Australia/Melbourne`
- Deploys to GitHub Pages via artifacts

### 404 Page and Redirects

The 404 page (`layouts/404.html`) includes client-side redirect logic to handle renamed or moved pages:

**IMPORTANT**: When renaming or moving pages, update the 404 page redirect configuration to maintain backward compatibility with old URLs.

The redirect system supports two types of mappings:

1. **Exact Redirects** (`redirects` array):
   - For specific old URLs that map to new URLs
   - Format: `['/old/path/', '/new/path/']`
   - Example: `['/resoures/sharepoint/', '/resources/m365-sharepoint/']`

2. **Pattern Replacements** (`replacements` array):
   - For pattern-based URL transformations
   - Format: `['/old-pattern/', '/new-pattern/']`
   - Replaces all instances of the pattern in the URL
   - Example: `['/sharepoint-resources/', '/resources/m365-sharepoint/']`

The redirect script also ensures all URLs end with a trailing slash. Make sure all internal links in content use trailing slashes for consistency.

## Content Guidelines

When adding new resource pages:

1. Include required front matter: `type`, `restype`, `order`, `link`, `title`
2. Add `subtitle` for description in parent lists
3. Ensure `order` values maintain logical grouping
4. Resource pages with same `restype` appear together via the shortcode
5. Pages without `link` parameter won't appear in resource lists

### Link Formatting

**Microsoft URLs**: Remove locale codes (e.g., `/en-us/`) from Microsoft Learn and official Microsoft URLs to allow automatic redirection to the user's preferred language:

- Use: `https://learn.microsoft.com/power-platform/alm/`
- Not: `https://learn.microsoft.com/en-us/power-platform/alm/`
