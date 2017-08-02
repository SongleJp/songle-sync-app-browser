# Songle Sync ブラウザ向けプロジェクト

## Songle Sync のサイト上でTokenを発行

http://api.songle.jp/user/

※初めての方は新規登録が必要です

## Tokenを設定する

viz.jsの以下の箇所を取得したTokenに書き換える

```javascript
var accessToken = "YOUR_ACCESS_TOKEN"
var secretToken = "YOUR_SECRET_TOKEN"
```

## masterでアクセスする

index.htmlを引数 master=1 を付けてブラウザで開いてください

```
[ファイルパス]/index.html?master=1
```

## slaveでアクセスする

index.htmlを別ウィンドウのブラウザで開いてください

```
[ファイルパス]/index.html
```