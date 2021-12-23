export const fileTree = `
.
├── babel.config.js
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── base.less
│   │   │   ├── element.less
│   │   │   └── index.less
│   │   └── img
│   │       ├── login-bg.svg
│   │       └── logo.svg
│   ├── base-ui
│   │   ├── mh-breadcrumb
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── mh-breadcrumb.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── mh-card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── mh-card.vue
│   │   ├── mh-description
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── mh-description.vue
│   │   ├── mh-echarts
│   │   │   ├── data
│   │   │   │   └── china.json
│   │   │   ├── hooks
│   │   │   │   └── useEchart.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── mh-echarts.vue
│   │   ├── mh-form
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── mh-form.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── mh-outline
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── mh-outline.vue
│   │   ├── mh-table
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── mh-table.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── mh-vditor
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── mh-vditor.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── mh-vditor-preview
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── mh-vditor-preview.vue
│   │   └── typing-animation
│   │       ├── index.ts
│   │       └── src
│   │           └── typing-animation.vue
│   ├── components
│   │   ├── content-page
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── content-page.vue
│   │   ├── echarts-page
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── map-echart-page.vue
│   │   ├── form-dialog
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── form-dialog.vue
│   │   ├── nav-header
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── nav-header.vue
│   │   │       └── user-info.vue
│   │   ├── nav-menu
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── nav-menu.vue
│   │   └── search-page
│   │       ├── index.ts
│   │       └── src
│   │           └── search-page.vue
│   ├── global
│   │   ├── index.ts
│   │   ├── register-element.ts
│   │   ├── register-icon.ts
│   │   └── register-properties.ts
│   ├── hooks
│   │   └── use-page-dialog.ts
│   ├── main.ts
│   ├── router
│   │   ├── index.ts
│   │   └── main
│   │       ├── analysis
│   │       │   └── skill
│   │       │       └── skill.ts
│   │       ├── blog
│   │       │   ├── infos
│   │       │   │   └── infos.ts
│   │       │   ├── menu
│   │       │   │   └── menu.ts
│   │       │   ├── tag
│   │       │   │   └── tag.ts
│   │       │   └── write
│   │       │       └── write.ts
│   │       └── system
│   │           ├── menu
│   │           │   └── menu.ts
│   │           ├── role
│   │           │   └── role.ts
│   │           └── user
│   │               └── user.ts
│   ├── service
│   │   ├── blog
│   │   │   └── blog.ts
│   │   ├── common
│   │   │   ├── common.ts
│   │   │   └── types.ts
│   │   ├── epidemic
│   │   │   └── epidemic.ts
│   │   ├── index.ts
│   │   ├── log
│   │   │   └── operator-log.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── request
│   │   │   ├── config.ts
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   └── types.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── main
│   │   │   ├── analysis
│   │   │   │   ├── skill.ts
│   │   │   │   └── types.ts
│   │   │   ├── blog
│   │   │   │   ├── blog.ts
│   │   │   │   └── types.ts
│   │   │   └── common
│   │   │       ├── common.ts
│   │   │       └── types.ts
│   │   └── types.ts
│   ├── utils
│   │   ├── cache.ts
│   │   ├── encrypt.ts
│   │   ├── event-bus.ts
│   │   ├── handle-array.ts
│   │   ├── handleConfig.ts
│   │   ├── handle-select-option.ts
│   │   ├── handle-time-format.ts
│   │   ├── index.ts
│   │   ├── joint-string.ts
│   │   └── map-menus.ts
│   └── views
│       ├── editor
│       │   └── editor.vue
│       ├── login
│       │   ├── config
│       │   │   └── account-config.ts
│       │   ├── cpns
│       │   │   ├── login-account.vue
│       │   │   ├── login-panel.vue
│       │   │   └── login-phone.vue
│       │   └── login.vue
│       ├── main
│       │   ├── analysis
│       │   │   └── skill
│       │   │       ├── config
│       │   │       │   ├── dependencies.ts
│       │   │       │   ├── dev-dependencies.ts
│       │   │       │   ├── file-tree.ts
│       │   │       │   ├── index.ts
│       │   │       │   └── technology-stacks.ts
│       │   │       ├── cpns
│       │   │       │   ├── china-epidemic.vue
│       │   │       │   ├── operation-log.vue
│       │   │       │   ├── project-structure.vue
│       │   │       │   └── technology-stack.vue
│       │   │       └── skill.vue
│       │   ├── blog
│       │   │   ├── infos
│       │   │   │   ├── config
│       │   │   │   │   └── description.config.ts
│       │   │   │   ├── cpns
│       │   │   │   │   ├── config
│       │   │   │   │   │   └── form.config.ts
│       │   │   │   │   └── editor-infos-dialog.vue
│       │   │   │   └── infos.vue
│       │   │   ├── menu
│       │   │   │   ├── config
│       │   │   │   │   ├── content.config.ts
│       │   │   │   │   └── dialog.config.ts
│       │   │   │   └── menu.vue
│       │   │   ├── tag
│       │   │   │   └── tag.vue
│       │   │   └── write
│       │   │       ├── config
│       │   │       │   ├── content.config.ts
│       │   │       │   ├── dialog.config.ts
│       │   │       │   ├── search.config.ts
│       │   │       │   └── vditor.page.config.ts
│       │   │       └── write.vue
│       │   ├── main.vue
│       │   └── system
│       │       ├── menu
│       │       │   ├── config
│       │       │   │   ├── content.config.ts
│       │       │   │   └── dialog.config.ts
│       │       │   └── menu.vue
│       │       ├── role
│       │       │   ├── config
│       │       │   │   ├── content.config.ts
│       │       │   │   ├── dialog.config.ts
│       │       │   │   └── search.config.ts
│       │       │   └── role.vue
│       │       └── user
│       │           ├── config
│       │           │   ├── content.config.ts
│       │           │   ├── dialog.config.ts
│       │           │   └── search.config.ts
│       │           └── user.vue
│       ├── not-found
│       │   └── not-found.vue
│       ├── preview
│       │   └── preview.vue
│       └── test-editor
│           └── test.vue
├── tsconfig.json
└── vue.config.js

104 directories, 146 files

`
