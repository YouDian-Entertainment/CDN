<template>
    <Layout class="bucket-content" :style="{marginLeft: '200px'}">
        <Header class="content-header">
            <div class="left-select-content">
                <span class="label">协议:</span>
                <Select v-model="protocol" style="width:100px">
                    <Option v-for="item in protocolList" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <template v-if="domainList.length > 0">
                    <span class="label">域名:</span>
                    <Select v-model="domain" style="width:160px">
                        <Option v-for="item in domainList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </template>
            </div>
        </Header>
        <Content class="right-content">
            <ScrollBar class="main-content-scrollbar">
                <Spin size="large" fix v-if="loading"></Spin>
                <div class="content-list">
                    <template v-for="(item, index) in contentList" >
                        <MouseRight :mouseData="mouseData" :key="index" :mouseKey="item">
                            <ContentItem :info="item" :domain="domain" :protocol="protocol" />
                        </MouseRight>
                    </template>
                </div>
            </ScrollBar>
            <ContentDetail ref="detail" :info="detailInfo" />
        </Content>
    </Layout>
</template>

<script>
import { mapActions } from 'vuex';
import { Layout, Header, Content, Select, Option, Spin } from 'view-design';
import ScrollBar from '@components/ScrollBar';
import MouseRight from '@components/MouseRight';
import ContentItem from '@views/components/ContentItem';
import ContentDetail from '@views/components/ContentDetail';

import logger from '@common/logger';
import { TipSuccess, TipError, TipWarning, TipLoading } from '@common/tip';
import { Copy } from '@common/common';

export default {
    name: 'BucketContent',// bucket 内容
    components: {
        Layout,
        Header,
        Content,
        ScrollBar,
        MouseRight,
        ContentItem,
        Select,
        Option,
        ContentDetail,
        Spin,
    },
    props: {
        contentList: {
            type: Array,
            default() {
                return [];
            },
        },
        domainList: {
            type: Array,
            default() {
                return [];
            },
        },
        bucket: {
            type: Object,
            default() {
                return {};
            },
        },
        loading: Boolean,
    },
    watch: {
        domainList(val) {
            if (val) {
                this.domain = val[0] || '';
            }
        },
    },
    data() {
        return {
            domain: '',
            protocol: 'http',
            protocolList: ['http', 'https'],
            detailInfo: {},
            mouseData: [{
                text: '查看详情',
                action: (val) => {
                    this.detailInfo = val;
                    this.$refs.detail.show();
                },
            }, {
                text: '下载',
                action: (val) => {
                    TipSuccess('你点击了成功菜单！');
                    logger.success(JSON.stringify(val));
                },
            }, {
                text: '复制链接',
                action: (val) => {
                    const { name, url } = val;
                    const copyVal = url ? url : `${this.protocol}://${this.domain}/${name}`;
                    Copy(copyVal);
                    TipSuccess('链接复制成功');
                },
            }, {
                text: '删除',
                action: async (val) => {
                    const { bucket } = this.$props;
                    if (bucket) {
                        await this.delBucketContent({ bucketParam: bucket, key: val.key });
                    }
                },
            }],
        };
    },
    methods: {
        ...mapActions([
            'delBucketContent',
        ]),
    },
};
</script>

<style lang="less">
@header-height: 64px;
@content-height: 100vh;
.bucket-content {
    .content-header {
        height: @header-height;
        background-color: @white;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        .p-h(@gap);
        -webkit-app-region: drag;
        .left-select-content {
            .label {
                .m-h(@gap-sm);
            }
        }
    }
    .content-list {
        width: 100%;
    }
    .right-content {
        overflow: hidden;
        height: calc(@content-height - @header-height);
        .main-content-scrollbar {
            height: calc(@content-height - @header-height);
        }
    }
}
</style>
