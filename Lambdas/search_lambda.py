import boto3
import json
import os
import requests

dynamodb = boto3.resource('dynamodb')
rekognition_client = boto3.client('rekognition')


def detect_labels(bucket, key, min_confidence=80):
    response = rekognition_client.detect_labels(Image={'S3Object': {'Bucket': bucket, 'Name': key}}, MaxLabels=5,
                                                MinConfidence=min_confidence)
    labels = [label['Name'] for label in response['Labels']]
    print(labels)
    return labels


# Get top 10 images and URLs from the API response
def get_top_10_images_and_urls(data):
    results = []
    count = 0
    print(f"DATA:: {data}")
    for item in data['result']:
        print(f"ITEM: {item}")
        product_name = item['title']
        image_url = item['thumbnail']
        product_url = item['url']
        price = item['price']['current_price']
        results.append({
            'product_name': product_name,
            'image_url': image_url,
            'product_url': product_url,
            'price': str(price)
        })
        # image_url = item['thumbnail']
        # product_url = item['url']
        # results.append({'image_url': image_url, 'product_url': product_url})
        count += 1
        if count == 10:
            break
    return results


def search_products(keywords):
    url = "https://amazon23.p.rapidapi.com/product-search"
    querystring = {"query": keywords}

    # "X-RapidAPI-Key": "fbd335c354mshb0820bcaee18e4dp1f9b85jsn7fa912dad388",
    # "X-RapidAPI-Host": "amazon23.p.rapidapi.com"
    headers = {
        "X-RapidAPI-Key": "*",
        "X-RapidAPI-Host": "amazon23.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        data = response.json()
        top_10_images_and_urls = get_top_10_images_and_urls(data)
        return top_10_images_and_urls
    else:
        print(f"Error: {response.status_code}")
        return None


def store_search_results(uuid, search_results):
    table = dynamodb.Table('search-results')

    # Store search results with the associated UUID
    table.put_item(
        Item={
            'uuid': uuid,
            'search_results': search_results
        }
    )


# def search_products(keywords):
#     params = {
#         'api_key': *,
#         'amazon_domain': 'amazon.com',
#         'type': 'search',
#         'search_term': keywords
#     }

#     response = requests.get('https://api.rainforestapi.com/request', params)

#     if response.status_code == 200:
#         data = response.json()
#         top_10_products = get_top_10_products(data)
#         return top_10_products
#     else:
#         print(f"Error: {response.status_code}")
#         return None

def lambda_handler(event, context):
    print("Start lambda_handler")
    print(f"Event received: {event}")
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    print(f"Bucket: {bucket}")
    print(f"Key: {key}")

    # Get labels
    print("Start detect_labels")
    labels = detect_labels(bucket, key)
    print("End detect_labels")

    # Get results
    search_keywords = " ".join(labels)
    print(f"Search keywords: {search_keywords}")
    print("Start search_products")
    search_results = search_products(search_keywords)
    print("End search_products")

    # Extract UUID and store search results in DynamoDB
    filename = key.split("/")[-1]  # Extract the filename if the key has a path
    uuid = filename.rsplit(".", 1)[0]
    store_search_results(uuid, search_results)

    return {
        'statusCode': 200,
        'body': json.dumps({
            'uuid': uuid,
            'search_results': search_results
        })
    }