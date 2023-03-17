# Bethel Store - Theme - Shopify 2.0

## 🖥 System Requirements

- [Node](https://nodejs.org/en/) (v16.14.0)
- [NPM](https://docs.npmjs.com/) (v8.3.1)
- [Theme Kit](https://shopify.github.io/themekit/)
  - [Install app](https://apps.shopify.com/theme-kit-access)
- [NVM](https://github.com/nvm-sh/nvm)
  - [Install with home brew](https://formulae.brew.sh/formula/nvm)
    - `brew install nvm`

## 🎬 Setting Up

1. `git clone` the repo
2. `nvm use` && `nvm install`
3. `npm i` to install all node modules.
4. Create a `config.yml` in the root directory.
5. Your `config.yml` file should look like this:
   ```
   development:
     password: <PRIVATE_APP_PASSWORD>
     theme_id: "<THEME_ID>"
     store: <STORE_URL>
     directory: dist/
     ignore_files:
       - config/settings_data.json
       - templates/*.json
   ```
6. Run `npm start` to run the app.

#### Note:

- You might need to run `npm run deploy`
  - If your theme inside Shopify is really outdated.
  - Or if you are setting up a new theme in shopify.

## ⚙️ Configuration

### NPM

#### Scripts

`npm start`

- Completes a Webpack build in **development** mode
- Webpack begins watching for file changes in the `src`folder.
- Theme Kit begins watching for file changes in `dist/`
- Theme Kit opens your development theme in your default browser

`npm run build`

- Completes a Webpack build in **production** mode

`npm run deploy`

- Completes a Webpack build in **production** mode
- Deploys dist folder to the **development** theme in `config.yml`

### Webpack

#### Entry Points

- All JavaScript files in the `js/bundles` directory & subdirectories are used as entry points.
- An entry point file must be created for each liquid template file, including alternate templates.
- A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`.
- These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files

- Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory.
- The CSS files imported in each bundle entry file will also generate CSS files.
- Webpack will add all output files to `dist/assets`.

### Theme Kit

#### Config

- The Theme Kit configuration file uses `dist` as the root directory for watching files to upload.

#### File Uploads

- When running `npm start`, Webpack will use a plugin that runs `shopify-themekit watch` after a successful build.
- Webpack will then watch and recompile entry file changes, and Theme Kit will watch for file changes in the `dist` directory.

## ‼️ Required Files

- The layout and template entry files in `src/js/bundles/` are necessary for Webpack to generate the CSS and JavaScript assets for each layout and template.
- Additional entry files will be required when creating new liquid templates or alternate templates, ie. `page.about.js`.
- The `bundled-styles.liquid` and `bundled-scripts.liquid` snippets output dynamic asset URLs based on current layout and template.
- These have been added to `theme.liquid`. The `layout` variable is required.

#### Shopify Plus Stores

If your store is on Shopify Plus, and you want to edit the checkout, you'll need to do the following:

- Create `checkout.scss` and add to `src/styles/layout/`.
- Create `checkout.js` and add to `src/js/bundles/layout/`.
- Add `import "Styles/layout/checkout.scss";` in `checkout.js`.
- Render the style-bundle and script-bundle snippets in `checkout.liquid` by changing the snippet's layout variable value to `checkout`. ie. `{% render 'style-bundle', layout: 'checkout' %}` and `{% render 'script-bundle', layout: 'checkout' %}`.

## 📝 Notes

- Subdirectories are allowed in `assets/`, `js/`, `styles/`, `snippets/`.
- A `Styles` module alias for the styles directory is ready to use. ie. `import "Styles/layout/theme.scss"`.
- To reference an asset url in an SCSS file such as a background image, just use `./filename.ext`, since all final CSS and images live in the `dist/assets/` directory.
- If you add a new JavaScript entry file to `js/bundles/` while Webpack and Theme Kit are watching for changes, you'll need to end the process and run `npm start` again so that Webpack is aware of the new entry file.

## ⚙️ Theme Tools & Libraries

### Splide

- Use [Splide](https://splidejs.com/) for any carousels or sliders in the theme.

### Sweet Alert 2

- Use [Sweet Alert 2](https://sweetalert2.github.io/) for any modals or popups in the theme.

### Lazy Sizes

- Use [Lazy Sizes](https://github.com/aFarkas/lazysizes) for lazy loading images.
