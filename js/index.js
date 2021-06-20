window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    var index = 0;

    var timer = this.setInterval(function () {
        index++;
        var translateX = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);
    //等待过渡完成后才判断num的值
    ul.addEventListener('transitionend', function () {
        //无缝滚动
        if (index >= this.children.length - 2) {// children第一个是复制的最后一张，不计入index
            // 此时图片去掉过渡效果，再移动到第一张
            index = 0;
        } else if (index < 0) {//倒着拖动图片，到最后一张
            index = this.children.length - 2 - 1;

        }
        // 去掉过渡效果，让ul快速移动到目标位置
        ul.style.transition = 'none';
        //根据新的索引号滚动图片
        var translatex = -index * w;
        ul.style.transform = 'translateX(' + translatex + 'px)';
        //小圆点跟随变化效果
        // 去掉ol中带current类名的元素（remove），给当前索引的li加上current（add）
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })

    //手指滑动轮播图
    var startX = 0;
    var moveX = 0;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    var flag = false;// 手指滑动标志
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        // 盒子目标的位置 = 现在的位置 + 手指移动距离
        var translatex = -index * w + moveX;
        // if (translatex > (ul.children.length - 2) * w) {
        //     index = 0
        //     translatex = -index * w + moveX;
        // }
        //手指拖动时不需要过渡，取消过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        flag = true;
        e.preventDefault();// 阻止滚动屏幕
    });
    ul.addEventListener('touchend', function (e) {
        //  手指离开时，移动距离大于50px,就播放下/上一张
        if (flag) {
            if (Math.abs(moveX) > 50) {
                //右滑 moveX > 0 播放上一张
                //左滑 moveX < 0 播放下一张
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            else {//小于50px,就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .1';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
            //小圆点跟随变化效果
            // 去掉ol中带current类名的元素（remove），给当前索引的li加上current（add）
            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');
        }
        // 重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translateX = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    });

    // 返回顶部模块
    var goback = this.document.querySelector('.goBack');
    var nav = this.document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    goback.addEventListener('click', function () {
        window.scroll(0, 0);
    });
})