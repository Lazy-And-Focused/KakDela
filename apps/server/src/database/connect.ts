import mongoose from "mongoose";

const connect = (url: string) => {
  mongoose
    .connect(url)
    .catch((err) => console.error(err))
    .then(async () => {
      console.log('Подключен к базе данных');
    });
}

export { connect };

export default connect;
