// 七牛相关操作
import qiniu from 'qiniu';
import { get, post } from '@common/ajax';
import { QINIU_URL } from '@constants/url';

qiniu.conf.ACCESS_KEY = '5jI9Vhnfz7SiVeyzvBH82E5sDqden9aieqZHEzd8';
qiniu.conf.SECRET_KEY = 'F_RJfQCqEqs7TQ721AuzTNT0I6QtU497_03smNqO';

export const initQiniu = (ak, sk) => {
    qiniu.conf.ACCESS_KEY = ak;
    qiniu.conf.SECRET_KEY = sk;
    qiniu.conf.RPC_TIMEOUT = 180000;
};

export const getQiniuToken = () => {
    return new qiniu.auth.digest.Mac(qiniu.conf.ACCESS_KEY, qiniu.conf.SECRET_KEY);
};

export const getQiniuHeader = (url, param) => {
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
 * 获取bucket列表
 * @param {String} token 七牛云使用的token
 */
export const getQiniuBucket = async () => {
    const res = await get(QINIU_URL.buckets, {}, getQiniuHeader(QINIU_URL.buckets));
    console.log('获取到的bucket列表为：', res);
    return res;
};

export const getQiniuBucketDomain = async (bucketName) => {
    const param = { tbl: bucketName };
    const res = await get(QINIU_URL.domains, param, getQiniuHeader(QINIU_URL.domains, param));
    console.log(res);
    return res;
    // let config = new qiniu.conf.Config();
    // let bucketManager = new qiniu.rs.BucketManager(getQiniuToken(), config);
    // let deadline = parseInt(Date.now() / 1000);
    // console.log(bucketManager.privateDownloadUrl(QINIU_URL.domains, '', deadline));
    // return bucketManager.privateDownloadUrl(QINIU_URL.domains, '', deadline);
};

export const getQiniuBucketList = (params) => {
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(getQiniuToken(), config);
    return new Promise((resolve, reject) => {
        bucketManager.listPrefix(params.bucket, params, function (respErr, respBody, respInfo) {
            if (respBody.error) {
                reject({'error': respBody.error, 'status': respBody.status});
            }
            resolve(respBody.items);
        });
    });
};
