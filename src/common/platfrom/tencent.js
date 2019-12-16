// 腾讯云
import tencent from 'cos-nodejs-sdk-v5';

let cos = null;

/**
 * 初始化腾讯云
 * @param {String} ak accesskey
 * @param {String} sk secertkey
 */
export const initTencent = (ak, sk) => {
    cos = new tencent({
        SecretId: ak,
        SecretKey: sk,
    });
};

/**
 * 获取腾讯的 bucket 列表
 */
export const getTencentBucket = () => {
    return new Promise((resolve, reject) => {
        cos.getService(function (err, data) {
            if (err) reject(err);
            resolve(data.Buckets);
        });
    });
};

/**
 * 获取腾讯 bucket 内容
 * @param {Object} param bucket 参数对象
 * @param {Object} filters 过滤条件
 */
export const getTencentBucketContent = (param, filters) => {
    return new Promise((resolve, reject) => {
        cos.getBucket({
            Bucket: param.bucket,
            Region: param.region,
        }, (err, data) => {
            if (err) reject(err);
            resolve(data.Contents);
        });
    });
};

/**
 * 删除腾讯 bucket 内容
 * @param {Object} param bucket 参数对象
 * @param {String} key 内容唯一键
 */
export const delTencentContentItem = (param, key) => {
    return new Promise((resolve, reject) => {
        cos.deleteObject({
            Bucket: param.bucket,
            Region: param.region,
            Key: key,
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

/**
 * 获取图片的可用显示地址
 * @param {Object} param bucket 参数
 * @param {String} key 项 key 值
 */
export const getTencentContentItemUrl = (param, key) => {
    return cos.getObjectUrl({
        Bucket: param.bucket,
        Region: param.region,
        Key: key,
    });
};
