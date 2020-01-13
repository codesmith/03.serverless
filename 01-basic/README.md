# Serverless Frameworkでバージニア北部に最も基本的な構成(Lambdaのみ)を作成

### 参考URL
- [Serverless Framework 入門(1)](https://qiita.com/Daisuke-Otaka/items/f532a058bb1108cc94f6)

### 作られるリソース
- CloudFormation
- Lambda
- IAM Role
- CloudWatch Logs
- S3

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

$ cd 03.serverless/01-basic/

<!-- リソース作成 -->
$ sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
........
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service service-01-basic.zip file to S3 (389 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...............
Serverless: Stack update finished...
Service Information
service: service-01-basic
stage: dev
region: us-east-1
stack: service-01-basic-dev
resources: 6
api keys:
  None
endpoints:
  None
functions:
  hello: service-01-basic-dev-hello
layers:
  None
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.

<!-- スタックごと、全てのリソースを削除 -->
$ sls remove

```


