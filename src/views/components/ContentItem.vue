<template>
    <Card class="content-item">
        <img class="img-item" v-if="info.isImage && imageSrc" :src="imageSrc" :alt="info.name">
        <img v-else class="item-icon" :src="info.icon" :alt="info.name">
        <div class="item-name">{{info.name}}</div>
    </Card>
</template>

<script>
import { Card, Icon } from 'view-design';
import { FILE_TYPE } from '@constants/file';
export default {
    name: 'ContentItem', // bucket 内容列表
    components: {
        Card,
        Icon,
    },
    props: {
        info: {
            type: Object,
            default() {
                return {};
            },
        },
        domain: {
            type: String,
            default: '',
        },
        protocol: {
            type: String,
            default: '',
        },
    },
    computed: {
        isImage() {
            const { mimeType } = this.$props.info;
            return FILE_TYPE.image.indexOf(mimeType) > -1;
        },
        imageSrc() {
            const { info, domain, protocol } = this.$props;
            if (!info || !domain || !protocol) {
                return false;
            }
            return `${protocol}://${domain}/${info.name}`;
        },
    },
};
</script>

<style lang="less">
@item-size: 155px;
.content-item {
    width: @item-size;
    height: @item-size;
    .m(@gap);
    float: left;
    background-color: transparent;
    border: none;
    overflow: hidden;
    .ivu-card-body {
        .p(0);
        width: 100%;
        .flex-column-center();
    }
    .img-item,
    .item-icon  {
        height: calc(@item-size - 30px);
    }
    .item-name {
        height: 30px;
        line-height: 30px;
        color: @tip-color;
        max-width: 90%;
        .text-overflow();
    }
}
</style>
