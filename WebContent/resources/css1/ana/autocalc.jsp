<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>资源配置</title>
<%@ include file="/jsp/headerfile.jsp"%>
</head>
<body>
	<div class="mr15">
		<div
			style="width: 1000px; margin-top: 5px; height: 35px; z-index: 9999;">
			<form action="" method="get">
				<span style="position: absolute; margin-top: 3px;">评审记录</span>
				<table style="float: right;" cellpadding="3" cellspacing="0">
					<tr>
						<td>更新频率:</td>
						<td>
							<div class="pr">
								<input type="hidden" id="dim" name="dim" value="year" /> <input
									type="text" id="_dim" class="input dd" autocomplete="off"
									disableautocomplete data-to="dim" data-type="json"
									data-src="_json_dims" onkeydown="return false;"
									style="width: 80px;" />
							</div>
						</td>
						<td><button type="button" id="_change"
								class="btn btn-primary">
								<i class="fa fa-save"></i> 更改
							</button></td>
						<td><button type="button" id="_run" class="btn btn-green">
								<i class="fa fa-check"></i> 立即执行
							</button></td>

					</tr>
				</table>
				<br> <br>
				<hr style="background-color: #DBDBDB; height: 2px; border: none;">
			</form>
		</div>
		<div style="padding: 10px 0 30px 0" id="container">
			<div id="chart1"
				style="width: 1000px; height: 350px; margin-bottom: 20px;"></div>
		</div>
	</div>
	<script type="text/javascript">
		var _json_dims = [ {
			id : 'year',
			text : '每年第一天'
		}, {
			id : 'month',
			text : '每月第一天'
		}, {
			id : 'week',
			text : '每周第一天'
		}, {
			id : 'bymyself',
			text : '自定义'
		} ];
		var _dim = T('#_dim').dropdown();

		//更改按钮事件
		T('#_change').on('click', function(){
			var dim = T('#dim').val();
			T.getJson("${pageContext.request.contextPath}/main/getTablesData.do?chart_name=床位概况&dims="+dims+"-kpi_id@4,5,6,7",function(res1){
				render_table('tpl1', 'chart1', res1);
			})
		})
		
		//立即执行按钮事件
		T('#_run').on('click',function(){
			
		})
	</script>
</body>
</html>
