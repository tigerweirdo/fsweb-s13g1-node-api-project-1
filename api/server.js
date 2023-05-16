// SUNUCUYU BU DOSYAYA KURUN
const express = require ("express");
const server = express();
const userModel =require("./users/model");

server.use(express.json()); //JSON formatlı istekler için

//POST

server.post('/api/users', (req, res) => {
    const user = req.body;

    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    } else {
        userModel.insert(user)
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                res.status(500).json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
            });
    }
});
// GET /api/users
server.get('/api/users', (req, res) => {
    userModel.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
        });
});

// GET /api/users/:id
server.get('/api/users/:id', (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
        });
});

// DELETE /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    userModel.remove(req.params.id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Kullanıcı silinemedi" });
        });
});

// PUT /api/users/:id
server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
    } else {
        userModel.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404).json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Kullanıcı bilgileri güncellenemedi" });
            });
    }
});


module.exports = server; // SERVERINIZI EXPORT EDİN {}
