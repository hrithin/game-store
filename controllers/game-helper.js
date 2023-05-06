const client = require('../config/connection');
var express = require('express');
const { reject, resolve } = require('promise');
const { ObjectId } = require('mongodb');
const adminHelper = require('../controllers/admin-helper');

module.exports = {


  gameBuy: (user, game) => {

    console.log(user)
    console.log(game)


    return new Promise(async (resolve, reject) => {



      let fetchedData = await client.db('user').collection('account').findOne({ _id: ObjectId(user) })

      if (fetchedData.mygames == null) {

        client.db('user').collection('account').updateOne({ _id: ObjectId(user) }, { $set: { mygames: [game] } }, (resu, err) => {

          console.log(resu)

          resolve("done")

        })

      }
      else {

        client.db('user').collection('account').updateOne({ _id: ObjectId(user) }, { $push: { mygames: game } })

        resolve("done")

      }




    })

  },

  myGames: (myid) => {

    return new Promise(async (resolve, reject) => {

      let fetchedData = await client.db('user').collection('account').findOne({ _id: ObjectId(myid) })

      const abc = fetchedData.mygames


      var final = []

      for (let index = 0; index < abc.length; index++) {

       await adminHelper.getOne(abc[index]).then((resu) => {


          if (resu != null) {
            final.push(resu)
          }


        })

      }
      console.log(final)
      resolve(final)

    })

  }

}