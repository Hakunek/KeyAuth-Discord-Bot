import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "createwebhook",
    description: "Add webhook to application",
    description_localizations: {
        "en-US": "Add webhook to application",
        fi: "Lisää web-hook sovellukseen",
        fr: "Ajouter un webhook à l'application",
        de: "Webhook zur Anwendung hinzufügen",
        it: "Aggiungi webhook all'applicazione",
        nl: "Webhook toevoegen aan applicatie",
        ru: "Добавить веб-хук в приложение",
        pl: "Dodaj webhook do aplikacji",
        tr: "Uygulamaya webhook ekleyin",
        cs: "Přidat webhook do aplikace",
        ja: "アプリケーションにWebhookを追加する",
        ko: "응용 프로그램에 웹 훅 추가"
    },
    options: [
        {
            type: 3,
            name: "baseurl",
            description: "URL that's hidden on KeyAuth server",
            description_localizations: {
                "en-US": "URL that's hidden on KeyAuth server",
                fi: "URL, joka on piilotettu KeyAuth-palvelimella",
                fr: "URL qui est caché sur le serveur KeyAuth",
                de: "URL, die auf dem KeyAuth-Server versteckt ist",
                it: "URL che è nascosto sul server KeyAuth",
                nl: "URL die verborgen is op de KeyAuth-server",
                ru: "URL, который скрыт на сервере KeyAuth",
                pl: "URL ukryty na serwerze KeyAuth",
                tr: "URL, KeyAuth sunucusunda gizli",
                cs: "URL, který je skrytý na serveru KeyAuth",
                ja: "KeyAuthサーバーで隠されているURL",
                ko: "KeyAuth 서버에서 숨겨진 URL"
            },
            required: true
        },
        {
            type: 3,
            name: "useragent",
            description: "User agent, optional. If not set, it will default to KeyAuth",
            description_localizations: {
                "en-US": "User agent, optional. If not set, it will default to KeyAuth",
                fi: "Käyttäjäagentti, valinnainen. Jos ei ole asetettu, se on oletusarvoisesti KeyAuth",
                fr: "Agent utilisateur, facultatif. Si non défini, il sera par défaut à KeyAuth",
                de: "Benutzeragent, optional. Wenn nicht festgelegt, wird es standardmäßig auf KeyAuth gesetzt",
                it: "User agent, facoltativo. Se non impostato, verrà impostato come KeyAuth",
                nl: "Gebruikersagent, optioneel. Als het niet is ingesteld, wordt het standaard ingesteld op KeyAuth",
                ru: "Агент пользователя, необязательный. Если не установлен, по умолчанию будет KeyAuth",
                pl: "Agent użytkownika, opcjonalny. Jeśli nie jest ustawiony, domyślnie będzie KeyAuth",
                tr: "Kullanıcı aracısı, isteğe bağlı. Ayarlanmamışsa, KeyAuth olarak varsayılacaktır",
                cs: "Uživatelský agent, volitelný. Pokud není nastaven, bude nastaven jako výchozí KeyAuth",
                ja: "ユーザーエージェント、オプション。設定されていない場合は、デフォルトでKeyAuthになります",
                ko: "사용자 에이전트, 선택 사항. 설정되지 않은 경우 기본적으로 KeyAuth가됩니다"
            },
            required: true
        },
        {
            type: 5,
            name: "authed",
            description: "Determines whether user needs to be logged in (1) or not (0)",
            description_localizations: {
                "en-US": "Determines whether user needs to be logged in (1) or not (0)",
                fi: "Määrittää, onko käyttäjän kirjautua sisään (1) tai ei (0)",
                fr: "Détermine si l'utilisateur doit être connecté (1) ou non (0)",
                de: "Bestimmt, ob der Benutzer angemeldet sein muss (1) oder nicht (0)",
                it: "Determina se l'utente deve essere connesso (1) o no (0)",
                nl: "Bepaalt of de gebruiker moet zijn ingelogd (1) of niet (0)",
                ru: "Определяет, нужно ли пользователю войти в систему (1) или нет (0)",
                pl: "Określa, czy użytkownik musi się zalogować (1) lub nie (0)",
                tr: "Kullanıcının giriş yapması gerekip gerekmediğini (1) veya gerekmediğini (0) belirler",
                cs: "Určuje, zda se uživatel musí přihlásit (1) nebo ne (0)",
                ja: "ユーザーがログインする必要があるかどうか（1）またはそうでないか（0）を決定します",
                ko: "사용자가 로그인해야하는지 (1) 아니면 아닌지 (0) 결정합니다"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let baseurl = interaction.options.getString("baseurl", true);
        let useragent = interaction.options.getString("useragent");
        let authed = interaction.options.getString("authed");

        if (baseurl.includes("http://") || baseurl.includes("https://")) {
        } else {
            return interaction.reply({
                embeds: [
                    {
                        title: "Failure, Please Include `http://` or `https://` on webhook link",
                        color: 0xff0000,
                        timestamp: `${interaction.createdAt.toISOString()}`,
                        footer: { text: "KeyAuth Discord Bot" }
                    }
                ],
                ephemeral: true
            });
        }

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=addwebhook&baseurl=${baseurl}&ua=${useragent}&authed=${authed}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                timestamp: `${interaction.createdAt.toISOString()}`
                            }
                        ]
                    });
                } else {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                fields: [{ name: "Note:", value: `Your seller key is most likely invalid. Change your seller key with \`/setseller\` command.` }],
                                color: 0xff0000,
                                timestamp: `${interaction.createdAt.toISOString()}`,
                                footer: { text: "KeyAuth Discord Bot" }
                            }
                        ]
                    });
                }
            })
        );
    }
};
