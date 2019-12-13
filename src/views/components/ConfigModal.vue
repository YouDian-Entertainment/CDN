<template>
    <Modal v-model="visiable" :title="`${platformName}配置`" :mask-closable="false" footer-hide @on-visible-change="changeVisiable">
        <Form ref="form" :model="formItem" :rules="formRule" :label-width="120">
            <FormItem prop="ak" label="AccessKey">
                <Input v-model="formItem.ak" placeholder="输入AccessKey"></Input>
            </FormItem>
            <FormItem prop="sk" label="SecretKey">
                <Input v-model="formItem.sk" placeholder="输入SecretKey"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="addConfig">添加配置</Button>
                <Button style="margin-left: 8px" @click="resetForm">重置</Button>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import { mapActions } from 'vuex';
import { Modal, Form, FormItem, Button, Icon, Input } from 'view-design';
import { PLATFORM_VALUE } from '@constants/platform';
import { addItem } from '@common/db';
import DB_NAME from '@constants/db';
export default {
    name: 'ConfigModal', // 配置参数弹框
    components: {
        Modal,
        Form,
        FormItem,
        Button,
        Icon,
        Input,
    },
    props: {
        type: {
            type: String,
            default: '',
        },
    },
    computed: {
        platformName() {
            return PLATFORM_VALUE[this.$props.type] || '';
        },
    },
    data () {
        return {
            visiable: false,
            formItem: {
                ak: '',
                sk: '',
            },
            formRule: {
                ak: [{ required: true, message: '必须输入AccessKey', trigger: 'blur' }],
                sk: [{ required: true, message: '必须输入SecretKey', trigger: 'blur' }],
            }
        };
    },
    methods: {
        ...mapActions([
            'getPlatformConfigList',
        ]),
        show() {
            this.visiable = true;
        },
        hide() {
            this.visiable = false;
            Object.assign(this.$data, this.$options.data());
        },
        changeVisiable(flag) {
            if (!flag) this.resetForm();
        },
        addConfig() {
            const { type } = this.$props;
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const param = {
                        key: type,
                        ak: this.formItem.ak,
                        sk: this.formItem.sk,
                    };
                    const res = await addItem(DB_NAME.platform, param);
                    if (res) {
                        this.hide();
                        await this.getPlatformConfigList();
                    }
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
    }
};
</script>

<style lang="scss" scoped>

</style>
