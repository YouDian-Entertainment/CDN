<template>
    <div class="v-base-content">
        <MainLayout :bucketList="bucketList" :platform="platform"></MainLayout>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import MainLayout from '@views/layout/MainLayout';
import { PLATFORM_KEY_MAP } from '../constants/platform';
import { initConfig } from '@common/bucket';
import logger from '@common/logger';

export default {
    name: 'Bucket', // 七牛
    components: {
        MainLayout,
    },
    computed: {
        ...mapState({
            configList: state => state.app.platformList,
            bucketList: state => state.app.bucketList,
        }),
    },
    data() {
        return {
            platform: '',
        };
    },
    async created() {
        const { platform } = this.$route.query;
        logger.info('当前平台为：', platform);
        this.platform = platform;
        await this.getPlatformConfigList();
        logger.info('获取到的配置列表为：', this.configList);
        const config = this.configList.filter(item => item.key === platform)[0];
        // 初始化配置
        initConfig(config, platform);
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
