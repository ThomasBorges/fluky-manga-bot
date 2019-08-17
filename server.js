const Twit = require('twit');

const fs = require ('fs'),
    path = require ('path'),
    config = require(path.join(__dirname, 'config.js'));
    images = require(path.join(__dirname, 'files.js'));
const T = new Twit (config);

//Uses Math.random to pick a random number and Math.Floor to round to the nerest number down
function random_from_array(images){
    return images[Math.floor(Math.random() * images.lenght)];
}
function upload_random_images(images){
    console.log ('Loading image...');
    var random_images = random_from_array(images),
        image_path = path.join(__dirname, '/images/' + random_images.file),
        b64content = fs.readFileSync(image_path, {encoding: 'base64'});
    console.log ('Sending image...');
    console.log (random_images);
    T.post('media/upload', {media_data: b64content}, function (err,data,response){
        if (err){
            console.log('ERROR');
            console.log(err);}
        else{
            console.log ('Image loaded');
            console.log ('Tweeting');

            var tweet_text = 'Source:' + random_images.source;
            T.post ('statuses/update', {status: tweet_text,media_ids: new Array(data.media_id_string)}),
            function(err,data,response){
                if (err){
                    console.log('ERROR');
                    console.log (err);
                }
                else{
                    console.log('IMAGE POSTED'),
                    console.log (tweet_text);
    
                }
            };
        }

    });
}

setInterval (function(){
    upload_random_images(images);
}, 7200000);

  