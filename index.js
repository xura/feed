import elmWebComponents from '@teamthread/elm-web-components';
import Feed from './src/elm/src/Hello.elm';
import emporium from '@xura/emporium';

elmWebComponents.configure('0.19');
elmWebComponents.register('feed-div', Feed.Elm.PortExamples, {
    setupPorts: ports => {
        emporium
            .count
            .subscribe(_ => ports.receiveData.send(_.toString()));
    },
});