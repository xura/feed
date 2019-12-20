import elmWebComponents from '@teamthread/elm-web-components';
import Feed from './elm/src/Hello.elm';
import { connect, data, connection } from '@xura/data';

(async function () {

    elmWebComponents.configure('0.19');
    elmWebComponents.register('feed-div', Feed.Elm.PortExamples, {
        setupPorts: ports => {
            data.achievements.stream()
                .then(stream => stream.subscribe(achievement => {
                    debugger;
                    ports.receiveData.send(achievement.name.toString());
                }));
        },
    });
})();