<template>
    <div class="v-main">
        <img class="welcome-img" @mousedown="(e) => e.preventDefault()" src="../assets/welcome.svg" alt="">
        <ScrollBar class="v-container">
            <Row class="platform-list">
                <Col span="6" v-for="item in list" :key="item.key">
                    <PlatformItem :info="item" :isConfig="isConfig(item)" @config="openConfig" />
                </Col>
            </Row>
        </ScrollBar>
        <ConfigModal ref="configModal" :type="platformType" @result="refreshConfigData" />
    </div>
</template>

<script>
import { Row, Col } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import ConfigModal from '@views/components/ConfigModal';
import PlatformItem from '@views/components/PlatformItem';
import PLATFORM_LIST from '@constants/platform';

import DB_NAME from '@constants/db';
import { getAllItems, delItem } from '@common/db';
import { setWindowMini } from '@common/common';

window.del = delItem;
// test
import { getQiniuToken, getQiniuBucket, getQiniuBucketList, getQiniuBucketDomain } from '@common/platfrom/qiniu';
import logger from '../common/logger';

export default {
    name: 'Main', // 主页
    components: {
        Row,
        Col,
        ScrollBar,
        ConfigModal,
        PlatformItem,
    },
    data() {
        return {
            list: PLATFORM_LIST,
            platformType: '',
            configList: [],
        };
    },
    async mounted() {
        // 设置窗体大小
        setWindowMini();
        // const token = getQiniuToken();
        // console.log('token', token);
        const res = await getQiniuBucket();
        const list = await getQiniuBucketList({
            bucket: res[0],
            limit: 30,
        });
        console.log('获取的数据为：', list);
        await getQiniuBucketDomain(res[0]);
        this.configList = await getAllItems(DB_NAME.platform);
        logger.success('获取到的数据为：', this.configList);
    },
    computed: {
        isConfig() {
            return item => {
                const arr = this.configList.filter(temp => temp.key === item.key);
                return arr.length > 0;
            };
        },
    },
    methods: {
        openConfig(type) {
            this.platformType = type;
            this.$refs.configModal.show();
        },
        async refreshConfigData() {
            this.configList = await getAllItems(DB_NAME.platform);
        },
    },
};
</script>

<style lang="less">
.v-main {
    -webkit-app-region: drag;
    .flex-column();
    align-items: center;
    height: 100vh;
    .welcome-img {
        width: 300px;
        height: 140px;
        .m-t(30px);
        user-select: none;
    }
    .v-container {
        height: 330px;
        width: 95%;
    }
    .platform-list {
        .m-t(30px);
        .ivu-col {
            .flex-column-center();
            .m-b(@gap);
        }
    }
}
</style>
