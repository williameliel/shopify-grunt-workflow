# Shopify-grunt-workflow
Grunt based workflow for shopify theme projects. This workflow uses grunt-shopify (https://github.com/wilr/grunt-shopify) as a dependency. 

## Environment Set Up
1. Clone the grunt forlder inside your main theme folder in your local computer. In the same level where the rest of your shopify folders are.

```
git clone https://github.com/williameliel/shopify-grunt-workflow.git grunt
cd grunt
rm -rf .git*
mv src ../
npm install
bower install
```
2. Make a private Shopify APP in your store and use the credentials to edit dev-settings.com

```
{
  "api_key" : "API_KEY_HERE",
  "password" : "API_PASSWORD_HERE",
  "url" : "myshopifystore.myshopify.com",
  "base" : "../"
}
```
3. Development process

```
grunt watch # watches the changed files and uploads them to your theme.
grunt build # builds the scripts.
```
