# 1. Set Up Your Project

```npm init -y```

# 2. Install TypeScript and other dependencies:

```
npm install typescript ts-node express body-parser cors dotenv
npm install --save-dev @types/node @types/express @types/body-parser @types/cors
```

# 3 Install Prisma and Database Driver

```
npm install prisma @prisma/client mysql2
npx prisma init
```

# 3.1 Migration with Prisma
```
npx prisma migrate dev --name init
```
# 3.2 Seed with Prisma 
Create /seed.ts manualy
Add this one to package.json
```"
prisma": {
    "seed": "ts-node prisma\\seed.ts"
}
```
then run this cli statement
```
npx prisma db seed
```
