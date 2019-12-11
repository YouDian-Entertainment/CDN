<template>
    <div class="v-main-layout">
        <Layout>
            <Sider class="left-silder">
                <!-- <BucketList :list="bucketList" @clear="delAuth" /> -->
                <ScrollBar class="main-scroll">
                    <Menu class="v-main-menu" theme="light" @on-select="selectBucket">
                        <MenuGroup title="bucket">
                            <MenuItem v-for="(item, i) in bucketList" :name="item" :key="`bucket_item_${i}`">
                                <!-- <Icon :type="menu.icon" /> -->
                                {{item}}
                            </MenuItem>
                        </MenuGroup>
                    </Menu>
                </ScrollBar>
                <div class="action-btn-list">
                    <Button @click="changePlatform">切换平台</Button>
                    <Button @click="delAuth">退出</Button>
                </div>
            </Sider>
        </Layout>
        <BucketContent />
        <!-- <Layout :style="{marginLeft: '200px'}">
            <Content class="right-content">
                <ScrollBar class="main-content-scrollbar">
                    <slot></slot>
                </ScrollBar>
            </Content>
        </Layout> -->
    </div>
</template>

<script>
import { Sider, Layout, Content, Header, Menu, MenuGroup, MenuItem, Icon, Button} from 'view-design';
import ScrollBar from '@components/ScrollBar';
import MainMenu from './MainMenu';
import BucketList from './BucketList';
import BucketContent from '@views/components/BucketContent';

import { setWindowMax } from '../../common/common';
import { delItemByCondition } from '../../common/db';
import DB_NAME from '../../constants/db';
import logger from '../../common/logger';
import { mapActions } from 'vuex';
export default {
    name: 'MainLayout',
    components: {
        Sider,
        MainMenu,
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
    created() {
        setWindowMax();
    },
    methods: {
        ...mapActions([
            'getBucketContentData',
        ]),
        // 选中bucket
        async selectBucket(name) {
            logger.info('选中的bucket为：', name);
            await this.getBucketContentData({
                bucketName: name,
                filters: {},
            });
        },
        delAuth() {
            const { platform } = this.$props;
            console.log(platform);
            delItemByCondition(DB_NAME.platform, {
                key: platform,
            });
        },
        changePlatform() {
            this.$router.back();
        },
    },
};
</script>

<style lang="less">
@header-height: 40px;
@content-height: 100vh;
.v-main-layout {
    .v-main-header {
        height: @header-height;
        .border-line(@border-color, 0, 0);
    }
    .v-main-content {
        height: @content-height;
    }
    .left-silder {
        height: @content-height;
        position: fixed;
        left: 0;
        background-color: @white;
        user-select: none;
        -webkit-app-region: drag;
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
            .p-t(20px);
            height: 80vh;
            position: relative;
        }
        .v-main-menu {
            width: 100% !important;
        }
    }
    .right-content {
        overflow: hidden;
        height: @content-height;
        .main-content-scrollbar {
            height: @content-height;
        }
    }
}
</style>
