import elmWebComponents from '@teamthread/elm-web-components';
import Feed from './src/elm/src/Hello.elm';
import { connect, data } from '@xura/data';

(async function () {
    const emp = await connect().then(connection => data(connection));

    elmWebComponents.configure('0.19');
    elmWebComponents.register('feed-div', Feed.Elm.PortExamples, {
        setupPorts: ports => {
            emp.achievements.repo
                .stream()
                .then(stream => stream.subscribe(achievement => ports.receiveData.send(achievement.name)));
        },
    });
})();