import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    # Extract document ID and values from the event
    accountalias = event['accountalias']
    item = event['item']
    
    # Update the document in DynamoDB
    response = dynamodb.update_item(
        TableName='shoppingcart',
        Key={
            'accountalias': {'S': accountalias}  # assuming 'document_id' is the primary key
        },
        UpdateExpression='SET #items = list_append(if_not_exists(#items, :empty_list), :new_item)',
        ExpressionAttributeNames={
            '#items': 'items'  # assuming 'items' is the list attribute name
        },
        ExpressionAttributeValues={
            ':new_item': {'L': [{'S': item}]},  # assuming 'value' is a string attribute
            ':empty_list': {'L': []}
        },
        ReturnValues='ALL_NEW',
    )
       
    # Return response
    return {
        'statusCode': 200,
        'body': 'Value added to DynamoDB list',
        'key': accountalias,
        'value': item,
        'updated_item': response['Attributes']
    }
