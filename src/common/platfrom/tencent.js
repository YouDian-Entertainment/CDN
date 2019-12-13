// 腾讯云
import tencent from 'cos-nodejs-sdk-v5';

let cos = null;

export const initTencent = (ak, sk) => {
    cos = new tencent({
        SecretId: ak,
        SecretKey: sk,
    });
};

export const getTencentBucket = () => {
    return new Promise((resolve, reject) => {
        cos.getService(function (err, data) {
            if (err) reject(err);
            resolve(data.Buckets);
        });
    });
};

// test
export const getTencentBucketTest = () => {
    return new Promise((resolve, reject) => {
        cos.getService(function (err, data) {
            if (err) reject(err);
            resolve(data);
        });
    });
};

export const getTencentBucketDomain = () => {

};

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

// test
export const getTencentBucketContentTest = (param, filters) => {
    return new Promise((resolve, reject) => {
        cos.getBucket({
            Bucket: param.bucket,
            Region: param.region,
        }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
};

export const delTencentContentItem = () => {};


/**
 * 获取图片的可用显示地址
 * @param {Object} param bucket 参数
 * @param {String} key 项 key 值
 */
export const getTencentImageUrl = (param, key) => {
    return cos.getObjectUrl({
        Bucket: param.bucket,
        Region: param.region,
        Key: key,
    });
};
