import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    accountalias = event['accountalias']
    item = event['item']
    
    
    # Perform item removal from list operation
    response = dynamodb.update_item(
        TableName='shoppingcart',
        Key={
            'accountalias': {'S': accountalias}  # assuming 'document_id' is the primary key
        },
        ConditionExpression='attribute_exists(#items) AND :item_value IN (#items)',
        UpdateExpression='REMOVE #items :item_value',
        ExpressionAttributeNames={
            '#items': 'items'  # assuming 'items' is the list attribute name
        },
        ExpressionAttributeValues={
            ':item_value': {'S': item}  # assuming 'value' is the value of the item to remove
        },
        ReturnValues='ALL_NEW',
    )
    
    # Return response
    return {
        'statusCode': 200,
        'body': 'Value removed from DynamoDB list',
        'key': key,
        'value': value,
        'updated_item': response['Attributes']
    }
