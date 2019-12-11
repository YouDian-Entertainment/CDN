<template>
    <div class="v-bucket-list">
        <ScrollBar class="main-scroll">
            <Menu class="v-main-menu" theme="light">
                <MenuGroup title="bucket">
                    <MenuItem v-for="(item, i) in list" :name="item" :key="`bucket_item_${i}`">
                        <!-- <Icon :type="menu.icon" /> -->
                        {{item}}
                    </MenuItem>
                </MenuGroup>
            </Menu>
        </ScrollBar>
        <div class="action-btn-list">
            <Button @click="changePlatform">切换平台</Button>
            <Button @click="clearAuth">退出</Button>
        </div>
    </div>
</template>

<script>
import { Menu, MenuGroup, MenuItem, Icon, Button } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import logger from '../../common/logger';
export default {
    name: 'BucketList', // bucket列表
    components: {
        ScrollBar,
        Menu,
        MenuItem,
        MenuGroup,
        Button,
    },
    props: {
        list: {

        },
    },
    data() {
        return {
            bucketList: ['eee', 'ssss'],
        };
    },
    methods: {
        changePlatform() {
            this.$router.back();
        },
        clearAuth() {
            logger.info('清除授权信息');
            this.$emit('clear');
        },
    },
};
</script>

<style lang="less">
.v-bucket-list {
    height: 100vh;
    -webkit-app-region: drag;
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
</style>
