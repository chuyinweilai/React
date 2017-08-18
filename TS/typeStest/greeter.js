var bolType = true;
var numType = 0;
var hexLiteral = 0xf00d; //十六进制
var binaryLiteral = 10; //二进制
var octalLiteral = 484; //八进制
var strType = 'string';
var nameType = 'Miku';
var age = 16;
setInterval(function () {
    age++;
}, 1000);
//字符中嵌套变量，使用反引号``包裹
var message = " Hello, my name is " + nameType + ".I'll be " + (age + 1) + " years old next month.";
document.body.innerHTML = message;
