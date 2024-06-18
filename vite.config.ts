import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入自动导入 api
import AutoImport from 'unplugin-auto-import/vite';
// 引入配置需要自动导入的组件
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            // 配置需要自动导入的模块
            imports: ['vue', 'vue-router'],
            // 导入存放的位置
            dts: 'src/types/auto-import.d.ts',
        }),
        Components({
            // 导入存放的位置
            dts: 'src/types/components.d.ts',
            // 配置需要自动导入的第三方UI库
            resolvers: [ElementPlusResolver(), VantResolver()],
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
