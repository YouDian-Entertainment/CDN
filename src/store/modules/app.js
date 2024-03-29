import { getAllItems, delItemByCondition } from '@common/db';
import DB_NAME from '@constants/db';
import {
    GET_PLATFORM_CONFIG_LIST,
    GET_BUCKET_LIST,
    GET_BUCKET_DOMAIN_LIST,
    GET_BUCKET_CONTENT,
    CLEAR_PLATFORM_INFO,
} from '@store/mutationType';
import { TipSuccess, TipError } from '@common/tip';
import { getBucketList, getBucketDomain, getBucketContent, delBucketContentItem } from '@common/bucket';
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
                bucketDomain: [],
            });
        },
        CLEAR_PLATFORM_INFO: (state) => {
            Object.assign(state, {
                bucketList: [],
                bucketDomain: [],
                bucketContent: [],
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
            logger.success('获取的domain：', domainList);
            commit(GET_BUCKET_DOMAIN_LIST, domainList);
        },
        // 获取 bucket 内容数据
        getBucketContentData: async ({ commit, dispatch }, { bucketParam, filters={} }) => {
            const contentList = await getBucketContent(bucketParam, filters);
            logger.success('获取的content：', contentList);
            commit(GET_BUCKET_CONTENT, contentList);
            dispatch('getBucketDomainData', bucketParam.bucket);
        },
        // 删除 bucket 内容
        delBucketContent: async ({ dispatch }, { bucketParam, key }) => {
            const flag = await delBucketContentItem(bucketParam, key);
            if (flag) {
                TipSuccess('删除成功');
                dispatch('getBucketContentData', { bucketParam });
            } else {
                TipError('删除失败');
            }
        },
        clearPlatformInfo: ({ commit }) => {
            commit(CLEAR_PLATFORM_INFO);
        },
    }
};

export default app;
