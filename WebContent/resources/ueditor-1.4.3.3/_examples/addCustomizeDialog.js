UE.registerUI('dialog',function(editor,uiName){
    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        iframeUrl: 'insert_chat.html',
        //需要指定当前的编辑器实例
        editor: editor,
        //指定dialog的名字
        name: uiName,
        //dialog的标题
        title: "请选择",
        //指定dialog的外围样式
        cssRules: "width:700px;height:350px",
        buttons: [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    var iframe=document.getElementsByClassName("edui-for-dialog")[0];
                    iframe=iframe.getElementsByTagName("iframe")[0];
                    var is_chat = iframe.contentWindow._chart;
                    var str="";
                    if (is_chat == 1) {
                        str = "<iframe frameborder='0' src='../../resources/resource_chat/demo6.html' style='margin:10px auto;width:85%;height:350px;'></iframe>"
                    } else {
                        str = iframe.contentDocument.getElementsByClassName("layout-right")[0].innerHTML;
                    }
                    editor.execCommand("insertHtml", str);
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]
    });
    //参考addCustomizeButton.js
    var btn = new UE.ui.Button({
        name:'dialogbutton' + uiName,
        title:'插入图形',
        //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules :'background-position: -400px -40px;',
        onclick:function () {
            //渲染dialog
            dialog.render();
            dialog.open();
        }
    });

    return btn;
}/*index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮*/);
UE.registerUI('express',function(editor,uiName){
    var me=this;
    var status=true;
    var express = new UE.ui.Dialog({
        iframeUrl:'express.html',
        editor:editor,
        name:uiName,
        title:"表达式编辑",
        cssRules:"width:600px;height:290px",
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                    var range = me.selection.getRange();
                    var val=range.endContainer.parentNode;
                    var iframe=document.getElementsByClassName("edui-for-express")[0];
                    iframe=iframe.getElementsByTagName("iframe")[0];
                    var str=iframe.contentDocument.getElementById("express").value;
                    str=str.split("+");
                    var items="";
                    for (var i = 0; i < str.length; i++) {
                        if (!str[i]){
                            continue;
                        }else{
                            items += "<span class='temp-variate'>[%"+str[i]+"%]</span>";
                        }
                    }
                   if(status){
                       val.innerHTML=items;
                   }else{
                       editor.execCommand("insertHtml",items);
                   }

                    express.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    express.close(false);
                }
            }
        ]});
    var btn = new UE.ui.Button({
        name:'dialogbutton' + uiName,
        title:'表达式编辑',
        cssRules :'background-position: -200px -40px;',
        onclick:function () {
            var range = me.selection.getRange();
            express.render();
            express.open();
            var iframe=document.getElementsByClassName("edui-for-express")[0];
            iframe=iframe.getElementsByTagName("iframe")[0];
            iframe.onload=function () {
                var expressEdit=iframe.contentDocument.getElementById("express");
                var val=range.endContainer.data.match(/^\[%(\w+)%]$/);
                status=val?true:false;
                expressEdit.value=val?val[1]:null;
            };

        }
    });
    return btn;
});


