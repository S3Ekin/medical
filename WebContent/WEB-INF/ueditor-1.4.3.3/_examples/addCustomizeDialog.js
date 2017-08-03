UE.registerUI('dialog',function(editor,uiName){

    //创建dialog
    var dialog = new UE.ui.Dialog({
        //指定弹出层中页面的路径，这里只能支持页面,因为跟addCustomizeDialog.js相同目录，所以无需加路径
        // iframeUrl:'customizeDialogPage.html',
        iframeUrl:'chat.html',
        //需要指定当前的编辑器实例
        editor:editor,
        //指定dialog的名字
        name:uiName,
        //dialog的标题
        title:"请选择",
        //指定dialog的外围样式
        cssRules:"width:700px;height:350px",

        //如果给出了buttons就代表dialog有确定和取消
        buttons:[
            {
                className:'edui-okbutton',
                label:'确定',
                onclick:function () {
                              editor.execCommand("insertHtml","<iframe frameborder='0' src='../chat/demo6.html' style='margin:10px 7.5%;width:85%;height:350px;'></iframe>");
                    dialog.close(true);
                }
            },
            {
                className:'edui-cancelbutton',
                label:'取消',
                onclick:function () {
                    dialog.close(false);
                }
            }
        ]});
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
                    var str=document.getElementById("edui173_iframe").contentDocument.getElementById("express").value;
                    str=str.split("+");
                    console.log(str);
                    var items="";
                    for (var i = 0; i < str.length; i++) {
                        if (!str[i]){
                            continue;
                        }else{
                            items += "<b style='color: red;'>&lt;%"+str[i]+"%&gt;</b>";
                        }
                    }
                              editor.execCommand("insertHtml",items);
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
            var iframe=document.getElementById("edui173_iframe");
            iframe.onload=function () {

                var express=iframe.contentDocument.getElementById("express");
                var val=range.endContainer.data.match(/^<%(\w+)%>$/);
                express.value=val?val[1]:null;
            };

        }
    });
    return btn;
});
