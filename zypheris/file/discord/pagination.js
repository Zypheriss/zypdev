class Pagination {
  constructor(options = {}) {
    this.pages = options.pages || [];
    this.timeout = options.timeout || 60000;
    this.customButtons = options.customButtons || null;
  }

  addPage(embed) {
    this.pages.push(embed);
    return this;
  }

  addPages(...embeds) {
    this.pages.push(...embeds);
    return this;
  }

  async paginate(message, author) {
    if (this.pages.length === 0) {
      throw new Error('No pages to paginate');
    }

    if (this.pages.length === 1) {
      return await message.reply({ embeds: [this.pages[0]] });
    }

    let currentPage = 0;

    const getButtons = (disabled = false) => {
      return [
        {
          type: 2,
          style: 1,
          custom_id: 'first',
          emoji: { name: '⏪' },
          disabled: disabled || currentPage === 0
        },
        {
          type: 2,
          style: 1,
          custom_id: 'prev',
          emoji: { name: '◀️' },
          disabled: disabled || currentPage === 0
        },
        {
          type: 2,
          style: 2,
          custom_id: 'stop',
          emoji: { name: '⏹️' },
          disabled: disabled
        },
        {
          type: 2,
          style: 1,
          custom_id: 'next',
          emoji: { name: '▶️' },
          disabled: disabled || currentPage === this.pages.length - 1
        },
        {
          type: 2,
          style: 1,
          custom_id: 'last',
          emoji: { name: '⏩' },
          disabled: disabled || currentPage === this.pages.length - 1
        }
      ];
    };

    const embed = this.pages[currentPage];
    if (!embed.footer) embed.footer = {};
    embed.footer.text = `Page ${currentPage + 1} / ${this.pages.length}`;

    const msg = await message.reply({
      embeds: [embed],
      components: [{
        type: 1,
        components: getButtons()
      }]
    });

    const collector = msg.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === author.id,
      time: this.timeout
    });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'first') {
        currentPage = 0;
      } else if (interaction.customId === 'prev') {
        currentPage = Math.max(0, currentPage - 1);
      } else if (interaction.customId === 'next') {
        currentPage = Math.min(this.pages.length - 1, currentPage + 1);
      } else if (interaction.customId === 'last') {
        currentPage = this.pages.length - 1;
      } else if (interaction.customId === 'stop') {
        collector.stop();
        return;
      }

      const newEmbed = this.pages[currentPage];
      if (!newEmbed.footer) newEmbed.footer = {};
      newEmbed.footer.text = `Page ${currentPage + 1} / ${this.pages.length}`;

      await interaction.update({
        embeds: [newEmbed],
        components: [{
          type: 1,
          components: getButtons()
        }]
      });
    });

    collector.on('end', async () => {
      try {
        await msg.edit({
          components: [{
            type: 1,
            components: getButtons(true)
          }]
        });
      } catch (error) {
        console.error('Failed to disable pagination buttons:', error);
      }
    });

    return msg;
  }
}

module.exports = { Pagination };
