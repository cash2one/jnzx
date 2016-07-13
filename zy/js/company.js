/*打分*/
$(function(){
    var $star = $('.starRate');
    var $starItem = $star.find('i');

    $starItem.hover(function(){
      $(this).prevAll().andSelf().addClass('starRateL');
      $(this).nextAll().removeClass('starRateL');
    },function(){
      $starItem.removeClass('starRateL');
      $('.temptar').addClass('starRateL');
    });

    $starItem.click(function(){
      $(this).prevAll().andSelf().addClass('temptar');
      $(this).nextAll().removeClass('temptar');
      $(".stars").val($(this).index()+1); 
    });

});

/*评论区*/		
function AddAlbum(id){
          $.ajax({  
				type:'GET', 
			    url:INDEX_URL+'/user_albumall', 
				data:'id='+id,
				success:function(msg){    
	                var html="";   
				    var obj = JSON.parse(msg);
					// alert("11"+msg); 
				    if(obj.success){ 							
						var html = AlbumListHTML(obj.data);
						$("#albumList").html(html);  
					}else{   
						$("#albumList").html("未找到相关信息");
					}  
				}
			})  
	}	
	 
	
	
	function AlbumListHTML(data){ 
        var html=''; 
 		for(var i=0;i<data.length;i++){
            html = html+"<div class='col-md-3 albumList' onclick='album("+data[i].id+")'><div  style='border:1px solid #eee;'>";
			html = html+"<img src='"+UPLOAD_PATH+"/"+data[i].pic+"' style=width:100%;height:106px;'/>";   
			html = html+"<p class='text-center' style='margin-top:15px;border-top:1px solid #eee;padding-top:10px;'>"+data[i].name+"</p>";	
			html = html+"</div></div>";         			
		}  
		html = html+"<div class='col-md-3 albumList' onclick='jumpAlbum()'>";		          
		html = html+"<div style='height:166px;border:1px solid #eee;line-height:166px;width:100%;text-align:center;font-size:60px;color:#666;'><span class='glyphicon glyphicon-plus'></span></div>";
        html = html+"</div>"		
        return html; 
     } 	
	 
	function jumpAlbum(){
		location.href = INDEX_URL+"/user_albumadd";	
	}

$(function(){ 	 
	  formset({
		"id":"commentAdd",
		"url":INDEX_URL+"/company_commentAdd",
		"rule":{ 
		  "star":{
			required:true
		  },
		  "content":{ 
			required:true,
			minlength:2,
			maxlength:500		
		  }
		},

		"messages":{ 
		  "star":{
			required:"请选择评分"
		  },
		  "content":{  
			required:"请输入评论内容",
			minlength:"内容最少2位",
			maxlength:"内容最多{0}个字"		
		  }
		}, 
		"sucfunc":function(rs){
		  $("#submitInput").attr("disabled",true);  
		   sucdia({
		  'content':'恭喜你，吐槽成功！',
		  'fn':function(){ 
			location.reload()
			} 
		  } 
		)},
		"falfunc":function(rs){faldia({'content':'吐槽失败：'+rs.msg})}
	  });

	  formset({
		"id":"send",
		"url":INDEX_URL+"/company_sendmail",
		"rule":{ 
		  "email":{ 
			required:true,
					email:true, 
		  }  
		},

		"messages":{
				"email":{
					required:"输入接收报告邮箱",
					email:"请输入正确格式的邮箱",
				}
		}, 
		"sucfunc":function(rs){
		  sucdia({
		  'content':'请求成功，报告即将送达您的邮箱！',
		  'fn':function(){ 
			location.reload()
			}
		  }
		)},
		"falfunc":function(rs){faldia({'content':'请求发送失败：'+rs.msg})}
	  }); 

		//赞
		 $("#zanadd").click(function(){ 
		  //alert($(this).attr('companykey'));
			$.post(INDEX_URL+'/company_zanadd?companykey='+ $(this).attr('companykey'),function(rs){
				if(rs.success){
				   $("#like_count").html(parseInt($("#like_count").html()) + 1);              
					sucdia({content:"你点了赞~ 萌萌哒~~"});  
				}else{
				   faldia({ 
					  content: rs.msg,
					  'fn': function() {
					   if (rs['code'] == 1){
						location.href = INDEX_URL+"/user_login";
					  }                 
					}              
				  });               
				}                             
			},'json');    
		 });  
		 //取消赞
		 $("#zandel").click(function(){ 
			$.post(INDEX_URL+'/company_zandel?companykey='+ $(this).attr('companykey'),function(rs){
				if(rs.success)  sucdia({content:"取消成功",'fn':function(){
					 location .reload();
				}});          
				else faldia({content:rs.msg});
			},'json');    
		 });  

		 
		 //删除吐槽
		 $(".company-list-title a").click(function(){  
			$.post(INDEX_URL+'/company_commentDel?id='+ $(this).attr('cid'),function(rs){
				if(rs.success)  sucdia({
				   content:"吐槽删除成功",
				  'fn':function(){ 
					location.reload()
					}			
				});              
				else{   
				   faldia({ 
					  content: rs.msg,
					  'fn': function() {
					   if (rs['code'] == 1){ 
						location.href = INDEX_URL+"/user_login";
					   }               
					}              
				  });               
				}    
			},'json');    
		 }); 
		 
		 
	 //文字字数变化
	$(function(){
       if($(this).hasClass('tex')){
            var $tex = $(".tex");
			var $but = $(".but");
			var ie = jQuery.support.htmlSerialize;
			var str = 0;
			var abcnum = 0;
			var maxNum = 999;
			var texts= 0;  
			var num = 0;
			var sets = null;
			 
			$tex.val("");
			
			//顶部的提示文字
			$tex.focus(function(){
				if($tex.val()==""){
					$(".text-num").html("您还可以输入 <span style='color:green;'>500</span> 字");
				}	
			})
			$tex.blur(function(){
				if($tex.val() == ""){
					$(".text-num").html("请输入您的吐槽内容");
				}	
			}) 
			
			//文本框字数计算和提示改变
			if(ie){
				$tex[0].oninput = changeNum;
			}else{
				$tex[0].onpropertychange  = changeNum;
			}
			
			function changeNum(){
				//汉字的个数
				str = ($tex.val().replace(/\w/g,"")).length;
				//非汉字的个数
				abcnum = $tex.val().length-str;
				
				total = str*2+abcnum;
				
				if(str*2+abcnum<maxNum || str*2+abcnum == maxNum){
						$but.removeClass()
						$but.addClass("but");
						texts =Math.ceil((maxNum - (str*2+abcnum))/2);
						$(".text-num").html("您还可以输入 <span>"+texts+"</span> 字").children().css({"color":"green"});
				}else if(str*2+abcnum>maxNum){
						$but.removeClass("")
						$but.addClass("grey");
						texts =Math.ceil(((str*2+abcnum)-maxNum)/2);
						$(".text-num").html("您输入的字数超过了<span>"+texts+"</span>").children("span").css({"color":"red"});
				}	
			}		   
	   }
	}) 
 });
