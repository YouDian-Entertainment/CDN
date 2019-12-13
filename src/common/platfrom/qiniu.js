// 七牛相关操作
import qiniu from 'qiniu';
import { get, post } from '@common/ajax';
import { QINIU_URL } from '@constants/url';
import logger from '@common/logger';

qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

export const initQiniu = (ak, sk) => {
    qiniu.conf.ACCESS_KEY = ak;
    qiniu.conf.SECRET_KEY = sk;
    qiniu.conf.RPC_TIMEOUT = 180000;
};

const getQiniuToken = () => {
    return new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
};

const getQiniuHeader = (url, param) => {
    let _url = url;
    if (param) {
        let query = '';
        for (let key in param) {
            query += `${key}=${param[key]}&`;
        }
        _url = `${url}?${query.substring(0, query.length - 1)}`;
    }
    return {
        Authorization: qiniu.util.generateAccessToken(getQiniuToken(), _url, null),
    };
};

/**
 * 获取 bucket 列表
 * @param {String} token 七牛云使用的token
 */
export const getQiniuBucket = async () => {
    const res = await get(QINIU_URL.buckets, {}, getQiniuHeader(QINIU_URL.buckets));
    logger.success('七牛 => 获取的 bucket 列表：', res);
    return res;
};

/**
 * 获取 bucket 的 domain 列表
 * @param {String} bucketName bucket 名字
 */
export const getQiniuBucketDomain = async (bucketName) => {
    const param = { tbl: bucketName };
    const res = await get(QINIU_URL.domains, param, getQiniuHeader(QINIU_URL.domains, param));
    logger.success('七牛 => 获取的 bucket domain 列表：', res);
    return res;
};

/**
 * 通过过滤对象，获取 bucket 的内容
 * @param {String} bucketName bucket 名字
 * @param {Object} params 过滤参数对象
 */
export const getQiniuBucketContent = (bucketName, params) => {
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(getQiniuToken(), config);
    return new Promise((resolve, reject) => {
        bucketManager.listPrefix(bucketName, { bucket: bucketName, ...params }, function (respErr, respBody, respInfo) {
            if (respBody.error) {
                reject({'error': respBody.error, 'status': respBody.status});
            }
            resolve(respBody.items);
        });
    });
};

export const delQiniuContentItem = (bucketName, key) => {
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(getQiniuToken(), config);
    console.log(bucketManager);
    return new Promise((resolve, reject) => {
        bucketManager.delete(bucketName, key, function(err, respBody, respInfo) {
            if (err) {
                console.log('删除失败', err);
                reject(err);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                resolve(true);
            }
        });
    });
};
