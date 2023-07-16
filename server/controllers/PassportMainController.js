// PANGGIL MODULE CRYPTO JS
const CryptoJs = require('crypto-js')
// PANGGIL USER MODEL NYA
const { userModel } = require('../models/UserModel')

class PassportMainController {
    // INI LOGOUT NYA KALAU GA PERLU HAPUS AJA 
   static logout(req, res) {
    req.logOut({}, function(err) {
        console.log(err)
    })
    res.redirect('/login')
   }
   // INI DASHBOARD . KALAU UDAH BERHASIL LOGIN LALU MAU DI RENDER KE HALAMAN LAIN TINGGAL UBAH NAMA AJA
    static getDashboardPage(req, res){
        res.render('dashboard', { username: req.user.username })
    }

    static getRegisterPage(req, res){
        res.render('register', { isWrong: "hidden" })
    }

    static getLoginPage(req, res){
        res.render('login', { isWrong: "hidden" })
    }

    static async postRegisterPage(req, res){
        try {
            // AMBIL DATA YANG DIKASIH OLEH USER
            const data = req.body
            const email = data.email
            const username = data.username
            const password = data.password
            const confirm_password = data.confirm_password
            // VALIDASI INPUT USER
            if (password !== confirm_password) {
                return res.render('register', { isWrong: "passwordMismatch" })
            }

            if (!validatePassword(password)) {
                return res.render('register', { isWrong: "invalidPassword" })
            }
             // CEK APAKAH ADA DUPLIKASI USERNAME DI DB
            const userDataByUsername = await userModel.getData(username);
            if (userDataByUsername !== null) {
            return res.render('register', { isWrong: "alreadyRegistered" });
            }

            // CEK APAKAH ADA DUPLIKASI EMAIL DI DB
            const userDataByEmail = await userModel.getDataByEmail(email);
            if (userDataByEmail !== null) {
            return res.render('register', { isWrong: "alreadyRegistered" });
            }
            // HASH PASSWORD
            const hashedPassword = CryptoJs.HmacSHA256(password, process.env.SECRET_LOGIN).toString()
            // INSERT EMAIL, USERNAME & PASSWORD KE DATABASE
            await userModel.insertData(email, username, hashedPassword)
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.render('error', { error, message: 'DATABASE ERROR'})
        }
    }
        static async MainPage(req,res){
        res.render('index', { title: 'Express' });                
    }
}
    // FUNCTION VALIDATE PASSWORD
    function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
    }

module.exports = { PassportMainController }