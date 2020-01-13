# 03に`${opt:stage}`を追加

### 参考URL
- [Serverless Frameworkの使い方まとめ](https://qiita.com/horike37/items/b295a91908fcfd4033a2)

### ポイント
- `${opt:stage}`は`serverless.yml`の`resouces`(CloudFormationのテンプレートに当たる部分)の中でも使用できる。

### 試行
```
provider:
  stage: ${opt:stage}
  // stage: dev
```
1. 上記に修正して何も無い状態から環境をデプロイしたところ、下記のようなエラーが出力されたものの、devステージとしてデプロイされた。
```
$ sls deploy

 Serverless Warning --------------------------------------

  A valid option to satisfy the declaration 'opt:stage' could not be found.
```
2. 1.が終わった状態から、prod環境をデプロイしようとしたところ、下記のようなエラーが出力され、prodステージはデプロイされなかった。(スタックがロールバックでも消えないようなので、`sls remove --stage prod`で削除した。)
```
$ sls deploy --stage prod

  (…中略…)

  Serverless Error ---------------------------------------

  An error occurred: DynamoDbTable - TableName already exists in stack arn:aws:cloudformation:us-east-1:695674763590:stack/service-04-addoptstage-dev/539f54c0-3617-11ea-a30b-129d8c0b3757.

$ sls remove --stage prod
```
3. 2.が終わった状態から、`serverless.yml`を下記のように修正して、再度prod環境をデプロイしたところ、上手くデプロイできた。(API GatewayはREST APIごとdevとは分離して作成された。)
```
TableName: TableName${opt:stage}
// 修正前は↓
// TableName: TableName
```
4. 3.が終わった状態から、dev環境をデプロイしたところ、新しいDynamoDBが作成され、古いDynamoDBは削除された。(これにより、古いDynamoDBテーブルに入っていたデータは削除された。)  




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
$ cd 03.serverless/04-addoptstage/

<!-- リソース作成 -->
$ sls deploy

<!-- Advanced REST ClientでBody部を添付する際にbody.txtを利用 -->
<!-- body.txtはutf-8でエンコードされている必要がある。SJISだと失敗する。 -->

<!-- スタックごと、全てのリソースを削除 -->
$ sls remove
```


