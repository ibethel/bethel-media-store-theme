# Bethel Store - Theme - Shopify 2.0

## 🖥 System Requirements

- [Node](https://nodejs.org/en/) (v16.14.0)
- [NPM](https://docs.npmjs.com/) (v8.3.1)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install)
  - Install with home brew
    - `brew tap shopify/shopify`
    - `brew install shopify-cli`
- [NVM](https://github.com/nvm-sh/nvm)
  - [Install with home brew](https://formulae.brew.sh/formula/nvm)
    - `brew install nvm`
- [Ruby](https://www.ruby-lang.org/en/)
  - [Install with rbenv](https://github.com/rbenv/rbenv)
    - Install with home brew
    - `brew install rbenv ruby-build`
    - Check `.ruby-version` for version to install.

## 🎬 Setting Up

1. `git clone` the repo
2. `nvm use` && `nvm install`
3. `npm i` to install all node modules.
4. Create a `.env` in the root directory.
5. Your `.env` file should look like this: [Shopify CLI Environment](#shopify-cli-environment)
6. Run `npm start` to run the app.

#### Note:

- You might need to run push to your dev theme: [Scripts](#scripts)
  - If your theme inside Shopify is really outdated.
  - Or if you are setting up a new theme in shopify.

## ⚙️ Configuration

#### Scripts

`npm start`

- Completes a Webpack build in **development** mode
- Webpack begins watching for file changes in the `src` folder.
- Shopify CLI begins watching for file changes in `/dev` folder
- Shopify CLI will print out your dev url, customize url and preview share url to use in the terminal.

`npm run build`

- Completes a Webpack build in **production** mode

`npm run build:dev`

- Completes a Webpack build in **development** mode in the `/dev` folder

- If you need to push to your development theme:
  - `shopify theme push -s=<your-store.myshopify.com> -t=<themeid> --password=<themeaccesstoken> --path=dev`

### Webpack

#### Entry Points

- All JavaScript files in the `js/bundles` directory & subdirectories are used as entry points.
- An entry point file must be created for each liquid template file, including alternate templates.
- A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`.
- These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files

- Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory.
- The CSS files imported in each bundle entry file will also generate CSS files.
- **production** Webpack will add all output files to their appropriate folder in the `root` directory.
- **development** Webpack will add all output files to their appropriate folder in the `/dev` directory.

### Shopify CLI Environment

- Get your `token` and `themeid` from your developer lead if you do not already know how to get it.

```
# https://shopify.dev/docs/themes/tools/cli/ci-cd
SHOPIFY_CLI_THEME_TOKEN=<yourthemeaccesspassword>
SHOPIFY_CLI_THEME_ID=<yourthemeid>
SHOPIFY_FLAG_STORE=<your-store.myshopify.com>
# SHOPIFY_CLI_TTY=
```

### File Uploads

- When running `npm start`, Webpack will build into the `/dev` folder.
- Webpack will then watch the `/src` folder for changes.
- When the build has completed Webpack shell will run the Shopify CLI Command to start your sync with your development theme and your `/dev` folder.
- When Shopify CLI has synced your files. Shopify CLI will watch you the `/dev` folder for changes.
- When a change is made Webpack will recompile to the `/dev` folder your change, Shopify CLI will see it and sync that single change to your development theme.

## ‼️ Required Files

- The layout and template entry files in `src/js/bundles/` are necessary for Webpack to generate the CSS and JavaScript assets for each layout and template.
- Additional entry files will be required when creating new liquid templates or alternate templates, ie. `page.about.js`.
- The `bundled-styles.liquid` and `bundled-scripts.liquid` snippets output dynamic asset URLs based on current layout and template.
- These have been added to `theme.liquid`. The `layout` variable is required.

## 📝 Notes

- Subdirectories are allowed in `assets/`, `js/`, `styles/`, `snippets/`.
- A `Styles` module alias for the styles directory is ready to use. ie. `import "Styles/layout/theme.scss"`.
- To reference an asset url in an SCSS file such as a background image, just use `./filename.ext`, since all final CSS and images live in the `dist/assets/` directory.

## ⚙️ Theme Tools & Libraries

### Splide

- Use [Splide](https://splidejs.com/) for any carousels or sliders in the theme.

### Sweet Alert 2

- Use [Sweet Alert 2](https://sweetalert2.github.io/) for any modals or popups in the theme.

### Lazy Sizes

- Use [Lazy Sizes](https://github.com/aFarkas/lazysizes) for lazy loading images.
