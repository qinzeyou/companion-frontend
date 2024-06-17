import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    css: {
        // css预处理
        preprocessorOptions:{
            scss:{
                //  引入全局预定义变量
                additionalData: `@import "./src/assets/css/variables.scss";`,
            }
        }
    },
    resolve: {
        // 设置路径别名
        alias: {
            '@': resolve(__dirname, './src'),
            '*': resolve('')
        },
    }
})
