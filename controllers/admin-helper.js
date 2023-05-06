const client = require('../config/connection');
var express = require('express');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');


module.exports = {

     addGame: async (data, image, gfile) => {

        var imgSrc;
        var gfilesrc;
 
         if (data) {
 
 
 
             if (image && gfile) {
  
               await image.mv('./public/images/' + image.md5 + '.jpg');
               await image.mv('./public/games/' + gfile.md5 + '.apk');
                 imgSrc = image.md5 + '.jpg';
                 gfilesrc = gfile.md5 + '.apk';

 
             }
             else
             {
                 console.log("Files not Found")
             }
 
             var finalData = {
 
                 gname: data.gname,
                 gcat: data.gcat,
                 gdis:  data.gdis,
                 gprice: parseInt(data.gprice) ,
                 gimage: imgSrc,
                 gfile: gfilesrc
             }
 
             
             return new Promise((resolve, reject) => {
 
                 client.db('user').collection('games').insertOne(finalData)
  
                 resolve(console.log('done'))
  
            })
 
 
         }
     },

     getGames : ()=>{

        return new Promise(async(resolve,reject)=>{

             done = await client.db('user').collection('games').find({}).toArray()

               resolve(done)
  
    
        })

    },
    getOne :  (id)=>{

        return new Promise(async(resolve,reject)=>{

             done = await client.db('user').collection('games').findOne({_id:ObjectId(id)})

               resolve(done)
  
    
        })

    },

    addCat: (cat) => {

       
         return new Promise((resolve, reject) => {

              client.db('user').collection('category').insertOne({category:cat})

              resolve(console.log('done'))

         })

    },

    viewCat: () => {

       
        return new Promise(async (resolve, reject) => {

           let abc = await  client.db('user').collection('category').find({}).toArray()

             resolve(abc)

        })

   },

   delCat: (idd) => {

       
    return new Promise(async (resolve, reject) => {

       let abc = await  client.db('user').collection('category').deleteOne({_id:ObjectId(idd)})

         resolve(console.log("deleted"))

    })

},

delGame: (idd) => {

       
    return new Promise(async (resolve, reject) => {

       let abc = await  client.db('user').collection('games').deleteOne({_id:ObjectId(idd)})

         resolve(console.log("deleted"))

    })

},

}