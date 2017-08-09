/**
 * Created by S-Ekin on 2017/3/28 0028.
 */
(function () {
    //打开数据库
    var openDB=openDatabase("medical",1.1,"medical",10*1024*1024,function (result) {
        console.log(result)
    });
    //建表
   var webSql={
       text:function () {
           alert("success");
       },
       createTable:function(name){
        var createTableSQL= "CREATE TABLE "+name+"('text','type','zb','data','x_wd','y_wd')";
        openDB.transaction(function (taransactionobj) {
            taransactionobj.executeSql(createTableSQL);
        })
    },
       add:function(obj,tableName) {
           var addSQL="INSERT INTO "+tableName+"('text','type','zb','data','x_wd','y_wd') VALUES ('"+obj.text+"','"+obj.type+"','"+obj.zb+"','"+obj.data+"','"+obj.x_wd+"','"+obj.y_wd+"')";
           console.log(addSQL);
           openDB.transaction(function (ts) {
               ts.executeSql(addSQL);
           })
       },
       deleteData:function () {
           var deleteSQL="DELETE FROM recoder WHERE id=2";
           openDB.transaction(function (ts) {
               ts.executeSql(deleteSQL);
           })
       },
       searchData:function (tableName) {
           /*
            * sqlStatement:sql语句
            * arguments:实参
            * callback:回调函数
            * errorCallback:错误时候的回调函数
            * */
           var searchSQL = "SELECT * FROM "+tableName;
           openDB.transaction(function (ts) {
               ts.executeSql(searchSQL,[],function (ts,result) {
                   //result得到的结果集
                   //可以通过rows 得到结果数组
                   console.log(result.rows);

               });
           })
       },
       searchTitle:function (tableName) {
           var searchSQL = "SELECT text FROM "+tableName;
           return new Promise(function (res, reject) {
               if (openDB) {
                   openDB.transaction(function (ts) {
                       ts.executeSql(searchSQL,[],function (ts,result) {
                           res({code: 2000, message: "查询成功", data: result.rows});
                       }, function (error) {
                           reject({code: 2001, message: "查询失败", data: error})
                       });
                   });
               } else {
                   reject({code: 3000, message: "打开数据库失败！"})
               }
           });
          /* openDB.transaction(function (ts) {
               ts.executeSql(searchSQL,[],function (ts,result) {
                   console.log(result.rows);
               });
           });*/
       },
       searchSinge:function (tableName,title) {
           var searchSQL = "SELECT * FROM "+tableName+" WHERE text='"+title+"'";
           return new Promise(function (res, reject) {
               if (openDB) {
                   openDB.transaction(function (ts) {
                       ts.executeSql(searchSQL,[],function (ts,result) {
                           res({code: 2000, message: "查询成功", data: result.rows});
                       }, function (error) {
                           reject({code: 2001, message: "查询失败", data: error})
                       });
                   });
               } else {
                   reject({code: 3000, message: "打开数据库失败！"})
               }
           });
          /* openDB.transaction(function (ts) {
               ts.executeSql(searchSQL,[],function (ts,result) {
                   console.log(result.rows);
               });
           });*/
       },
       updataData:function () {
        var updata="UPDATE recoder SET title='浪费时间' WHERE id=2";
        openDB.transaction(function (ts) {
            ts.executeSql(updata);
        })
    }
   };
    window.webSql=webSql;
})();