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
    chooserInit: function(chooser) {
        chooser.change(function(evt) {
            var fileList = $(this)[0].files;
            qUploader.startUploads(fileList);
            chooser.val('');
        });
    },
    qInit: function() {
        if (qiniu === undefined){
            qiniu = require('qiniu');
        }
        this.settings.bucket = localStorage.bucket || '';
        qiniu.conf.ACCESS_KEY = this.settings.access_key = localStorage.access_key || '';
        qiniu.conf.SECRET_KEY = this.settings.secret_key = localStorage.secret_key || '';
    },
    makeUptoken: function(key) {
        var scope = this.settings.bucket;
        if (key !== undefined && key !== null) {
            scope += ':' + key;
        }
        var putPolicy = new qiniu.rs.PutPolicy(scope);
        return putPolicy.token(null);
    },
    startUploads: function(fileList) {
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i],
                fname = file.name,
                fsize = file.size,
                fpath = file.path,
                ftype = file.type;
            this.doUpload(fpath, fname, fsize, ftype);
        }
    },
    doUpload: function(fPath, fName, fSize, fType) {
        var token = this.makeUptoken(null);
        var putExtra = new qiniu.io.PutExtra();
        qiniu.io.putFile(token, fName, fPath, putExtra, function(err, ret){
            if(!err){
                console.log(ret.key, ret.hash);
            } else {
                console.log(err);
            }
        });
    }
};

var localSettings = {
    setLocalSettings: function() {
        localStorage.bucket = $('#bucket').val();
        localStorage.access_key = $('#accessKey').val();
        localStorage.secret_key = $('#secretKey').val();
        qUploader.qInit();
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
        qUploader.qInit();
    }
};
