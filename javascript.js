init(50,"mycanvas",480,680,main);
var bglayer,loadinglayer,floorlayer,herolayer,looklayer,hero,giftlayer;
var floortext,lifetext,gifttext;
var floor=0,life=1,lifetiao,mptiao;//全局变量看层数与生命值
var imgdata = new Array(
	{name:"initbg",path:"initbg.jpg"},
	{name:"bg",path:"bg.jpg"},
	{name:"hero",path:"hero.png"},
	{name:"plane",path:"gift.png"},
	{name:"floor1",path:"newfloor1$.png"},
	{name:"floor2",path:"newfloor3$.png"},
	{name:"floor3",path:"newfloor2$.png"},
	{name:"floor4",path:"newfloor5$.png"},
	{name:"floor5",path:"newflor4$.png"},
	{name:"start",path:"startbu100.png"},
	{name:"help",path:"help150.png"},
	{name:"ball",path:"ball.png"},
	{name:"floorup",path:"newfloor5$up.png"});//这是个存图片的数组，为了一会加载用
var imglist=new Array();
var floorlist=new Array();
var step=10;//每次循环移动量
var stepchange=10;//可变移动量
var temp1=0;//参量1与踏板出现频率有关
var temp2=80,hpfull=1;;//参量2与回血有关,hpfull用来判断是否满血是否需要蓄血
var tan=0;//此变量用于记录是否为处在弹跳跳板状态
var temp3=50,floornumber=1;//参量3用来记录下了多少层
var temp4=150;//记录礼物间隔
function main()
{
	bglayer=new LSprite();               //声明背景层
	bglayer.graphics.drawRect(1,"#000000",[0,0,480,680],true,"#FFFFFF");//背景是白色
	addChild(bglayer);	//C要大写！	
	loadinglayer=new LoadingSample3();//声明进度条层及其类型
	bglayer.addChild(loadinglayer);
	LLoadManage.load(imgdata,
	function(progress){
		loadinglayer.setProgress(progress);
	},gameinit);//加载完毕进入gameinit函数
}
function gameinit(result)//加载完毕返回result为图片数组，进行游戏刚开始提示界面
{
	
	imglist=result;
	bglayer.die();
	bglayer.removeAllChild();
	
	//bglayer.removeChild(loadinglayer);
	//loadinglayer=null;//加载完毕后让进度条界面去死
	var bitmap = new LBitmap(new LBitmapData(imglist["bg"]));
	bglayer.addChild(bitmap);//添加背景图片
	var title = new LTextField();
	title.x = 80;
	title.y = 100;
	title.size = 60;
	title.color = "#000000";
	title.text = "是男人就下";
	bglayer.addChild(title);
		var title = new LTextField();
	title.x = 90;
	title.y = 200;
	title.size = 80;
	title.color = "#000000";
	title.text = "一百层!!!";
	bglayer.addChild(title);//添加标题//添加标题

	var bitmap1=new LBitmap(new LBitmapData(imglist["start"]));
	var startbutton=new LButton(bitmap1,bitmap1);
	startbutton.y=400;
	startbutton.x=60;
	bglayer.addChild(startbutton);
	var bitmap2=new LBitmap(new LBitmapData(imglist["help"]));
	var helpbutton=new LButton(bitmap2,bitmap2);
	helpbutton.y=390;
	helpbutton.x=270;
	bglayer.addChild(helpbutton);
	startbutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	helpbutton.addEventListener(LMouseEvent.MOUSE_UP,gamehelp);//添加监听器，一旦点击了就进入gamestart开始游戏。
}
function gamehelp()
{
	bglayer.die();
	bglayer.removeAllChild();
	var bitmap = new LBitmap(new LBitmapData(imglist["bg"]));
	bglayer.addChild(bitmap);//添加背景图片
	var title = new LTextField();
	title.x = 20;
	title.y = 100;
	title.size = 50;
	title.color = "#000000";
	title.text = "操作说明";
	bglayer.addChild(title);
	var title1 = new LTextField();
	title1.x = 20;
	title1.y = 200;
	title1.size = 20;
	title1.color = "#000000";
	title1.text = "方向←→键控制移动。";
	bglayer.addChild(title1);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor1"]));
	bitmap.x=20;
	bitmap.y=240;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 240;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "普通木板";
	bglayer.addChild(title2);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor2"]));
	bitmap.x=20;
	bitmap.y=280;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 280;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "跳跃板";
	bglayer.addChild(title2);
		var bitmap = new LBitmap(new LBitmapData(imglist["floor3"]));
	bitmap.x=20;
	bitmap.y=320;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 320;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "滚动板（左滚动）";
	bglayer.addChild(title2);
	var bitmap = new LBitmap(new LBitmapData(imglist["floor4"]));
	bitmap.x=20;
	bitmap.y=360;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 360;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "带刺板（会掉血的噻）";
	bglayer.addChild(title2);
		var bitmap = new LBitmap(new LBitmapData(imglist["floor5"]));
	bitmap.x=20;
	bitmap.y=400;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 400;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "虚板（踩上会踩空的）";
	bglayer.addChild(title2);
			var bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	bitmap.x=50;
	bitmap.y=470;
	bglayer.addChild(bitmap);
	var title2 = new LTextField();
	title2.x = 160;
	title2.y = 480;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "这是礼物，吃到会加蓝的";
	bglayer.addChild(title2);
		var title2 = new LTextField();
	title2.x = 50;
	title2.y = 520;
	title2.size = 20;
	title2.color = "#000000";
	title2.text = "试试在有蓝的时候按一下A键(S,w和D键也可以了)";
	bglayer.addChild(title2);
	var bitmap1=new LBitmap(new LBitmapData(imglist["start"]));
	var startbutton=new LButton(bitmap1,bitmap1);
	startbutton.y=20;
	startbutton.x=300;
	bglayer.addChild(startbutton);
	startbutton.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
}

