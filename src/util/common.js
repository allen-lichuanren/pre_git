/**
 * 
 * 格式化发表时间
 * @param {any} time 
 * @returns 
 */
export const formatDate = (time) => {
    var date= new Date(time);
    var sp=['一','二','三','四','五','六','日'];

    return date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日'+'  '+'星期'+sp[date.getDay()-1] 
}



/**
 * layer 弹出层
 */

export const toast= function (content) {
    layer.msg(content,{time: 3000});
}
export const layer_cancel= function() {
    layer.closeAll();
}
export const dialog= function(contenthtml, confirm, cancel, yes, no) {
    layer.open({
        content: contenthtml
        ,btn: [confirm, cancel]
        ,yes: function(index){
            yes(index);
        }
    });
}
export const confirm=function(contenthtml, confirm, yes) {
    layer.open({
        content: contenthtml
        ,btn: confirm
        ,yes: function(index) {
            yes(index)
        }
      });
}
