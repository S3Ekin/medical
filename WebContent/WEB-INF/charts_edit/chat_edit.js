var $radio = $("input[name=dataType]"),
    $sourceSlect=$(".sourceBtn span"),
    $zbName=$(".zb-name"),
    is_zb=true,
    $zb=$(".zb"),
    $newAdd=$(".newAdd"),
    $org=$("#organization"),
    $dataCombo=$(".data-combo"),
    $calendar=$(".calendar-combo"),
    $upload=$(".upload"),
    $table=$(".table"),
    $sourceSelected=$("#sourceSelected"),
    $sourceBtn=$(".sourceBtn");
/*日期下拉框加载*/
$.ajax({
    url:"../ajax/data.json",
    dataType:"json",
    success:function (data) {
        var dataArray=data;
        /*月期框加载*/
        $dataCombo.combobox({
            valueField:"id",
            textField:"text",
            data:dataArray.month,
            editable:true,
            width:80,
            height:30,
            panelWidth:80,
            panelHeight:100,
            formatter:function (row) {
                return "<span class='glyphicon glyphicon-check'>&nbsp;"+row.text+"</span>"
            }
        });
        /*频率框加载*/
        $("#rotate").combobox({
            valueField:"id",
            textField:"text",
            data:dataArray.rotate,
            editable:true,
            width:70,
            height:30,
            panelWidth:70,
            panelHeight:100,
            onLoadSuccess:function(){
                var loadData=$(this).combobox("getData");
                $(this).combobox("setValue",loadData[2].text);
            },
            formatter:function (row) {
                return "<span class='glyphicon glyphicon-check'>&nbsp;"+row.text+"</span>"
            },
            onSelect:function (recoder) {
                var item=recoder.value;
                if(recoder.id==4){
                    $dataCombo.parent().hide();
                    $calendar.parent().show();
                    $calendar.datebox({
                        width:180,
                        height:30,
                        panelWidth:180,
                        panelHeight:200,
                        value:"Today"
                    });
                }else{
                    $calendar.parent().hide();
                    $dataCombo.parent().show();
                    $dataCombo.combobox("loadData",dataArray[item]);
                }
            }
        });
    }
});
/*机构树加载*/
$org.combotree({
    url:"../ajax/org.json",
    method:"get",
    editable:true,
    width:180,
    height:30,
    panelWidth:180,
    panelHeight:300,
    value:"信息科"
});
/*维度框加载*/
$(".wd-combo").combobox({
    valueField:"id",
    textField:"text",
    url:"../ajax/row_wd.json",
    method:"get",
    editable:true,
    width:180,
    height:30,
    panelWidth:180,
    panelHeight:100,
    onLoadSuccess:function(data){
        var loadData=$(this).combobox("getData");
        $(this).combobox("setValue",loadData[3].text);
    },
    formatter:function (row) {
        return "<span class='glyphicon glyphicon-pushpin'>&nbsp;"+row.text+"</span>"
    }
});
/*字段框加载*/
$(".field-combo").combobox({
    valueField:"id",
    textField:"text",
    url:"../ajax/row_wd.json",
    method:"get",
    editable:true,
    width:180,
    height:30,
    panelWidth:180,
    panelHeight:100,
    onLoadSuccess:function(data){
        var loadData=$(this).combobox("getData");
        $(this).combobox("setValue",loadData[3].text);
    },
    formatter:function (row) {
        return "<span class='glyphicon glyphicon-check'>&nbsp;"+row.text+"</span>"
    }
});
/*添加纵轴字段*/
var count=1;
$("#field-btn").click(function () {
    count++;
    var str='<div class="row"><div class="col-xs-2 topic add-field">纵轴字段<span>'+count+'</span>:</div><div class="col-xs-4"><div class="new-field"></div></div><div class="col-xs-2" > <button type="button" class="btn btn-red field-del" >删除</button> </div></div>';
    $(".add-col-field").append(str);
    $(".new-field").combobox({
        valueField:"id",
        textField:"text",
        url:"../ajax/row_wd.json",
        method:"get",
        editable:true,
        width:180,
        height:30,
        panelWidth:180,
        panelHeight:100,
        onLoadSuccess:function(data){
            var loadData=$(this).combobox("getData");
            $(this).combobox("setValue",loadData[3].text);
        },
        formatter:function (row) {
            return "<span class='glyphicon glyphicon-check'>&nbsp;"+row.text+"</span>"
        }
    });
});
/*删除纵轴字段*/
var $addColField=$(".add-col-field");
$addColField.on("click",".field-del",function () {
    var self=$(this);
    $("#modal_alert").modal("show");
    $("#is_true").click(function () {
        self.parent().parent().remove();
    });
});
/*删除纵轴字段按钮hover事件*/
$addColField.on("mouseover",".field-del",function () {
    $(this).parent().siblings().eq(0).css("color","red");
}).on("mouseout",".field-del",function () {
    $(this).parent().siblings().eq(0).css("color","#2081BB");
});
/*单选按钮事件*/
$radio.on("click",function () {
    $zbName.html(null);
    $(".add-col-field").html(null);
    $table.hide();
    $(".pre").hide();
    $zb.hide();
    $upload.hide();
    if($(this).val()==1){
        $sourceSlect.html("多选");
        is_zb=true;
    }else{
        $sourceSlect.html("单选");
        is_zb=false;
    }
});
/*数据源选择按钮*/
$sourceBtn.on("click",function () {
    $sourceSelected.window("open");
});
/*数据源窗口加载*/
$sourceSelected.window({
    title : '数据源选择',
    modal : true,
    shadow : true,
    closed : true,
    width : 300,
    height : 400,
    padding : 10,
    minimizable : false,
    maximizable : false,
    collapsible : false,
    top : ($(window).height() - 500) * 0.5,
    left : ($(window).width() - 400) * 0.5,
    resizable:false,
    inline:false,
    onOpen : function(){
        var urls,is_checked;
        if(is_zb){
            urls="../ajax/SelectKpi.json";
            is_checked=true;
        }else{
            urls="../ajax/upload.json";
            is_checked=false;
        }
        // 加载窗口树文件
        $('#sourceTree').tree({
            url:urls,
            method:"get",
            animate:true,
            checkbox:is_checked
        });
    }
});
/*添加资源*/
var show_combo;
$.ajax({
    url:"../ajax/show_type.json",
    success:function (data) {
        show_combo=data;
    }
});
$(".footer").on("click","button",function(){
    switch ($(this).html()){
        case "确定":
            var htm ="",
                str ="",
                state = is_zb ? "getChecked":"getSelected";
            $newAdd.html(null);
            var nodes=$("#sourceTree").tree(state);
            if(is_zb){
                if(nodes.length){
                    for (var i = 0,length=nodes.length; i <length; i++) {
                        var obj = nodes[i];
                        if (obj.children.length!=0){
                            continue;
                        }else{
                            var _showId=(obj.id<5)?0:((obj.id<13)?1:2);
                            str ='<div class="row"><div class ="col-xs-2 zb-name topic">'+obj.text+":"+'</div><div class = "col-xs-10 no-padding" ><div class="col-xs-2" style="width: 65px;">'+show_combo[_showId].type+':'+'</div><div class ="col-xs-4 no-padding" ><div id="show_type_'+i+'"></div></div><div class="col-xs-2" style="width:90px">展示类型:</div><div class ="col-xs-4 no-padding" ><div class="chat-type"></div></div></div >';
                            $newAdd.append(str);
                            $("#show_type_"+i).combobox({
                                valueField:"id",
                                textField:"text",
                                data:show_combo[_showId].combo,
                                editable:true,
                                width:180,
                                height:30,
                                panelWidth:180,
                                panelHeight:100,
                                onLoadSuccess:function(){
                                    var loadData=$(this).combobox("getData");
                                    $(this).combobox("setValue",loadData[1].text);
                                },
                                formatter:function (row) {
                                    return "<span class='glyphicon glyphicon-check'>&nbsp;" + row.text + "</span>"
                                }
                            });
                            console.log(show_combo[3].combo,"jkk");
                            $(".chat-type").combobox({
                                valueField:"id",
                                textField:"text",
                                data:show_combo[3].combo,
                                editable:true,
                                width:140,
                                height:30,
                                panelWidth:140,
                                panelHeight:100,
                                onLoadSuccess:function(){
                                    /* var loadData=$(this).combobox("getData");
                                     $(this).combobox("setValue",loadData[1].text);*/
                                },
                                formatter:function (row) {
                                    return "<span class='glyphicon glyphicon-check'>&nbsp;" + row.text + "</span>"
                                }
                            });
                        }
                    }

                    $zb.show();
                    $upload.hide();
                }else{
                    alert("没有选择文件！");
                    return ;
                }
            }else{
                if(!nodes||nodes.children.length){
                    alert("请选择文件！");
                    return ;
                }else{
                    $zb.hide();
                    $upload.show();
                    htm="<span >"+nodes.text+"</span>";
                    $zbName.html(htm);
                }
            }
            $table.show();
            break;
        default:
            break;
    }
    $sourceSelected.window("close");
});