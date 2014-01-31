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
    init: function() {
        if (qiniu === undefined){
            qiniu = require('qiniu');
        }
        this.settings.bucket = localStorage.bucket || '';
        qiniu.conf.ACCESS_KEY = this.settings.access_key = localStorage.access_key || '';
        qiniu.conf.SECRET_KEY = this.settings.secret_key = localStorage.secret_key || '';
    },
    makeUptoken: function() {
        var putPolicy = new qiniu.rs.PutPolicy(this.settings.bucket);
        return putPolicy.token(null);
    },
    startUpload: function(filePath) {
        var token = this.makeUptoken();
        console.log(token);
    }
};

var localSettings = {
    setLocalSettings: function() {
        localStorage.bucket = $('#bucket').val();
        localStorage.access_key = $('#accessKey').val();
        localStorage.secret_key = $('#secretKey').val();
    },
    showLocalSettings: function() {
        $('#bucket').val(localStorage.bucket);
        $('#accessKey').val(localStorage.access_key);
        $('#secretKey').val(localStorage.secret_key);
    },
    clearLocalSettings: function() {
        localStorage.bucket = '';
        localStorage.access_key = '';
        localStorage.secret_key = '';
    }
};
