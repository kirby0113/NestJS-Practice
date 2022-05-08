## ログイン

```
mutation {
  login(
    loginUserInput: {
      email: "自分のメールアドレス",
      password: "自分のパスワード"
    }
  ) {
    access_token
  }
}
```

## 新規登録
```
mutation {
  register(
    email:"登録したいメールアドレス",
    password:"パスワード",
    name:"ユーザー名"
  ) {
    access_token
  }
}
```

## トークンの header

```
{
    Authorization： "Bearer 自分のアクセストークン"
}
```
