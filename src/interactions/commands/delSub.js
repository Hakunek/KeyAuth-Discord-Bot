import fetch from "node-fetch";

/** @type {import("../../types/typesDiscord.mjs").ChatInputCommandData} */
export default {
    type: 1,
    name: "deletesub",
    description: "Delete user's subscription",
    description_localizations: {
        "en-US": "Delete user's subscription",
        fi: "Poista käyttäjän tilaus",
        fr: "Supprimer l'abonnement de l'utilisateur",
        de: "Löschen Sie das Abonnement des Benutzers",
        it: "Elimina l'abbonamento dell'utente",
        nl: "Verwijder het abonnement van de gebruiker",
        ru: "Удалить подписку пользователя",
        pl: "Usuń subskrypcję użytkownika",
        tr: "Kullanıcının aboneliğini sil",
        cs: "Odstranit předplatné uživatele",
        ja: "ユーザーのサブスクリプションを削除する",
        ko: "사용자의 구독 삭제"
    },
    options: [
        {
            type: 3,
            name: "user",
            description: "Username of user you're deleting subscription from",
            description_localizations: {
                "en-US": "Username of user you're deleting subscription from",
                fi: "Käyttäjän käyttäjänimi, jolta poistat tilauksen",
                fr: "Nom d'utilisateur de l'utilisateur dont vous supprimez l'abonnement",
                de: "Benutzername des Benutzers, von dem Sie das Abonnement löschen",
                it: "Nome utente dell'utente da cui stai eliminando l'abbonamento",
                nl: "Gebruikersnaam van de gebruiker waarvan u het abonnement verwijdert",
                ru: "Имя пользователя пользователя, от которого вы удаляете подписку",
                pl: "Nazwa użytkownika użytkownika, z którego usuwasz subskrypcję",
                tr: "Aboneliğini sildiğiniz kullanıcının kullanıcı adı",
                cs: "Uživatelské jméno uživatele, ze kterého odstraňujete předplatné",
                ja: "サブスクリプションを削除するユーザーのユーザー名",
                ko: "구독을 삭제하는 사용자의 사용자 이름"
            },
            required: true
        },
        {
            type: 3,
            name: "name",
            description: "Name of subscription you're deleting from user",
            description_localizations: {
                "en-US": "Name of subscription you're deleting from user",
                fi: "Tilauksen nimi, jonka poistat käyttäjältä",
                fr: "Nom de l'abonnement que vous supprimez de l'utilisateur",
                de: "Name des Abonnements, das Sie vom Benutzer löschen",
                it: "Nome dell'abbonamento che stai eliminando dall'utente",
                nl: "Naam van het abonnement dat u van de gebruiker verwijdert",
                ru: "Название подписки, которую вы удаляете у пользователя",
                pl: "Nazwa subskrypcji, którą usuwasz od użytkownika",
                tr: "Kullanıcıdan sildiğiniz abonelik adı",
                cs: "Název předplatného, který odstraňujete od uživatele",
                ja: "ユーザーから削除するサブスクリプションの名前",
                ko: "사용자에서 삭제하는 구독 이름"
            },
            required: true
        }
    ],
    default_member_permissions: 8,
    dm_permission: false,
    async execute(interaction) {
        let user = interaction.options.getString("user");
        let name = interaction.options.getString("name");

        fetch(`https://keyauth.win/api/seller/?sellerkey=${process.env.sellerKey}&type=delsub&user=${user}&sub=${name}`).then((res) =>
            res.json().then((/** @type {any} */ json) => {
                if (json.success) {
                    interaction.editReply({
                        embeds: [
                            {
                                title: json.message,
                                color: 0x00ff00,
                                fields: [{ name: "Subscription deleted:", value: `\`${name}\`` }],
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
