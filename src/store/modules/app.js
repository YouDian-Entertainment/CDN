import { getAllItems, delItemByCondition } from '@common/db';
import DB_NAME from '@constants/db';
import {
    GET_PLATFORM_CONFIG_LIST,
    GET_BUCKET_LIST,
    GET_BUCKET_DOMAIN_LIST,
    GET_BUCKET_CONTENT,
} from '@store/mutationType';
import { TipSuccess } from '@common/tip';
import { getBucketList, getBucketDomain, getBucketContent } from '@common/bucket';
import logger from '@common/logger';

const app = {
    state: {
        platformList: [],
        bucketList: [],
        bucketDomain: [],
        bucketContent: [],
    },
    mutations: {
        GET_PLATFORM_CONFIG_LIST: (state, platformList) => {
            Object.assign(state, {
                platformList,
            });
        },
        GET_BUCKET_LIST: (state, bucketList) => {
            Object.assign(state, {
                bucketList,
            });
        },
        GET_BUCKET_DOMAIN_LIST: (state, bucketDomain) => {
            Object.assign(state, {
                bucketDomain,
            });
        },
        GET_BUCKET_CONTENT: (state, bucketContent) => {
            Object.assign(state, {
                bucketContent,
            });
        },
    },
    actions: {
        // 获取平台配置信息
        getPlatformConfigList: async ({ commit }) => {
            const list = await getAllItems(DB_NAME.platform);
            commit(GET_PLATFORM_CONFIG_LIST, list);
        },
        // 删除配置信息
        delPlatformConfigInfo: async ({ dispatch }, key) => {
            const flag = delItemByCondition(DB_NAME.platform, {
                key,
            });
            if (flag) {
                TipSuccess('删除成功');
                dispatch('getPlatformConfigList');
            }
            return flag;
        },
        // 获取 bucket 列表
        getBucketListData: async ({ commit }) => {
            const list = await getBucketList();
            commit(GET_BUCKET_LIST, list);
        },
        // 获取bucket domain列表
        getBucketDomainData: async ({ commit }, bucketName) => {
            const domainList = await getBucketDomain(bucketName);
            commit(GET_BUCKET_DOMAIN_LIST, domainList);
        },
        // 获取 bucket 内容数据
        getBucketContentData: async ({ commit }, { bucketName, filters={} }) => {
            const contentList = await getBucketContent(bucketName, filters);
            logger.success('获取的content：', contentList);
            commit(GET_BUCKET_CONTENT, contentList);
        },
    }
};

export default app;
