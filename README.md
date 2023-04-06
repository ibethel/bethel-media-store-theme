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

### Workflow setup

**Store variable**

- When logged into the Shopify admin look at the url to find your myshopify address.
- Should look similar to `some-store-name.myshopify.com`
- Assign variable `SHOPIFY_FLAG_STORE` in your `.env` to that myshopify address.

**Development theme**

- If you do not already have a development theme specific to you then you need to create one.
- If you do not know how to create a development theme contact your developer lead.
- Get your theme id and set `SHOPIFY_CLI_THEME_ID` in your `.env`.

### Workflow

**Pull**

- Always pull and fetch before you begin a new branch `git pull origin staging`, `git fetch origin staging`.
- This is very important as the json files in `/templates`, `/config` change very often by your store users.

**Create new branch**

- Always create a new branch `git checkout -b some-branch-name`.
- Because staging jsons will be changing so often all commits must be merged with pull request.

**npm start**

- Webpack and shopify watch your files. see: [File Uploads](#file-uploads)
- You should see something similart to the following:

**!IMPORTANT**

- Only edit files in the `/src` folder.
  - Within the `/src` folder there are corresponding `/assets`, `/config`, `/layout`, `/locales`, `/sections`, `/snippets`, `/templates` that will build into the `/dev` folder.
  - The `root` folders `/assets`, `/config`, `/layout`, `/locales`, `/sections`, `/snippets`, `/templates` are for production. Shopify reads these from Github and builds the theme. Do not edit these in development mode.
    - These folders are only updated when you `build` right before your push your final commit to your PR.

**npm run build**

- When you are done coding on this branch and are ready to push for merging into staging you must first run `npm run build`.
  - This will build into the `root` folders and allow Shopify to read Github hub and update staging once the PR is merged.

**updating dev jsons(optional)**

- If you would like to update your jsons in your dev environment then update your json in `/dev` and then your dev theme with update the json.

```
Serving <path to>/dev

Please open this URL in your browser:
http://some-local-url

Customize this theme in the Theme Editor, and use 'theme pull' to get the changes:
https://some-store.myshopify.com/admin/themes/<theme-id>/editor

Share this theme preview:
https://some-store.myshopify.com/?preview_theme_id=<theme-id>

(Use Ctrl-C to stop)
```

- The local url will show your development theme

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
