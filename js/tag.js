;(function($){
    
    $.extend({
        'tag':function(config){ 
            var radius = 230;    //半径
            var dtr = (Math.PI/180);  //弧度 
            var d=300;
            var mcList = [];  //所有标签对象属性
            var active = false;  
            var lasta = 1;
            var lastb = 1;
            var distr = true;
            var tspeed=1;
            var size=250;
            
            var mouseX=0;
            var mouseY=0;
            
            var howElliptical=100;
            
            var aA=null;  //所有标签dom对象
            var oDiv=null;  //标签直接父亲对dom对象
            window.timer = null;
            function start()
            {
                var i=0;
                var oTag=null;  //每个标签的偏移的宽度和高度 对象存放;
            
                oDiv=document.getElementById('tagsList');
            
                aA=oDiv.getElementsByTagName('a');  //获取所有标签
                
                for(i=0;i<aA.length;i++)
                {
                    oTag={};
                    
                    oTag.offsetWidth=aA[i].offsetWidth; //每个标签的宽度
                    oTag.offsetHeight=aA[i].offsetHeight; //与高度
            
                    mcList.push(oTag); //压入标签对象属性
                }
                //console.log(mcList);
                sineCosine( 0,0,0 );
            
                positionAll();
                
                $(oDiv).on('mouseover',function (e)
                {
                    active=true;
                    window.timer = setInterval(update, 33);
                    
        
                });
                $(aA).on('mouseenter',function(e){ 
                    active=false;
                    e.stopPropagation();
                    clearInterval(timer);
                    window.timer = null;
                });
            
                $(oDiv).on('mouseleave',function ()
                {
                    active=false;
                    clearInterval(timer);
                    window.timer=null;
                    //console.log(mcList);
                });
            
                $(oDiv).on('mousemove',function (ev)
                {
                    var oEvent=window.event || ev;
            
                    mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
                    mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);
            
                    mouseX/=8;
                    mouseY/=8;
                });
            
                window.timer = setInterval(update, 33);
            };
            
            function update()
            {
                var a;
                var b;
            
                if(active)
                {
                    a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
                    b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
                }
                else
                {
                    a = lasta * 0;
                    b = lastb * 0;
                }
            
                lasta=a;
                lastb=b;
            
                if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
                {
                    return;
                }
            
                var c=0;
                sineCosine(a,b,c);
                for(var j=0;j<mcList.length;j++)
                {
                    var rx1=mcList[j].cx;
                    var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
                    var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
            
                    var rx2=rx1*cb+rz1*sb;
                    var ry2=ry1;
                    var rz2=rx1*(-sb)+rz1*cb;
            
                    var rx3=rx2*cc+ry2*(-sc);
                    var ry3=rx2*sc+ry2*cc;
                    var rz3=rz2;
            
                    mcList[j].cx=rx3;
                    mcList[j].cy=ry3;
                    mcList[j].cz=rz3;
            
                    per=d/(d+rz3);
            
                    mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
                    mcList[j].y=ry3*per;
                    mcList[j].scale=per;
                    mcList[j].alpha=per;
                    var alpha = (mcList[j].alpha-0.6)*(10/6);
                    if(alpha<0) alpha=0.1;
                    mcList[j].alpha=alpha;
                }
            
                doPosition();
                depthSort();
            }
            
            function depthSort()
            {
                var i=0;
                var aTmp=[];
            
                for(i=0;i<aA.length;i++)
                {
                    aTmp.push(aA[i]);
                }
            
                aTmp.sort
                (
                    function (vItem1, vItem2)
                    {
                        if(vItem1.cz>vItem2.cz)
                        {
                            return -1;
                        }
                        else if(vItem1.cz<vItem2.cz)
                        {
                            return 1;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                );
            
                for(i=0;i<aTmp.length;i++)
                {
                    aTmp[i].style.zIndex=i;
                }
            }
            
            function positionAll()
            {
                var phi=0;
                var theta=0;
                var max=mcList.length;
                var i=0;
            
                var aTmp=[];
                var oFragment=document.createDocumentFragment();
            
                //随机排序
                for(i=0;i<aA.length;i++)
                {
                    aTmp.push(aA[i]);
                }
            
                aTmp.sort
                (
                    function ()
                    {
                        return Math.random()<0.5?1:-1;
                    }
                );
            
                for(i=0;i<aTmp.length;i++)
                {
                    oFragment.appendChild(aTmp[i]);
                }
            
                oDiv.appendChild(oFragment);
            
                for( var i=1; i<max+1; i++){
                    if( distr )
                    {
                        phi = Math.acos(-1+(2*i-1)/max);
                        theta = Math.sqrt(max*Math.PI)*phi;
                    }
                    else
                    {
                        phi = Math.random()*(Math.PI);
                        theta = Math.random()*(2*Math.PI);
                    }
                    //坐标变换
                    mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
                    mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
                    mcList[i-1].cz = radius * Math.cos(phi);
                    //console.log(mcList[i-1].cx,oDiv.offsetWidth/2,mcList[i-1].offsetWidth/2);
                    var left = mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2;
                    var top = mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2;
                    if(left<0) left=0;
                    if(top<0) top=0;
                    aA[i-1].style.left=left+'px';
                    aA[i-1].style.top=top+'px';
                }
                }
        
                function doPosition()
                {
                    var l=oDiv.offsetWidth/2;
                    var t=oDiv.offsetHeight/2;
                    for(var i=0;i<mcList.length;i++)
                    {
                        
                        aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
                        aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
                
                        aA[i].style.fontSize=Math.ceil(8*mcList[i].scale/2)+10+'px';
                
                        aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
                        aA[i].style.opacity=mcList[i].alpha;
                    }
                }
                
                function sineCosine( a, b, c)
                {
                    sa = Math.sin(a * dtr);
                    ca = Math.cos(a * dtr);
                    sb = Math.sin(b * dtr);
                    cb = Math.cos(b * dtr);
                    sc = Math.sin(c * dtr);
                    cc = Math.cos(c * dtr);
                }
                start();
        }
    });

   
                
})(jQuery);