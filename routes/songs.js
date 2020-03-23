const express = require("express")
const router = express.Router()
const Song = require('../models/songs')

//Getting all songs
router.get('/',async (req,res)=>{
    try{
        const songs = await Song.find();
        res.json(songs)
    }catch(err){
        res.status(500).json({ message: err.message})

    }

})
//Gettin one
router.get('/:id',getSong,(req,res)=>{
    res.json(res.song);
    
    
})
//Creating one
router.post('/', async (req,res)=>{
    const song = new Song({
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album
    })
    try{
        const newSong = await song.save()
        res.status(201).json(newSong)
    }catch(err){
        res.status(400).json({message: err.message})

    }
    
})
//Updating one
router.patch('/:id',getSong,  async (req,res)=>{
    if(req.body.name != null){
        res.song.name = req.body.name
    } 
    if(req.body.artist != null){
        res.song.artist = req.body.artist
    }
     if(req.body.album != null){
        res.song.album = req.body.album
    }
    try{
        const updatedSong = await res.song.save();
        res.json(updatedSong)
    }catch(err){
        res.status(400).json({ message:err.message})

    }
    
})
//Deleting one
router.delete('/:id',getSong, async (req,res)=>{
    try{
        await res.song.remove()
        res.json({ message: "Delete Song"})

    }catch(err){
        res.status(500).json({ message: err.message})

    }
    
})

async function getSong(req, res, next){
    try{
        song = await Song.findById(req.params.id)
        if(song == null){
            return res.status(404).json({ message: "Cannot find song"})
        }
    }catch(err){
        return res.status(500).json({message: err.message})

    }

    res.song = song
    next();
}

module.exports = router;