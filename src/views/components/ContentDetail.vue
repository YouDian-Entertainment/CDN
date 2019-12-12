<template>
    <Modal v-model="visiable" footer-hide :closable="false" :mask-closable="false">
        <div class="detail">
            <div class="detail-item">
                <div class="item-name">文件名:</div>
                <div class="item-value">{{info.name}}</div>
            </div>
            <div class="detail-item">
                <div class="item-name">文件格式：</div>
                <div class="item-value">{{info.fileExt}}</div>
            </div>
            <div class="detail-item">
                <div class="item-name">文件大小：</div>
                <div class="item-value">{{info.size}}</div>
            </div>
            <div class="detail-item">
                <div class="item-name">更新时间：</div>
                <div class="item-value">{{info.date}}</div>
            </div>
            <div class="detail-item">
                <Button class="close-btn" size="large" type="info" @click="hide">关闭</Button>
            </div>
        </div>
    </Modal>
</template>

<script>
import { Modal, Button } from 'view-design';
export default {
    name: 'ContentDetail', // 详情
    components: {
        Modal,
        Button,
    },
    props: {
        info: {
            type: Object,
            default() {
                return {
                    isImage: false, // 是否是图片，用户直接展示缩略图
                    fileExt: '无', // 文件后缀
                    name: '', // 内容名称，用于列表显示
                    icon: '', // 除图片外，文件展示的图标
                    size: '0 KB', // 文件大小
                    date: '', // 文件最后更新时间
                };
            },
        },
    },
    data() {
        return {
            visiable: false,
        };
    },
    methods: {
        show() {
            this.visiable = true;
        },
        hide() {
            this.visiable = false;
            Object.assign(this.$data, this.$options.data());
        },
    },
};
</script>

<style lang="less">
.detail {
    .detail-item {
        .flex();
        .p-v(@gap-sm);
        .item-name {
            width: 100px;
        }
        .item-value {
            max-width: 70%;
            .text-overflow();
        }
        .close-btn {
            width: 100%;
            .m-t(@gap-lg);
        }
    }
}
</style>
