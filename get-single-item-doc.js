import {DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

// Set the parameters
const params = {
    Key: {
        "artist": "Arturus Ardvarkian",
        "song": "Carrot Eton"
    },
    TableName: "eight_examples_of_fetching_data_nodejs"
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const ddbDocClient = DynamoDBDocumentClient.from(client);
        const data = await ddbDocClient.send(new GetCommand(params));
        console.log("Success. Item details: ", data.Item);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
})();
