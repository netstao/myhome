  $(function(){
        
            /*banner*/
           

            /*作品部分导航*/
            $('.w_nav li').on('click',function(){ 
                $(this).addClass('select').siblings().removeClass('select');
                $('.w_list').eq($(this).index()).show().siblings().hide();
            });
            
            /*技能切换*/
            var is_start = false;
            $('.s_nav li').on('click',function(){ 
                $(this).addClass('select').siblings().removeClass('select');
                $('.s_list').eq($(this).index()).show().siblings().hide();
                if($(this).index()==1 && is_start===false){  
                    $.tag();
                    is_start = true;
                } else  
                if(window.timer){ 
                    clearInterval(window.timer);
                    window.timer = null;
                }
            });
            
            /*作品文字描述*/
            $('.w_con ul li').mouseenter(function(){ 
                $(this).children('span').stop().animate({bottom:0},100);
            }).mouseleave(function(){ 
                $(this).children('span').stop().animate({bottom:-50},100);
            });
            
            /*导航跟随高度*/
            var nav_arr = ['index','works','skill','footer'];
            var model   = [0,420,1272,1402,1979];
            var nav_num = 0;
           
            $(window).scroll(function(){ 
                var curr_top=$(this).scrollTop();
                var nav_top = $('header').offset().top;
                //console.log($('.banner').height()/2);
                var nav_height = $('header').height()+$('.banner').height()/2;
                var work_top = $('.works').offset().top-nav_height;
                var skill_top = $('.skill').offset().top-nav_height;
                var footer_top = $('.footer').offset().top-nav_height;
                if(curr_top>=nav_top && nav_top>0){ 
                    $('header').addClass('fixed');
                } else {
                    $('header').removeClass('fixed');
                }
                if(curr_top>work_top){
                     
                     $('.work a').addClass('select').parent().siblings().children('a').removeClass('select');
                } else { 
                    $('.work a').removeClass('select');
                }
                
                if(curr_top<work_top){
                     $('.index a').addClass('select').parent().siblings().children('a').removeClass('select');
                }
                if(curr_top>skill_top)
                    $('.skill_nav a').addClass('select').parent().siblings().children('a').removeClass('select');
                if(curr_top>footer_top)
                    $('.about a').addClass('select').parent().siblings().children('a').removeClass('select');
            
            });
            $('.nav li').click(function(){
                var $top = [0,120,120,60,80]
                var offset_top = $('.'+nav_arr[$(this).index()]).offset().top-$top[$(this).index()]+$(nav_arr[$(this).index()]).height();
                if(nav_arr[$(this).index()]=='index') offset_top=0;
                $('body,html').stop().animate({'scrollTop':offset_top},500);
            });
            $('#tagsList a').on('click',function(){ 
                $('.alert p').html($(this).html());
                $('.alert').slideDown();
            });
            $('.w_list li:not(.app):not(.prev):not(.app li)').on('click',function(){ 
                
                var file_name = $(this).find('img').attr('src').replace('img','');
                var url  = $(this).find('img').attr('url');
                var h2  = $(this).find('span').text();
                var target_url = ['0','1','xi/index.html'];
                if(url==1){ 
                    console.log(22);
                    window.open('./website/'+target_url[$(this).index()]) ;
                } else { 
                     if(file_name.indexOf('1-4')>0 || file_name.indexOf('1-5')>0){ 
                    file_name = file_name.replace('jpg','png');
                    }
                    console.log(file_name.indexOf('2-'));
                    if(file_name.indexOf('2-')>0){
                       $('.alert p img').css({'width':100+'%'});
                    }
                    $('.alert p').html("<h2>"+h2+"</h2>"+'<a target="_blank" href="./img/big'+file_name+'"><img src="img/big'+file_name+'"/></a>');
                    $('.alert').slideDown();
                }
               
            });
            var num = 0;
            $('.app .next').on('click',function(){ 
                num++;
                $('.app_box').stop().animate({})
            });
            $('.description ul li').hover(function(){ 
                if($(this).index()==0){ width=390; width2=90;
                }else{ width=215 ;width2=110;}
                $(this).stop().animate({width:width}, 400).siblings().stop().animate({width:width2}, 400);
            },function(){ 
                $('.description ul li').stop().animate({width:120}, 400);
            });
            
            $('.alert p a').on('click',function(e){ 
                e.stopPropagation();
            })
            $('.alert span,.alert').on('click',function(){ 
                $('.alert').slideUp();
            })
            $("img").scrollLoading(); 
          
        });