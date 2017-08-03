# Songle Sync ブラウザ向けプロジェクト

ブラウザで動作するシンプルな Songle Sync アプリケーション例です
引数で master/slave が切り替わります

![Songle Sync Browser](ss.png "Songle Sync Browser")

## Songle Sync のサイト上で Token を発行

初めての方は新規登録が必要です  
以下のURLから新規登録し、`accessToken`と`secretToken`を取得してください

http://api.songle.jp/user/


## Tokenを設定する

viz.jsの以下の箇所を取得したTokenに書き換える

```javascript
var accessToken = "YOUR_ACCESS_TOKEN"
var secretToken = "YOUR_SECRET_TOKEN"
```

## masterでアクセスする

`index.html` を引数 `master=1` を付けてブラウザで開いてください。  
右下に動画が表示され、再生・停止・先頭へシーク・サビ出しが出来ます。  

```
[ファイルパス]/index.html?master=1
```

## slaveでアクセスする

別ウィンドウで `index.html` をブラウザで開いてください。  
masterで再生される動画に合わせてバーやコード名が変化します。  
同じ`accessToken`であれば別のPCでもmasterに同期して動作します。

```
[ファイルパス]/index.html
```