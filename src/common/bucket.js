// 平台统一操作
import { PLATFORM_KEY_MAP } from '@constants/platform';
import { initQiniu, getQiniuBucket, getQiniuBucketDomain, getQiniuBucketContent } from '@common/platfrom/qiniu';
import logger from './logger';

let _platform = '';

export const initConfig = (config, platform) => {
    const { ak, sk } = config;
    switch(platform) {
    case PLATFORM_KEY_MAP.qiniu:
        initQiniu(ak, sk);
        _platform = PLATFORM_KEY_MAP.qiniu;
        break;
    default:
        logger.error('配置出错， platform 参数不正确');
        break;
    }
};

/**
 * 获取 bucket 列表
 */
export const getBucketList = async () => {
    let result = [];
    switch (_platform) {
    case PLATFORM_KEY_MAP.qiniu:
        result = await getQiniuBucket();
        break;
    default:
        break;
    }
    return result;
};

/**
 * 获取 bucket 绑定的地址
 * @param {String}} bucketName bucket 名字
 */
export const getBucketDomain = async (bucketName) => {
    let result = [];
    if (!bucketName) {
        return result;
    }
    switch (_platform) {
    case PLATFORM_KEY_MAP.qiniu:
        result = await getQiniuBucketDomain(bucketName);
        break;
    default:
        break;
    }
    return result;
};

/**
 * 获取 bucket 内容
 * @param {String} bucketName bucket 名字
 * @param {Object} filters 过滤条件
 */
export const getBucketContent = async (bucketName, filters) => {
    let contentList = [];
    if (!bucketName) {
        return contentList;
    }
    switch (_platform) {
    case PLATFORM_KEY_MAP.qiniu:
        contentList = await getQiniuBucketContent(bucketName, filters);
        break;
    default:
        break;
    }
    return contentList;
};
