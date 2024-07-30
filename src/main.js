import { createApp } from 'vue'
import App from './App.vue'

import { inject } from '@vercel/analytics';
const isProductionEnv = import.meta.env.PROD;
inject({
    mode: isProductionEnv ? 'production' : 'development',
});

createApp(App).mount('#app')
