// Import required AWS SDK clients and commands for Node.js
import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb";
import * as fs from 'fs';

console.log("Loading song data into DynamoDB");

const songData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

(() => {
    const client = new DynamoDBClient({region: "us-west-2"});

    songData.forEach((async (song) => {
        const params = {
            TableName: "eight_examples_of_fetching_data_nodejs",
            Item: {
                artist: { S: song.artist },
                song: { S: song.song },
                id: { S: song.id },
                priceUsdCents: { N: song.priceUsdCents.toString() },
                publisher: { S: song.publisher }
            }
        };
        try {
            await client.send(new PutItemCommand(params));
            console.log("Succeeded adding an item for this song: ", song.song);
        } catch (err) {
            console.error("Can't add song " + song.song + " Darn. Well I guess Fernando needs to write better scripts.");
            console.error(err);
        }
    }));
})();
