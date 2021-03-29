const mongo = require("../database/mongo");
const command = require("../handle/command");
const trackingSchema = require("../schemas/tracking-schema");

module.exports = (client) => {
  const cache = {};

  //!setwelcome <message>
  command(client, "t", async (message) => {
    const { member, channel, content, guild } = message;

    let splitMessage = message.content.split(" ");

    switch (splitMessage[1]) {
      case undefined:
        message.reply(
          "você precisa digitar seu código de rastreio, exemplo `.track LB378606961SE`"
        );
        break;

      case splitMessage[1].length != 13:
        message.reply("Esse não aprece ser um código valido.");
        break;

      case "remove":
        console.log(splitMessage[2]);
        switch (splitMessage[2]) {
          case undefined:
            message.reply("você precisa digitar o código que deseja apagar!");

          default:
            removeOnMongo();
        }
        break;

      default:
        insertOnMongo();
    }

    async function insertOnMongo() {
      //   const author_id = message.author.author_id;
      //   const track_code = splitMessage[1];

      await mongo().then(async (mongoose) => {
        try {
            
          let query = trackingSchema.find({ user_id: message.author.id })
          await query;
          
          console.log(query);
          //console.log(query, query._conditions, query._fields);
        //   console.log(response)

        } catch (response) {
          console.log(response);
        } finally {
          mongoose.connection.close;
        }
      });
    }

    async function removeOnMongo() {
      const author_id = message.author.user_id;
      const track_code = splitMessage[2];

      await mongo().then(async (mongoose) => {
        try {
          await trackingSchema.findOneAndDelete(
            {
              track_code: track_code,
            },
            {
              user_id: author_id,
              track_code: track_code,
            }
          );
        } finally {
          mongoose.connection.close;
        }
      });
    }

    // async function insertOnMongo() {
    //   const author_id = message.author.id;
    //   const tracking_code = splitMessage[1];

    //   console.log(author_id, tracking_code);

    //   await mongo().then(async (mongoose) => {
    //     try {
    //       await trackingSchema.findOneAndUpdate(
    //         {
    //           user_id: author_id,
    //         },
    //         {
    //           user_id: author_id,
    //           track_code: tracking_code,
    //         },
    //         {
    //           upsert: true,
    //         }
    //       );
    //     } catch (e) {
    //       console.log(e);
    //     } finally {
    //       mongoose.connection.close();
    //     }
    //   });
    // }

    // async function insertOnMongo() {
    //     const author_id = message.author.id;
    //     const tracking_code = splitMessage[1];

    //     console.log(author_id, tracking_code);

    //     await mongo().then(async (mongoose) => {
    //       try {
    //         await trackingSchema.insertMany(
    //           {
    //             user_id: author_id,
    //             track_code: tracking_code,
    //           }
    //         );
    //       } catch (e) {
    //         console.log(e);
    //       } finally {
    //         mongoose.connection.close();
    //       }
    //     });
    //   }
  });
};
