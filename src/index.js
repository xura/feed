import elmWebComponents from '@teamthread/elm-web-components';
import Feed from '../elm/src/Hello.elm';
import emporium from '@xura/emporium';
console.log(emporium);
elmWebComponents.configure('0.19');
elmWebComponents.register('feed-div', Feed.Elm.PortExamples, {
    setupPorts: ports => {
        // let count = 0;
        // ports.receiveData.send(count.toString());
        //
        //erg
        //
        // setInterval(() => {
        //     count++;
        //     ports.receiveData.send(count.toString());
        // }, 1000)
        emporium.count.subscribe(_ => ports.receiveData.send(_.toString()));
    },
});