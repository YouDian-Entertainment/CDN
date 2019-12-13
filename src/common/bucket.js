// 平台统一操作
import { PLATFORM_KEY_MAP } from '@constants/platform';
import { initQiniu, getQiniuBucket, getQiniuBucketDomain, getQiniuBucketContent, delQiniuContentItem } from '@common/platfrom/qiniu';
import logger from './logger';
import { dealListData, dealBucketList } from './utils';
import { initTencent, getTencentBucket, getTencentBucketContent, getTencentBucketDomain, getTencentImageUrl } from './platfrom/tencent';

let _platform = '';

export const initConfig = (config, platform) => {
    const { ak, sk } = config;
    switch(platform) {
    case PLATFORM_KEY_MAP.qiniu:
        initQiniu(ak, sk);
        _platform = PLATFORM_KEY_MAP.qiniu;
        break;
    case PLATFORM_KEY_MAP.tencent:
        initTencent(ak, sk);
        _platform = PLATFORM_KEY_MAP.tencent;
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
    case PLATFORM_KEY_MAP.tencent:
        result = await getTencentBucket();
        break;
    default:
        break;
    }
    return dealBucketList(result, _platform);
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
    case PLATFORM_KEY_MAP.tencent:
        result = [];
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
export const getBucketContent = async (bucketParam, filters) => {
    let list = [];
    if (!bucketParam) {
        return list;
    }
    switch (_platform) {
    case PLATFORM_KEY_MAP.qiniu:
        list = await getQiniuBucketContent(bucketParam.bucket, filters);
        break;
    case PLATFORM_KEY_MAP.tencent:
        list = await getTencentBucketContent(bucketParam, filters);
        list = list.map(item => {
            return {
                ...item,
                Url: getTencentImageUrl(bucketParam, item.Key),
            };
        });
        break;
    default:
        break;
    }
    return dealListData(list, _platform);
};

export const delBucketContentItem = async (bucketName, key) => {
    console.log(bucketName, key);
    let result = false;
    if (!bucketName || !key) {
        return result;
    }
    switch (_platform) {
    case PLATFORM_KEY_MAP.qiniu:
        result = delQiniuContentItem(bucketName, key);
        break;
    default:
        break;
    }
    return result;
};
