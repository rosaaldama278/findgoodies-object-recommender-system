import boto3
import json
import os
import requests
from base64 import b64decode

rekognition_client = boto3.client('rekognition')

#we receive a decoded base64-encoded image and send it to rekognition
def detect_labels(image_bytes, min_confidence=80):
    response = rekognition_client.detect_labels(Image={'Bytes': image_bytes}, MaxLabels=5, MinConfidence=min_confidence)
    labels = [label['Name'] for label in response['Labels']]
    return labels

#return back names, image-urls, product-urls and price
def get_top_10_images_and_urls(data):
    results = []
    count = 0
    for item in data['search_results']:
        product_name = item['title']
        image_url = item['main_image']
        product_url = item['url']
        price = item['price']['current_price']
        results.append({
            'product_name': product_name,
            'image_url': image_url,
            'product_url': product_url,
            'price': price
        })
        count += 1
        if count == 10:
            break
    return results

#using a third-party amazon product api
def search_products(keywords):
    url = "https://amazon23.p.rapidapi.com/product-search"
    querystring = {"query": keywords}
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

def lambda_handler(event, context):
    print("Start lambda_handler")
    print(f"Event received: {event}")

    # Decode the base64 image
    image_base64 = event['body']
    image_bytes = b64decode(image_base64)

    # Get labels
    print("Start detect_labels")
    labels = detect_labels(image_bytes)
    print("End detect_labels")

    # Get results
    search_keywords = " ".join(labels)
    print(f"Search keywords: {search_keywords}")
    print("Start search_products")
    search_results = search_products(search_keywords)
    print(f"End search_products: {search_results}")

    return {
        'statusCode': 200,
        'body': json.dumps(search_results)
    }
