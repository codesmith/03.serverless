# 01にAPI GatewayとDynamoDBを追加

### 参考URL
- [Serverless FrameworkでAPIGateway・Lambda・DynamoDBを構築する](https://qiita.com/t_okkan/items/546330b5f4da720c71a7)

### 試行①(splitStacksオプションについて検証)
```
custom:
  splitStacks:
    perFunction: false
    perType: false
    perGroupFunction: false
```
1. 上記のオプションでデプロイした場合、リソースは何も外出しできない。
2. 1.が終わった状態からperTypeのみをtrueにして環境更新をするとAWS::Lambda::Versionの1個しか外出しできない。(AWS::Lambda::Functionや他のLambda系リソースは外出しされない。)
3. 2.が終わった状態から再びperTypeのみをfalseにして(1.の記載に戻る)環境更新をしても、外出しされたAWS::Lambda::Versionは元のスタックには戻らない。
4. 1.が終わった状態から、次はperGroupFunctionのみをtrueにして環境更新をするとnestedStackCountを指定する必要がある旨のエラーが出て失敗する。
5. 1.が終わった状態から下記のオプションで環境更新すると、またしてもAWS::Lambda::Versionのリソース1個のみが外出しされた。
```
custom:
  splitStacks:
    perFunction: false
    perType: false
    perGroupFunction: true
    nestedStackCount: 2    // 追加
```
6. 5.が終わった状態からperGroupFunctionをfalseにして環境更新すると、3.の時とは異なり、元のスタックに戻ってくる。(1.が終わった状態と同等になる。)
7. 6.が終わった状態からperFunctionをtrueにして環境更新すると、またしてもAWS::Lambda::Versionのリソース1個のみが外出しされた。
8. 7.が終わった状態からperFunctionをfalseにして環境更新すると、6.の時と同様に、元のスタックに戻ってきた。

### 試行②(`stacks-map.js`について検証)
1. 下記の記載の`stacks-map.js`をルートフォルダに追加して(何も無い状態から)環境をデプロイしたところ、AWS::DynamoDB::Tableリソースが外出しされた。(元のスタックと合わせて2つのスタックになった。)
```
// serverless.yml
custom:
  splitStacks:
    perFunction: false
    perType: false
    perGroupFunction: false

// stacks-map.js
const ServerlessPluginSplitStacks = require('serverless-plugin-split-stacks');
const stacksMap = ServerlessPluginSplitStacks.stacksMap;

module.exports = {
  'AWS::DynamoDB::Table': { destination: 'Dynamodb' }
}
```
2. `stacks-map.js`の記載を下記のように修正した後、(何も無い状態から)環境更新したところ、Lambda系リソース(AWS::Lambda::Function、AWS::Lambda::Permission、AWS::Lambda::Version)が1つのスタックに外出しされた。(元のスタックと合わせて2つのスタックになった。)
```
// stacks-map.js
module.exports = {
  'AWS::Lambda::Version': { destination: 'Lambda' },
  'AWS::Lambda::Function': { destination: 'Lambda' },
  'AWS::Lambda::Permission': { destination: 'Lambda' },
}
```




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


