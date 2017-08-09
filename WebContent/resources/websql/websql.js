/**
 * Created by S-Ekin on 2017/3/28 0028.
 */
(function () {
    //打开数据库
    var sd=openDatabase("medical",1.1,"medical",10*1024*1024,function (result) {
        console.log(result)
    });
    function createtable () {
        alert(2);
    //建表
    var createTableSQL= "CREATE TABLE table('id','title','zb','data')";
    sd.transaction(function (taransactionobj) {
        taransactionobj.executeSql(createTableSQL);
    })
    }
    function add(obj) {
        var addSQL="INSERT INTO recoder('id','title','des') VALUES (2,'会议记录2','大家今天需要开会')";
        sd.transaction(function (ts) {
            ts.executeSql(addSQL);
        })
    }
    function deleteData() {
        var deleteSQL="DELETE FROM recoder WHERE id=2";
        sd.transaction(function (ts) {
            ts.executeSql(deleteSQL);
        })
    }
    function searchData() {
        /*
         * sqlStatement:sql语句
         * arguments:实参
         * callback:回调函数
         * errorCallback:错误时候的回调函数
         * */
        var searchSQL = "SELECT * FROM recoder";
        sd.transaction(function (ts) {
            ts.executeSql(searchSQL,[],function (ts,result) {
                //result得到的结果集
                //可以通过rows 得到结果数组
                console.log(result.rows);
                 var list =document.querySelector(".result-content");
                var allHtml="";
                for (var i = 0; i < result.rows.length; i++) {
                    var info=result.rows[i];
                    var item="<li><h1>"+info.title+"</h1><p>"+info.des+"</p></li>";
                    allHtml+=item;
                }
                list.innerHTML=allHtml;
            });
        })
    }
    function updataData() {
        var updata="UPDATE recoder SET title='浪费时间' WHERE id=2";
        sd.transaction(function (ts) {
            ts.executeSql(updata);
        })
    }
})();