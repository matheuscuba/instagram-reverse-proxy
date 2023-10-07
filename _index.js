const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express()

app.use(cors)

app.get('/', async (req, res) => {
	try{
		let data = await axios.get(`https://www.instagram.com/${req.query.username}/channel/?__a=1&__d=1`);
		let imageUrl = data.data.graphql.user.profile_pic_url_hd; 	
		let imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
		res.type("image/jpeg");
		res.write(imageBuffer.data)
	} catch(e){
		console.log('eeee', e);
		res.send(e);
	}
})

app.listen(3000, () => {
	console.log(`Example app listening on port 3000`)
})

module.exports = app;