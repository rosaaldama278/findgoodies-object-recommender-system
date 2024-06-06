import json
import boto3

def lambda_handler(event, context):
    print(f"EVENT: {event}")
    print(f"CONTEXT: {context}")
    search_id = event['queryStringParameters']['product']
    # Connect to DynamoDB
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('search-results')

    # Fetch search results from DynamoDB
    response = table.get_item(Key={'uuid': search_id})
    print(f"RESPONSE OF TABLE: {response}")
    if 'Item' in response:
        # Prepare response for API Gateway
        return {
            'statusCode': 200,
            'body': json.dumps(response['Item']),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    else:
        # Item not found
        return {
            'statusCode': 404,
            'body': json.dumps({'error': 'Search ID not found'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
