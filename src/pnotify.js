import { error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";


const notificationSettings = new Stack({
    dir1: 'up',
    dir2: 'left',
    firstpos1: 70,
    firstpos2: 25,
    maxOpen: 1,
    modal: 'false',
    positioned: true,
})

export function onErrorNotification(text) {
    error({
        title: "",
        delay: 2000,
        text: text,
        stack: notificationSettings
    })
}