function gamestart()//画面初始化
{
	floornumber=1;
	bglayer.die();
	bglayer.removeAllChild();
	backg=new Background();
	bglayer.addChild(backg);//运动的背景层是一个新的类型，是背景层之子。
	/*背景层的声明一定要在字层声明之前，否则字会被覆盖掉。*/
	
	flootext=new LTextField();
	flootext.size=240;
	flootext.color="#DEE8ED";
	flootext.text="0";
	flootext.x=170;
	flootext.y=200;
	bglayer.addChild(flootext);//大层数层

	lifetiao=new LGraphics();
	bglayer.addChild(lifetiao);
	lifetiao.drawRect(3,"#000000",[0,20,200,10],true,"#91D94E");//血条层
	mptiao=new LGraphics();
	bglayer.addChild(mptiao);
	mptiao.drawRect(3,"#000000",[0,40,200,10],true,"#0B95CE");//蓝层

	floorlayer=new LSprite(); 
	bglayer.addChild(floorlayer);//记录各个地板，地板层是地板数组，也是背景层之子
	//hero=new human();
	//bglayer.addChild(hero);//记录主角
	giftlayer=new LSprite();
	bglayer.addChild(giftlayer);//礼物层
	inithero();
	bglayer.addEventListener(LEvent.ENTER_FRAME, onframe);//添加循环事件
	if(!LGlobal.canTouch){
		//非触屏时添加键盘事件
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);//键盘按下执行onkeydown
		LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);//键盘松开执行onkeyup
	}
}
function onframe()
{
	if(floornumber%2==0)
	{
		stepchange=stepchange+0.005;
	}
	if(hero.hp==hero.maxhp)
	{
		hpfull=1;
	}//是否满血
	else{
		hpfull=0;
	}
	if(!hpfull){
		if(temp2--<=0)
		{
			temp2=80;
			hero.hp++;
		}
	}//以上是对回血功能的实现
	backg.run();
	if(temp1--<=0)
	{
		temp1=5;
		addfloor();
	}
	//以上是对背景滚动和添加地板
	if(temp3--<=0)
	{
		temp3=50;
		floornumber++;
	}
	if(temp4--<=0)
	{
		temp4=150;
		addgift();
	}
	var i=null;
	for(i in floorlayer.childList)
	{
		var kid=floorlayer.childList[i];
		if(kid.y<=-1*kid.getHeight())
		{
			floorlayer.removeChild(kid);
		}
		kid.run();
		
	}
	var j=null;
	for(j in giftlayer.childList)
	{
		var kid1=giftlayer.childList[j];
		if(kid1.y<=-1*kid1.getHeight())
		{
			giftlayer.removeChild(kid1);
		}
		kid1.run();
	}
	//gifttext.text=giftlayer.childList.length;
	hero.run();
	//lifetiao.die();
	lifetiao.drawRect(3,"#000000",[0,20,200,10],true,"#000000");
	if(hero.hp/hero.maxhp>0.66){
	lifetiao.drawRect(3,"#000000",[0,20,200*(hero.hp/hero.maxhp),10],true,"#91D94E");
	//lifetext.text="%"+(hero.hp/hero.maxhp)*100;
	}
	else if(hero.hp/hero.maxhp<0.33)
	{
		lifetiao.drawRect(3,"#000000",[0,20,200*(hero.hp/hero.maxhp),10],true,"#D03227");
	}
	else{
		lifetiao.drawRect(3,"#000000",[0,20,200*(hero.hp/hero.maxhp),10],true,"#F5B509");
	}
	mptiao.drawRect(3,"#000000",[0,40,200,10],true,"#000000");
	if(hero.mp/hero.maxmp>0.66){
	mptiao.drawRect(3,"#000000",[0,40,200*(hero.mp/hero.maxmp),10],true,"#0B95CE");
	//lifetext.text="%"+(hero.hp/hero.maxhp)*100;
	}
	else if(hero.mp/hero.maxmp<0.33)
	{
		mptiao.drawRect(3,"#000000",[0,40,200*(hero.mp/hero.maxmp),10],true,"#0B95CE");
	}
	else{
		mptiao.drawRect(3,"#000000",[0,40,200*(hero.mp/hero.maxmp),10],true,"#0B95CE");
	}
	
	

	if(floornumber>9){
		flootext.x=110;
	}
	flootext.text=floornumber;
	if(!hero.hp){
		over();
	}
}
/*        以下是背景运动部分     */
function Background()
{
	base(this,LSprite,[]);//声明Background是一个层类
	this.bitmapdata = new LBitmapData(imglist["bg"]);//定义一个显示图片
	this.pic1=new LBitmap(this.bitmapdata);
	this.pic1.y=0;
	this.addChild(this.pic1);//添加第一张在最下边
	this.pic2=new LBitmap(this.bitmapdata);
	this.pic2.y=this.pic1.getHeight();
	this.addChild(this.pic2);//第二张在中间
	this.pic3=new LBitmap(this.bitmapdata);  //B要大写！
	this.pic3.y=this.pic1.getHeight()*2;
	this.addChild(this.pic3);//第三张在最下边
	this.pic4=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic4.y=0;
	this.addChild(this.pic4);
	this.pic5=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic5.y=0;
	this.pic5.x=100;
	this.addChild(this.pic5);
	this.pic6=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic6.y=0;
	this.pic6.x=200;
	this.addChild(this.pic6);
	this.pic7=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic7.y=0;
	this.pic7.x=300;
	this.addChild(this.pic7);
		this.pic8=new LBitmap(new LBitmapData(imglist["floorup"]));
	this.pic8.y=0;
	this.pic8.x=400;
	this.addChild(this.pic8);
	
}
Background.prototype.run=function()//背景的Run函数
{
	this.pic1.y=this.pic1.y-stepchange;
	this.pic2.y=this.pic2.y-stepchange;
	this.pic3.y=this.pic3.y-stepchange;
	if(this.pic1.y<=-this.pic1.getHeight())
	{
		this.pic1.y=this.pic2.y;
		this.pic2.y=this.pic1.y+this.pic1.getHeight();
		this.pic3.y=this.pic2.y+this.pic1.getHeight();
	}
}
/*以上是背景运动部分 */
/*以下是地板部分*/
function Floor()
{
	base(this,LSprite,[]);
	this.pic();	/////////你TM因为这一句你调了2个多小时！！！！！！！！！！！
	this.typ=0;
}
Floor.prototype.run=function()
{
	this.y=this.y-stepchange;
};
Floor.prototype.pic=function(){
}
function Floora() //普通木板 继承floor类
{
	base(this,Floor,[]);
	this.typ=1;
}
Floora.prototype.pic=function() //将图片赋值
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor1"]));
	this.addChild(this.bitmap);
}
function Floorb() //跳跃木板  继承floor
{
	base(this,Floor,[]);
	this.typ=2;
}
Floorb.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor2"]));
	this.addChild(this.bitmap);
}
function Floorc() //移动木板  继承floor
{
	base(this,Floor,[]);
	this.typ=3;
}
Floorc.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor3"]));
	this.addChild(this.bitmap);
}
function Floord() //带刺木板  继承floor
{
	base(this,Floor,[]);
	this.typ=4;
}
Floord.prototype.pic=function()
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor4"]));
	this.addChild(this.bitmap);
}
function Floore() //普通木板 继承floor类
{
	base(this,Floor,[]);
	this.typ=5;
}
Floore.prototype.pic=function() //将图片赋值
{
	this.bitmap = new LBitmap(new LBitmapData(imglist["floor5"]));
	this.addChild(this.bitmap);
}
function addfloor()
{
	var str=[1,2,3,4,5];
	var random=Math.floor(Math.random()*str.length);
	var result=str[random];
	if(result==1){
	newfloor=new Floora();
	}
	else if(result==2){
		newfloor=new Floorb();
	}
	else if(result==3){
		newfloor=new Floorc();
	}
	else if(result==4){
		newfloor=new Floord();
	}
	else{
		newfloor=new Floore();
	}
	newfloor.y=600;
	newfloor.x=Math.random()*380;
	floorlayer.addChild(newfloor);   //将地板加上作为floorlayer的子元素
}
/*以上是地板部分  */
/* 以下是礼物部分   */
function gift()
{
	base(this,LSprite,[]);
	this.bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	this.addChild(this.bitmap);
	
}
gift.prototype.run=function()
{
	this.y=this.y-stepchange;
};
function addgift()
{
	var newgift=new gift();
	//alert("a");
	var random=Math.floor(Math.random()*0.5*floorlayer.childList.length);
	random=Math.floor(0.5*floorlayer.childList.length)+random;
	newgift.y=floorlayer.childList[random].y-15;
	newgift.x=floorlayer.childList[random].x+25;
	giftlayer.addChild(newgift);
}





