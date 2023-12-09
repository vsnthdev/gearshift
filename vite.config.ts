import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Unfonts from 'unplugin-fonts/vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Unfonts({
        google: {
            families: [{
                name: 'Plus Jakarta Sans',
                styles: 'ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700',
                defer: true,
            }],
            display: 'swap',
            injectTo: 'head-prepend',
            preconnect: true,
        }
    })],
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true,
                })
            ]
        }
    }
})
