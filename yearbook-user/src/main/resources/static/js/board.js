/**
 * 
   */
$(function () {

	// $( '#dataInfo' ).height( $( window ).height() - $( '#header' ).height() - 45);
	// $( '.dataInfo' ).height( $( window ).height() - $( '.navigation' ).height() - 45);

	var paper = $( '.paper' );
	// var FW = $( window ).width();
	var FW = $( '.dataInfo' ).width();
	var FH = $( '.dataInfo' ).height();
	for (var i = 0; i < paper.length; i++) {
		var obj = paper.eq(i);
		obj.css( {
			left : parseInt(Math.random() * (FW - obj.width()) + 120) + 'px',
			top : parseInt(Math.random() * (FH - obj.height())) + 'px'
		} );
		drag(obj, $( 'dt', obj ));
	}

	paper.click( function () {
		$( this ).css( 'z-index', 1 ).siblings().css( 'z-index', 0 );
	} );


	//跳转页面
	$( '#send' ).click( function () {
		window.location.href="wish.html"; 
	} );

	

	$( 'textarea[name=content]' ).keyup( function () {
		var content = $(this).val();
		var lengths = check(content);  //调用check函数取得当前字数

		//最大允许输入50个字
		if (lengths[0] >= 50) {
			$(this).val(content.substring(0, Math.ceil(lengths[1])));
		}

		var num = 50 - Math.ceil(lengths[0]);
		var msg = num < 0 ? 0 : num;
		//当前字数同步到显示提示
		$( '#font-num' ).html( msg );
	} );

	$( '#phiz img' ).click( function () {
		var phiz = '[' + $( this ).attr('alt') + ']';
		var obj = $( 'textarea[name=content]' );
		obj.val(obj.val() + phiz);
	} );

});

/**
* 元素拖拽
* @param  obj		拖拽的对象
* @param  element 	触发拖拽的对象
*/
function drag (obj, element) {
	var DX, DY, moving;

	element.mousedown(function (event) {
		obj.css( {
			zIndex : 1,
			opacity : 0.5,
 			filter : 'Alpha(Opacity = 50)'
		} );

		DX = event.pageX - parseInt(obj.css('left'));	//鼠标距离事件源宽度
		DY = event.pageY - parseInt(obj.css('top'));	//鼠标距离事件源高度

		moving = true;	//记录拖拽状态
	});

	$(document).mousemove(function (event) {
		if (!moving) return;

		var OX = event.pageX, OY = event.pageY;	//移动时鼠标当前 X、Y 位置
		var	OW = obj.outerWidth(), OH = obj.outerHeight();	//拖拽对象宽、高
		var DW = $(window).width(), DH = $(window).height();  //页面宽、高

		var left, top;	//计算定位宽、高

		left = OX - DX < 0 ? 0 : OX - DX > DW - OW ? DW - OW : OX - DX;
		top = OY - DY < 0 ? 0 : OY - DY > DH - OH ? DH - OH : OY - DY;

		obj.css({
			'left' : left + 'px',
			'top' : top + 'px'
		});

	}).mouseup(function () {
		moving = false;	//鼠标抬起消取拖拽状态

		obj.css( {
			opacity : 1,
 			filter : 'Alpha(Opacity = 100)'
		} );

	});
}

/**
 * 统计字数
 * @param  字符串
 * @return 数组[当前字数, 最大字数]
 */
function check (str) {
	var num = [0, 50];
	for (var i=0; i<str.length; i++) {
		//字符串不是中文时
		if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 255){
			num[0] = num[0] + 0.5;//当前字数增加0.5个
			num[1] = num[1] + 0.5;//最大输入字数增加0.5个
		} else {//字符串是中文时
			num[0]++;//当前字数增加1个
		}
	}
	return num;
}



		
	
