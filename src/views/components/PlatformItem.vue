<template>
    <div class="platform-item" @click="openOrConfig">
        <div class="platform-name">{{info.name}}</div>
        <img class="platform-logo" :src="info.logo" alt="">
        <Tag v-if="isConfig" color="success">已配置</Tag>
        <Tag v-else color="default">未配置</Tag>
    </div>
</template>

<script>
import { Tag, Badge } from 'view-design';
export default {
    name: 'PlatformItem', // 平台单项菜单
    components: {
        Tag,
        Badge,
    },
    props: {
        info: {
            type: Object,
            default() {
                return {
                    key: '',
                    name: '',
                    logo: '',
                    path: '',
                };
            },
        },
        isConfig: {
            type: Boolean,
            default: false,
        }
    },
    computed: {

    },
    methods: {
        openOrConfig() {
            const { isConfig, info } = this.$props;
            // 判断是否是登录，登录跳转，没登录弹出登录弹框
            if (isConfig) this.$router.push({
                path: info.path,
            });
            this.$emit('config', info.key);
        },
    },
};
</script>

<style lang="less" scoped>
.platform-item {
    // border: @border;
    box-shadow: 0px 0px 10px @gray;
    border-radius: @border-radius;
    background-color: @white;
    .m-b(@gap);
    .flex-column-center();
    height: 130px;
    width: 100px;
    position: relative;
    cursor: pointer;
    .platform-logo {
        width: 50px;
        height: 50px;
        .m-v(@gap-sm);
    }
}
</style>
