import {DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

// Set the parameters
const params = {
    Key: {
        "artist": { "S": "Arturus Ardvarkian" },
        "song": { "S": "Carrot Eton" }
    },
    TableName: "eight_examples_of_fetching_data_nodejs"
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const data = await client.send(new GetItemCommand(params));
        console.log("Success. Item details: ", data.Item);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
})();
