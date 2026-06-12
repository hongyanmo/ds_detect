export default {
    data: {
        balanceInt: '---',
        balanceDec: '',
        currency: 'CNY',
        statusText: '查询中...',
        statusClass: 'dot-loading',
        lastUpdate: '',
        btnText: '刷新'
    },
    onInit() {
        this.doRequest();
    },
    doRequest() {
        var that = this;
        that.statusText = '查询中...';
        that.statusClass = 'dot-loading';

        var fetcher = null;
        if (typeof systemplugin !== 'undefined') {
            fetcher = systemplugin.fetch;
        }
        if (!fetcher) {
            that.statusText = '无网络模块';
            that.statusClass = 'dot-error';
            that.balanceInt = '---';
            that.balanceDec = '';
            that.lastUpdate = that._now();
            return;
        }

        fetcher.fetch({
            url: 'https://api.deepseek.com/user/balance',
            method: 'GET',
            header: {
                'Authorization': 'Bearer YOUR_API_KEY_HERE'
            },
            success: function(resp) {
                try {
                    var data = JSON.parse(resp.data);
                    if (data.balance_infos && data.balance_infos.length > 0) {
                        var info = data.balance_infos[0];
                        var raw = String(info.total_balance || '---');
                        var parts = raw.split('.');
                        that.balanceInt = parts[0];
                        that.balanceDec = parts.length > 1 ? '.' + parts[1] : '';
                        that.currency = info.currency || 'CNY';
                        that.statusText = '可用';
                        that.statusClass = 'dot-ok';
                    } else if (data.is_available) {
                        that.statusText = '可用';
                        that.statusClass = 'dot-ok';
                    } else {
                        that.statusText = '不可用';
                        that.statusClass = 'dot-error';
                    }
                } catch (e) {
                    that.statusText = '解析失败';
                    that.statusClass = 'dot-error';
                }
                that.lastUpdate = that._now();
            },
            fail: function() {
                that.statusText = '请求失败';
                that.statusClass = 'dot-error';
                that.lastUpdate = that._now();
            }
        });
    },
    refresh() {
        this.btnText = '刷新中...';
        this.doRequest();
        var that = this;
        setTimeout(function() {
            that.btnText = '刷新';
        }, 1500);
    },
    _now() {
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        return (h < 10 ? '0' : '') + h + ':' +
               (m < 10 ? '0' : '') + m + ':' +
               (s < 10 ? '0' : '') + s;
    }
}
