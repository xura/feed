import elmWebComponents from '@teamthread/elm-web-components';
import Feed from '../elm/src/Hello.elm';

elmWebComponents.configure('0.19');
elmWebComponents.register('feed-div', Feed.Elm.Main);