/*以下是人物部分   */

function human()
{
	var self=this;
	base(this,LSprite,[]);
	this.movement=0;//运动状态
	this.hp=10;    //生命值
	this.maxhp=10; //最大生命值
	this.mp=3;
	this.maxmp=5;
	this.jump=1;	//是否处在跳跃状态
	this.speed=0;  	//下落速度
	this.fy=0;      //之前的Y坐标
	this.fjump=1;//之前的jump状态
	var list=LGlobal.divideCoordinate(960,50,1,24);
    var data=new LBitmapData(imglist["hero"],0,0,40,50);
    this.anime=new LAnimation(self,data,[[list[0][0]],[list[0][1]],[list[0][2],list[0][3],list[0][4],list[0][5],list[0][6],list[0][7],list[0][8],list[0][9],list[0][10],list[0][11],list[0][12]],[list[0][13],list[0][14],list[0][15],list[0][16],list[0][17],list[0][18],list[0][19],list[0][20],list[0][21],list[0][22],list[0][23]]]);
}
human.prototype.run=function()
{
	this.fy=this.y;
	this.speed=this.speed+9.8;
	this.y=this.y+this.speed;
	this.jump=1;
	if(this.speed>=20)
	{
		this.speed=20;
	}//之后匀速了
	if(this.y>=650)
	{
		this.hp=0;
		return;              //掉到最低
	}	
	else if(this.y<=5)
	{
		this.hp--;
		this.y=60; 		//到了最上边，而且要掉血
	}
	else{} //y的边界情况
	if(this.x<=5)//走到边界
	{
		this.x=20;
	}
	else if(this.x>=470)
	{
		this.x=460;
	}
	else{
	if(this.movement==1)//向左
	{
		this.x=this.x-step*1;
	}
	else if(this.movement==2) //向右
	{
		this.x=this.x+step*1;
	}
	else
	{
	}
	}
	var i=null;
	for(i in floorlayer.childList)
	{
		if(this.speed>0&&(this.y+30>=floorlayer.childList[i].y&&this.y-floorlayer.childList[i].y<=10)&&(this.x-floorlayer.childList[i].x<=100&&floorlayer.childList[i].x-this.x<=30))
		{
			if(floorlayer.childList[i].typ==4&&this.fjump==1){
				this.hp--;
			}//掉血版上了就要掉血
			if(floorlayer.childList[i].typ==3){
				this.x=this.x-step*0.5;
			}//掉移动版上了就要移动
			if(floorlayer.childList[i].typ==5){
				floorlayer.removeChild(floorlayer.childList[i]);
			}
			this.jump=0;
			this.y=floorlayer.childList[i].y-40;
			this.speed=0;
			if(floorlayer.childList[i].typ==2&&this.fjump==1){
			this.tan=1;
			this.speed=-(this.speed+40);
			}
			this.changeaction();
			break;
		}
	}
	var j=null;
	for(j in giftlayer.childList)
	{
		if((this.x-giftlayer.childList[j].x<=40&&giftlayer.childList[j].x-this.x<=40)&&(giftlayer.childList[j].y-this.y<=30&&this.y-giftlayer.childList[j].y<=30))
		{
			giftlayer.removeChild(giftlayer.childList[j]);
			if(this.mp<this.maxmp)
			{
				this.mp++;
			}		
		}
	}
	this.anime.onframe();
	this.fjump=this.jump;//”之前的jump“赋值

}
human.prototype.changeaction=function()
{
	if(this.movement==1)
	{
			//alert("进来了");
		hero.anime.setAction(3);
	}
	else if(this.movement==2)
	{
		hero.anime.setAction(2);
	}
	else if(this.jump==1)
	{
		hero.anime.setAction(1,0);
	}
	else
	{
		hero.anime.setAction(0,0);
	}
}
function inithero()
{
	hero=new human();
	bglayer.addChild(hero);
	hero.x=200;
	hero.y=60;
	//bitmap = new LBitmap(new LBitmapData(imglist["plane"]));
	//hero.addChild(bitmap);
}
/*     以上是人物部分    */
/*     以下是两个键盘控制器   */
function onkeydown(event)
{
	if(event.keyCode==37)//left
	{
		hero.movement=1;
	}
	else if(event.keyCode==39)
	{
		hero.movement=2;
	}
	else if(event.keyCode==65)
	{
		if(hero.mp>0)
		{
			hero.hp=hero.maxhp;
			hero.mp--;
		}
	}
	else if(event.keyCode==83)
	{
		if(hero.mp>0)
		{
			addfloor();
			hero.mp--;
		}
	}
	else if(event.keyCode==68)
	{
		if(hero.mp>0)
		{
			var i=null;
			i=Math.floor(Math.random()*floorlayer.childList.length);
			hero.y=floorlayer.childList[i].y-40;
			hero.x=floorlayer.childList[i].x;
			hero.mp--;
		}
	}
	else if(event.keyCode==87)
	{
		stepchange=stepchange-0.025;
		hero.mp--;
		
	}
	else{}
}
function onkeyup(event)
{
	hero.movement=0;
	hero.changeaction();
}
/*     以上是两个键盘控制器    */
function over()
{
	bglayer.die();
	overlayer=new LSprite();
	overlayer.graphics.drawRect(4,"#009DD6",[90,150,300,300],true,"#ffffff");
	bglayer.addChild(overlayer);
	tiplayer1=new LTextField();
	tiplayer1.size=40;
	tiplayer1.color="#000000";
	tiplayer1.text="您的成绩为"+floornumber+"层";
	tiplayer1.x=100;
	tiplayer1.y=240;
	overlayer.addChild(tiplayer1);
	tiplayer2=new LTextField();
	tiplayer2.size=20;
	tiplayer2.color="#000000";
	tiplayer2.text="点击鼠标左键继续挑战";
	tiplayer2.x=145;
	tiplayer2.y=350;
	overlayer.addChild(tiplayer2);
	stepchange=10;
	bglayer.addEventListener(LMouseEvent.MOUSE_UP,gamestart);
	
}

//游戏结束时的提示函数









	
	
	
	
	
	
	
	
	
	




	
	
	
	
