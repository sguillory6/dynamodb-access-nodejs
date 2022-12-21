// Import required AWS SDK clients and commands for Node.js
import {DynamoDBClient, QueryCommand} from "@aws-sdk/client-dynamodb";

// Set the parameters
export const params = {
    KeyConditionExpression: 'artist = :artist AND begins_with ( song , :song )',
    ExpressionAttributeValues: {
        ':artist': {'S': 'Arturus Ardvarkian'},
        ':song': {'S': 'C'}
    },
    TableName: "eight_examples_of_fetching_data_nodejs"
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const data = await client.send(new QueryCommand(params));
        data.Items.forEach(function (element) {
            console.log(element.song.S);
        });
        return data;
    } catch (err) {
        console.error(err);
    }
})().then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
);
