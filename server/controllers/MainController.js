const { gameListModel } = require('../models/gameListModel');

class MainController {
    //controller untuk melihat gameList
    static async getGameList(req, res) {
        try {
            // ambil semua data game dari model
            const games = await gameListModel.getGameList();
            // kirim semua data ke user
            return res.json({ status: 'success', data: games });
        } catch (error) {
            console.log(error);
            res.status(500).send(' Internal Server Error !');
        }
    }

}

module.exports = { MainController }