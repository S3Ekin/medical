jQuery.extend({
    sortTable:
        function(args){
            var $=jQuery,
                table=$("#"+args.tableId),
                allTr=$("tbody > tr",table).get(),
                tHead=$("thead > tr >th",table).not($(".noSort"));
            if(tHead.length==0){
                tHead=$("thead > tr >td",table).not($(".noSort"));
            }

            tHead.each(function(){
                $(this).data("dir",1)//排序的方向
                    .data("index",$(this).prevAll().length-1)//计算每一列的绝对列
                    .css("cursor","pointer")
                    .attr("title","单击排序")
                    .click(function(){
                        _$this=$(this);
                        allTr.sort(function(a,b){
                            var td1=$(a).children("td").eq(_$this.data("index")).text();
                            td1=isNaN(Number(td1))?td1:Number(td1);
                            var td2=$(b).children("td").eq(_$this.data("index")).text();
                            td2=isNaN(Number(td2))?td2:Number(td2);
                            var dir=_$this.data("dir");
                            if(td1>td2){
                                return dir;
                            }else if(td1<td2){
                                return -dir;
                            }else{
                                return 0;
                            }
                        });
                        $(this).data("dir",-$(this).data("dir"));
                        $(allTr).each(function(){
                            $("tbody",table).append($(this));
                        });
                        $(this).siblings().find('i').removeClass('fa-long-arrow-up').removeClass('fa-long-arrow-down');
                        if($(this).data("dir")==1){
                            $(this).find('i').addClass('fa-long-arrow-down').removeClass('fa-long-arrow-up');
                        }else{
                            $(this).find('i').addClass('fa-long-arrow-up').removeClass('fa-long-arrow-down');
                        }
                    });
            });
        }
});