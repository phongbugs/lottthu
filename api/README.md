# 1. Set Up Your Project

```npm init -y```

# 2. Install TypeScript and other dependencies:

```
npm install typescript ts-node express body-parser cors dotenv
npm install --save-dev @types/node @types/express @types/body-parser @types/cors
```

# 3 Install Sequelize and Database Driver

```
npm install sequelize sequelize-typescript pg pg-hstore
npm install --save-dev @types/sequelize
```
## 3.1 Install Sequelize cli 
```
npm install sequelize sequelize-typescript
npm install --save-dev sequelize-cli
```

## 3.2 Init Sequelize Project
```
npx sequelize-cli init
```

# 4. Setup for migration, Seed by sequeslize-cli with typescript

1. Build .ts to .js on /dist
2. Config sequelize-cli use .js file /dist on ```.sequelizerc``` file
3. Run some sequelize statements : migrate, seed
