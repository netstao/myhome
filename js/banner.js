; (function ($) {
    $.extend({
        'foucs': function (con) {
            var $container = $('.banner_index');
            var $imgs = $container.find('li.hero');
            var $leftBtn = $container.find('a.prev');
            var $rightBtn = $container.find('a.next');
            var config = {
                interval: con && con.interval || 3000,
                animateTime: con && con.animateTime || 600,
                direction: con && (con.direction === 'right'),
                _imgLen: $imgs.length
            };
            //当前显示banner索引
            var i = 0;
            var getNextIndex = function (y) { return i + y >= config._imgLen ? i + y - config._imgLen : i + y; };
            var getPrevIndex = function (y) { return i - y < 0 ? config._imgLen + i - y : i - y; };
            var silde = function (d) {
                //下一张的下一张位置设为banner宽度的2倍 往左为负 往右为正
                $imgs.eq((d ? getPrevIndex(2) : getNextIndex(2))).css('left', (d ? '-2400px' : '2400px'));
                
                $imgs.animate({
                'left': (d ? '+' : '-') + '=1200px'
                }, config.animateTime );

                i = d ? getPrevIndex(1) : getNextIndex(1);
                //$('.foucs_icon li').eq(i).addClass('select').siblings().removeClass('select');
            };
            
            var s = setInterval(function () {
				silde(config.direction);
			}, config.interval);
            /*鼠标悬停*/
            $imgs.eq(i).css('left', 0).end().eq(i + 1).css('left', '1200px').end().eq(i - 1).css('left', '-1200px');
            $imgs.eq(i).src=$imgs.eq(i).attr('rel');
            
            $container.find('.banner_wrap').add($leftBtn).add($rightBtn).hover(function () {
				clearInterval(s); 
                s = null;
			}, function () {
				s = setInterval(function () {
					silde(config.direction);
				}, config.interval);
			});
            
            $leftBtn.click(function () {
                if ($(':animated').length === 0) {
                    silde(true);
                }
            });
            $rightBtn.click(function () {
                if ($(':animated').length === 0) {
                    silde(false);
                }
            });
        }
    });
}(jQuery));