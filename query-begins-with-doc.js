import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

// Set the parameters
export const params = {
    TableName: "eight_examples_of_fetching_data_nodejs",
    KeyConditionExpression: 'artist = :artist AND begins_with ( song , :song )',
    ExpressionAttributeValues: {
        ':artist': 'Arturus Ardvarkian',
        ':song': 'C'
    }
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const ddbDocClient = DynamoDBDocumentClient.from(client);
        const data = await ddbDocClient.send(new QueryCommand(params));
        console.log("Success. Item details: ", data.Items);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
})();
