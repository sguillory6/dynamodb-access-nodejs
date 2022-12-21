// Import required AWS SDK clients and commands for Node.js
import {DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, ScanCommand} from "@aws-sdk/lib-dynamodb";

// Set the parameters.
export const params = {
    TableName: "eight_examples_of_fetching_data_nodejs",
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const ddbDocClient = DynamoDBDocumentClient.from(client);
        const data = await ddbDocClient.send(new ScanCommand(params));
        data.Items.forEach(function (element) {
            console.log(element.song + " - (" + element.artist + ", " + element.priceUsdCents + ")");
        });
        return data;
    } catch (err) {
        console.log("Error", err);
    }
})().then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
);
