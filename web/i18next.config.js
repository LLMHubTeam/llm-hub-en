import { defineConfig } from 'i18next-cli';

/** @type {import('i18next-cli').I18nextToolkitConfig} */
export default defineConfig({
  locales: [
    "zh",
    "en",
    "fr",
    "ru"
  ],
  extract: {
    input: [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    ignore: [
      "src/i18n/**/*"
    ],
    output: "src/i18n/locales/{{language}}.json",
    ignoredAttributes: [
      "accept",
      "align",
      "aria-label",
      "autoComplete",
      "className",
      "clipRule",
      "color",
      "crossOrigin",
      "data-index",
      "data-name",
      "data-testid",
      "data-type",
      "defaultActiveKey",
      "direction",
      "editorType",
      "field",
      "fill",
      "fillRule",
      "height",
      "hoverStyle",
      "htmlType",
      "id",
      "itemKey",
      "key",
      "keyPrefix",
      "layout",
      "margin",
      "maxHeight",
      "mode",
      "name",
      "overflow",
      "placement",
      "position",
      "rel",
      "role",
      "rowKey",
      "searchPosition",
      "selectedStyle",
      "shape",
      "size",
      "style",
      "theme",
      "trigger",
      "uploadTrigger",
      "validateStatus",
      "value",
      "viewBox",
      "width"
    ],
    sort: true,
    disablePlurals: false,
    removeUnusedKeys: false,
    nsSeparator: false,
    keySeparator: false,
    mergeNamespaces: true
  }
});