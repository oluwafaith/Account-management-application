import fs from "fs"

export const users: any = JSON.parse(
    fs.readFileSync('src/dev-data/users.json', 'utf-8')
  );

  export const transactions: any = JSON.parse(
    fs.readFileSync('src/dev-data/transactions.json', 'utf-8')
  );

  export const saveData = ( path: string, data:any) =>{
    return fs.writeFileSync(path, JSON.stringify(data))
  } 

    



