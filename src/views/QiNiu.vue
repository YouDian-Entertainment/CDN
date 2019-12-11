<template>
    <div class="v-base-content">
        <MainLayout :bucketList="bucketList" platform="qiniu">
            <div v-for="(item, index) in bucketContent" :key="index">{{item.key}}</div>
        </MainLayout>
        <!-- 左右布局 -->
        <!-- 左边显示平台，bucket，退出操作等 -->
        <!-- 右边显示内容、内容操作 -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MainLayout from '@views/layout/MainLayout';
import { PLATFORM_KEY_MAP } from '../constants/platform';
import { initConfig } from '@common/bucket';
export default {
    name: 'QiNiu', // 七牛
    components: {
        MainLayout,
    },
    computed: {
        ...mapState({
            configList: state => state.app.platformList,
            bucketList: state => state.app.bucketList,
            bucketContent: state => state.app.bucketContent,
        }),
    },
    async created() {
        await this.getPlatformConfigList();
        console.log(this.configList);
        const config = this.configList.filter(item => item.key === PLATFORM_KEY_MAP.qiniu)[0];
        // 初始化配置
        initConfig(config, PLATFORM_KEY_MAP.qiniu);
        await this.getBucketListData();
    },
    methods: {
        ...mapActions([
            'getPlatformConfigList',
            'getBucketListData',
        ]),
    },
};
</script>

<style lang="less">
.v-base-content {}
</style>
