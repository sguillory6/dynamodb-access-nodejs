// Load the AWS SDK for JS v3
import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

var params = {
    AttributeDefinitions: [
        {
            AttributeName: "artist",
            AttributeType: "S"
        },
        {
            AttributeName: "song",
            AttributeType: "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "artist",
            KeyType: "HASH"
        },
        {
            AttributeName: "song",
            KeyType: "RANGE"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    },
    TableName: "eight_examples_of_fetching_data_nodejs"
};

(async () => {
    try {
        const client = new DynamoDBClient({ region: "us-west-2" });
        const data = await client.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
})();
