const {getThemeVariables} = require("antd/dist/theme");

const baseTheme = {
    "primary-color": "#1890ff",
    "border-color-base": "#324074",
    "text-color": "#fff",
    "text-color-secondary": "#C1C5CA",
    "link-color": "#5E77FF",
    "popover-background": "#2b3648",
    "body-background": "#2B3648",
    "@popover-background": "#2B3648",
    "table-header-bg": "#2b3648",
    "component-background": "#2B3648",
    'btn-primary-bg': '#1890ff'
};

const getTheme = (options) => {
    return {
        ...getThemeVariables(options),
        ...baseTheme
    }
};

module.exports = {
    getTheme
};