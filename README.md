# FindGoodies - Image-based Recommender System

The Image-based Recommender System is an innovative project that allows users to search for products online by simply uploading an image of the desired object. The system leverages computer vision and image recognition techniques to identify the object in the uploaded image and recommends similar products based on the extracted features.

## Features

- Image-based product search: Users can upload an image of the object they want to purchase, and FindGoodies will search for similar products online.
- Seamless integration: The project integrates with Amazon's product search API to retrieve relevant product information.
- Serverless architecture: The backend is implemented using AWS Lambda functions, providing a scalable and cost-effective solution.
- DynamoDB integration: Search results are stored in Amazon DynamoDB for efficient retrieval and persistence.
- RESTful API: The backend exposes a RESTful API endpoint for easy integration with frontend applications.

## Architecture

The FindGoodies project follows a serverless architecture, leveraging various AWS services:

- AWS Lambda: The backend logic is implemented using Lambda functions, which are triggered by specific events.
- Amazon S3: User-uploaded images are stored in an S3 bucket for processing.
- Amazon Rekognition: The image recognition capabilities of Amazon Rekognition are used to detect labels and identify objects in the uploaded images.
- Amazon DynamoDB: Search results are stored in a DynamoDB table, allowing for efficient retrieval and persistence.
- Amazon API Gateway: The RESTful API endpoint is managed and exposed through API Gateway.

## Backend Lambda Functions

The backend of FindGoodies consists of several Lambda functions that handle different aspects of the image-based product search process:

### 1. Image Upload Handler

- Triggered when an image is uploaded to the designated S3 bucket.
- Extracts relevant information from the S3 event, such as the bucket name and object key.
- Invokes the Amazon Rekognition service to detect labels and identify objects in the uploaded image.
- Prepares search keywords based on the detected labels.
- Invokes the product search function to retrieve relevant products.
- Stores the search results in the DynamoDB table.

### 2. Product Search Handler

- Receives search keywords as input.
- Interacts with the Amazon product search API to retrieve relevant products based on the provided keywords.
- Extracts essential information from the API response, such as product names, image URLs, product URLs, and prices.
- Returns the top 10 matching products.

### 3. Search Result Retrieval Handler

- Triggered by an API Gateway request with a specific search ID.
- Retrieves the corresponding search results from the DynamoDB table based on the provided search ID.
- Returns the search results as a JSON response.

## Getting Started

To set up and run the FindGoodies project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/tingaldama278/FindGoodies-.git
   ```
2. Install the required dependencies:

   ```
   cd findgoodies
   pip install -r requirements.txt
   ```
3. Configure the necessary AWS credentials and permissions.
4. Deploy the Lambda functions and set up the necessary AWS resources (S3 bucket, DynamoDB table, API Gateway).
5. Update the API endpoints and configurations in the frontend application.
6. Run the frontend application and start using FindGoodies!

## Contributing

Contributions to the FindGoodies project are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request. Make sure to follow the contributing guidelines.

## License

This project is licensed under the [MIT License](LICENSE).
