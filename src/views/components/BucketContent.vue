<template>
    <Layout class="bucket-content" :style="{marginLeft: '200px'}">
        <Header class="content-header">域名：sdsdf</Header>
        <Content class="right-content">
            <ScrollBar class="main-content-scrollbar">
                <MouseRight :mouseData="mouseData" :mouseKey="{key: '123'}">
                    <div>dfgjhsadfikjgjsdklfgjskdfjgk</div>
                </MouseRight>
            </ScrollBar>
        </Content>
    </Layout>
</template>

<script>
import { Layout, Header, Content } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import MouseRight from '@components/MouseRight';

import logger from '@common/logger';
import { TipSuccess, TipError, TipWarning, TipLoading } from '@common/tip';

export default {
    name: 'BucketContent',// bucket 内容
    components: {
        Layout,
        Header,
        Content,
        ScrollBar,
        MouseRight,
    },
    props: {
        contentList: {
            type: {},
        },
    },
    data() {
        return {
            mouseData: [{
                text: '下载',
                action: (val) => {
                    TipSuccess('你点击了成功菜单！');
                    logger.success(JSON.stringify(val));
                },
            }, {
                text: '复制链接',
                action: (val) => {
                    TipError('你点击了错误菜单！');
                    logger.error(JSON.stringify(val));
                },
            }, {
                text: '删除',
                action: (val) => {
                    TipWarning('你点击了警告菜单！');
                    logger.warn(JSON.stringify(val));
                },
            }],
        };
    },
};
</script>

<style lang="less">
.bucket-content {
    .content-header {}
}
</style>
