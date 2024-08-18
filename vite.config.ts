import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入自动导入 api
import AutoImport from 'unplugin-auto-import/vite';
// 引入配置需要自动导入的组件
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
// 代码分析插件
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    server: {
        // 允许IP访问
        host: "0.0.0.0",
        // 应用端口
        port: 3000,
        // 运行是否自动打开浏览器
        open: true,
    },
    plugins: [
        vue(),
        visualizer({
            open:true
        }),
        AutoImport({
            // 配置需要自动导入的模块
            imports: ['vue', 'vue-router', "pinia",],
            resolvers: [
                // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                ElementPlusResolver(),
                VantResolver()
            ],
            // 导入存放的位置
            dts: false,
        }),
        Components({
            // 导入存放的位置
            dts: false,
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
    },
    // 构建配置
    build: {
        chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
        minify: "terser", //是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
        cssCodeSplit:true, //css 拆分
        sourcemap:false, //不生成sourcemap
        assetsInlineLimit:5000, //小于该值 图片将打包成Base64
        terserOptions: {
            compress: {
                keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
                drop_console: true, // 生产环境去除 console
                drop_debugger: true, // 生产环境去除 debugger
            },
            format: {
                comments: false, // 删除注释
            },
        },
    },
})
