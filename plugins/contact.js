module.exports = {
  config: {
    name: 'contact',
    aliases: [],
    permission: 2,
    prefix: 'both',
    categories: 'Utilities',
    credit: 'Developed by Ariyan',
    usages: [
      `${global.config.PREFIX}contact - Send contact information for Ariyan.`,
    ]
  },

  start: async ({ event, api }) => {
    const { threadId } = event;

    const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' 
            + 'FN:Ariyan\n'
            + 'ORG:Nayan;\n'
            + 'TEL;type=CELL;type=VOICE;waid=8801814289472:01814289472\n'
            + 'END:VCARD';

    const sentMsg = await api.sendMessage(
      threadId,
      { 
        contacts: { 
          displayName: 'Mohammad Nayan', 
          contacts: [{ vcard }] 
        }
      }
    );
  }
};
