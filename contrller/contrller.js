var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/StudentsManagerSystem', {
    useNewUrlParser: true
});
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true //必须填写
    },
    age: {
        type: Number,
        required: true //必须填写
    },
    password: {
        type: String,
        required: true
    }
})

var students = mongoose.model('Students', userSchema);

//首先保存一个再说
// var demo = new students({
//     id: 1002,
//     name: '李四',
//     age: 23,
//     password: '123456'
// })

// demo.save(function (err, ret) {
//     if (err) {
//         console.log("保存1001失败")
//     } else {
//         console.log(ret.id + "保存成功")
//     }
// });

//将loginpage函数挂载到expors上,如果用module.exprots="loginpage"导出单个成员
//相当于exports是module对象中的一个成员，原来的exports 也可以写为module.exprots
// var module={
//     exports：{
//        foo:'bor',
//     }
// }
//为了简化，node定义了 var exports=module.exprots  最后return的是module.exprots 
exports.loginpage = function (req, res) {
    res.render("login");
}

//检查数据库中是否含有相同学号的和id的同学
exports.check = function (req, res) {
    students.findOne({
        id: req.query.username,
        password: req.query.password
    }, function (err, ret) {
        if (err) {
            res.redirect("/");
        } else {
            if (ret == null) {
                res.redirect("/");
            } else {
                res.redirect("/index");
            }
        }
    })
}

//渲染重置密码页面
exports.resetPasswordpage = function (req, res) {
    res.render("reset");
}

//重置密码成功业务逻辑
exports.resetSucsess = function (req, res) {
    students.findOne({
        id: req.query.username,
        password: req.query.oldpassword
    }, function (err, ret) {
        if (err) {
            res.redirect("/resetPassword");
        } else {
            if (ret == null) {
                res.redirect("/resetPassword");
            } else {
                students.update({
                    id: req.query.username
                }, {
                    password: req.query.newpassword
                }, function (err, ret) {
                    if (err) {
                        res.redirect("/resetPassword");
                    } else {
                        res.redirect("/");
                    }
                })
            }
        }
    })
}
//登录成功后调整到主页
exports.indexpage = function (req, res) {
    req.params.id;
    //查询数据库，并返回数据库中的所有数组对象docs
    students.find(function (err, docs) {
        if (err) {
            console.log("查询数据库失败")
        } else {
            res.render("index", {
                "students": docs
            });
        }
    });
}

//跳转到添加页面
exports.addStudent = function (req, res) {
    res.render("add");
}
exports.register = function (req, res) {
    res.render("register");
}

//add保存业务逻辑
exports.saveStudent = function (req, res) {

    var student = new students({
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        password: '123456'
    }).save(function (err, ret) {
        if (err) {
            console.log("err")
        } else {
            res.redirect("/index");
        }
    })
}

//更新学生信息，学生信息从数据库导出
exports.editStudent = function (req, res) {
    students.find({
        id: req.params.id
    }, function (err, doc) {
        if (err) {
            console.log("数据库连接失败")
        } else {
            res.render("edit", {
                "student": doc
            });
        }
    })
}

//更新学生信息存入数据库
exports.editSuccess = function (req, res) {
    students.updateOne({
        id: req.body.id
    }, {
        name: req.body.name,
        age: req.body.age
    }, function (err, ret) {
        if (err) {
            console.log("存入数据库失败")
        } else {
            res.redirect("/index");
        }
    })
}

//删除学生数据
exports.deleteStudent = function (req, res) {
    students.findOneAndRemove({
        id: req.params.id
    }, function (err, ret) {
        if (err) {
            console.log("删除数据失败")
        } else {
            res.redirect("/index");
        }
    })
}