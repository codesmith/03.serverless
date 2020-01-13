# 01にAPI GatewayとDynamoDBを追加

### 作られるリソース
- CloudFormation
- Lambda
- IAM Role
- CloudWatch Logs
- S3
- API Gateway
- DynamoDB

### 実行の前提
- AWS CLIの基本的なクレデンシャルの設定ができていること
- Serverless Frameworkが、npmのグローバルでインストールされていること

### 実行履歴
```
$ cd 03.serverless/02-addapidynamo/

<!-- リソース作成 -->
$ sls deploy

<!-- Advanced REST ClientでBody部を添付する際にbody.txtを利用 -->
<!-- body.txtはutf-8でエンコードされている必要がある。SJISだと失敗する。 -->

<!-- スタックごと、全てのリソースを削除 -->
$ sls remove
```


