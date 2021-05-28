import AsyncStorage from '@react-native-community/async-storage';
// import firebase from 'react-native-firebase';


function displayNotificationFromCustomData(message) {
  if (message.data && message.data.title) {
    let notification = new firebase.notifications.Notification({
      sound: 'default',
      show_in_foreground: true,
    });
    notification = notification
      .setTitle(message.data.title)
      .setBody(message.data.body)
      .setData(message.data)
    notification.android.setPriority(firebase.notifications.Android.Priority.High)
    notification.android.setChannelId("test-channel")
    firebase.notifications().displayNotification(notification);
  }
}

export async function registerHeadlessListener(message) {
  await AsyncStorage.setItem('headless', new Date().toISOString());
  displayNotificationFromCustomData(message);
}

export const notificationListener = () => {
  firebase.notifications().onNotification(notification => {
    notification.android.setChannelId("test-channel")
    firebase.notifications().displayNotification(notification);
  });
}

export const notificationOpenedListener = (navigation) => {
  firebase.notifications().onNotificationOpened((notificationOpen) => {
    const notif = notificationOpen.notification;
    const { type = null, data } = notif.data;

    return navigation.navigate('Profile')
  });
}


export const initialNotification = (navigation) => {
  firebase.notifications().getInitialNotification()
    .then((notificationOpen) => {
      if (notificationOpen) {
        const notification = notificationOpen.notification;
        const { type = null, data } = notification.data;
        try {

          if (notification.data.board_id != "") {
            return navigation.navigate('Profile')

          } else {
            console.log("123456 esle")
            return navigation.navigate('Profile')
          }

        } catch (err) {
          console.log("errrr-", err)
        }

      }
    });
}


export const messageListener = () => {
  firebase.messaging().onMessage((message) => {
    displayNotificationFromCustomData(message)
  });
}

export function registerAppListener(navigation) {
  notificationListener(navigation);
  notificationOpenedListener(navigation);
  initialNotification(navigation);
  messageListener(navigation);
}