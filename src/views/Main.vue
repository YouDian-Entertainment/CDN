<template>
    <div class="v-main">
        <img class="welcome-img" src="../assets/welcome.svg" alt="">
         <ScrollBar class="v-container">
            <Row class="platform-list">
                <Col span="6" v-for="item in list" :key="item.key">
                    <PlatformItem :info="item" :isConfig="isConfig(item)" />
                </Col>
            </Row>
        </ScrollBar>
    </div>
</template>

<script>
import { Row, Col } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import PlatformItem from '@views/components/PlatformItem';
import PLATFORM_LIST from '@constants/platform';
export default {
    name: 'Main', // 主页
    components: {
        Row,
        Col,
        ScrollBar,
        PlatformItem,
    },
    data() {
        return {
            list: PLATFORM_LIST,
        };
    },
    computed: {
        isConfig() {
            return item => {
                if (item.key === 'aliyun') return true;
                return false;
            };
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
