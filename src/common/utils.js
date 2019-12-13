import { PLATFORM_KEY_MAP } from '@constants/platform';
import { dealQiniuBucketItem, dealTencentBucketItem } from './file';

const { readMarkdownFile } = require('@node');

/**
 * 加载markdown内容
 * @param {String} filename 文件名
 */
export const loadMarkdownFile = (filename) => {
    return readMarkdownFile(filename);
};

/**
 * 根据平台处理数据为统一的方式，
 * @param {Array} list 数据列表
 * @param {String} type 平台类型
 */
export const dealListData = (list, type) => {
    let result = [];
    switch (type) {
    case PLATFORM_KEY_MAP.qiniu:
        result = list.map(item => dealQiniuBucketItem(item));
        break;
    case PLATFORM_KEY_MAP.tencent:
        result = list.map(item => dealTencentBucketItem(item));
        break;
    default:
        break;
    }
    return result;
};

/**
 * 处理 bucket 为统一的数据对象
 * @param {Array} list 数据
 * @param {String} platform 平台枚举
 */
export const dealBucketList = (list, platform) => {
    let result = [];
    switch (platform) {
    case PLATFORM_KEY_MAP.qiniu:
        result = list.map(item => {
            return {
                bucket: item,
            };
        });
        break;
    case PLATFORM_KEY_MAP.tencent:
        result = list.map(item => {
            return {
                bucket: item.Name,
                region: item.Location,
                date: item.CreationDate,
            };
        });
        break;
    default:
        break;
    }
    return result;
};
