/**
 * @file  [Promise]
 * @param  {String} method [默认GET]
 * @param  {String} url    [URL]
 * @param  {Object} data   [data]
 * @param  {Object} options [noLoading, noDeal]
 * @return {Promise}       []
 */

'use strict';

import request from 'superagent-bluebird-promise';

export default (method, url, data = {}, options = {}) => {
    let promise = request(method, url)
        .set({Accept: 'application/json'})
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1')
        .send(data)
        .then(res => {
            let result = JSON.parse(res.text);
            return result;
        }, err => {
            promise.cancel();
        });

    return promise;
};
