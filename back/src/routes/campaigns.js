import uuidv4 from 'uuid/v4';
import { Router } from 'express';
import {connection} from '../DBManager/connection';
const router = Router();

router.get('/', (req, res) => {
    const db = connection.db("test")
    db.collection("campaigns").find().toArray()
    .then(items => {
      res.send(items);
    })
    .catch(err => console.log(err));
});

router.get('/entities', (req, res) => {
    const campaign_id = req.body['campaign_id'];
    const db = connection.db("test");
    db.collection("campaigns").findOne({id:campaign_id})
    .then(campaign => {
      db.collection("entity_campaign").find({campaign_id}).toArray()
      .then(items => {
        let ids = items.map(item => item['entity_id']);
        db.collection("entities").find({
          id: { $in: ids }
        }).toArray()
        .then(entities => {
          var response = entities.map(entity => {
            var needs = items.filter(a => a['entity_id'] === entity['id'])[0]['needs'];
            entity['needs'] = needs;
            return entity;
          })
          campaign['entities'] = response
          res.send(campaign);
        })
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


export default router;
