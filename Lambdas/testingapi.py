import requests
import json

def test_api(keywords):
    url = "https://amazon23.p.rapidapi.com/product-search"
    querystring = {"query": keywords}
    headers = {
        "X-RapidAPI-Key": "*",
        "X-RapidAPI-Host": "amazon23.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:

        print(f"Success! Status code: {response.status_code}")
        data = response.json()
        print(json.dumps(data, indent=2))

        products = data.get('docs', [])

        for product in products:
            image_url = product.get('imageUrl', None)
            product_url = product.get('productUrl', None)

            print(f"Image URL: {image_url}")
            print(f"Product URL: {product_url}")
            print("------")
    else:
        print(f"Error! Status code: {response.status_code}")
        print("Response text:")
        print(response.text)

if __name__ == "__main__":
    test_keywords = "laptop"
    test_api(test_keywords)
