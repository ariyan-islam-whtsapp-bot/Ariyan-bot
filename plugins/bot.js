const axios = require("axios");
const selectionData = {};

module.exports = {
    config: {
      name: "bot",
      aliases: ["sim"],
      permission: 0,
      prefix: "both",
      categorie: "AI Chat",
      cooldowns: 5,
      credit: "Developed by Mohammad Nayan",
      usages: [
        `${global.config.PREFIX}bot <message> - Start a chat with the bot.`,
        `${global.config.PREFIX}bot - Receive a random greeting from the bot.`,
      ],
      description: "Engage in conversations with an AI-powered bot!",
    },

  event: async ({ event, api, body }) => {
    const { threadId, senderId, replyMessage, message} = event;

  
    if (!selectionData[threadId]) return;
    const { n, userId } = selectionData[threadId];

    
    if (userId !== senderId || !n) return;

    

    const quotedMessage =
      n.message?.extendedTextMessage?.text || null;

    if (!quotedMessage || replyMessage !== quotedMessage) return;
    

    try {

        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(body)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },

  start: async ({ event, api, args }) => {
    const usermsg = args.join(" ");
    const { threadId, senderId, message} = event;

    
    if (!usermsg) {
      const greetings = [
        "°°অনুভূতি প্রকাশ করতে নেই মানুষ নাটক মনে করে মজা নেয়°..! 😥💔🥀",
        " কিছু মানুষ স্বল্প সময়ের জন্য আমাদের জীবনে আসে।কিন্তু দীর্ঘ সময় স্মৃতি রেখে যায়..!🙂💔",
        "𝙴𝙸 𝙿𝙰𝙶𝙾𝙻 𝙴𝚃𝙾 𝙳𝙰𝙺𝙾𝚂 𝙺𝙴𝙽?",
        " 𝙼𝚈𝙱 𝙸 𝙹𝚄𝚂𝚃 𝚆𝙰𝙽𝙽𝙰 𝙱𝙴 𝚈𝙾𝚄𝚁𝚂 ? 😌💝",
        " 𝙸 𝚂𝙰𝚈 𝙸 𝙻𝙾𝚅𝙴 𝚈𝙾𝚄 𝙵𝙾𝚁𝙴𝚅𝙴𝚁💝🐼",
        "𝙲𝙰𝙻𝙻 𝙼𝙴 𝙲𝙷𝙾𝙲𝙾𝙻𝙰𝚃𝙴 𝙽𝙾𝚃 𝙱𝙾𝚃 😢",
        " 𝚈𝚄𝙼𝙼𝚈 𝙱𝙱𝚈 𝚈𝙾𝚄 𝙰𝚁𝙴 𝚂𝙾 𝚂𝚆𝙴𝙴𝚃😋🤤",
        "𝙰𝚌𝙲𝙲𝙰𝙷 𝙱𝙾𝙻𝙾 𝙰𝙼𝙺𝙴 𝙻𝙰𝙶𝙱𝙴 𝙽𝙰𝙺𝙸 𝙰𝚁𝙸𝚈𝙰𝙽 ?",
        "তোর সাথে কথা নাই কারণ তুই অনেক লুচ্চা",
        " এইখানে লুচ্চামি করলে লাথি দিবো কিন্তু",
        "আমাকে চুমু দিবি 🫢🦋",
        "হেহে বাবু আমার কাছে আসো 😘💋",
        "আমি তোমাকে অনেক ভালোবাসি বাবু🥺💖",
        "your chocolate বট এর help list dekhte type koron *help","কিরে বলদ তুই এইখানে 🙂",
        " আমাকেq চিনো না জানু? মনু",
        "hey bbe I'm your personal Based chatbot you ask me anything",
        "AR asbo na tor kache",
        "আমাকে ডাকলে ,আমি কিন্তু 𝐊𝐢𝐬𝐬 করে দিবো 😘",
        "Hop beda dakos kn🥲",
        "-তাবিজ কইরা হইলেও ফ্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱",
        " ওই মামী আর ডাকিস না প্লিজ🥲",
        " হ্যা বলো, শুনছি আমি",
        "বলো কি করতে পারি তোমার জন্য😌 ",
        "𝐁𝐨𝐭 না জানু,বলো কারন আমি সিংগেল 😌 "," I love you tuna🥺🥶",
        "Tuma dew xanu😍😘 ",
        " এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈",
        " দেখা হলে কাঠগোলাপ দিও..🤗",
        "𝗕𝗲𝘀𝗵𝗶 𝗱𝗮𝗸𝗹𝗲 𝗮𝗺𝗺𝘂 𝗯𝗼𝗸𝗮 𝗱𝗲𝗯𝗮 𝘁𝗼__🥺 ",
        "•-কিরে🫵 তরা নাকি  prem করস..😐🐸•আমারে একটা করাই দিলে কি হয়-🥺 ",
        "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 ",
        "Single taka ki oporad🥺 ",
        " Premer mora jole duve na😛",
        "Ufff matha gorom kore disos😒 ",
        "Boss Ariyan er chipay😜 ",
        "bashi dakle boss 𝚊𝚛𝚒𝚢𝚊𝚗 ke bole dimu😒 ",
        "Xhipay atke gaci jan🥲 ",
        "Washroom a🤣 ",
        "bado maser kawwa police amar sawwa😞 ",
        "I am single plz distrab me🥺🥲 ",
        "𝗮𝗺𝗶 𝗯𝗼𝘁 𝗻𝗮 𝗮𝗺𝗮𝗸𝗲 𝗯𝗯𝘆 𝗯𝗼𝗹𝗼 𝗯𝗯𝘆!!😘 ","🍺 এই নাও জুস খাও..!𝗕𝗯𝘆 বলতে বলতে হাপায় গেছো না 🥲 ",
        "𝗛𝗶𝗶 𝗶 𝗮𝗺 𝗯𝗼𝘁 𝗰𝗮𝗻 𝗶 𝗵𝗲𝗹𝗽 𝘆𝗼𝘂!🤖 ",
        "𝗲𝘁𝗼 𝗯𝗯𝘆 𝗯𝗯𝘆 𝗻𝗮 𝗸𝗼𝗿𝗲 𝘁𝗮𝗸𝗮 𝗼 𝘁𝗼 𝗽𝗮𝘁𝗵𝗮𝘁𝗲 𝗽𝗮𝗿𝗼😒🥳🥳 ",
        "𝘁𝗼𝗿𝗲 𝗺𝗮𝗿𝗮𝗿 𝗽𝗿𝗲𝗽𝗲𝗿𝗮𝘁𝗶𝗼𝗻 𝗻𝗶𝗰𝗵𝗶...!!.🫡 ",
        "𝘂𝗺𝗺𝗮𝗵 𝗱𝗶𝗹𝗲 𝗹𝗼𝘃𝗲 𝘆𝗼𝘂 𝗸𝗼𝗺𝘂 𝗸𝗶𝗻𝘁𝘂😑 ",
        " আমাকে ডাকলে ,আমি কিন্তু 𝐊𝐢𝐬𝐬 করে দিবো 😘",
        " Bal falaw😩",
        "Tapraiya dat falai demu🥴 ",
        "He🤤bolo amar jan kmn aso🤭 ",
        "Hmmm jan ummmmmmah🫣 ",
        "Chup kor nunu kete demu bashi dakle😬 ",
        "Yes sir/mem😍 ",
        "Assalamualikum☺️💖 ",
        "Walaikumsalam😫🤓 ",
        "Chaiya takos kn ki kobi kooo☹️ ",
        "Onek boro beyadop re tui😒 ",
        "Amar shate kew sex opps tex kore na😫 ",
        "অনুমতি দিলাম-𝙋𝙧𝙤𝙥𝙤𝙨𝙚 কর বস 𝙰𝚁𝙸𝚈𝙰𝙽 কে-🐸😾🔪 ",
        "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏 ",
        "-আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস Ariyan ধরতে পারছে না-🐸🥲 ",
        " তোর কি চোখে পড়ে না আমি ব্যাস্ত 😒💌",
        "বলো কি বলবা, চিপায় যাইয়া বলবা নাকি সবার সামনে বলবা ?🤭",
      ];

      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      const userToMention = senderId;

      const greetingMessage = await api.sendMessage(threadId, {
        text: `@${userToMention.split('@')[0]}, ${randomGreeting}`,
        mentions: [userToMention],
      }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: greetingMessage,
      };
      return;
    }

    try {
        const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiss = apis.data.api;
      
      const response = await axios.get(
        `${apiss}/sim?type=ask&ask=${encodeURIComponent(usermsg)}`
      );

      const replyText = response.data.data?.msg || "I'm not sure how to respond to that.";

      
      const botReply = await api.sendMessage(threadId, { text: replyText }, { quoted: message });

      
      selectionData[threadId] = {
        userId: senderId,
        n: botReply,
      };
    } catch (error) {
      console.error("Error while contacting the API:", error);
      await api.sendMessage(threadId, {
        text: "An error occurred while processing your request. Please try again later.",
      });
    }
  },
};
