import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    # Extract key from the event
    accountalias = event['accountalias']
    
    # Perform GetItem operation
    response = dynamodb.get_item(
        TableName='shoppingcart',
        Key={
            'accountalias': {'S': accountalias}  # assuming 'key' is the primary key
        },
        ConsistentRead=True  # Set to True for strongly consistent read, False for eventually consistent read
    )
    
    # Check if the item was found
    if 'Item' in response:
        # Extract the item value
        item = response['Item']
        
        # Return response
        return {
            'statusCode': 200,
            'body': 'Item found in DynamoDB',
            'accountalias': accountalias,
            'item': item
        }
    else:
        # Return response for item not found
        return {
            'statusCode': 404,
            'body': 'Item not found in DynamoDB',
            'accountalias': accountalias
        }
