
    (function(doc, win) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                // if (clientWidth >= 750) { 
                //     //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                //     docEl.style.fontSize = '100px';
                // } else {
                //     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'; //750这个值，根据设计师的psd宽度来修改，是多少就写多少，现在手机端一般是750px的设计稿，如果设计师给的1920的psd，自己用Photoshop等比例缩小
                // }
                docEl.style.fontSize = 100* (clientWidth / 1920) + 'px'; 
                //以1920为基准进行等比缩放，*100是考虑到浏览器有最小字体大小会影响布局，放大100倍，使用时根据实际px缩小100倍使用rem即可
            };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);