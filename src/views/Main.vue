<template>
    <div class="v-main">
        <img class="welcome-img" src="../assets/welcome.svg" alt="">
        <ScrollBar class="v-container">
            <Row class="platform-list">
                <Col span="6" v-for="item in list" :key="item.key">
                    <PlatformItem :info="item" :isConfig="isConfig(item)" @config="openConfig" />
                </Col>
            </Row>
        </ScrollBar>
        <ConfigModal ref="configModal" :type="platformType" />
    </div>
</template>

<script>
import { Row, Col } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import ConfigModal from '@views/components/ConfigModal';
import PlatformItem from '@views/components/PlatformItem';
import PLATFORM_LIST from '@constants/platform';

import DB_NAME from '@constants/db';
import { getAllItems } from '@common/db';

// test
import { getQiniuToken, getQiniuBucket, getQiniuBucketList, getQiniuBucketDomain } from '@common/platfrom/qiniu';

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
        .m-t(100px);
    }
    .v-container {
        height: 400px;
        width: 50%;
    }
    .platform-list {
        .m-t(50px);
        .ivu-col {
            .flex-column-center();
            .m-b(@gap);
        }
    }
}
</style>
