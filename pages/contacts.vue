<template>
  <div class="contacts-page container">
    <PageTitle :title="$t('contacts.title')" />
    <main class="contacts-page__content">
      <div class="contacts-page__quadro">
        <ShopCardSmall class="contacts-page__card-small" :data="item" v-for="(item,i) in stores.slice(0, isStoreNumberEven ? stores.length : -1)" :key="i" v-show="stores.length > 1" @showOnMap="showOnMap($event)" />
      </div>
      <ShopCardBig class="contacts-page__card-big" :data="stores[stores.length - 1]" v-show="!isStoreNumberEven" @showOnMap="showOnMap($event)" />
      <div class="contacts-page__locations">
        <h2 id="map-title">{{ $t('contacts.locations') }}</h2>
        <div class="contacts-page__map" id="map"></div>
      </div>
    </main>
    <script src="http://maps.google.com/maps/api/js?key=AIzaSyDYu7NHXwvGDwGTZLvD_4oz845kbzROhE4&sensor=false" type="text/javascript"></script>
  </div>
</template>
<script>
import PageTitle from '~/components/global/PageTitle';
import ShopCardSmall from '~/components/pages/contacts/ShopCardSmall';
import ShopCardBig from '~/components/pages/contacts/ShopCardBig';

export default {
  components: {
    PageTitle,
    ShopCardSmall,
    ShopCardBig
  },

  data() {
    return {
    	map: {
    		gmap: null,
    		infoWindow: null,
    		markers: []
    	},

      stores: [{
          title: 'xz',
          address: 'xz',
          phone: 'xz',
          mapLink: 'xz',
          mapPos: [40.375814,49.839887]
        },
        {
          title: 'xz',
          address: 'xz',
          phone: 'xz',
          mapLink: 'xz',
          mapPos: [40.376489,49.843275]
        },
        {
          title: 'Af',
          address: 'xz',
          phone: 'xz',
          mapLink: 'xz',
          mapPos: [40.37643,49.841717]
        }
      ]
    }
  },

  mounted() {
    let locations = this.stores ? [...this.stores.map(v => [v.address, ...v.mapPos])] : [];

    this.map.gmap = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(40.3736285, 49.8400589),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#ffffff" }, { "lightness": 40 }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#ed5929" }] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#c4c4c4" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffcb05" }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffcb05" }, { "lightness": "0" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ed5929" }, { "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#ffcb05" }] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }, { "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "#666666" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }]
    });

    this.map.infoWindow = new google.maps.InfoWindow();

    for (let i = 0; i < locations.length; i++) {
      this.map.markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: this.map.gmap,
        icon: '/pics/svg/contacts/map-pin.svg'
      }));

      this.map.markers[i].addListener('click', () => {
        this.map.infoWindow.setContent(locations[i][0]);
        this.map.infoWindow.open(this.map.gmap, this.map.markers[i]);
        this.map.gmap.setZoom(16);
    		this.map.gmap.panTo(this.map.markers[i].getPosition());
      });
    }
  },

  computed: {
    isStoreNumberEven() {
    	return this.stores && this.stores.length % 2 == 0;
    }
  },

  methods: {
  	showOnMap(pos) {
  		// scroll down to the map
  		window.scrollTo({ top: document.querySelector('#map-title').getBoundingClientRect().y - 100, behavior: 'smooth' })
  		// show the marker on the map
  		google.maps.event.trigger(this.map.markers.find(v => v.position.lat() == pos[0] && v.position.lng() == pos[1]), 'click');
  	}
  }
}

</script>
