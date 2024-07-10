import { config } from 'dotenv';
import { createApp } from 'utils/createApp';
import databaseInit from 'database/init';

config({ path: "../.env" });

databaseInit();

const main = () => {
  try {
    const app = createApp();
    
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Example app listening on port localhost:${process.env.SERVER_PORT}`)
    });
  } catch (err) {
    console.error(err);
  }
};

main();