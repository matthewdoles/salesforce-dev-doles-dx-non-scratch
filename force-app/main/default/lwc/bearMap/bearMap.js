/**
 * Created by Matthew on 6/9/2019.
 */

import {LightningElement, track, wire} from 'lwc';
import { CurrentPageReference} from 'lightning/navigation';
import { registerListener } from 'c/pubsub';
export default class BearMap extends LightningElement {
    @track mapMarkers = [];
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        registerListener('bearListUpdate', this.handleBearListUpdate, this);
    }
    disconnectedCallback() {
        unregisterAllListeners(this);
    }
    handleBearListUpdate(bears) {
        this.mapMarkers = bears.map(bear => {
            const Latitude = bear.Location__Latitude__s;
            const Longitude = bear.Location__Longitude__s;
            return {
                location: {Latitude, Longitude},
                title: bear.Name,
                description: `Coords: ${Latitude}, ${Longitude}`,
                icon: 'utility:animal_and_nature'
            };
        });
    }
}