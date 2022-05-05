# タグ周りのクエリ例
- 認証を行なっていることを前提としています。
- auth.mdを参考に、認証及び、取得した認証情報をheaderに設定した上で利用してください。

## タグ一覧取得

```
query{
    tags{
        id,
        name,
        user_id,
    }
}
```

## タグの新規登録

```
mutation{
    createTag(name:"登録したいタグ名"){
        id,
        name,
        user_id,
    }
}
```

## タグの更新
```
mutation{
    createTag(id:更新したいタグのid,name:"新しいタグ名"){
        id,
        name,
        user_id,
    }
}
```

## タグの削除
```
mutation{
    deleteTag(id:削除したいタグのid){
        message,
    }
}
```
