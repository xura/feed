import elmWebComponents from '@teamthread/elm-web-components';
import Feed from './elm/src/Hello.elm';
import { connect, data, connection } from '@xura/data';

elmWebComponents.configure('0.19');
elmWebComponents.register('feed-div', Feed.Elm.PortExamples, {
    setupPorts: ports => {
        data.achievements.repo.stream()
            .then(stream => stream.subscribe(achievement => {
                ports.receiveData.send(achievement.name.toString());
            }));
    },
});