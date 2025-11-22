
const name = "nseem"
var age = 12
var n = age > 18
var r = 7
var nm = age + r

console.log(nm)
var nb = age - r

console.log(nb)
console.log(name)
console.log(age)
console.log("is age > 18?", n)
console.log(r)

console.log("is age < 20", age < 20)
const ui = "isaa"

console.log(ui)

const cr = ui + name

console.log(cr)

var uy = "istrue+5>6"

console.log(uy)

const c = 7

const o = 5

console.log(c * o)

var s = 8

var a = 1

console.log(a + s)

const class1 = [90, 80, 70, 98, 89]

const sum = class1[0] + class1[1] + class1[2] + class1[3] + class1[4]
const avg = sum / class1.lenthg

class1[3] = 100


console.log(sum)


const names = "nseem"
const lastname = "isaa"
const fullname = (names + lastname)
var age = 12
age = age + 1
console.log(age)

age = age + 10
console.log(age)

age = age - 18
console.log(age)
const istrue = 5 > 6
console.log(istrue)
var number1 = 5
var number2 = 10
var remmaber = number1
number1 = number2
number2 = remmaber

console.log("number1=", number2)
console.log("number2=", number1)


var x = [1, "Z", true, []]
x.length

const arr = [5, 6, 7, 8, 9]

const car = {

    name: "BMW",
    speed: 230,
    numberPlate: 4065
}

console.log(car)

car.speed = 200
console.log(car);


const carid = car.name + car.numberPlate

car.name = "dodge"
console.log(car)

const car5 = {
    name: "bmw",
    number: 405678,
    issport: false,
    speed: 230,
    color: "blue",


}

console.log(car5)

car5.name = "dodge"
car5.issport = true
car5.number = 50987
car5.speed = 200
car5.speed += 10
car5.color = "grey"
console.log(car5)

const b = car5.speed > 280

console.log(b)

const isfast = car5.speed > 200

console.log(isfast)


const class2 = ([98, 67, 40, 12, 90])

const class3 = {
    math: 90,
    arabic: 100,
    english: 98,
    histori: 70,
    hebrew: 60,
}

const sum2 = class3.arabic + class3.math + class3.english + class3.histori + class3.hebrew

console.log("the sum is: ", sum2);

const avg2 = sum2 / 5

console.log(avg2)


const arr1 = ["sae", "nseem", "rin", "netro", "loki"]

console.log(arr1[4])
console.log(arr1[0])

console.log("the arr length is: ", arr1.length)
console.log("the arr length is: ", arr1[arr.length - 1])

const printmyname = () => {
    console.log("batata")
}

printmyname()


const printname = (name) => {
    console.log(name)
}


printname("abc")
printname("betnjan")
printname("nseem")



const sum3 = (a, b) => {
    return a + b
}

const x1 = sum3(10, 1)


console.log(x1)


const x2 = sum3(7, 8)


console.log(x2)







const printfuiiname = (name, lastname) => {
    console.log(name + " " + lastname)
}

printfuiiname("nseem", "isaa")

printfuiiname("sari", "isaa")

printfuiiname("abd", "isaa")


const sum5 = (x, y) => {

    const s = x + y

    return s
}
console.log(sum5(7, 12))
console.log(sum5(10, 6))

//19

const muli = (n, m) => {

    const il = n * m

    return il
}

console.log(muli(5, 8))


//19



const check = (m) => {

    const c = m > 50

    return c

}

console.log(check(100))

console.log(check(40))



const check1 = (k, j) => {

    const ch = k + j > 50

    return ch
}


console.log(check1(50, 49))
console.log(check1(30, 10))

const getavg = (g, v, e) => {

    const ge = g + v + e
    const avg = ge / 3


    return avg

}
console.log(getavg(40, 50, 9))


const printstudent = (name, mark) => {

    const fs = name + mark

    return fs
}

console.log(printstudent("nseem", 100))




const print = () => {
    const array = [2, 4, 6]
    console.log(array[0] + array[1] + array[2])
    console.log(array[0] * array[2])


}

print()




const studeut = {
    name: "nseem",
    age: 12,
    addregs: "qfarqasm",
    m1: 80,
    m2: 90,
    m3: 100,
}

console.log(studeut)



console.log(
    studeut.m1 +
    studeut.m2 +
    studeut.m3
)
const ab = (
    studeut.m1 = 100,
    studeut.m2 = 80,
    studeut.m3 = 90,
    studeut.age = 13
)

















const product = []

const pr1 = { name: "milk", price: 10, guntity: 50 }

product.push(pr1)


const pr2 = { name: "mohito", price: 10, guntity: 20 }

product.push(pr2)



const pr3 = { name: "shebs", price: 5, guntity: 100 }

product.push(pr3)


const pr4 = { name: "shokalata", price: 7, guntity: 130 }

product.push(pr4)


const pr5 = { name: "gleda", price: 12, guntity: 200 }

product.push(pr5)

console.log(product)



const printproduct = () => {
    console.log(product[0])

}


printproduct()




const printproduct1 = () => {
    console.log(product[4])
}

printproduct1()


const prprice = () => {


    product.forEach(item => {
        console.log(item.name, item.price, item.guntity)

    })

}

prprice()


const sumguntity = () => {

    var sum7 = 0


    product.forEach(item => {

        console.log(item.guntity);
        sum7 = sum7 + (item?.guntity || 0)

    }
    )

    return sum7
}

const result = sumguntity()
console.log(result)





const total = () => {

    var sum7 = 0

    product.forEach(item => {
        sum7 = sum7 + (item.price * item.guntity)
    })

    return sum7

}


const siuuu = total()
console.log(siuuu)




const filterdata = () => {

    const myfilter = product.filter(item => item.price == 12)

    return myfilter


}


const cr7 = filterdata()
console.log(cr7)







const filterdata2 = () => {

    const myfilter = product.filter(item => item.name == "gleda")

    return myfilter


}



const loki = filterdata2()
console.log(loki)




const greater = () => {

    const myfilter = product.filter(item => item.price > 10)

    return myfilter


}


const ty7 = greater()
console.log(ty7)






const greaterguntity = () => {

    const myfilter = product.filter(item => item.guntity > 100)

    return myfilter


}



const haha = greaterguntity()
console.log(haha)






const findcheap = () => {

    var ch = product[0]

    product.forEach(item => {
        if (item.price > ch.price) {
            ch = item
        }
    });

    return ch
}

console.log(findcheap())




































