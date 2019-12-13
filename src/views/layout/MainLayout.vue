<template>
    <div class="v-main-layout">
        <Layout>
            <Sider class="left-silder">
                <div class="platform-logo">
                    <img class="logo" :src="platformLogo" alt="platformName">
                    <div class="name">{{platformName}}</div>
                </div>
                <ScrollBar class="main-scroll">
                    <Menu class="v-main-menu" theme="light" @on-select="selectBucket">
                        <MenuGroup title="存储空间列表">
                            <MenuItem v-for="(item, i) in bucketList" :name="item.bucket" :key="`bucket_item_${i}`">{{item.bucket}}</MenuItem>
                        </MenuGroup>
                    </Menu>
                </ScrollBar>
                <div class="action-btn-list">
                    <Button @click="changePlatform" type="info">切换平台</Button>
                    <Button @click="delAuth" type="error">退出</Button>
                </div>
            </Sider>
        </Layout>
        <BucketContent :contentList="bucketContent" :domainList="bucketDomain" :bucket="bucket" :loading="showSpin" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Sider, Layout, Content, Header, Menu, MenuGroup, MenuItem, Icon, Button} from 'view-design';
import ScrollBar from '@components/ScrollBar';
import BucketList from '@views/layout/BucketList';
import BucketContent from '@views/components/BucketContent';

import { setWindowMax } from '@common/common';
import { delItemByCondition } from '@common/db';
import DB_NAME from '@constants/db';
import logger from '@common/logger';
import { PLATFORM_LOGO, PLATFORM_VALUE } from '@constants/platform';

export default {
    name: 'MainLayout',
    components: {
        Sider,
        Header,
        Layout,
        Content,
        ScrollBar,
        BucketList,
        Menu,
        MenuItem,
        MenuGroup,
        Button,
        BucketContent,
    },
    props: {
        platform: String,
        bucketList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    computed: {
        ...mapState({
            bucketContent: state => state.app.bucketContent,
            bucketDomain: state => state.app.bucketDomain,
        }),
        platformLogo() {
            const { platform } = this.$props;
            return PLATFORM_LOGO[platform];
        },
        platformName() {
            const { platform } = this.$props;
            return PLATFORM_VALUE[platform];
        },
    },
    data() {
        return {
            bucket: '',
            showSpin: false,
        };
    },
    created() {
        setWindowMax();
    },
    methods: {
        ...mapActions([
            'getBucketDomainData',
            'getBucketContentData',
            'clearPlatformInfo',
        ]),
        // 选中bucket
        async selectBucket(name) {
            const { bucketList } = this.$props;
            logger.info('选中的bucket为：', name);
            this.bucket = name;
            const param = bucketList.filter(item => item.bucket === name)[0];
            this.showSpin = true;
            logger.info('获取参数为', param);
            await this.getBucketContentData({
                bucketParam: param,
                filters: {},
            });
            logger.info('获取结果为', this.bucketContent);
            await this.getBucketDomainData(name);
            this.showSpin = false;
        },
        async delAuth() {
            const { platform } = this.$props;
            const flag = await delItemByCondition(DB_NAME.platform, {
                key: platform,
            });
            if (flag) {
                this.$router.replace('/');
            }
        },
        changePlatform() {
            this.$router.replace('/');
            this.clearPlatformInfo();
        },
    },
};
</script>

<style lang="less">
@footer-height: 100px;
@content-height: 100vh;
@logo-height: 140px;
.v-main-layout {
    .left-silder {
        height: @content-height;
        position: fixed;
        left: 0;
        background-color: @white;
        user-select: none;
        -webkit-app-region: drag;
        .platform-logo {
            -webkit-app-region: drag;
            width: 100%;
            .flex-column-center();
            height: @logo-height;
            .logo {
                height: 80px;
                width: 80px;
            }
            .name {
                .font-size-md();
                .m-t(@gap);
            }
        }
        .ivu-menu-item-group-title {
            -webkit-app-region: drag;
        }
        &::after {
            content: '';
            display: block;
            width: 1px;
            height: 100%;
            position: absolute;
            background-color: #dedee2;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
        }
        .main-scroll {
            height: calc(@content-height - @footer-height - @logo-height);
            position: relative;
        }
        .v-main-menu {
            width: 100% !important;
        }
        .action-btn-list {
            height: @footer-height;
            .flex-column-center();
            .ivu-btn {
                width: 90%;
                .m-t(@gap);
            }
        }
    }
}
</style>
