/**
 * Created with PyCharm.
 * User: dtynn
 * Date: 1/28/14
 * Time: 5:45 PM
 * To change this template use File | Settings | File Templates.
 */
var utils = {
    urlsafe_b64encode: function(str) {
        var b = new Buffer(str);
        return b.toString('base64').replace('+', '-').replace('/', '_')
    },
    urlsafe_b64decode: function(str) {
        var b = new Buffer(str.replace('-', '+').replace('_', '/'), 'base64')
        return b.toString()
    }
};

var qiniu;

var qUploader = {
    settings: {
        bucket: '',
        access_key: '',
        secret_key: ''
    },
    init: function(bucket, ak, sk) {
        qiniu = require('qiniu');
        this.settings.bucket = bucket;
        this.settings.access_key = ak;
        this.settings.secret_key = sk;
    },
    makeUptoken: function() {
        var putPolicy = new qiniu.rs.PutPolicy(this.settings.bucket);
        return putPolicy.token();
    },
    startUpload: function(filePath) {
        var token = this.makeUptoken();
        console.log(token);
    }
}
