/**

    file for custom discord.js related types


* @typedef {Object} Interactions
* @property {import("discord.js").Collection<string, ChatInputCommandData>} commands
* @property {import("discord.js").Collection<string, ContextCommandData>} contextMenus
* @property {import("discord.js").Collection<string, ButtonInteraction>} buttons
* @property {import("discord.js").Collection<string, ModalSubmitInteraction>} modals
* @property {import("discord.js").Collection<string, AnySelectMenuInteraction>} selectMenu

 //* COMMAND AND COMMAND OPTION TYPES

* @typedef {Object} ChoiceData
* @property {String} name
* @property {String|Number|Boolean} value

* @typedef {OtherOptionData|ChannelOptionData|NumberOptionData|StringOptionData|SubCommand|SubCommandGroup} OptionData

* @typedef {Object} OtherOptionData
* @property {5|6|8|9|11} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {Boolean} [required]


* @typedef {Object} ChannelOptionData
* @property {7} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {Boolean} [required]
* @property {Array<0|2|4|5|10|11|12|13|14|15>} [channel_types] 0-GuildText; 2-GuildVoice; 4-GuildCategory; 5-GuildAnnouncement; 10-AnnouncementThread; 11-Public_Thread; 12-Private_Thread; 13-GuildStageVoice; 14-GuildDirectory; 15-GuildForum


* @typedef {Object} NumberOptionData
* @property {4|10} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {Boolean} [required]
* @property {Boolean} [autocomplete]
* @property {Array<ChoiceData>} [choices]
* @property {Number} [max_value]
* @property {Number} [min_value]

* @typedef {Object} StringOptionData
* @property {3} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {Boolean} [required]
* @property {Boolean} [autocomplete]
* @property {Array<ChoiceData>} [choices]
* @property {Number} [max_length]
* @property {Number} [min_length]

* @typedef {Object} SubCommand
* @property {1} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {OptionData[]} [options]

* @typedef {Object} SubCommandGroup
* @property {2} type 1-SubCommand; 2-SubCommandGroup; 3-String; 4-Integer; 5-Boolean; 6-User; 7-Channel; 8-Role; 9-Mentionable; 10-Number; 11-Attachment
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {SubCommand[]} [options]

* @typedef {Object} ChatInputCommandData
* @property {1} type 1- chat input
* @property {String} name
* @property {String} description
* @property {Object<String,String>} [description_localizations]
* @property {OptionData[]} [options]
* @property {import("discord.js").PermissionsBitField | Number} [default_member_permissions]
* @property {Boolean} [dm_permission]
* @property {Boolean} [nsfw]
* @property {function(import("discord.js").ChatInputCommandInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute
* @property {function(import("discord.js").AutocompleteInteraction<"cached">,import("./classes.js").Bot): Promise<any>} [autocomplete]

* @typedef {Object} ContextCommandData
* @property {2|3} type 2 - user context; 3 - message context
* @property {String} name
* @property {import("discord.js").PermissionsBitField | Number} [default_member_permissions]
* @property {Boolean} [dm_permission]
* @property {Boolean} [nsfw]
* @property {function(import("discord.js").ContextMenuCommandInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute



* @typedef {Object} ButtonInteraction Interactions from Buttons, Modals and SelectMenus are client side only and need only to be replied to, thus the limited interaction type
* @property {String} name
* @property {function(import("discord.js").ButtonInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} ModalSubmitInteraction Interactions from Buttons, Modals and SelectMenus are client side only and need only to be replied to, thus the limited interaction type
* @property {String} name
* @property {function(import("discord.js").ModalSubmitInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} AnySelectMenuInteraction Interactions from Buttons, Modals and SelectMenus are client side only and need only to be replied to, thus the limited interaction type
* @property {String} name
* @property {function(import("discord.js").AnySelectMenuInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute


//* EVENT TYPES


* @typedef {Object} applicationCommandPermissionsUpdate
* @property {"applicationCommandPermissionsUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ApplicationCommandPermissionsUpdateData,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} autoModerationActionExecution
* @property {"autoModerationActionExecution"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").AutoModerationActionExecution,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} autoModerationRuleCreate
* @property {"autoModerationRuleCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").AutoModerationRule,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} autoModerationRuleDelete
* @property {"autoModerationRuleDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").AutoModerationRule,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} autoModerationRuleUpdate
* @property {"autoModerationRuleUpdate"} name
* @property {Boolean} [once]
* @property {function(?import("discord.js").AutoModerationRule,import("discord.js").AutoModerationRule,import("./classes.js").Bot): Promise<any>} execute - Null for first param when it wasn't in cache

* @typedef {Object} channelCreate
* @property {"channelCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} channelDelete
* @property {"channelDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").DMChannel|import("discord.js").GuildChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} channelPinsUpdate
* @property {"channelPinsUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").TextBasedChannel, Date, import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} channelUpdate
* @property {"channelUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").DMChannel|import("discord.js").GuildChannel, import("discord.js").DMChannel|import("discord.js").GuildChannel, import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} debug
* @property {"debug"} name
* @property {Boolean} [once]
* @property {function(string,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} emojiCreate
* @property {"emojiCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildEmoji,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} emojiDelete
* @property {"emojiDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildEmoji,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} emojiUpdate
* @property {"emojiUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildEmoji, import("discord.js").GuildEmoji, import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} error
* @property {"error"} name
* @property {Boolean} [once]
* @property {function(Error,import("./classes.js").Bot): any} execute Errors thrown within this event do not have a catch handler, it is recommended to not use async functions as error event handlers.

* @typedef {Object} guildAuditLogEntryCreate
* @property {"guildAuditLogEntryCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildAuditLogsEntry, import("discord.js").Guild, import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildAvailable
* @property {"guildAvailable"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildBan,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildBanAdd
* @property {"guildBanAdd"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildBan,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildBanRemove
* @property {"guildBanRemove"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildBan,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildCreate
* @property {"guildCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Guild,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildDelete
* @property {"guildDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Guild,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildIntegrationsUpdate
* @property {"guildIntegrationsUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Guild,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildMemberAdd
* @property {"guildMemberAdd"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildMember,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildMemberAvailable
* @property {"guildMemberAvailable"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildMember,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildMemberRemove
* @property {"guildMemberRemove"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildMember,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildMemberUpdate
* @property {"guildMemberUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildMember, import("discord.js").GuildMember, import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildMembersChunk
* @property {"guildMembersChunk"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Collection <import("discord.js").Snowflake, import("discord.js").GuildMember>, import("discord.js").Guild, GuildMembersChunk,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildScheduledEventCreate
* @property {"guildScheduledEventCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildScheduledEvent,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildScheduledEventDelete
* @property {"guildScheduledEventDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildScheduledEvent,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildScheduledEventUpdate
* @property {"guildScheduledEventUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildScheduledEvent,import("discord.js").GuildScheduledEvent,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildScheduledEventUserAdd
* @property {"guildScheduledEventUserAdd"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildScheduledEvent,import("discord.js").User,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildScheduledEventUserRemove
* @property {"guildScheduledEventUserRemove"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").GuildScheduledEvent,import("discord.js").User,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildUnavailable
* @property {"guildUnavailable"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Guild,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} guildUpdate
* @property {"guildUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Guild,import("discord.js").Guild,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} interactionCreate
* @property {"interactionCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ButtonInteraction<"cached">|import("discord.js").AutocompleteInteraction<"cached">|import("discord.js").ChatInputCommandInteraction<"cached">|import("discord.js").MessageContextMenuCommandInteraction<"cached">|import("discord.js").UserContextMenuCommandInteraction<"cached">|import("discord.js").ModalSubmitInteraction<"cached">|import("discord.js").StringSelectMenuInteraction<"cached">|import("discord.js").UserSelectMenuInteraction<"cached">|import("discord.js").RoleSelectMenuInteraction<"cached">|import("discord.js").MentionableSelectMenuInteraction<"cached">|import("discord.js").ChannelSelectMenuInteraction<"cached">,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} invalidated
* @property {"invalidated"} name
* @property {Boolean} [once]
* @property {function(import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} inviteCreate
* @property {"inviteCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Invite,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} inviteDelete
* @property {"inviteDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Invite,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageCreate
* @property {"messageCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Message,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageDelete
* @property {"messageDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Message,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageDeleteBulk
* @property {"messageDeleteBulk"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Collection <import("discord.js").Snowflake, import("discord.js").Message>,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageReactionAdd
* @property {"messageReactionAdd"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").MessageReaction,import("discord.js").User,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageReactionRemove
* @property {"messageReactionRemove"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").MessageReaction,import("discord.js").User,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageReactionRemoveAll
* @property {"messageReactionRemoveAll"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Message, import("discord.js").Collection <(string |import("discord.js").Snowflake), import("discord.js").MessageReaction>,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageReactionRemoveEmoji
* @property {"messageReactionRemoveEmoji"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").MessageReaction,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} messageUpdate
* @property {"messageUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Message,import("discord.js").Message,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} presenceUpdate
* @property {"presenceUpdate"} name
* @property {Boolean} [once]
* @property {function(?import("discord.js").Presence,import("discord.js").Presence,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} raw
* @property {"raw"} name
* @property {Boolean} [once]
* @property {function(Payload, import("discord.js").GatewayOpcodes.Dispatch,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} ready
* @property {"ready"} name
* @property {Boolean} [once]
* @property {function(import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} roleCreate
* @property {"roleCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Role,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} roleDelete
* @property {"roleDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Role,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} roleUpdate
* @property {"roleUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Role,import("discord.js").Role,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} shardDisconnect
* @property {"shardDisconnect"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").CloseEvent, number,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} shardError
* @property {"shardError"} name
* @property {Boolean} [once]
* @property {function(Error, number,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} shardReady
* @property {"shardReady"} name
* @property {Boolean} [once]
* @property {function(number, ?Set<import("discord.js").Snowflake>,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} shardReconnecting
* @property {"shardReconnecting"} name
* @property {Boolean} [once]
* @property {function(number,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} shardResume
* @property {"shardResume"} name
* @property {Boolean} [once]
* @property {function(number,number,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stageInstanceCreate
* @property {"stageInstanceCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").StageInstance,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stageInstanceDelete
* @property {"stageInstanceDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").StageInstance,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stageInstanceUpdate
* @property {"stageInstanceUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").StageInstance,import("discord.js").StageInstance,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stickerCreate
* @property {"stickerCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Sticker,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stickerDelete
* @property {"stickerDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Sticker,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} stickerUpdate
* @property {"stickerUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Sticker,import("discord.js").Sticker,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadCreate
* @property {"threadCreate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ThreadChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadDelete
* @property {"threadDelete"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ThreadChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadListSync
* @property {"threadListSync"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Collection <import("discord.js").Snowflake, import("discord.js").ThreadChannel>, import("discord.js").Guild ,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadMemberUpdate
* @property {"threadMemberUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ThreadMember,import("discord.js").ThreadMember,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadMembersUpdate
* @property {"threadMembersUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Collection <import("discord.js").Snowflake, import("discord.js").ThreadMember>, import("discord.js").Collection <import("discord.js").Snowflake, import("discord.js").ThreadMember>, import("discord.js").ThreadChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} threadUpdate
* @property {"threadUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").ThreadChannel,import("discord.js").ThreadChannel,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} typingStart
* @property {"typingStart"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").Typing,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} userUpdate
* @property {"userUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").User,import("discord.js").User,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} voiceStateUpdate
* @property {"voiceStateUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").VoiceState,import("discord.js").VoiceState,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} warn
* @property {"warn"} name
* @property {Boolean} [once]
* @property {function(string,import("./classes.js").Bot): Promise<any>} execute

* @typedef {Object} webhookUpdate
* @property {"webhookUpdate"} name
* @property {Boolean} [once]
* @property {function(import("discord.js").TextChannel|import("discord.js").NewsChannel|import("discord.js").VoiceChannel|import("discord.js").StageChannel|import("discord.js").ForumChannel,import("./classes.js").Bot): Promise<any>} execute


* @typedef {applicationCommandPermissionsUpdate|autoModerationActionExecution|autoModerationRuleCreate|autoModerationRuleDelete|autoModerationRuleUpdate|channelCreate|channelDelete|channelPinsUpdate|channelUpdate|debug|emojiCreate|emojiDelete|emojiUpdate|error|guildAuditLogEntryCreate|guildAvailable|guildBanAdd|guildBanRemove|guildCreate|guildDelete|guildIntegrationsUpdate|guildMemberAdd|guildMemberAvailable|guildMemberRemove|guildMemberUpdate|guildMembersChunk|guildScheduledEventCreate|guildScheduledEventDelete|guildScheduledEventUpdate|guildScheduledEventUserAdd|guildScheduledEventUserRemove|guildUnavailable|guildUpdate|interactionCreate|invalidated|inviteCreate|inviteDelete|messageCreate|messageDelete|messageDeleteBulk|messageReactionAdd|messageReactionRemove|messageReactionRemoveAll|messageReactionRemoveEmoji|messageUpdate|presenceUpdate|raw|ready|roleCreate|roleDelete|roleUpdate|shardDisconnect|shardError|shardReady|shardReconnecting|shardResume|stageInstanceCreate|stageInstanceDelete|stageInstanceUpdate|stickerCreate|stickerDelete|stickerUpdate|threadCreate|threadDelete|threadListSync|threadMemberUpdate|threadMembersUpdate|threadUpdate|typingStart|userUpdate|voiceStateUpdate|warn|webhookUpdate} EventData

//* Other
w
* @typedef {Object} GuildMembersChunk
* @property {Number} index
* @property {Number} count
* @property {Array<any>} notFound
* @property {?String} nonce

* @typedef {Object} Payload
* @property {import("discord.js").GatewayDispatchEvents} t payload event name
* @property {number} s sequence number
* @property {import("discord.js").GatewayOpcodes.Dispatch} op 
* @property {import("discord.js").GatewayReceivePayload} d

*/
