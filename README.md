
# NestJS-Practice

## 使うもの
- TypeScript
- NestJS
- Prisma
- JWT（passport）
- GraphQL(使ってみたいなー)

## 構想
- 日記帳的な感じ
- ユーザーの登録・ログイン機能
- 日記に使用するタグの作成・削除・更新・取得機能
- 日記の作成・取得・更新・削除機能
- 

### モデル
- user (username email password)
- tag (tagname)
- diary (diarytitle diarydetail user tags)

## 環境構築

### 必要になるもの
- Docker Desktop

### 手順
1. リポジトリをクローン
2. データベースの初期化
```
npm run db:start
```
3. 初回マイグレーションを実施
```
npm run prisma:migrate-dev
```
4. 起動確認
```
npm run start:dev
```
