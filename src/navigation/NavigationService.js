import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(routeName, params) {
  _navigator.dispatch(NavigationActions.navigate({routeName, params}));
}

export function resetNavigation(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({routeName, params})],
    }),
  );
}
