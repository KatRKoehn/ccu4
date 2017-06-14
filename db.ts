
const connectionString:string = 'mongodb://Codergirl:Code123@ds163181.mlab.com:63181/dhd-cc-u4';

import * as mongodb from 'mongodb';

export default class Database {
  public static db:mongodb.Db;

  public static connect() {
    return mongodb.MongoClient.connect(connectionString).then((db) => {
        this.db = db;
    }).catch((err) => {
        console.error(err);
    });
  }
}
