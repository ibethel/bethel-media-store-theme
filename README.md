# Bethel Store - Theme - Shopify 2.0

- Developer: rob.berryhill@bethel.com

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
4. Create a `config.yml` in the root directory.
5. Your `config.yml` file should look similar to this: [Config file](https://shopify.dev/docs/storefronts/themes/tools/theme-kit/configuration-reference#config-file)
6. Make sure to setup your `config.yml` to accomodate a development, staging and production theme on Shopify.
7. Run `npm start` to run the app.

## ⚙️ Configuration

- Your tech lead can give you the information you need for the staging and production themes for your `config.yml`
- You must duplicate the production theme to create your development theme.
  - Rename your theme to `Dev - <Your Name>`
  - To get your theme id:
    - Go to your theme in Shopify > Click `...` > Click `Edit code`
    - Your theme id is at the end of the url in the browser.
- Your tech lead will give you your password token for each environment in the `config.yml`

### Workflow setup

### Workflow

- Development

  - `npm run build:dev` to build the theme into production folder `/dev`
  - `npm run start` to start your dev environment.
    - Webpack will watch your `/src` and theme kit will watch your `/dev` and change the files on your dev theme.

- Staging

  - Once you are finished with development deploy test your theme to the staging theme.
  - `npm run build` to build the theme into production folder `/dist`
  - `theme deploy --env=staging` to deploy to staging.

- Production
  - Once you are finished testing your the staging theme deploy to production.
  - `npm run build` to build the theme into production folder `/dist` if it is not already.
  - `theme deploy --env=production --allow-live` to deploy to staging.

#### Scripts

`npm start`

- Completes a Webpack build in **development** mode
- Webpack begins watching for file changes in the `src` folder.
- Shopify Theme kit begins watching for file changes in `/dev` folder
- Shopify Theme kit should automatically open your theme in the browser.
  - If it does not then you must navigate to your theme in Shopify and open a preview to see your changes.

`npm run build`

- Completes a Webpack build in **production** mode in the `/dist`

`npm run build:dev`

- Completes a Webpack build in **development** mode in the `/dev` folder

### Webpack

#### Entry Points

- All JavaScript files in the `js/bundles` directory & subdirectories are used as entry points.
- An entry point file must be created for each liquid template file, including alternate templates.
- A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`.
- These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files

- Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory.
- The CSS files imported in each bundle entry file will also generate CSS files.
- **production** Webpack will add all output files to their appropriate folder in the `/dist` directory.
- **development** Webpack will add all output files to their appropriate folder in the `/dev` directory.

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
