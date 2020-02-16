const express = require('express');
const axios = require('axios');
const router = express.Router();
const apyKey =  'daa37865-8c63-408a-a6c4-545971fd29d6'

router.get('/getguardianlist/:index', (req, res) => {
  var pageIndex =req.params.index;
  console.log("RRRRRRRRR", pageIndex)
   return axios.get('https://content.guardianapis.com/search', {
          params: {'api-key': apyKey, 'page':pageIndex}
    }).then((response)=>{
        var data = response && response.data && response.data.response && response.data.response.results
          res.status(200).send(data);
    }).catch(err => {
          res.status(500).send({data:err});
    });
});

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
