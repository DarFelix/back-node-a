const { Router } = require('express');
const router = Router();

const User = require('../models/User');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello world'))

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    const newUser = new User( {email, password})
    await newUser.save();     

    const token = jwt.sign({_id: newUser._id}, 'secretKey', )
    res.status(200).json({token})
})

router.post('/signin', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email}); 
    if(!user) return res.status(401).send("No existe el email ingresado");
    if(user.password !== password) return res.status(401).send('Contraseña incorrecta');

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return res.status(200).json({token});
})

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Tarea 1',
            description: 'lorem ipsum',
            date: '2023-01-13T21:55:53.472+00:00'
        },
        {
            _id: 2,
            name: 'Tarea 2',
            description: 'lorem ipsum',
            date: '2023-01-13T21:55:53.472+00:00'
        },
        {
            _id: 3,
            name: 'Tarea 3',
            description: 'lorem ipsum',
            date: '2023-01-13T21:55:53.472+00:00'
        }
    ])
})

module.exports = router;

function verifyToken(req, res, next){

    if(!req.headers.authorization){
        return res.status(401).send('Solicitud negada');
    }

   const token = req.headers.authorization.split(' ')[1];

   console.log(token);


   
   if(token === 'null'){
    return res.status(401).send('Solicitud negada');
   }

   const payload = jwt.verify(token, 'secretKey');
   req.userId = payload._id;
   next();

   

}