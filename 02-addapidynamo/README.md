# 01にAPI GatewayとDynamoDBを追加

### 作られるリソース
- CloudFormation: service-01-basic-dev
- Lambda: service-01-basic-dev-hello
- IAM Role: service-01-basic-dev-us-east-1-lambdaRole
- API Gateway: 
- DynamoDB: 

### 実行の前提
- AWS CLIの基本的なクレデンシャルの設定ができていること
- Serverless Frameworkが、npmのグローバルでインストールされていること

### 実行履歴
```
$ node -v
v12.13.0

$ npm -v
6.12.0

$ aws --version
aws-cli/1.16.290 Python/3.6.0 Windows/10 botocore/1.13.26

$ sls -v
Framework Core: 1.57.0
Plugin: 3.2.2
SDK: 2.2.1
Components Core: 1.1.2
Components CLI: 1.4.0

$ git clone https://github.com/codesmith/03.serverless.git

$ cd 03.serverless/02-addapidynamo/

<!-- リソース作成 -->
$ sls deploy

<!-- スタックごと、全てのリソースを削除 -->
$ sls remove

```


