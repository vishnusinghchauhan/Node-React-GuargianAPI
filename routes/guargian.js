const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config()

const apyKey =  process.env.APIKEY

/*
 * This function is used to get list of all guardian
 * @param taking {number} pageIndex  to page index
 * @param return {Array} of all gurdian  
 */
router.get('/getguardianlist/:pageIndex', (req, res) => {
  var pageIndex =req.params.pageIndex;
   return axios.get('https://content.guardianapis.com/search', {
          params: {'api-key': apyKey, 'page':pageIndex}
    }).then((response)=>{
        var data = response && response.data && response.data.response && response.data.response.results
          res.status(200).send(data);
    }).catch(err => {
          res.status(500).send({data:err});
    });
});

/*
 * This function is used to get detail of guardian
 * @param taking {string} id of gurgaina
 * @param return {object} of selected gurgaian  
 */
router.get('/getguardiandetail/:id', (req, res) => {
    var id = req.params.id;
    var convertedUrl = id.replace(/_/g, '/');
    axios.get(`https://content.guardianapis.com/${convertedUrl}`, {
          params: {'api-key': apyKey}
    }).then((response)=>{
         var data = response && response.data && response.data.response &&  response.data.response.content
     return res.status(200).json(data);
    }).catch(err => {
     return res.status(500).json(err);
    });
});


module.exports = router;
