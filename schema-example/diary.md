# 日記周りのクエリ例

- 以下の処理は、基本的に認証が必要となります。
- auth.mdを参考に、認証及び、取得した認証情報をheaderに入力した上で利用してください。

## 日記作成処理

```
mutation{
  createDiary(createDiaryInput:{
    title:"日記のタイトル",
    detail:"日記の詳細",
    tags:[{
      id:1, //タグのidは必須にしており、基本的に取得したtagの情報をそのまま入れても問題ない状態にしてます。
    }],
  }){
    id,
    tags{
      id,
      name,
      user_id
    },
    title,
    detail,
    created_at
  }
}
```

## 日記一覧取得処理
```
query{
  getDiaries(getDiariesInput:{tag_id:登録されているタグIDを指定(入力なしもOK),order_asc:true(trueの場合、作成した日付の昇順で取得)}){
    id,
    title,
    detail,
    created_at,
    tags{
      id,
      name,
      user_id,
    }
  }
}
```

## 日記単一取得処理
```
query{
  getDiary(id:取得したい日記のid){
      id,
      title,
      detail,
      created_at,
      tags{
        id,
        name,
        user_id,
      }
  }
}
```
