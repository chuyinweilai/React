
let bolType: boolean = true;

let numType: number = 0;
let hexLiteral: number = 0xf00d; 		//十六进制
let binaryLiteral: number = 0b1010;		//二进制
let octalLiteral: number = 0o744;		//八进制

let strType: string = 'string';
let nameType: string = 'Miku'
let age: number = 16;
//字符中嵌套变量，使用反引号``包裹
let message: string =` Hello, my name is ${ nameType }.I'll be ${ age + 1 } years old next month.`;

let list: number[] = [1,2,3];
let lists: Array<number> = [1,2,3]

let allType: any = 4;
allType = 'all of type';
allType = false;

/*	元组 Tuple */
let x: [string, number] = ['hello', 10];				
//x[0] == 'hello'; x[1] == 10; x[3] = 'world'; OK, 字符串可以赋值给(string | number)类型

/*枚举 */
enum Color {Red, Green, Blue};
let c: Color = Color.Green;
/**
 * 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
 * enum Color {Red = 1, Green, Blue} 从 1开始编号
 * enum Color {Red = 1, Green = 2, Blue = 4} 手动赋值
 * let colorName: string = Color[2];
 */

//输出到页面
document.body.innerHTML = message;