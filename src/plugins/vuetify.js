// import vuetify from 'vuetify';
// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure your project 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, md } from 'vuetify/iconsets/md'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: 'hsl(0, 0%, 100%)',
        surface: '#ffffffff',
        'surface-bright': '#FFFFFF',
        'surface-light': '#EEEEEE',
        'surface-variant': '#424242',
        'on-surface-variant': '#EEEEEE',
        primary: '#FF4400',
        'primary-darken-1': '#1F5592',
        secondary: '#48A9A6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
    variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
    }
}

const myCustomDarkTheme = {
    dark: true,
    colors: {
        background: '#151b23',
        surface: '#0d1117',
        'surface-bright': '#0d1117',
        'surface-light': '#151b23',
        'surface-variant': '#9b9393',
        'on-surface-variant': '#151b23',
        primary: '#FF4400',
        'primary-darken-1': '#1F5592',
        secondary: '#48A9A6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
    variables: {
        'border-color': '#d4d4d4',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.04,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.12,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#F5F5F5',
        'theme-on-code': '#000000',
    }
}

export default createVuetify({
    components,
    directives,
    icons: {
        // defaultSet: 'md',
        aliases,
        sets: {
            md
        },
    },
    display: {
        mobileBreakpoint: 'sm'
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
            myCustomDarkTheme,
            light: {
                colors: {
                    customRed: '#FF4400',
                    customBlue: '#0092FF',
                    customYellow: '#FFD200',
                    customGreen: '#007D3C',
                },
            },
        },
    }
})