
//=========================练习1=====================
var i = 20;
function fn(){
    i -= 2;
    return function(n){
        console.log((++i)-n);
    }
}

var f = fn();
f(1);// 18 i=19
f(2);// 18 i= 20
fn()(3); // 16 i=19
fn()(4); // 14 i=18
f(5); // 14 i=19
console.log(i); //  19
