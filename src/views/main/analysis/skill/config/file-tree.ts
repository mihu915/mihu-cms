export const fileTree = `
│  .browserslistrc
│  .editorconfig
│  .env.development
│  .env.production
│  .env.test
│  .eslintrc.js
│  .gitignore
│  .prettierignore
│  .prettierrc
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md
│  tsconfig.json
│  vue.config.js
│
├─.husky
│  │  pre-commit
│  │
│  └─_
│          .gitignore
│          husky.sh
│
├─public
│      favicon.ico
│      index.html
│
└─src
    │  App.vue
    │  main.ts
    │  shims-vue.d.ts
    │
    ├─assets
    │  ├─css
    │  │      base.less
    │  │      element.less
    │  │      index.less
    │  │
    │  └─img
    │          login-bg.svg
    │          logo.svg
    │
    ├─base-ui
    │  ├─mh-breadcrumb
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      mh-breadcrumb.vue
    │  │  │
    │  │  └─types
    │  │          index.ts
    │  │
    │  ├─mh-card
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          mh-card.vue
    │  │
    │  ├─mh-echarts
    │  │  │  index.ts
    │  │  │
    │  │  ├─data
    │  │  │      china.json
    │  │  │
    │  │  ├─hooks
    │  │  │      useEchart.ts
    │  │  │
    │  │  └─src
    │  │          mh-echarts.vue
    │  │
    │  ├─mh-form
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      mh-form.vue
    │  │  │
    │  │  └─types
    │  │          index.ts
    │  │
    │  └─mh-table
    │      │  index.ts
    │      │
    │      ├─src
    │      │      mh-table.vue
    │      │
    │      └─types
    │              index.ts
    │
    ├─components
    │  ├─content-page
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          content-page.vue
    │  │
    │  ├─echarts-page
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          map-echart-page.vue
    │  │
    │  ├─form-dialog
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          form-dialog.vue
    │  │
    │  ├─nav-header
    │  │  │  index.ts
    │  │  │
    │  │  ├─src
    │  │  │      nav-header.vue
    │  │  │      user-info.vue
    │  │  │
    │  │  └─types
    │  ├─nav-menu
    │  │  │  index.ts
    │  │  │
    │  │  └─src
    │  │          nav-menu.vue
    │  │
    │  └─search-page
    │      │  index.ts
    │      │
    │      └─src
    │              search-page.vue
    │
    ├─global
    │      index.ts
    │      register-element.ts
    │      register-properties.ts
    │
    ├─hooks
    │      use-page-dialog.ts
    │
    ├─router
    │  │  index.ts
    │  │
    │  └─main
    │      ├─analysis
    │      │  └─skill
    │      │          skill.ts
    │      │
    │      └─system
    │          ├─menu
    │          │      menu.ts
    │          │
    │          ├─role
    │          │      role.ts
    │          │
    │          └─user
    │                  user.ts
    │
    ├─service
    │  │  axios-demo.ts
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─epidemic
    │  │      epidemic.ts
    │  │
    │  ├─login
    │  │      login.ts
    │  │      types.ts
    │  │
    │  ├─request
    │  │      config.ts
    │  │      index.ts
    │  │      type.ts
    │  │
    │  └─system
    │          system.ts
    │          types.ts
    │
    ├─store
    │  │  index.ts
    │  │  types.ts
    │  │
    │  ├─login
    │  │      login.ts
    │  │      types.ts
    │  │
    │  └─main
    │      ├─analysis
    │      │      skill.ts
    │      │      types.ts
    │      │
    │      └─common
    │              common.ts
    │              types.ts
    │
    ├─utils
    │      cache.ts
    │      encrypt.ts
    │      event-bus.ts
    │      handle-array.ts
    │      handle-time-format.ts
    │      handleConfig.ts
    │      index.ts
    │      map-menus.ts
    │      map-role.ts
    │
    └─views
        ├─login
        │  │  login.vue
        │  │
        │  ├─config
        │  │      account-config.ts
        │  │
        │  └─cpns
        │          login-account.vue
        │          login-panel.vue
        │          login-phone.vue
        │
        ├─main
        │  │  main.vue
        │  │
        │  ├─analysis
        │  │  └─skill
        │  │      │  skill.vue
        │  │      │
        │  │      ├─config
        │  │      │      file-tree.ts
        │  │      │
        │  │      └─cpns
        │  │              china-epidemic.vue
        │  │              operation-log.vue
        │  │
        │  └─system
        │      ├─menu
        │      │  │  menu.vue
        │      │  │
        │      │  └─config
        │      │          content.config.ts
        │      │          dialog.config.ts
        │      │
        │      ├─role
        │      │  │  role.vue
        │      │  │
        │      │  └─config
        │      │          content.config.ts
        │      │          dialog.config.ts
        │      │          search.config.ts
        │      │
        │      └─user
        │          │  user.vue
        │          │
        │          └─config
        │                  content.config.ts
        │                  dialog.config.ts
        │                  search.config.ts
        │
        └─not-found
                not-found.vue


`
